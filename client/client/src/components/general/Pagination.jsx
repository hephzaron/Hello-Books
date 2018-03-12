import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPager, fetchPage, setPager } from 'Actions/pagination';

/**
 * @class Pagination
 * @description This component enables paging through any list of items
 * @extends React.Component
 * @returns {JSX}
 */
class Pagination extends Component {
 constructor(props){
    super(props);
    this.setPage = this.setPage.bind(this);
  }

  /**
   * @method componentWillMount
   * @memberof Pagination
   * @description Lifecycle component sets page if array is not empty
   * @param {void}- null no parameter
   */
  componentWillMount(){
    (this.props.items&&this.props.items.length)?
    this.setPage(this.props.initialPage): null
  }

   /**
   * @method componentDidUpdate
   * @memberof Pagination
   * @description Lifecycle component sets page if items array changes
   * @param {object}- prevProps 
   * @param {object}- prevState
   */
  componentDidUpdate(prevProps, prevState){
    (this.props.items!== prevProps.items)?
    this.setPage(this.props.initialPage): null
  }
  /**
   * @method setPage
   * @memberof Pagination
   * @description Sets 
   * @param {number} page- the page number to be rendered
   */
  
  setPage(page) {
    const { items } = this.props;
    this.props.fetchPage(page, items, this.props.onPageChange )
  }
  
  render(){
    const {
      currentPage,
      totalPages,
      pages
  } = this.props.pager;  
    return(<div>
      { 
        (pages||pages.length >1) &&
        (
          <ul className="pagination">
                <li className={currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(currentPage - 1)}>Previous</a>
                </li>
                {pages.map((page, index) =>
                    <li key={index} className={currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={currentPage === totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(currentPage + 1)}>Next</a>
                </li>
                <li className={currentPage === totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(totalPages)}>Last</a>
                </li>
            </ul>
        )

      }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    pager: state.pagination.pager
});

const actionCreators = {
  fetchPage
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pager: PropTypes.object.isRequired
}
Pagination.defaultProps = {
  initialPage: 1
}

export {Pagination};
export default connect(mapStateToProps, actionCreators)(Pagination)