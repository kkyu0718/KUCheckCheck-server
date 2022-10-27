import { attendance } from './../attendance/attendance.entity';
import { member } from 'src/auth/member.entity';
import { semester } from 'src/semester/semester.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class course extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '코스 ID' })
  id: number;

  @ManyToOne(() => member, (memberId) => memberId.courses, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'memberId' })
  memberId: member['id'];

  @ManyToOne(() => semester, (semester) => semester, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'semesterId' })
  semesterId: semester['id'];

  @Column({ type: 'int', comment: '활동 타입' })
  type: number;

  @Column({ type: 'varchar', length: 50, comment: '난이도' })
  difficulty: string;

  @Column({ type: 'int', comment: '투자 시간' })
  requireTime: number;

  @Column({ type: 'varchar', length: 50, comment: '활동 제목' })
  title: string;

  @Column({
    type: 'varchar',
    length: 254,
    comment: '활동 소개',
    nullable: true,
  })
  introduction: string;

  @Column({
    type: 'varchar',
    length: 254,
    comment: '활동 목표',
    nullable: true,
  })
  goal: string;

  @Column({ type: 'varchar', length: 80, comment: '진행 요일', nullable: true })
  progressDate: string;

  @Column({ type: 'int', comment: '최대 인원', nullable: true })
  maxNumber: number;

  @Column({
    type: 'varchar',
    length: 254,
    comment: '진행 장소 및 방법',
    nullable: true,
  })
  place: string;

  @Column({ type: 'varchar', length: 254, comment: '유의사항', nullable: true })
  notice: string;

  @Column({ type: 'json', comment: '주요기술 스택', nullable: true })
  language: object;

  @Column({ type: 'json', comment: '세부기술 스택', nullable: true })
  detailStack: object;

  @Column({ type: 'json', comment: '커리큘럼', nullable: true })
  curriculum: object;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '수정일',
  })
  updatedAt: Date;

  @OneToMany(() => attendance, (attendance) => attendance.courseId, {
    eager: false,
  })
  @JoinColumn()
  attendance: attendance[];
}
