import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

enum UserRole {
    MEMBER = 'MEMBER',
    MANAGER = 'MANAGER'
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({default: UserRole.MEMBER})
    role: UserRole; 

    @Column()
    emoji: string;

    @Column()
    comment: string;

    @Column()
    detail_comment: string;

    @Column()
    github_link: string;

    @Column()
    instagram_link: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;
}