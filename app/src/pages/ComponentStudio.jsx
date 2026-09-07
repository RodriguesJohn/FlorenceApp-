import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../layout/PageHeader.jsx'
import { Button } from '../../florence/components/button/Button.jsx'
import { Input } from '../../florence/components/input/Input.jsx'
import { Tag } from '../../florence/components/tag/Tag.jsx'
import { usePlatform } from '../state/platform.jsx'

const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'danger']
const BUTTON_SIZES = ['sm', 'md', 'lg']
const TAG_TONES = ['neutral', 'brand', 'success', 'warning', 'danger', 'info']
const FIELD_SIZES = ['sm', 'md', 'lg']

function VariantGroup({ title, children }) {
  return (
    <section className="studio-card-variants" aria-label={title}>
      <h3 className="text-label">{title}</h3>
      <div className="layout-header__actions">{children}</div>
    </section>
  )
}

export function ComponentStudio() {
  const navigate = useNavigate()
  const { designSystem, workspace } = usePlatform()

  return (
    <>
      <PageHeader
        eyebrow="Component Studio"
        title="Studio"
        description={
          designSystem
            ? `Preview contracts from ${designSystem.name}.`
            : `Preview components on ${workspace.name} before agents retrieve them.`
        }
        actions={
          <Button variant="secondary" size="sm" onClick={() => navigate('/components')}>
            Open catalog
          </Button>
        }
      />
      <div className="layout-content">
        <section className="layout-grid layout-grid--gutter-sm" aria-label="Component variants">
          <article className="layout-col-12 surface-card">
            <h2 className="surface-card__title">Button</h2>
            <p className="surface-card__body">
              One primary path. Quieter variants for the rest.
            </p>
            <VariantGroup title="Variant">
              {BUTTON_VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} size="sm">
                  {variant === 'primary'
                    ? 'Save'
                    : variant === 'secondary'
                      ? 'Cancel'
                      : variant === 'tertiary'
                        ? 'Skip'
                        : 'Delete'}
                </Button>
              ))}
            </VariantGroup>
            <VariantGroup title="Size">
              {BUTTON_SIZES.map((size) => (
                <Button key={size} variant="primary" size={size}>
                  {size === 'sm' ? 'Save' : size === 'md' ? 'Continue' : 'Get started'}
                </Button>
              ))}
            </VariantGroup>
            <VariantGroup title="States">
              <Button variant="primary" size="sm" disabled>
                Unavailable
              </Button>
              <Button variant="primary" size="sm" loading>
                Saving
              </Button>
            </VariantGroup>
            <code>button.json</code>
          </article>
          <article className="layout-col-6 surface-card">
            <h2 className="surface-card__title">Input</h2>
            <p className="surface-card__body">Single-line text with a label and hint.</p>
            <VariantGroup title="Size">
              {FIELD_SIZES.map((size) => (
                <Input
                  key={size}
                  label={size}
                  size={size}
                  defaultValue="Save draft"
                  hint="Shown on the primary action."
                />
              ))}
            </VariantGroup>
            <VariantGroup title="States">
              <Input label="Default" defaultValue="Save draft" hint="Shown on the primary action." />
              <Input label="Error" defaultValue="Save draft" error="Enter a valid label." />
              <Input label="Disabled" defaultValue="Save draft" disabled />
            </VariantGroup>
            <code>input.json</code>
          </article>
          <article className="layout-col-6 surface-card">
            <h2 className="surface-card__title">Tag</h2>
            <p className="surface-card__body">Status and category. Not a primary action.</p>
            <VariantGroup title="Tone">
              {TAG_TONES.map((tone) => (
                <Tag key={tone} tone={tone} size="sm">
                  {tone}
                </Tag>
              ))}
            </VariantGroup>
            <VariantGroup title="Size">
              {FIELD_SIZES.map((size) => (
                <Tag key={size} tone="brand" size={size}>
                  {size}
                </Tag>
              ))}
            </VariantGroup>
            <code>tag.json</code>
          </article>
        </section>
      </div>
    </>
  )
}
