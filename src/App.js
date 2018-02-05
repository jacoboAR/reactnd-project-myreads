import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';
import './App.css';

class App extends Component {

  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
    .catch(error => console.log(error));
  }

  handleChange = (currentBook, newShelf) => {
    let shelfBook = this.state.books.find(book => book.id === currentBook.id);
    if (shelfBook) {
      shelfBook.shelf = newShelf;
      this.setState({books: this.state.books});
    } else {
      shelfBook = currentBook;
      shelfBook.shelf = newShelf;
      this.setState(prevState => ({books: prevState.books.concat(shelfBook)}))
    }
    BooksAPI.update(shelfBook, currentBook.shelf).then();
    };

  render() {
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead');
    const read = this.state.books.filter(book => book.shelf === 'read');
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfTitle="Currently Reading" books={currentlyReading} handleChange={this.handleChange} />
                <BookShelf shelfTitle="Want to Read" books={wantToRead} handleChange={this.handleChange} />
                <BookShelf shelfTitle="Read" books={read} handleChange={this.handleChange} />
              </div>
              <div className="open-search">
                <Link to="/search">Search for books</Link>
              </div>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <BookSearch shelfBooks={this.state.books} handleChange={this.handleChange}
        />
        )}/>
      </div>
    );
  }
}

export default App