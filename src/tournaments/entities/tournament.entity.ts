import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Team } from '../../teams/entities/team.entity'; 
import { RoleTournament } from '../tournament.role';
import { Match } from 'src/matchs/entities/match.entity';

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

    @OneToMany(() => Match, (match) => match.tournament, { cascade: true })
    matches: Match[]; // Un torneo tiene muchos partidos
}
