import React, { useState } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

const SearchPage = ({ books, onBookStatusChange, history }) => {
  const [bookStateFiltered, setBookStateFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorState, setErrorState] = useState(false);

  const updateValue = (value) => {
    setErrorState(false);
    setSearchValue(value.trim());

    return value !== ''
      ? BooksAPI.search(value).then((res) => {
          if (res.error) {
            setErrorState(true);
            setBookStateFiltered([]);
          } else {
            res.forEach((bk) => {
              bk['shelf'] = 'none';
              books.forEach((initialBooks) => {
                if (initialBooks.id === bk.id) {
                  bk['shelf'] = initialBooks.shelf;
                }
              });
              setBookStateFiltered((currentState) => {
                currentState = [...currentState, bk];
                return currentState;
              });
            });
          }
        })
      : setBookStateFiltered([]);
  };

  const handlePressEnterKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      history.push('/');
      window.location.reload();
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <div onKeyDown={handlePressEnterKey} tabIndex="0">
          <button
            className="close-search"
            onClick={() => {
              history.push('/');
              window.location.reload();
            }}
          >
            Close
          </button>
        </div>
        <div className="search-books-input-wrapper">
          {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
          <input
            defaultValue={searchValue}
            type="text"
            placeholder="Search by title or author"
            onChange={(e) => updateValue(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {errorState === false
            ? bookStateFiltered.map((bookFiltered, index) => {
                return (
                  searchValue !== '' && (
                    <Book
                      key={index}
                      bookFiltered={bookFiltered}
                      onBookStatusChange={onBookStatusChange}
                      history={history}
                    />
                  )
                );
              })
            : ''}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
