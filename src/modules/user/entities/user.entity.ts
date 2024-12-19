import { BaseEntity } from 'src/modules/base'
import { Blog } from 'src/modules/post/entities/blog.entity'
import { Column, OneToMany } from 'typeorm'
import { UserRolesEnum } from '../enums/user-roles.enum'

export class User extends BaseEntity {
    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: UserRolesEnum,
        default: UserRolesEnum.USER,
    })
    role: UserRolesEnum

    @OneToMany('Blog', 'user')
    blogs: Blog[]
}
