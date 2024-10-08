import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Nombre del partido (por ejemplo, "Equipo A vs Equipo B")

    @Column({ type: 'date' })
    date: Date; 

    @Column()
    scoreTeamA: number; 

    @Column()
    scoreTeamB: number; 

    @ManyToOne(() => Team, { nullable: false })
    teamA: Team; // Referencia al equipo A

    @ManyToOne(() => Team, { nullable: false })
    teamB: Team; // Referencia al equipo B

    @ManyToOne(() => Tournament, (tournament) => tournament.matches, {
    onDelete: 'CASCADE'})
    tournament: Tournament; 
}
