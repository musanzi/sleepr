import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Reservation extends AbstractEntity {
  @Column({ type: 'datetime' })
  startDate!: Date;

  @Column({ type: 'datetime' })
  endDate!: Date;
}
