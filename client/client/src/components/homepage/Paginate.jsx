import React, { Component } from 'react';
import Pagination from '../general/Pagination';

class Paginate extends Component {
    constructor() {
        super();
 
        // an example array of items to be paged
        const exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });
 
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };
 
        this.onPageChange = this.onPageChange.bind(this);
    }
 
    onPageChange(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>React - Pagination Example with logic like Google</h1>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination 
                            items={this.state.exampleItems} 
                            onPageChange={this.onPageChange} />
                    </div>
                </div>
                <hr />
                <div className="credits text-center">
                    <p>
                        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </div>
        );
    }
}
 
export default Paginate;