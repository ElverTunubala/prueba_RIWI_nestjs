import { Global, Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Player,Team])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
