import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, Entity } from 'typeorm';
import { Team } from '../../teams/entities/team.entity'; 
import { RoleTournament } from '../tournament.role';
import { Match } from 'src/matchs/entities/match.entity';

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; 

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @ManyToMany(() => Team, (team) => team.tournaments)
    teams: Team[];
    
    @Column({type: 'enum',enum: RoleTournament})
    status: RoleTournament;

    @OneToMany(() => Match, (match) => match.tournament, { cascade: true })
    matches: Match[]; // Un torneo tiene muchos partidos
}
