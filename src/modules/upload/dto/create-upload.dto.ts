import { IsOptional, IsString } from 'class-validator'

export class CreateUploadDto {
    @IsString()
    @IsOptional()
    image_alt?: string
}
