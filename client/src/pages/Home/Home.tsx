import React, { Component } from 'react';

import { Header, Services, WhatElse } from './components';
import styles from './styles.module.scss';

export default class Home extends Component {
	render() {
		return (
			<div>
				<Header />
				<Services />
				<WhatElse />
			</div>
		);
	}
}
