import { DirEnum } from '../enums/dir.enum'

export interface CreateImageInterface extends Express.Multer.File {
    thumbnail_path: string
    title: string
    rental_car_id?: number
    user_id?: number
    fieldname: DirEnum
}
