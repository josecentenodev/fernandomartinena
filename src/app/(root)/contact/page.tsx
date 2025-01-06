'use client'
import React from 'react'
import EmptyState from '../_components/emptyState'
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
  return (
    <EmptyState
        title="Página en construcción"
        description="Estamos trabajando en esta página, por favor vuelve en otra ocasión."
        action={() => router.push(`/`)}
        actionLabel="Volver a la página principal"
      />
  )
}

export default Page