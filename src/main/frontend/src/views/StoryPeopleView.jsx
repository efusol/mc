import React from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/Banner';

const StoryPeopleView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  return (
    <div>
      <Banner category={category} />
    </div>
  );
};

export default StoryPeopleView;