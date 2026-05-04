import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Reservation extends AbstractEntity {
  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;
}
