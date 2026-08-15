# Sidebar

A composable app-navigation surface with a fixed header and footer, a scrollable
navigation area, grouped links, active states, disabled states, icons, and
badges.

```jsx
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
  SidebarSubmenu,
} from './Sidebar.jsx'

<Sidebar aria-label="Workspace">
  <SidebarHeader>Acme</SidebarHeader>
  <SidebarNav>
    <SidebarSection label="Workspace">
      <SidebarItem active icon={<Home />}>
        Home
      </SidebarItem>
      <SidebarItem badge="8" icon={<Inbox />}>
        Inbox
      </SidebarItem>
      <SidebarItem
        disclosure={<ChevronRight />}
        icon={<Folder />}
        badge="3"
      >
        Projects
      </SidebarItem>
      <SidebarSubmenu>
        <SidebarItem active icon={<File />}>
          Product brief
        </SidebarItem>
      </SidebarSubmenu>
    </SidebarSection>
  </SidebarNav>
  <SidebarFooter>
    <SidebarItem icon={<Settings />}>Settings</SidebarItem>
  </SidebarFooter>
</Sidebar>
```

Use `href` to render a navigation item as a link. Without `href`,
`SidebarItem` renders a button and forwards `onClick`.
