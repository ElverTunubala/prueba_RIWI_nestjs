import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Team } from '../teams/entities/team.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { Result } from 'src/results/entities/result.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    try {
      // Verificar que los equipos existen
      const [teamA, teamB] = await this.teamRepository.findBy({
        id: In([createMatchDto.teamAId, createMatchDto.teamBId]),
      });
      if (!teamA || !teamB) {
        throw new NotFoundException('One or both teams not found');
      }

      // Verificar que el torneo existe
      const tournament = await this.tournamentRepository.findOne({
        where: { id: createMatchDto.tournamentId },
      });
      if (!tournament) {
        throw new NotFoundException('Tournament not found');
      }

      // Crear el nuevo partido y asignar propiedades
      const newMatch = this.matchRepository.create({
        name: createMatchDto.name,
        date: createMatchDto.date,
        scoreTeamA: createMatchDto.scoreTeamA,
        scoreTeamB: createMatchDto.scoreTeamB,
        teamA,
        teamB,
        tournament,
      });
      const savedMatch = await this.matchRepository.save(newMatch);
      
      // Crear el resultado automáticamente basado en el puntaje
      await this.createResultFromMatch(savedMatch);

      return savedMatch;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating match', error.message);
    }
  }
  async createResultFromMatch(match: Match): Promise<void> {
    try {
      // Determinar el equipo ganador y perdedor basándose en el puntaje
      const winner = match.scoreTeamA > match.scoreTeamB ? match.teamA : match.teamB;
      const loser = match.scoreTeamA > match.scoreTeamB ? match.teamB : match.teamA;

      // Crear el resultado
      const newResult = this.resultRepository.create({
        matchName: match.name,
        match: match,
        winner: winner,
        loser: loser,
        scoreWinner: match.scoreTeamA > match.scoreTeamB ? match.scoreTeamA : match.scoreTeamB,
        scoreLoser: match.scoreTeamA > match.scoreTeamB ? match.scoreTeamB : match.scoreTeamA,
        pointsDifference: Math.abs(match.scoreTeamA - match.scoreTeamB),
      });

      
      await this.resultRepository.save(newResult);
    } catch (error) {
      throw new InternalServerErrorException('Error creating result from match', error.message);
    }
  }

  async findAll(): Promise<Match[]> {
    try {
      return await this.matchRepository.find({
        relations: ['teamA', 'teamB', 'tournament'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error finding matches', error.message);
    }
  }

  async findOne(id: string): Promise<Match> {
    try {
      const match = await this.matchRepository.findOne({
        where: { id },
        relations: ['teamA', 'teamB', 'tournament'],
      });
      if (!match) {
        throw new NotFoundException(`Match with ID ${id} not found`);
      }
      return match;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding match', error.message);
    }
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    try {
      const match = await this.matchRepository.findOne({ where: { id } });
      if (!match) {
        throw new NotFoundException(`Match with ID ${id} not found`);
      }

      // Actualizar equipos si se proporciona
      if (updateMatchDto.teamAId || updateMatchDto.teamBId) {
        const [teamA, teamB] = await this.teamRepository.findBy({
          id: In([updateMatchDto.teamAId, updateMatchDto.teamBId]),
        });
        if (!teamA || !teamB) {
          throw new NotFoundException('One or both teams not found');
        }
        match.teamA = teamA;
        match.teamB = teamB;
      }

      // Actualizar torneo si se proporciona
      if (updateMatchDto.tournamentId) {
        const tournament = await this.tournamentRepository.findOne({
          where: { id: updateMatchDto.tournamentId },
        });
        if (!tournament) {
          throw new NotFoundException('Tournament not found');
        }
        match.tournament = tournament;
      }

      // Actualizar las demás propiedades
      match.name = updateMatchDto.name ?? match.name;
      match.date = updateMatchDto.date ?? match.date;
      match.scoreTeamA = updateMatchDto.scoreTeamA ?? match.scoreTeamA;
      match.scoreTeamB = updateMatchDto.scoreTeamB ?? match.scoreTeamB;

      return await this.matchRepository.save(match);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating match', error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const match = await this.findOne(id);
      await this.matchRepository.remove(match);
    } catch (error) {
      throw new InternalServerErrorException('Error removing match', error.message);
    }
  }
}
