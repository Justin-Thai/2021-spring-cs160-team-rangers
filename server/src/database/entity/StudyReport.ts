import { IsDate, IsInt, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Model from './Model';
import User from './User';
import Deck from './Deck';

@Entity('study_reports')
export default class StudyReport extends Model {
    @PrimaryGeneratedColumn({ type: 'integer'})
    id: number;

    @Column()
    @IsUUID()
    user_id: string;

    @Column()
    @IsInt()
    deck_id: number;

    @Column()
    @IsInt()
    correct_count: number;

    @Column()
    @IsDate()
    start_time: Date;

    @Column()
    @IsDate()
    end_time: Date;
    
    @ManyToOne(() => User, (user) => user.study_reports)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Deck, (deck) => deck.study_reports)
    @JoinColumn({ name: 'deck_id', referencedColumnName: 'id'})
    deck: Deck;

    constructor(user_id: string, deck_id: number) {
        super();
        this.user_id = user_id;
        this.deck_id = deck_id;
        this.correct_count = 0;
        this.start_time = new Date();
        // this.end_time = ;
    } 
}