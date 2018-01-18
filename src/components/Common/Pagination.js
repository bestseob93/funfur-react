import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

class Pagination extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        initialPage: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
    };

    static defaultProps = {
        initialPage: 1
    };

    state = {
        pager: {}
    };

    componentWillMount() {
        // 아이템 배열 비어있지 않을 경우 페이지 설정
        if (this.props.items && this.props.items.size) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // 아이템 배열 값이 바꼈을 경우 page 초기화
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage = (page) => {
        const items = this.props.items;
        let pager = this.state.pager;

        pager = this.getPage(items.size, page);

        if(page === pager.totalPages + 1) {
            return ;
        }

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        
        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems, pager.startIndex);
    };

    getPage = (totalItems, currentPage, pageSize) => {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage = 0;
        let endPage = 0;
        if(totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if(currentPage <= 3) { // 시작 페이지
                startPage = 1;
                endPage = 5;
            } else if(currentPage + 2 >= totalPages) { // 마지막 5페이지
                startPage = totalPages - 4;
                endPage = totalPages;
            } else { // 그 전 페이지들
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = _.range(startPage, endPage + 1);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };

    render() {
        let pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <div className="pagination__wrapper">
            <ul className="pagination justify-content-center">
                {/*<li className={pager.currentPage === 1 ? 'disabled' : ''}>*/}
                    {/*<a onClick={() => this.setPage(1)}>First</a>*/}
                {/*</li>*/}
                <li className={pager.currentPage === 1 ? 'disabled' : ''} >
                    <a onClick={() => this.setPage(pager.currentPage - 1)} className="btn" id="previous" />
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index}>
                        <a onClick={() => this.setPage(page)} className="btn pages" id={pager.currentPage === page ? `active` : ``}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)} className="btn" id="next" />
                </li>
                {/*<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>*/}
                    {/*<a onClick={() => this.setPage(pager.totalPages)}>Last</a>*/}
                {/*</li>*/}
            </ul>
            </div>
        );
    }
}

export default Pagination;