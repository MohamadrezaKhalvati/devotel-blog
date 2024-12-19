import { BaseEntity } from 'src/modules/base'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'text' })
    content: string

    @Column({ nullable: true, type: 'varchar' })
    imageUrl?: string

    @ManyToOne('User', 'blogs')
    user: User
}
