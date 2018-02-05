import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state={
    srBooks: []
  }

  searchBooks = (SearchCriteria) => {
    BooksAPI.search(SearchCriteria).then(res => {
    const resBooks=res.map(srBook=> {
      let shelf = "none"
      let existBook
      if(existBook = this.props.books.find(exBook => exBook.id === srBook.id)) {
        shelf = existBook.shelf
      }
      return {
        id: srBook.id,
        shelf: shelf,
        authors: srBook.authors,
        title: srBook.title,
        imageLinks: {
          thumbnail: srBook.imageLinks.thumbnail
          }
      }
    })
    this.setState(
      { srBooks: resBooks }
    );
  })}

  srHandleChange = (bookId, newShelfValue) => {
    BooksAPI.update({id: bookId},newShelfValue).then(UpdateResult => console.log("Ausgabe: ", UpdateResult))
  }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={() => (this.props.getAllBooks())}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => {this.searchBooks(event.target.value)}} />
          </div>
        </div>
        <div className="search-books-results">
          <BookSearch srBooks={this.state.srBooks} handleChange={this.srHandleChange} />
        </div>
      </div>
    )
  }
}

export default SearchBooks