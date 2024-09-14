import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import WelcomePage from '../components/WelcomePage';
import MainPage from '../components/MainPage';
import HistoryPage from '../components/HistoryPage'; 

const App = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </NativeRouter>
  );
};

export default App;
