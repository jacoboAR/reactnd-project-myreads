import React, { Component } from 'react'

class DisplaySearch extends Component {
  render(){
    return(
      <ol className="books-grid">
        {this.props.srBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(e) => this.props.handleChange(book.id, e.target.value)}>
                        <option value="none">Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                      </select>
                    </div>
                </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
};

export default DisplaySearch