import { course } from './../course/course.entity';
import { member } from 'src/auth/member.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['semesterYear', 'semester'])
export class semester extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30, comment: '학기 연도' }) // FK
  semesterYear: string;

  @Column({ type: 'varchar', length: 5, comment: '학기' }) // FK
  semester: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '세션 등록 시작일',
  })
  registerStart: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '세션 등록 종료일',
  })
  registerEnd: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '수강 신청 시작일',
  })
  enrollmentStart: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '수강 신청 종료일',
  })
  enrollmentEnd: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '활동 시작일',
  })
  activeStart: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '활동 종료일',
  })
  activeEnd: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  createdAt: Date;

  @ManyToOne(() => member, (createdBy) => createdBy.semesters, {
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

  @OneToMany(() => course, (course) => course.semesterId, {
    eager: false,
  })
  courses: course[];
}
