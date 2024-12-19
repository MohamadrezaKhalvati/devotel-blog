import { BaseEntity } from 'src/modules/base'
import { Column, Entity } from 'typeorm'

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'text' })
    content: string

    @Column({ nullable: true, type: 'varchar' })
    imageUrl?: string
}
