import { notice } from 'src/notice/notice.entity';
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
import { UserRole } from './dto/auth-credential.dto';

@Entity()
@Unique(['email'])
export class member extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 254 })
  password: string;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'varchar', length: 50, default: UserRole.MEMBER })
  role: UserRole;

  @Column({ type: 'varchar', length: 10, nullable: true })
  emoji: string;

  @Column({ type: 'varchar', length: 254 })
  comment: string;

  @Column({ type: 'varchar', length: 254, nullable: true })
  detail_comment: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  github_id: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  instagram_id: string;

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

  @OneToMany((type) => notice, (notices) => notices.updated_by, {
    eager: false,
  })
  notices: notice[];
}
