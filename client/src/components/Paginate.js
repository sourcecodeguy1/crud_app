import React, {Component} from "react";

import {Pagination} from "react-bootstrap";

class Paginate extends Component {

    render() {

        // Logic for displaying page numbers

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.posts / this.props.postsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Pagination.Item id={number} className={"page-item"} key={number} active={number === this.props.activePage} onClick={() => this.props.paginate(number)}>
                    {number}
                </Pagination.Item>
            );
        });

        return(
            <div>
                <Pagination>
                    {renderPageNumbers}
                </Pagination>
            </div>
        );
    }

}

export default Paginate;