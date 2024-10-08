import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('tournaments')
@Controller('tournaments') 
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post() 
  async create(@Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get() 
  async findAll(): Promise<Tournament[]> {
    return this.tournamentsService.findAll();
  }

  @Get(':id') 
  async findOne(@Param('id') id: string): Promise<Tournament> {
    return this.tournamentsService.findOne(id);
  }

  @Patch(':id') 
  async update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    return this.tournamentsService.update(id, updateTournamentDto);
  }

  @Delete(':id') 
  async remove(@Param('id') id: string): Promise<void> {
    return this.tournamentsService.remove(id);
  }
}
