import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    static propTypes = {
        initialPage: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
    }

    static defaultProps = {
        initialPage: 1
    }

    state = {
        pager: {}
    }

    componentWillMount() {
        // 아이템 배열 비어있지 않을 경우 페이지 설정
        if (this.props.items && this.props.items.length) {
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
    }
    render() {
        return (
            <ul>
                <li>1</li>
                <li>2</li>
            </ul>
        );
    }
}

export default Pagination;