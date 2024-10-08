import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    try {
      const newResult = this.resultRepository.create(createResultDto);
      return await this.resultRepository.save(newResult);
    } catch (error) {
      throw new InternalServerErrorException('Error creating result', error.message);
    }
  }

  async findAll(): Promise<Result[]> {
    try {
      return await this.resultRepository.find({ relations: ['match', 'winner', 'loser'] });
    } catch (error) {
      throw new InternalServerErrorException('Error finding results', error.message);
    }
  }

  async findOne(id: string): Promise<Result> {
    try {
      const result = await this.resultRepository.findOne({ where: { id }, relations: ['match', 'winner', 'loser'] });
      if (!result) {
        throw new NotFoundException(`Result with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding result', error.message);
    }
  }

  async update(id: string, updateResultDto: UpdateResultDto): Promise<Result> {
    try {
      const result = await this.resultRepository.preload({ id, ...updateResultDto });
      if (!result) {
        throw new NotFoundException(`Result with ID ${id} not found`);
      }
      return await this.resultRepository.save(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating result', error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.findOne(id);
      await this.resultRepository.remove(result);
    } catch (error) {
      throw new InternalServerErrorException('Error removing result', error.message);
    }
  }
}
