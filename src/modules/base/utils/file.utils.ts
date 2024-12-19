import fs from 'fs/promises'
import nanoid from 'nanoid'
import path from 'path'
import sharp from 'sharp'

export const ROOT_PATH = path.dirname(require.main.filename)
export const PUBLIC_PATH = path.join(ROOT_PATH, '..', 'uploads')

export const transformFile = async (file: Express.Multer.File) => {
    const info = path.parse(file.originalname)
    const filename = `${nanoid.nanoid(6)}-${info.name}${info.ext}`
    const filepath = path.join('uploads', filename)

    if (file.mimetype.includes('image')) {
        await sharp(file.buffer)
            .resize({ fit: sharp.fit.cover })
            .toFile(filepath)
    } else {
        await fs.writeFile(filepath, file.buffer)
    }

    return {
        name: filename,
        mimetype: file.mimetype,
        path: `${process.env.APP_URL}/${filepath}`,
        originalname: info.name,
        size: file.size,
    }
}
