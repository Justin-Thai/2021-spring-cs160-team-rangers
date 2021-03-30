import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setDidNavigateTo404, unsetDidNavigateTo404 } from '../../redux/not_found_page_detector/actions';

interface PageNotFoundProps {
	onSetDidNavigateTo404: () => void;
	onUnsetDidNavigateTo404: () => void;
	goBack: () => void;
}

class PageNotFound extends Component<PageNotFoundProps> {
	componentDidMount() {
		this.props.onSetDidNavigateTo404();
	}

	componentWillUnmount() {
		this.props.onUnsetDidNavigateTo404();
	}

	render() {
		return (
			<div>
				<h1>page not found</h1>
				<button onClick={this.props.goBack}>Go back</button>
			</div>
		);
	}
}

const mapDispatchToProps = {
	onSetDidNavigateTo404: setDidNavigateTo404,
	onUnsetDidNavigateTo404: unsetDidNavigateTo404,
};

interface PageNotFoundHOCProps {
	onSetDidNavigateTo404: () => void;
	onUnsetDidNavigateTo404: () => void;
}

function PageNotFoundHOC(props: PageNotFoundHOCProps) {
	const { goBack } = useHistory();
	return <PageNotFound {...props} goBack={goBack} />;
}

export default connect(null, mapDispatchToProps)(PageNotFoundHOC);
