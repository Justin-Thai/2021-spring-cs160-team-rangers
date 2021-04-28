import React, { Component } from 'react';
import Select from 'react-select';
import { ValueType, ActionMeta } from 'react-select';

import { Card } from '../../../../models';
import CardComponent from '../CardComponent/CardComponent';
import styles from './styles.module.scss';

interface CardListProps {
	cards: Card[];
}

interface CardListState {
	current: number;
}

class CardList extends Component<CardListProps, CardListState> {
	state = { current: 0 };

	componentDidUpdate(prevProps: CardListProps, prevState: CardListState) {
		const { cards } = this.props;
		if (cards.length < prevProps.cards.length && this.state.current >= cards.length) {
			this.setState({ current: 0 });
		}
	}

	goForward = () => {
		if (this.state.current + 1 < this.props.cards.length) {
			this.setState((prevState) => ({ current: prevState.current + 1 }));
		}
	};

	goBack = () => {
		if (this.state.current - 1 >= 0) {
			this.setState((prevState) => ({ current: prevState.current - 1 }));
		}
	};

	goTo = (
		value: ValueType<{ value: number; label: string }, false>,
		_: ActionMeta<{ value: number; label: string }>
	) => {
		this.setState({ current: value!.value });
	};

	setClass = (num: number) => {
		const classArr = [''];
		const { current } = this.state;
		if (num === current) classArr.push(styles.present);
		if (num > current) classArr.push(styles.next);
		if (num < current) classArr.push(styles.previous);
		return classArr.join(' ');
	};

	render() {
		const { cards } = this.props;
		const { current } = this.state;
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.inner}>
						<i className={`fas fa-angle-left ${styles.arrow}`} onClick={this.goBack}></i>
						<div className={styles.cardsWrapper}>
							{cards.map((c, i) => (
								<CardComponent key={c.id} card={c} classList={this.setClass(i)} />
							))}
						</div>
						<i className={`fas fa-angle-right ${styles.arrow}`} onClick={this.goForward}></i>
					</div>
				</div>
				<h1 className={styles.pageNum}>
					{current + 1} / {cards.length}
				</h1>
				<div className={styles.goTo}>
					<h3 className={styles.goToLabel}>Go to card</h3>
					<Select
						className={styles.selector}
						options={cards.map((_, i) => ({ value: i, label: `${i + 1}` }))}
						value={{ value: current, label: `${current + 1}` }}
						onChange={this.goTo}
					/>
				</div>
			</div>
		);
	}
}

export default CardList;
