import React from 'react';

const Book = ({ bookFiltered, onBookStatusChange, history }) => {
  return (
    <li>
      <div className="book" tabIndex="0">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                bookFiltered.imageLinks
                  ? bookFiltered.imageLinks.smallThumbnail
                  : ''
              })`,
            }}
          />

          <div className="book-shelf-changer">
            <select
              defaultValue={bookFiltered.shelf}
              onChange={(e) => {
                onBookStatusChange(e, bookFiltered);
                history.location.pathname === '/' && history.push('/');
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookFiltered.title}</div>
        <div className="book-authors">
          {bookFiltered.authors ? bookFiltered.authors.join(', ') : ''}
        </div>
      </div>
    </li>
  );
};

export default Book;
