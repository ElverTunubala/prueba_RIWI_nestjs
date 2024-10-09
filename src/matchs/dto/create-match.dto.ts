import { Type } from 'class-transformer';
import { IsUUID, IsString, IsNumber, IsDate, IsNotEmpty} from 'class-validator';

export class CreateMatchDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    scoreTeamA: number;

    @IsNumber()
    @IsNotEmpty()
    scoreTeamB: number;

    @IsUUID()
    @IsNotEmpty()
    teamAId: string;

    @IsUUID()
    @IsNotEmpty()
    teamBId: string;

    @IsUUID()
    @IsNotEmpty()
    tournamentId: string;
}

