import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './styles.module.scss';

interface PaginationProps {
	pageCount: number;
	currentPage: number;
	marginPagesDisplayed?: number;
	pageRangeDisplayed?: number;
	onPageChange: ({ selected }: { selected: number }) => void;
}

export default function Pagination(props: PaginationProps) {
	const { pageCount, currentPage, marginPagesDisplayed = 2, pageRangeDisplayed = 5, onPageChange } = props;
	return (
		<ReactPaginate
			previousLabel={<i className='fas fa-caret-left'></i>}
			nextLabel={<i className='fas fa-caret-right'></i>}
			breakLabel={'...'}
			breakClassName={'break-me'}
			activeLinkClassName={styles.pageActive}
			initialPage={currentPage}
			pageCount={pageCount}
			marginPagesDisplayed={marginPagesDisplayed}
			pageRangeDisplayed={pageRangeDisplayed}
			onPageChange={onPageChange}
			containerClassName={styles.pagination}
      pageLinkClassName={styles.page}
      nextLinkClassName={styles.next}
      previousLinkClassName={styles.previous}
			disableInitialCallback
		/>
	);
}
