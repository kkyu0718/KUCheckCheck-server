import { attendance } from 'src/attendance/attendance.entity';
import { course } from 'src/course/course.entity';
import { notice } from 'src/notice/notice.entity';
import { semester } from 'src/semester/semester.entity';
import { week } from 'src/week/week.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './role/user.role';

@Entity()
@Unique(['email'])
export class member extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 254 })
  password: string;

  @Column({ type: 'varchar', length: 80, comment: '유저명' })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: UserRole.MEMBER,
    comment: '유저 타입',
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 10, nullable: true, comment: '이모지' })
  emoji: string;

  @Column({ type: 'varchar', length: 254, comment: '한줄 소개글' })
  comment: string;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: true,
    comment: '정식 소개글',
  })
  detailComment: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
    comment: '깃허브 계정',
  })
  githubId: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
    comment: '인스타그램 계정',
  })
  instagramId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => notice, (notice) => notice, {
    eager: false,
  })
  @JoinColumn()
  notices: notice[];

  @OneToMany(() => semester, (semester) => semester, {
    eager: false,
  })
  @JoinColumn()
  semesters: semester[];

  @OneToMany(() => course, (course) => course, {
    eager: false,
  })
  @JoinColumn()
  courses: course[];

  @OneToMany(() => attendance, (attendance) => attendance, {
    eager: false,
  })
  @JoinColumn()
  attendance: attendance[];

  @OneToMany(() => week, (week) => week, {
    eager: false,
  })
  @JoinColumn()
  week: week[];
}
