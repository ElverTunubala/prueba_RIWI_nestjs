import { Column, PrimaryGeneratedColumn } from "typeorm";
import { RolePlayers } from "../players.role";

export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column({type: 'enum',enum: RolePlayers})
    role: RolePlayers;

    @Column({default: true}) 
    status: boolean;
}
