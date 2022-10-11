import { member } from 'src/auth/member.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class notice extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bit', default: true, comment: '노출여부' })
  isShow: number;

  @Column({ type: 'varchar', length: 254, comment: '제목' })
  title: string;

  @Column({ type: 'varchar', length: 254, nullable: true, comment: '내용' })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToOne((type) => member, (createdBy) => createdBy.notices, {
    eager: true,
  })
  @JoinColumn({ name: 'createdBy' })
  createdBy: member['id'];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => member, (updatedBy) => updatedBy.notices, {
    eager: true,
  })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: member['id'];
}
