import { Global, Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { Tournament } from './entities/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
