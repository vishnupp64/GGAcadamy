import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
