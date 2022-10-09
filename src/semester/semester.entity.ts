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
@Unique(['semester_year', 'semester'])
export class semester extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 }) // FK
  semester_year: string;

  @Column({ type: 'varchar', length: 5 }) // FK
  semester: string;

  @Column({
    type: 'timestamp',
  })
  register_start: string;

  @Column({
    type: 'timestamp',
  })
  register_end: Date;

  @Column({
    type: 'timestamp',
  })
  enrollment_start: Date;

  @Column({
    type: 'timestamp',
  })
  enrollment_end: Date;

  @Column({
    type: 'timestamp',
  })
  active_start: Date;

  @Column({
    type: 'timestamp',
  })
  active_end: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne(() => member, (created_by) => created_by.semesters, {
    eager: true,
  })
  @JoinColumn({ name: 'created_by' })
  created_by: member['id'];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => member, (updated_by) => updated_by.notices, {
    eager: true,
  })
  @JoinColumn({ name: 'updated_by' })
  updated_by: member['id'];

  @OneToMany(() => course, (course) => course.semester_id, {
    eager: false,
  })
  courses: course[];
}
