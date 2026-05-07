import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}

  create(dto: CreateReservationDto): Promise<Reservation> {
    return this.reservationRepository.create(dto);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }

  findOne(id: string) {
    return this.reservationRepository.findOne(id);
  }

  update(id: string, dto: UpdateReservationDto) {
    return this.reservationRepository.update(id, dto);
  }

  remove(id: string) {
    return this.reservationRepository.delete(id);
  }
}
