import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, Entity } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import { Result } from 'src/results/entities/result.entity';

@Entity()
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

    @OneToMany(() => Result, (result) => result.winner)
    resultsWon: Result[];

    @OneToMany(() => Result, (result) => result.loser)
    resultsLost: Result[];
}
