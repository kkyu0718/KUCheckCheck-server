import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class course extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' }) // FK
  member_id: number;

  @Column({ type: 'int' }) // FK
  semester_id: number;

  @Column({ type: 'int' })
  type: number;

  @Column({ type: 'varchar', length: 50 })
  difficulty: string;

  @Column({ type: 'int' })
  require_time: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 254 })
  introdcution: string;

  @Column({ type: 'varchar', length: 254 })
  goal: string;

  @Column({ type: 'varchar', length: 80 })
  progress_date: string;

  @Column({ type: 'int' })
  max_number: number;

  @Column({ type: 'varchar', length: 254 })
  place: string;

  @Column({ type: 'varchar', length: 254 })
  notice: string;

  @Column({ type: 'json' })
  language: string | object;

  @Column({ type: 'json' })
  detail_stack: object;

  @Column({ type: 'json' })
  curriculum: object;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
