import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

enum UserRole {
  MEMBER = 'MEMBER',
  MANAGER = 'MANAGER',
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: UserRole.MEMBER })
  role: UserRole;

  @Column({ nullable: true })
  emoji: string;

  @Column()
  comment: string;

  @Column({ nullable: true })
  detail_comment: string;

  @Column({ nullable: true })
  github_link: string;

  @Column({ nullable: true })
  instagram_link: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
