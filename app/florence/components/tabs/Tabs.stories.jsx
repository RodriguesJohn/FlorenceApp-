// Hand-written: compound component — the pieces only make sense assembled.
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs.jsx'

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['segmented', 'underline'] },
  },
  args: { defaultValue: 'overview' },
}

const panel = { padding: '1rem 0', color: 'var(--color-text-secondary)' }

const Template = (args) => (
  <Tabs {...args}>
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview"><div style={panel}>Revenue rose 12% quarter over quarter.</div></TabsContent>
    <TabsContent value="activity"><div style={panel}>14 events in the last 7 days.</div></TabsContent>
    <TabsContent value="settings"><div style={panel}>Workspace preferences and access.</div></TabsContent>
  </Tabs>
)

export const Playground = { render: Template }
export const Segmented = { render: Template, args: { variant: 'segmented' } }
export const Underline = { render: Template, args: { variant: 'underline' } }
