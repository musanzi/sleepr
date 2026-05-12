import { AbstractEntity } from '@app/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Reservation extends AbstractEntity {
  @Column({ type: 'datetime' })
  startDate!: Date;

  @Column({ type: 'datetime' })
  endDate!: Date;

  @Column({ type: 'varchar' })
  userId!: string;
}
