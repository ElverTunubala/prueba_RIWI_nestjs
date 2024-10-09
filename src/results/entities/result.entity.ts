import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Match } from '../../matchs/entities/match.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Result {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    matchName: string; // Nombre del partido (referencial)

    @ManyToOne(() => Match, (match) => match.results, { onDelete: 'CASCADE' })
    match: Match;

    @ManyToOne(() => Team, { nullable: false })
    @JoinColumn({ name: 'winnerTeamId' }) 
    winner: Team; // Equipo ganador

    @ManyToOne(() => Team, { nullable: false })
    @JoinColumn({ name: 'loserTeamId' }) 
    loser: Team; // Equipo perdedor
    

    @Column()
    scoreWinner: number; // Puntuación del equipo ganador

    @Column()
    scoreLoser: number; //perdedor

    @Column()
    pointsDifference: number; // Diferencia de goles
}

