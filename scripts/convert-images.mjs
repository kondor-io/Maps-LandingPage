import sharp from 'sharp'
import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')

const images = [
  { input: 'lucas.jpeg',  output: 'lucas.webp' },
  { input: 'joaco.jfif',  output: 'joaco.webp' },
  { input: 'nicolas.png', output: 'nicolas.webp' },
  { input: 'santi.jfif',  output: 'santi.webp' },
  { input: 'kondor.png',  output: 'kondor.webp' },
  { input: 'portfolio/maps.png',      output: 'portfolio/maps.webp' },
  { input: 'portfolio/IconoLF.png',   output: 'portfolio/IconoLF.webp' },
  { input: 'portfolio/forever.png',   output: 'portfolio/forever.webp' },
]

for (const { input, output } of images) {
  const inputPath  = resolve(publicDir, input)
  const outputPath = resolve(publicDir, output)

  if (!existsSync(inputPath)) {
    console.warn(`⚠  Skipping (not found): ${input}`)
    continue
  }

  await sharp(inputPath)
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath)

  console.log(`✅  ${input} → ${output}`)
}

console.log('\nDone — WebP conversion complete.')
