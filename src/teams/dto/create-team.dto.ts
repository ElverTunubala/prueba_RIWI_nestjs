import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    manager: string;

    @IsArray()
    @IsUUID('4', { each: true }) // Validación para asegurar que cada ID es un UUID
    @IsOptional()
    players?: string[]; // IDs de los jugadores relacionados

    @IsArray()
    @IsUUID('4', { each: true }) 
    @IsOptional()
    tournaments?: string[]; // IDs de los torneos relacionados
}
