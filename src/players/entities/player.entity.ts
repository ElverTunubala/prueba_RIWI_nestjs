import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePlayers } from "../players.role";
import { Team } from "src/teams/entities/team.entity";

@Entity()
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

    @ManyToMany(() => Team, (team) => team.players)
    @JoinTable({ name: 'Player_Team' }) 
    teams: Team[];
}
