import { member } from 'src/auth/member.entity';
import { semester } from 'src/semester/semester.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['semester_id'])
export class week extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '학기 ID' })
  id: number;

  @ManyToOne(() => semester, (semester) => semester, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'semester_id' })
  semester_id: semester['id'];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_1: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_2: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_3: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_4: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  midterm: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_5: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_6: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_7: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week_8: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  created_at: Date;

  @ManyToOne(() => member, (created_by) => created_by.week, {
    eager: true,
  })
  @JoinColumn({ name: 'created_by' })
  created_by: member['id'];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '수정일',
  })
  updated_at: Date;

  @ManyToOne(() => member, (updated_by) => updated_by.week, {
    eager: true,
  })
  @JoinColumn({ name: 'updated_by' })
  updated_by: member['id'];
}
