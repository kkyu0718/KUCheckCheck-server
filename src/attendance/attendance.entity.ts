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
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class attendance extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => member, (member_id) => member_id.attendance, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'member_id' })
  member_id: member['id'];

  @ManyToOne(() => course, (course) => course, {
    eager: true,
  }) // FK
  @JoinColumn({ name: 'course_id' })
  course_id: course['id'];

  @Column({ type: 'bit', default: 0, comment: '출석 담당자' })
  is_master: number;

  @Column({ type: 'json', default: null, comment: '출석 체크 리스트' })
  attendance: object;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '수정일',
  })
  updated_at: Date;
}
