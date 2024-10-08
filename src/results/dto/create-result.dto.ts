import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsString()
  matchName: string; 

  @IsNotEmpty()
  @IsUUID()
  matchId: string;

  @IsNotEmpty()
  @IsUUID()
  winnerId: string; 
  @IsNotEmpty()
  @IsUUID()
  loserId: string; 

  @IsNotEmpty()
  @IsNumber()
  scoreWinner: number; 

  @IsNotEmpty()
  @IsNumber()
  scoreLoser: number; 

  @IsNotEmpty()
  @IsNumber()
  pointsDifference: number; 
}
