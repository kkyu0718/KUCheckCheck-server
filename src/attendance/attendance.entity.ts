import { member } from 'src/auth/member.entity';
import { course } from 'src/course/course.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['memberId', 'courseId'])
export class attendance extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => member, (memberId) => memberId.attendance, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'memberId' })
  memberId: member['id'];

  @ManyToOne(() => course, (courseId) => courseId.attendance, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'courseId' })
  courseId: course['id'];

  @Column({ type: 'boolean', width:1,  default: false, comment: '출석 담당자' })
  isMaster: boolean;

  @Column({ type: 'json', default: null, comment: '출석 체크 리스트' })
  attendance: object;

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
}
