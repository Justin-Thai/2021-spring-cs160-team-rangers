import { IsDate, IsInt, IsUUID, IsString, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Model from './Model';
import User from './User';
import Deck from './Deck';


@Entity('study_reports')
export default class StudyReport extends Model {
    @PrimaryGeneratedColumn({ type: 'integer'})
    id: number;

    @Column({ type: 'uuid' })
    @IsUUID()
    user_id: string;

    @Column()
    @IsInt()
    deck_id: number;

    @Column()
    @IsString()
    @Length(1, 255)
    name: string;

    @Column()
    @IsInt()
    correct_count: number; // number of times user answered a card correctly

    @Column()
    @IsInt()
    incorrect_count: number; // number of times user answered a card incorrectly
    
    @ManyToOne(() => User, (user) => user.study_reports)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Deck, (deck) => deck.study_reports)
    @JoinColumn({ name: 'deck_id', referencedColumnName: 'id'})
    deck: Deck;

    constructor(user_id: string, deck_id: number, name: string) {
        super();
        this.user_id = user_id;
        this.deck_id = deck_id;
        this.name = name;
        this.correct_count = 0;
        this.incorrect_count = 0;
    } 
}