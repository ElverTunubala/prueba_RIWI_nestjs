import { Global, Module } from '@nestjs/common';
import { MatchesService } from './matchs.service';
import { MatchesController } from './matchs.controller';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from 'src/results/entities/result.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Match,Result,Team,Tournament])],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchsModule {}
