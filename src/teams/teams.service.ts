import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Player } from '../players/entities/player.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
        const newTeam = this.teamRepository.create({
            name: createTeamDto.name,
            manager: createTeamDto.manager, 
        });

        // Verificar y asociar jugadores si se proporcionan
        if (createTeamDto.players) {
            const players = await this.playerRepository.findBy({
                id: In(createTeamDto.players), // Usar In para buscar por múltiples IDs
            });
            newTeam.players = players; // Asignar los jugadores encontrados
        }

        // Verificar y asociar torneos 
        if (createTeamDto.tournaments) {
            const tournaments = await this.tournamentRepository.findBy({
                id: In(createTeamDto.tournaments), 
            });
            newTeam.tournaments = tournaments; // Asignar los torneos encontrados
        }

        
        return await this.teamRepository.save(newTeam);
    } catch (error) {
        throw new InternalServerErrorException('Error creating team', error.message);
    }
}
  async findAll(): Promise<Team[]> {
    try {
      return await this.teamRepository.find({ relations: ['players', 'tournaments'] });
    } catch (error) {
      throw new InternalServerErrorException('Error finding teams', error.message);
    }
  }

  async findOne(id: string): Promise<Team> {
    try {
      const team = await this.teamRepository.findOne({ where: { id }, relations: ['players', 'tournaments'] });
      if (!team) {
        throw new NotFoundException(`Team with ID ${id} not found`);
      }
      return team;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding team', error.message);
    }
  }

  async update(id: string, updateTeamDto: CreateTeamDto): Promise<Team> {
    try {
        // Preload el equipo existente sin jugadores ni torneos
        const { players, tournaments, ...teamData } = updateTeamDto; // Extraer jugadores y torneos
        const team = await this.teamRepository.preload({ id, ...teamData });

        if (!team) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }

        // Verificar y asociar jugadores
        if (players) {
            const foundPlayers = await this.playerRepository.findBy({
                id: In(players), 
            });
            team.players = foundPlayers; // Asignar los jugadores encontrados
        }

        // Verificar y asociar torneos
        if (tournaments) {
            const foundTournaments = await this.tournamentRepository.findBy({
                id: In(tournaments), 
            });
            team.tournaments = foundTournaments; // Asignar los torneos encontrados
        }

        return await this.teamRepository.save(team); 
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new InternalServerErrorException('Error updating team', error.message);
    }
}

async remove(id: string): Promise<void> {
    try {
      const team = await this.findOne(id);
      await this.teamRepository.remove(team);
    } catch (error) {
      throw new InternalServerErrorException('Error removing team', error.message);
    }
  }
}
