import React, { useState } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';

/**
 * TrackingSearch Component:
 * A search bar to track parcels using a tracking number.
 */
const TrackingSearch = () => {
  // State to hold the current value of the search input
  const [searchValue, setSearchValue] = useState('');
  // State to hold search results
  const [results, setResults] = useState([]);

  /**
   * Handle changes in the search input field.
   * Filters results based on the input value.
   */
  const handleSearchChange = (e, { value }) => {
    setSearchValue(value);
    // Static example results for demonstration purposes
    const exampleResults = [
      { title: 'Parcel 123', description: 'In Transit', trackingNumber: '123' },
      { title: 'Parcel 456', description: 'Delivered', trackingNumber: '456' },
    ];
    // Filter results based on the input value
    setResults(exampleResults.filter(result => result.trackingNumber.includes(value)));
  };

  return (
    <Segment>
      <Header as='h3'>Track Your Parcel</Header>
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        value={searchValue}
        onSearchChange={handleSearchChange}
        results={results}
        resultRenderer={({ title, description }) => (
          <div>
            <div>{title}</div>
            <div>{description}</div>
          </div>
        )}
        placeholder='Enter your tracking number...'
      />
    </Segment>
  );
};

export default TrackingSearch;
