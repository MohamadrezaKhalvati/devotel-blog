export type FileType = {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
}
export type ProductFileType = {
    image: FileType[]
    logo: FileType[]
}
