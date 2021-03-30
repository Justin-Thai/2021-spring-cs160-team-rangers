import React, { Component } from 'react';

import { Header, Services, WhatElse, WhyUs } from './components';

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
