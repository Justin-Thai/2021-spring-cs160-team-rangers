import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import { PageHeader, CardList } from './components';
import { Card } from '../../models';
import styles from './styles.module.scss';

interface CardPageProps {
	history: History<unknown>;
}

class CardPage extends Component<CardPageProps> {
	goBack = () => this.props.history.goBack();

	render() {
		const cards: Card[] = [
			{
				id: '1',
				frontSide: 'First card',
				backSide: 'Back side',
				backgroundColor: 'white',
			},
			{
				id: '2',
				frontSide: 'First card 2',
				backSide: 'Back side 2',
				backgroundColor: 'white',
			},
		];
		return (
			<div className={styles.container}>
				<PageHeader goBack={this.goBack} />
				<CardList cards={cards} />
			</div>
		);
	}
}

function CardPageHOC() {
	const history = useHistory();
	return <CardPage history={history} />;
}

export default CardPageHOC;
