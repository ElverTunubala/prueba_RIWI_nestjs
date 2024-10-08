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
    @IsOptional() 
    status?: boolean = true;
}
