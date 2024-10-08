import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MatchesService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    try {
      return await this.matchesService.create(createMatchDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating match', error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.matchesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error finding matches', error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const match = await this.matchesService.findOne(id);
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    try {
      const updatedMatch = await this.matchesService.update(id, updateMatchDto);
      if (!updatedMatch) {
        throw new NotFoundException(`Match with ID ${id} not found`);
      }
      return updatedMatch;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating match', error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.matchesService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Error removing match', error.message);
    }
  }
}
