export function cropImageToSquare(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      if (!e.target?.result) return reject('Failed to read file')

      img.onload = () => {
        const side = Math.min(img.width, img.height)
        const canvas = document.createElement('canvas')
        canvas.width = side
        canvas.height = side

        const ctx = canvas.getContext('2d')
        if (!ctx) return reject('Canvas not supported')

        const dx = (img.width - side) / 2
        const dy = (img.height - side) / 2

        ctx.drawImage(img, dx, dy, side, side, 0, 0, side, side)

        canvas.toBlob((blob) => {
          if (!blob) return reject('Could not convert to blob')
          const croppedFile = new File([blob], file.name, { type: file.type })
          resolve(croppedFile)
        }, file.type)
      }

      img.onerror = reject
      img.src = e.target.result as string
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
