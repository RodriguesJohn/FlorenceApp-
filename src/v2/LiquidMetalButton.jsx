import { useEffect, useId, useRef, useState } from "react";
import {
  ShaderFitOptions,
  ShaderMount,
  emptyPixel,
  getShaderColorFromString,
  liquidMetalFragmentShader,
  LiquidMetalShapes,
  defaultPatternSizing,
} from "@paper-design/shaders";
import "./liquid-metal-button.css";

const SPEED = {
  rest: 0.6,
  hover: 1,
  press: 2.4,
};

const RIPPLE_MS = 400;
const PRESS_BURST_MS = 240;

let emptyImagePromise;

function loadEmptyImage() {
  if (!emptyImagePromise) {
    emptyImagePromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = emptyPixel;
    });
  }
  return emptyImagePromise;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LiquidMetalButton({
  label = "Get Started",
  children,
  onClick,
  className = "",
  ...props
}) {
  const shaderRef = useRef(null);
  const shaderMount = useRef(null);
  const buttonRef = useRef(null);
  const hoverRef = useRef(false);
  const rippleSeed = useId();
  const rippleCount = useRef(0);
  const [ripples, setRipples] = useState([]);
  const text = children ?? label;

  useEffect(() => {
    if (!shaderRef.current) return undefined;

    let cancelled = false;

    const mount = async () => {
      try {
        const image = await loadEmptyImage();
        if (cancelled || !shaderRef.current) return;

        shaderMount.current?.dispose();
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_colorBack: getShaderColorFromString("#9a9a9c"),
            u_colorTint: getShaderColorFromString("#ffffff"),
            u_image: image,
            u_isImage: false,
            u_shape: LiquidMetalShapes.none,
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_fit: ShaderFitOptions.cover,
            u_scale: 1,
            u_rotation: defaultPatternSizing.rotation,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
            u_originX: defaultPatternSizing.originX,
            u_originY: defaultPatternSizing.originY,
            u_worldWidth: defaultPatternSizing.worldWidth,
            u_worldHeight: defaultPatternSizing.worldHeight,
          },
          { alpha: true, premultipliedAlpha: true },
          prefersReducedMotion() ? 0 : SPEED.rest,
        );
      } catch (error) {
        console.error("Liquid metal button shader failed to mount", error);
      }
    };

    mount();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = () => {
      shaderMount.current?.setSpeed(motionQuery.matches ? 0 : SPEED.rest);
    };
    motionQuery.addEventListener("change", handleMotion);

    return () => {
      cancelled = true;
      motionQuery.removeEventListener("change", handleMotion);
      shaderMount.current?.dispose();
      shaderMount.current = null;
    };
  }, []);

  function setShaderSpeed(next) {
    if (prefersReducedMotion()) {
      shaderMount.current?.setSpeed(0);
      return;
    }
    shaderMount.current?.setSpeed(next);
  }

  function handleMouseEnter() {
    hoverRef.current = true;
    setShaderSpeed(SPEED.hover);
  }

  function handleMouseLeave() {
    hoverRef.current = false;
    setShaderSpeed(SPEED.rest);
  }

  function handleFocus() {
    setShaderSpeed(SPEED.hover);
  }

  function handleBlur() {
    setShaderSpeed(hoverRef.current ? SPEED.hover : SPEED.rest);
  }

  function handleClick(event) {
    setShaderSpeed(SPEED.press);
    window.setTimeout(() => {
      setShaderSpeed(hoverRef.current ? SPEED.hover : SPEED.rest);
    }, PRESS_BURST_MS);

    if (!prefersReducedMotion() && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = {
        id: `${rippleSeed}-${rippleCount.current++}`,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setRipples((current) => [...current, ripple]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== ripple.id));
      }, RIPPLE_MS);
    }

    onClick?.(event);
  }

  return (
    <span className={["liquid-metal-btn", className].filter(Boolean).join(" ")}>
      <button
        ref={buttonRef}
        type="button"
        className="liquid-metal-btn__control"
        aria-label={typeof text === "string" ? text : label}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        <span ref={shaderRef} className="liquid-metal-btn__shader" aria-hidden="true" />
        <span className="liquid-metal-btn__face" aria-hidden="true" />
        <span className="liquid-metal-btn__label">{text}</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="liquid-metal-btn__ripple"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        ))}
      </button>
    </span>
  );
}
