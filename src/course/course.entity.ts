import { member } from 'src/auth/member.entity';
import { semester } from 'src/semester/semester.entity';
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
export class course extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '코스 ID' })
  id: number;

  @ManyToOne(() => member, (member_id) => member_id.courses, {
    eager: false,
  }) // FK
  @JoinColumn({ name: 'member_id' })
  member_id: member['id'];

  @ManyToOne(() => semester, (semester) => semester, {
    eager: false,
  }) // FK
  @JoinColumn({ name: 'semester_id' })
  semester_id: semester['id'];

  @Column({ type: 'int', comment: '활동 타입' })
  type: number;

  @Column({ type: 'varchar', length: 50, comment: '난이도' })
  difficulty: string;

  @Column({ type: 'int', comment: '투자 시간' })
  require_time: number;

  @Column({ type: 'varchar', length: 50, comment: '활동 제목' })
  title: string;

  @Column({
    type: 'varchar',
    length: 254,
    comment: '활동 소개',
    nullable: true,
  })
  introdcution: string;

  @Column({
    type: 'varchar',
    length: 254,
    comment: '활동 목표',
    nullable: true,
  })
  goal: string;

  @Column({ type: 'varchar', length: 80, comment: '진행 요일', nullable: true })
  progress_date: string;

  @Column({ type: 'int', comment: '최대 인원', nullable: true })
  max_number: number;

  @Column({
    type: 'varchar',
    length: 254,
    comment: '진행 장소 및 방법',
    nullable: true,
  })
  place: string;

  @Column({ type: 'varchar', length: 254, comment: '유의사항', nullable: true })
  notice: string;

  @Column({ type: 'json', comment: '주요기술 스택' })
  language: string | object;

  @Column({ type: 'json', comment: '세부기술 스택', nullable: true })
  detail_stack: object;

  @Column({ type: 'json', comment: '커리큘럼', nullable: true })
  curriculum: object;

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
