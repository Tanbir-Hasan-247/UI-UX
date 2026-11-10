import React, { useState, useMemo } from 'react';
import { RunwayProvider } from './context/RunwayContext.jsx';
import { Header } from './components/Header.jsx';
import { RunwaySection } from './components/RunwaySection.jsx';
import { SearchAndFilterHub } from './components/SearchAndFilterHub.jsx';
import { EditorialSpotlights } from './components/EditorialSpotlights.jsx';
import { ShopCollectionGrid } from './components/ShopCollectionGrid.jsx';
import { CommunityStyleGallery } from './components/CommunityStyleGallery.jsx';
import { InnovationStory } from './components/InnovationStory.jsx';
import { ReviewsSection } from './components/ReviewsSection.jsx';
import { NewsletterBanner } from './components/NewsletterBanner.jsx';
import { Footer } from './components/Footer.jsx';

import { BagDialog } from './components/BagDialog.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.jsx';
import { OrderHistoryModal } from './components/OrderHistoryModal.jsx';
import { ProductDetailModal } from './components/ProductDetailModal.jsx';
import { WishlistModal } from './components/WishlistModal.jsx';
import { BagToast } from './components/BagToast.jsx';
import { PoweredByBadge } from './components/PoweredByBadge.jsx';

import { ALL_PRODUCTS } from './data/runwayCatalog.js';

export const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Pieces');
  const [sortBy, setSortBy] = useState('featured');

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All Pieces') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <Header />

      <main>
        {/* 1. Immersive Runway Hero Section */}
        <RunwaySection />

        {/* 2. Editorial Highlight Drops */}
        <EditorialSpotlights onSelectCategory={setSelectedCategory} />

        {/* 3. Search & Filter Bar */}
        <SearchAndFilterHub
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filteredProducts.length}
        />

        {/* 4. Complete Collection Product Grid */}
        <ShopCollectionGrid
          products={filteredProducts}
          onSelectCategory={setSelectedCategory}
        />

        {/* 5. Community Street Style Lookbook (#NikeRunway) */}
        <CommunityStyleGallery onSelectCategory={setSelectedCategory} />

        {/* 6. Technology & Sustainable Craft Story */}
        <InnovationStory />

        {/* 7. Verified Customer Reviews */}
        <ReviewsSection />

        {/* 8. VIP Membership & Discount Signup */}
        <NewsletterBanner />
      </main>

      {/* 9. Comprehensive Flagship Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <BagDialog />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderHistoryModal />
      <ProductDetailModal />
      <WishlistModal />
      <BagToast />
      <PoweredByBadge />
    </>
  );
};

export const App = () => {
  return (
    <RunwayProvider>
      <AppContent />
    </RunwayProvider>
  );
};

export default App;
