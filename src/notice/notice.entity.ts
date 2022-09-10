import { MEMBER } from 'src/auth/member.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class NOTICE extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bit', length: 1 })
  is_show: number;

  @Column({ type: 'varchar', length: 254 })
  title: string;

  @Column({ type: 'varchar', length: 254 })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ type: 'int' })
  created_by: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne((type) => MEMBER, (updated_by) => updated_by.notices, {
    eager: false,
  })
  updated_by: MEMBER;
}
