import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Team } from '../../teams/entities/team.entity'; 
import { RoleTournament } from '../tournament.role';

export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; 

    @Column()
    startDate: Date;

    @Column()
    endDate: Date; 

    @ManyToMany(() => Team, (team) => team.tournaments)
    @JoinTable()
    teams: Team[]; 

    @Column({type: 'enum',enum: RoleTournament})
    status: RoleTournament;
}
