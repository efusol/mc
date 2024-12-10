import React from 'react';
import '../assets/css/news/NewsNewView.css'
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/Banner';

const NewsNewView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  
  return (
    <div>
      <Banner category={category} />
    </div>
  );
};

export default NewsNewView;