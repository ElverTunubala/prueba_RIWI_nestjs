import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { plainToInstance } from 'class-transformer';
import { Player } from './entities/player.entity';

@Controller('players')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Roles('admin', 'user') // Permite acceso a 'admin' y 'user' para ver todos los jugadores
  @Get()
  async findAll() {
    const players = await this.playersService.findAll();
    return plainToInstance(Player, players); // Se utiliza la serialización para mantener la estructura
  }

  @Roles('admin', 'user')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Roles('admin') // Solo 'admin' puede actualizar la información de los jugadores
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Roles('admin') 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
