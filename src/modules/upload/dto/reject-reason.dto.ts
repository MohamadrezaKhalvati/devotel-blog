import { IsNotEmpty, IsString } from 'class-validator'

export class RejectReasonDto {
    @IsNotEmpty()
    @IsString()
    reject_reason: string
}
