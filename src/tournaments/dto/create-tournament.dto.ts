import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleTournament } from "../tournament.role";

export class CreateTournamentDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    startDate:  string;

    @IsNotEmpty()
    @IsString()
    endDate:  string;

    @IsNotEmpty()
    @IsEnum(RoleTournament)
    status: RoleTournament;
    
    @IsArray()
    teams?: string[];
}

