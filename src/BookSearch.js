import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import propTypes from 'prop-types';

class SearchBooks extends Component {
  static propTypes = {
    shelfBooks: propTypes.array.isRequired,
    onShelfChange: propTypes.func.isRequired
  };
  state = {
    searchResults: []
  }

  getSearchResults = query => {
    if (!query) return this.setState({searchResults: []});
    BooksAPI.search(query)
    .then(books => {
      if (!books || !Array.isArray(books)) return;
      const booksUpdated = books.map(book => {
        const foundBook = this.props.shelfBooks.find(shelfBook => shelfBook.id === book.id);

        book.shelf = (foundBook) ? foundBook.shelf : 'none';
        return book;
      });
      this.setState({searchResults: booksUpdated})
    });
  };


  changeBookStatus = (currentBook, newShelf) => {
    let book = this.state.searchResults.find(book => book.id === currentBook.id);
    book.shelf = newShelf;
    this.setState({books: this.state.searchResults});
    this.props.onShelfChange(currentBook, newShelf);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={event => this.getSearchResults(event.target.value)}
              />
          </div>
        </div>
        <BookShelf bookShelfName="Search Results" books={this.state.searchResults} onShelfChange={this.changeBookStatus}
          />
      </div>
    )
  }
}
export default SearchBooks;