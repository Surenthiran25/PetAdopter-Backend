import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetsProvider } from './contexts/PetsContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Layout components
import Layout from './components/layout/Layout';

// Page components
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import PetDetailsPage from './pages/PetDetailsPage';
import AdoptionPage from './pages/AdoptionPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <PetsProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/:id" element={<PetDetailsPage />} />
              <Route path="/adopt/:id" element={<AdoptionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </PetsProvider>
    </Router>
  );
}

export default App;