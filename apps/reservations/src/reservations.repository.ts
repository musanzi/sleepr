import { AbstractRepository } from '@app/common';
import { Reservation } from './entities/reservation.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectRepository(Reservation)
    reservationEntity: Repository<Reservation>
  ) {
    super(reservationEntity);
  }
}
