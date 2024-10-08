import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Tournament } from '../../tournaments/entities/tournament.entity';

export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    manager: string;

    @ManyToMany(() => Player, (player) => player.teams)
    players: Player[];

    @ManyToMany(() => Tournament, (tournament) => tournament.teams)
    @JoinTable({ name: 'Team_Tournament' }) 
    tournaments: Tournament[];
}
