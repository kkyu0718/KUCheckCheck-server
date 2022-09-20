import { member } from 'src/auth/member.entity';
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
export class notice extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bit', length: 1, default: 0 })
  is_show: number;

  @Column({ type: 'varchar', length: 254 })
  title: string;

  @Column({ type: 'varchar', length: 254, nullable: true })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne((type) => member, (created_by) => created_by.notices, {
    eager: false,
  })
  created_by: member['id'];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne((type) => member, (updated_by) => updated_by.notices, {
    eager: false,
  })
  updated_by: member['id'];
}
