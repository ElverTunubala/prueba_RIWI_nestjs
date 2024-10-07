import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity'; 
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { RolePlayers } from './players.role'; 

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    try {
      // Validar que el rol está en el enum RolePlayers
      if (!Object.values(RolePlayers).includes(createPlayerDto.role)) {
        throw new NotFoundException('Role not found');
      }

      const newPlayer = this.playerRepository.create(createPlayerDto);
      return await this.playerRepository.save(newPlayer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating player', error.message);
    }
  }

  async findAll(): Promise<Player[]> {
    try {
      return await this.playerRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding players', error.message);
    }
  }

  async findOne(id: string): Promise<Player> {
    try {
      const player = await this.playerRepository.findOne({ where: { id } });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }
      return player;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding player', error.message);
    }
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    try {
      const player = await this.playerRepository.preload({ id, ...updatePlayerDto });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found`);
      }

      // Validar el rol si se está actualizando
      if (updatePlayerDto.role && !Object.values(RolePlayers).includes(updatePlayerDto.role)) {
        throw new NotFoundException('Role not found');
      }

      return await this.playerRepository.save(player);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating player', error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const player = await this.findOne(id);
      await this.playerRepository.remove(player);
    } catch (error) {
      throw new InternalServerErrorException('Error removing player', error.message);
    }
  }
}
