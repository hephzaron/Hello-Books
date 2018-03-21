import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'General/Pagination';
import Card from '../../Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getBooks,editBook, deleteBook } from 'Actions/bookActions';
import { showModal, closeModal } from 'Actions/modal';
import modalTypes from 'Components/Modal/modalTypes';
import { books } from '../client-data';
import { moveLeft, moveRight } from 'Utils/scroll'

const { EDIT_BOOK_MODAL, ASSIGN_BOOK_MODAL }  = modalTypes;

class BooksFetchedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOfItems: [],
            books:[...books],
            isLoading:false
        }

        this.onPageChange = this.onPageChange.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentDidMount(){
        moveLeft("#scroll-left", ".book-paginate");     
        moveRight("#scroll-right", ".book-paginate")
    }

    editBook(){}
    deleteBook(){}
 
    onPageChange(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render() {
      const { books } = this.state
      const cardActions = [{
          label: 'edit',
          onClick: this.editBook
        },{
            label: 'delete',
            onClick: this.deleteBook
        }
      ]
        return (
            <div className="book-paginate"> 
                <div className="container">
                <span id = "scroll-left" className="glyphicon glyphicon-chevron-left"></span>
                <span id = "scroll-right" className="glyphicon glyphicon-chevron-right"></span>
                    <div className="text-center">
                        {
                            this.state.pageOfItems.map(item =>
                            <div className="col-xs-3">
                                <MuiThemeProvider>
                                    <Card book = { item }/>
                                </MuiThemeProvider>
                            </div>
                        )}
                        <Pagination 
                            items={ books } 
                            onPageChange={this.onPageChange}
                            isLoading = {this.state.isLoading}
                            cardActions = {cardActions}/>
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