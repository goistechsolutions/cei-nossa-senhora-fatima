import sharp from 'sharp'

export interface CompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number // 1-100
  format?: 'jpeg' | 'png' | 'webp'
}

/**
 * Comprime uma imagem em base64 para reduzir tamanho de arquivo
 * Mantém proporção e qualidade visual
 */
export async function compressImage(
  base64Data: string,
  options: CompressionOptions = {}
): Promise<{ compressed: Buffer; width: number; height: number; format: string }> {
  const {
    maxWidth = 2000,
    maxHeight = 2000,
    quality = 85,
    format = 'webp',
  } = options

  try {
    // Converter base64 para buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // Detectar dimensões originais
    const metadata = await sharp(buffer).metadata()
    const originalWidth = metadata.width || maxWidth
    const originalHeight = metadata.height || maxHeight

    // Calcular novas dimensões mantendo proporção
    let newWidth = originalWidth
    let newHeight = originalHeight

    if (originalWidth > maxWidth) {
      newWidth = maxWidth
      newHeight = Math.round((originalHeight * maxWidth) / originalWidth)
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight
      newWidth = Math.round((originalWidth * maxHeight) / originalHeight)
    }

    // Comprimir imagem
    let pipeline = sharp(buffer)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })

    // Aplicar formato e qualidade
    if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality, progressive: true })
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality })
    } else {
      pipeline = pipeline.webp({ quality })
    }

    const compressed = await pipeline.toBuffer()

    return {
      compressed,
      width: newWidth,
      height: newHeight,
      format,
    }
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error)
    throw new Error('Falha ao comprimir imagem')
  }
}

/**
 * Gera múltiplas versões de uma imagem (thumbnails)
 */
export async function generateThumbnails(
  base64Data: string,
  sizes: { width: number; height: number; name: string }[] = []
): Promise<{ [key: string]: Buffer }> {
  const buffer = Buffer.from(base64Data, 'base64')
  const thumbnails: { [key: string]: Buffer } = {}

  const defaultSizes = [
    { width: 300, height: 300, name: 'small' },
    { width: 800, height: 600, name: 'medium' },
    { width: 1200, height: 900, name: 'large' },
  ]

  const sizesToGenerate = sizes.length > 0 ? sizes : defaultSizes

  try {
    for (const size of sizesToGenerate) {
      const thumbnail = await sharp(buffer)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 85 })
        .toBuffer()

      thumbnails[size.name] = thumbnail
    }

    return thumbnails
  } catch (error) {
    console.error('Erro ao gerar thumbnails:', error)
    throw new Error('Falha ao gerar thumbnails')
  }
}

/**
 * Calcula redução de tamanho após compressão
 */
export function calculateCompressionRatio(
  originalSize: number,
  compressedSize: number
): number {
  return Math.round(((originalSize - compressedSize) / originalSize) * 100)
}
