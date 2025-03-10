'use client'
import { NavLink } from '@mantine/core'
import { IconDashboard, IconPhoto, IconNews, IconSettings } from '@tabler/icons-react'

export function NavLinks() {
  return (
    <>
      <NavLink
        href="/dashboard"
        label="Dashboard"
        leftSection={<IconDashboard size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="/dashboard/artworks"
        label="Obras de Arte"
        leftSection={<IconPhoto size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="/dashboard/news"
        label="Noticias"
        leftSection={<IconNews size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="/dashboard/settings"
        label="Configuración"
        leftSection={<IconSettings size="1rem" stroke={1.5} />}
      />
    </>
  )
} 