import { Global, Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../teams/entities/team.entity';
import { Match } from '../matchs/entities/match.entity';
import { TeamsModule } from 'src/teams/teams.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Result,Team,Match])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
