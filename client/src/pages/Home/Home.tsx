import React, { Component } from 'react';

import { Header, Services, WhatElse, WhyUs } from './components';
import styles from './styles.module.scss';

export default class Home extends Component {
	render() {
		return (
			<>
				<Header />
				<Services />
				<WhatElse />
				<WhyUs />
			</>
		);
	}
}
