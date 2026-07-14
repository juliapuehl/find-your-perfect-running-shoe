const imageModules = import.meta.glob<{ default: string }>('../assets/*.webp', { eager: true })

const imagesByFilename = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [path.split('/').pop(), mod.default]),
)

const shoeImageFilenames: Record<string, string> = {
  cloud: 'Cloud.webp',
  cloudx: 'Cloud X.webp',
  cloudflow: 'Cloudflow.webp',
  cloudventure: 'Cloudventure.webp',
  cloudsurfer: 'Cloudsurfer.webp',
  cloudventure_waterproof: 'Cloudventure Waterproof.webp',
  cloudventure_peak: 'Cloudventure Peak.webp',
  cloudflyer: 'Cloudflyer.webp',
}

export function getShoeImage(shoeId: string): string {
  const filename = shoeImageFilenames[shoeId]
  return (filename && imagesByFilename[filename]) || ''
}
