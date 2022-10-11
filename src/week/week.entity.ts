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
@Unique(['semesterId'])
export class week extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '학기 ID' })
  id: number;

  @ManyToOne(() => semester, (semester) => semester, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'semesterId' })
  semesterId: semester['id'];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week1: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week2: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week3: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week4: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '중간고사',
  })
  midterm: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week5: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week6: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week7: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  week8: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  createdAt: Date;

  @ManyToOne(() => member, (createdBy) => createdBy.week, {
    eager: true,
  })
  @JoinColumn({ name: 'createdBy' })
  createdBy: member['id'];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '수정일',
  })
  updatedAt: Date;

  @ManyToOne(() => member, (updatedBy) => updatedBy.week, {
    eager: true,
  })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: member['id'];
}
