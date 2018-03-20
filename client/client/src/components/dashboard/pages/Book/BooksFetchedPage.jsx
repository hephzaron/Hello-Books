import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'General/Pagination';
import Card from '../../Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getBooks,editBook, deleteBook } from 'Actions/bookActions';
import { showModal, closeModal } from 'Actions/modal';
import modalTypes from 'Components/Modal/modalTypes';
import { books } from '../client-data';

const { EDIT_BOOK_MODAL, ASSIGN_BOOK_MODAL }  = modalTypes;

class BooksFetchedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOfItems: [],
            books:[...books]
        }

        this.onPageChange = this.onPageChange.bind(this);
    }
 
    onPageChange(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render() {
      const { books } = this.state
        return (
            <div className="book-paginate">
                <div className="container">
                    <div className="text-center">
                        <h3>Books</h3>
                        {
                            this.state.pageOfItems.map(item =>
                            <div className="col-xs-2">
                                <MuiThemeProvider>
                                    <Card book = { item }/>
                                </MuiThemeProvider>
                            </div>
                        )}
                        <Pagination 
                            items={ books } 
                            onPageChange={this.onPageChange} />
                    </div>
                </div>
                <hr />
                <div className="credits text-center">
                    <p>
                     {`${books.length >= 1 ? books.length : 'No'} books found`}
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  books: state.books['books']
});

export { BooksFetchedPage }
export default connect(mapStateToProps)(BooksFetchedPage);