import React from 'react';

const SearchButton = ({ history }) => {
  const handlePressEnterKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      history.push('/search');
    }
  };
  return (
    <div className="open-search" onKeyDown={handlePressEnterKey} tabIndex="0">
      <button onClick={() => history.push('/search')}>Add a book</button>
    </div>
  );
};

export default SearchButton;
