import React from 'react';
import {Route, Routes}  from 'react-router-dom'
import Layout from '@/Layout'
import HomeView from '@/views/HomeView'
import LoginView from './views/LoginView'
import JoinView from './views/JoinView';
import GoodsView from './views/GoodsView';
import GoodsDetailView from './views/GoodsDetailView';
import MypageView from './views/MypageView';
import PayView from './views/PayView';
import GoodsRegister from './views/GoodsRegister';
import GoodsModify from './views/GoodsModify';
import StoreMap from './views/StoreMap';
import OrderDetail from './components/mypage/OrderDetail';
import Review from './components/mypage/Order';
import UserModify from './components/mypage/UserModify';
import ReviewView from './views/ReviewView';
import CartView from './views/CartView';
import Receipt from './components/mypage/Receipt';
import UsedPoint from './components/mypage/UsedPoint';
import MyInfo from './components/mypage/MyInfo';
import StoreRent from './views/StoreRent';
import NewsPromotionView from './views/NewsPromotionView';
import NewsNewView from './views/NewsNewView';
import NewsHappyView from './views/NewsHappyView';
import StoryView from './views/StoryView';
import StoryBrandView from './views/StoryBrandView';
import StoryPeopleView from './views/StoryPeopleView';
import StoryQualityView from './views/StoryQualityView';
import StorySocialView from './views/StorySocialView';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <HomeView /> } />
        <Route path="member/login" element={<LoginView />} />
        <Route path='member/join' element={<JoinView />} />
        <Route path='goodslist' element={<GoodsView />} />
        <Route path='goodsdetail/:g_no' element={<GoodsDetailView />} />
        <Route path="cart" element={<CartView />} />
        <Route path="/mypage" element={<MypageView />}>
          <Route path='myinfo' element={<MyInfo />} />
          <Route path="order" element={<Review />} />
          <Route path="userModify" element={<UserModify />} />
          <Route path="order/:orderNo" element={<OrderDetail />} />
          <Route path='receipt' element={<Receipt />} />
          <Route path='point' element={<UsedPoint />} />
        </Route>
        <Route path='review/:g_no' element={<ReviewView />} />
        <Route path='pay' element={<PayView />} />
        <Route path='goodsregister' element={<GoodsRegister />} />
        <Route path='goodsModify' element={<GoodsModify />} />
        <Route path='storeMap' element={<StoreMap />} />
        <Route path='storeRent' element={<StoreRent />} />
        <Route path='newsPro' element={<NewsPromotionView />} />
        <Route path='newsNew' element={<NewsNewView />} />
        <Route path='newsHappy' element={<NewsHappyView />} />
        <Route path='story' element={<StoryView />} />
        <Route path='storyBrand' element={<StoryBrandView />} />
        <Route path='storySocial' element={<StorySocialView />} />
        <Route path='storyQuality' element={<StoryQualityView />} />
        <Route path='storyPeople' element={<StoryPeopleView />} />
      </Route>
    </Routes>
  );
};

export default App;