import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './SearchBar.css';
import { Input, Drawer, List } from 'antd';

const { Search } = Input;

const SearchBar = () => {
  const { userRole } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (value) => {
    setSearching(true);

    let searchUrls = [];

    switch (userRole) {
      case 'admin':
        searchUrls = [
          `/api/search/couriers?query=${value}`,
          `/api/search/clients?query=${value}`
        ];
        break;
      case 'courier':
        searchUrls = [
          `/api/search/clients?query=${value}`
        ];
        break;
      case 'client':
        searchUrls = [
          `/api/search/courses?query=${value}`
        ];
        break;
      default:
        return;
    }

    try {
      const responses = await Promise.all(
        searchUrls.map(url =>
          fetch(url)
            .then(response => response.json())
            .catch(err => {
              console.error('Error fetching data:', err);
              return { error: true };
            })
        )
      );

      const data = responses.flat();
      setResults(data);
      setDrawerVisible(true);
    } catch (error) {
      console.error('Search error:', error);
      // Handle error state if necessary
    } finally {
      setSearching(false);
    }
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div className="search-bar">
      <Search
        placeholder="Search..."
        enterButton="Search"
        loading={searching}
        onSearch={handleSearch}
      />
      <Drawer
        title="Search Results"
        placement="top"
        onClose={onCloseDrawer}
        visible={drawerVisible}
        className="floating-card" // Apply custom class for floating card styling
      >
        {results.length > 0 ? (
          <List
            dataSource={results}
            renderItem={result => (
              <List.Item key={result.id}>
                <List.Item.Meta
                  title={result.name}
                  description={result.id}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>No data found</p>
        )}
      </Drawer>
    </div>
  );
};

export default SearchBar;