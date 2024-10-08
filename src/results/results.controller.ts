import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  async create(@Body() createResultDto: CreateResultDto): Promise<Result> {
    try {
      return await this.resultsService.create(createResultDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating result', error.message);
    }
  }

  @Get()
  async findAll(): Promise<Result[]> {
    try {
      return await this.resultsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error finding results', error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
    try {
      return await this.resultsService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(`Error finding result with ID ${id}`, error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResultDto: UpdateResultDto,
  ): Promise<Result> {
    try {
      return await this.resultsService.update(id, updateResultDto);
    } catch (error) {
      throw new InternalServerErrorException(`Error updating result with ID ${id}`, error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.resultsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(`Error removing result with ID ${id}`, error.message);
    }
  }
}
