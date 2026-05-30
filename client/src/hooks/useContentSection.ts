import { useMemo } from 'react'
import { trpc } from '@/lib/trpc'

export function useContentSection(sectionKey: string) {
  const { data: section, isLoading, error } = trpc.content.getSection.useQuery({ sectionKey })

  const content = useMemo(() => {
    if (!section) {
      return {
        title: '',
        subtitle: '',
        description: '',
        content: '',
        cta: '',
        ctaLink: '',
        imageUrl: '',
        metadata: null,
      }
    }

    return {
      title: section.sectionName || '',
      subtitle: section.subtitle || '',
      description: section.description || '',
      content: section.content || '',
      cta: section.cta || '',
      ctaLink: section.ctaLink || '',
      imageUrl: section.imageUrl || '',
      metadata: section.metadata ? JSON.parse(section.metadata) : null,
    }
  }, [section])

  return {
    ...content,
    isLoading,
    error,
    section,
  }
}
