const imageModules = import.meta.glob<{ default: string }>('../assets/*.png', { eager: true })

const imagesByFilename = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [path.split('/').pop(), mod.default]),
)

const shoeImageFilenames: Record<string, string> = {
  cloud: 'Cloud.png',
  cloudx: 'Cloud X.png',
  cloudflow: 'Cloudflow.png',
  cloudventure: 'Cloudventure.png',
  cloudsurfer: 'Cloudsurfer.png',
  cloudventure_waterproof: 'Cloudventure Waterproof.png',
  cloudventure_peak: 'Cloudventure Peak.png',
  cloudflyer: 'Cloudflyer.png',
}

export function getShoeImage(shoeId: string): string {
  const filename = shoeImageFilenames[shoeId]
  return (filename && imagesByFilename[filename]) || ''
}
