import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Payload Website Template',
  title: 'Payload Website Template',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: 'https://www.mzinga.io/Site_Logo.png',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
