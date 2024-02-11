// BibleVerse.js
import React, { useState } from 'react';
import axios from 'axios';

function BibleVerse() {
  const [searchInput, setSearchInput] = useState('');
  const [verse, setVerse] = useState({
    text: '',
    book: '',
    chapter: '',
    verse: ''
  });

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const fetchVerse = async () => {
    try {
      const response = await axios.get(`https://bible-api.com/${searchInput}`);
      const verseData = response.data;
      setVerse({
        text: verseData.text,
        book: verseData.reference.book,
        chapter: verseData.reference.chapter,
        verse: verseData.reference.verse
      });
    } catch (error) {
      console.error('Error fetching verse:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchVerse();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Enter verse reference (e.g., John 3:16)"
        />
        <button type="submit">Search</button>
      </form>
      {verse.text && (
        <div>
          <p>{verse.text}</p>
          <p>{verse.book} {verse.chapter}:{verse.verse}</p>
        </div>
      )}
    </div>
  );
}

export default BibleVerse;
