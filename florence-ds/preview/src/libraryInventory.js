import colorPrimitivesCss from '../../02-foundations/colors/primitives.css?raw'
import colorSemanticsCss from '../../02-foundations/colors/semantics.css?raw'
import typePrimitivesCss from '../../02-foundations/typography/primitives.css?raw'
import typeSemanticsCss from '../../02-foundations/typography/semantics.css?raw'
import spacePrimitivesCss from '../../02-foundations/spacing/primitives.css?raw'
import spaceSemanticsCss from '../../02-foundations/spacing/semantics.css?raw'
import gridPrimitivesCss from '../../02-foundations/grid/primitives.css?raw'
import gridSemanticsCss from '../../02-foundations/grid/semantics.css?raw'
import radiusPrimitivesCss from '../../02-foundations/radius/primitives.css?raw'
import radiusSemanticsCss from '../../02-foundations/radius/semantics.css?raw'
import borderPrimitivesCss from '../../02-foundations/border/primitives.css?raw'
import borderSemanticsCss from '../../02-foundations/border/semantics.css?raw'
import shadowPrimitivesCss from '../../02-foundations/shadow/primitives.css?raw'
import shadowSemanticsCss from '../../02-foundations/shadow/semantics.css?raw'
import motionPrimitivesCss from '../../02-foundations/motion/primitives.css?raw'
import motionSemanticsCss from '../../02-foundations/motion/semantics.css?raw'
import opacityPrimitivesCss from '../../02-foundations/opacity/primitives.css?raw'
import opacitySemanticsCss from '../../02-foundations/opacity/semantics.css?raw'

function countTokens(css) {
  return (css.match(/--[a-zA-Z0-9-]+\s*:/g) || []).length
}

function countComponents() {
  const files = import.meta.glob('../../03-components/**/*.jsx', {
    eager: true,
    query: '?raw',
    import: 'default',
  })
  return Object.keys(files).length
}

const color =
  countTokens(colorPrimitivesCss) + countTokens(colorSemanticsCss)
const typography =
  countTokens(typePrimitivesCss) + countTokens(typeSemanticsCss)
const spacing =
  countTokens(spacePrimitivesCss) + countTokens(spaceSemanticsCss)
const grid =
  countTokens(gridPrimitivesCss) + countTokens(gridSemanticsCss)
const radius =
  countTokens(radiusPrimitivesCss) + countTokens(radiusSemanticsCss)
const border =
  countTokens(borderPrimitivesCss) + countTokens(borderSemanticsCss)
const shadow =
  countTokens(shadowPrimitivesCss) + countTokens(shadowSemanticsCss)
const motion =
  countTokens(motionPrimitivesCss) + countTokens(motionSemanticsCss)
const opacity =
  countTokens(opacityPrimitivesCss) + countTokens(opacitySemanticsCss)

export const LIBRARY = {
  components: countComponents(),
  foundations: {
    color,
    typography,
    spacing,
    grid,
    radius,
    border,
    shadow,
    motion,
    opacity,
  },
  foundationTotal:
    color +
    typography +
    spacing +
    grid +
    radius +
    border +
    shadow +
    motion +
    opacity,
}
