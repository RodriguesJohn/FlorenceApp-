// Hand-written: compound component — 7 exports composed into a real nav.
import {
  Sidebar, SidebarHeader, SidebarNav, SidebarSection,
  SidebarItem, SidebarSubmenu, SidebarFooter,
} from './Sidebar.jsx'

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export const Playground = {
  render: () => (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Sidebar aria-label="Workspace">
        <SidebarHeader>Florence</SidebarHeader>
        <SidebarNav>
          <SidebarSection label="Workspace">
            <SidebarItem active>Overview</SidebarItem>
            <SidebarItem>Reports</SidebarItem>
            <SidebarItem>Activity</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Library">
            <SidebarItem>Components</SidebarItem>
            <SidebarSubmenu label="Foundations">
              <SidebarItem>Colors</SidebarItem>
              <SidebarItem>Typography</SidebarItem>
              <SidebarItem>Spacing</SidebarItem>
            </SidebarSubmenu>
          </SidebarSection>
        </SidebarNav>
        <SidebarFooter>Signed in as John</SidebarFooter>
      </Sidebar>
    </div>
  ),
}
