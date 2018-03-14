import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'General/Pagination';
import Card from '../../Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOfItems: []
        }

        this.onPageChange = this.onPageChange.bind(this);
    }
 
    onPageChange(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render() {
      const { books } = this.props
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>Search results</h1>
                        {
                            this.state.pageOfItems.map(item =>
                            <MuiThemeProvider>
                                <Card book = { item }/>
                            </MuiThemeProvider>
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

export { SearchPage }
export default connect(mapStateToProps)(SearchPage)