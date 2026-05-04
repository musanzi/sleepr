import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { DatabaseModule } from '@app/common';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Reservation])],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
