import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tournament } from './entities/tournament.entity'; 
import { CreateTournamentDto } from './dto/create-tournament.dto'; 
import { UpdateTournamentDto } from './dto/update-tournament.dto'; 
import { Team } from '../teams/entities/team.entity'; 

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(Team) // Si necesitas acceder a los equipos, inyecta el repositorio de Team
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
  try {
    const newTournament = this.tournamentRepository.create();

    // Verificar y asociar equipos si se proporcionan
    if (createTournamentDto.teams) {
      const teams = await this.teamRepository.findBy({
        id: In(createTournamentDto.teams), // Usar In para buscar por múltiples IDs
      });
      newTournament.teams = teams; // Asignar los equipos encontrados
    }

    return await this.tournamentRepository.save(newTournament);
  } catch (error) {
    throw new InternalServerErrorException('Error creating tournament', error.message);
  }
}

async findAll(): Promise<Tournament[]> {
    try {
      return await this.tournamentRepository.find({ relations: ['teams'] }); // Carga equipos relacionados
    } catch (error) {
      throw new InternalServerErrorException('Error finding tournaments', error.message);
    }
  }

  async findOne(id: string): Promise<Tournament> {
    try {
      const tournament = await this.tournamentRepository.findOne({
        where: { id },
        relations: ['teams'], // Carga equipos relacionados
      });
      if (!tournament) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
      }
      return tournament;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding tournament', error.message);
    }
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    try {
        const tournament = await this.tournamentRepository.findOne({ where: { id } });
        if (!tournament) {
            throw new NotFoundException(`Tournament with ID ${id} not found`);
        }

        // Verificar y asociar equipos si se proporcionan
        if (updateTournamentDto.teams) {
            const teams = await this.teamRepository.findBy({
                id: In(updateTournamentDto.teams),
            });
            tournament.teams = teams; // Asignar los equipos encontrados
        }

        tournament.name = updateTournamentDto.name;
        tournament.startDate = updateTournamentDto.startDate;
        tournament.endDate = updateTournamentDto.endDate;
        tournament.status = updateTournamentDto.status;

        return await this.tournamentRepository.save(tournament);
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new InternalServerErrorException('Error updating tournament', error.message);
    }
}

async remove(id: string): Promise<void> {
    try {
      const tournament = await this.findOne(id);
      await this.tournamentRepository.remove(tournament);
    } catch (error) {
      throw new InternalServerErrorException('Error removing tournament', error.message);
    }
  }
}
