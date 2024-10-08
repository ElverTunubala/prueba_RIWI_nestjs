import { Global, Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
