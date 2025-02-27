import React from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import SelectReader from '../components/selectreader/selectreader';

const SelectReaderPage = () => {
  return (
    <div className="select-reader-page">
      <NavBarMain />
      <div className="page-content">
        <SelectReader />
      </div>
    </div>
  );
};

export default SelectReaderPage;
