import { IsEmail, IsEnum, IsNotEmpty, IsString,IsBoolean, IsOptional } from 'class-validator';
import { RolePlayers } from '../players.role'; 

export class CreatePlayerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    gender: string;

    @IsEnum(RolePlayers)
    role: RolePlayers;

    @IsBoolean()
    @IsOptional() // Opcional ya que tiene un valor por defecto en la entidad
    status?: boolean = true;
}
