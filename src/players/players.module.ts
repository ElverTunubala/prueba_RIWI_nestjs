import { Global, Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

@Global()
@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
