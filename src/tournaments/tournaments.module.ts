import { Global, Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { Tournament } from './entities/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Match } from 'src/matchs/entities/match.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Tournament,Team,Match])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
