import React from "react";

interface ShopLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode; // The grid of ShopProductCard components
}

export const ShopLayout = ({ title, description, children }: ShopLayoutProps) => {
  return (
    <>
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col md:flex-row gap-gutter">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-8">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2">
            {title}
          </h1>
          <p className="text-on-surface-variant font-body-md text-body-md">
            {description}
          </p>
        </div>
        
        <div className="hidden md:block h-[1px] w-full bg-outline-variant opacity-50"></div>
        
        <div className="flex flex-col gap-6">
          {/* Product Type Filter */}
          <div>
            <h3 className="font-label-md text-label-md mb-3 text-deep-onyx uppercase tracking-wider">Product Type</h3>
            <ul className="space-y-2">
              {['Square Magnets', 'Polaroid Magnets', 'Acrylic Magnets', 'Panorama Magnets'].map((type) => (
                <li key={type}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-deep-onyx border-outline focus:ring-deep-onyx rounded-sm transition-colors group-hover:border-deep-onyx" 
                    />
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-deep-onyx transition-colors">
                      {type}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <h3 className="font-label-md text-label-md mb-3 text-deep-onyx uppercase tracking-wider">Price Range</h3>
            <ul className="space-y-2">
              {['Under ₹100', '₹100 – ₹200', '₹200 – ₹350', 'Above ₹350'].map((range) => (
                <li key={range}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price"
                      className="h-4 w-4 text-deep-onyx border-outline focus:ring-deep-onyx transition-colors group-hover:border-deep-onyx" 
                    />
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-deep-onyx transition-colors">
                      {range}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Product Grid Area */}
      <div className="flex-grow">
        {/* Active Filters & Sorting (Desktop) */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {/* Filter tags would go here */}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Sort by:</span>
            <select className="text-sm border border-outline border-opacity-20 rounded bg-transparent focus:border-magnet-red focus:ring-0 py-1 pl-2 pr-8 cursor-pointer">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Mobile Categories Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto hide-scrollbar -mx-margin-mobile px-margin-mobile mb-stack-lg">
          <div className="flex space-x-3 w-max pb-2">
            <button className="px-4 py-2 bg-deep-onyx text-white rounded-full font-label-sm text-label-sm shadow-sm transition-shadow">All</button>
            <button className="px-4 py-2 bg-surface-container text-on-surface rounded-full font-label-sm text-label-sm border border-outline-variant/30 hover:bg-surface-variant transition-colors">Magnets</button>
            <button className="px-4 py-2 bg-surface-container text-on-surface rounded-full font-label-sm text-label-sm border border-outline-variant/30 hover:bg-surface-variant transition-colors">Polaroids</button>
            <button className="px-4 py-2 bg-surface-container text-on-surface rounded-full font-label-sm text-label-sm border border-outline-variant/30 hover:bg-surface-variant transition-colors">Chocolates</button>
            <button className="px-4 py-2 bg-surface-container text-on-surface rounded-full font-label-sm text-label-sm border border-outline-variant/30 hover:bg-surface-variant transition-colors">Frames</button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-gutter pb-4">
          {children}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:border-deep-onyx hover:text-deep-onyx transition-colors disabled:opacity-50" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-deep-onyx text-white font-label-md">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:border-deep-onyx hover:text-deep-onyx transition-colors font-label-md">2</button>
          <span className="text-on-surface-variant mx-1">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:border-deep-onyx hover:text-deep-onyx transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
    
    {/* Mobile Sticky Filter & Sort Button */}
    <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center z-40 pointer-events-none px-margin-mobile">
      <button className="pointer-events-auto bg-deep-onyx text-white py-3 px-6 rounded-full flex items-center space-x-3 shadow-[0_8px_24px_rgba(26,26,26,0.25)] hover:shadow-[0_12px_28px_rgba(26,26,26,0.3)] transition-all transform active:scale-95">
        <div className="flex items-center space-x-1 border-r border-white/20 pr-3">
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span className="font-label-md text-label-md">Filter</span>
        </div>
        <div className="flex items-center space-x-1 pl-1">
          <span className="material-symbols-outlined text-[18px]">sort</span>
          <span className="font-label-md text-label-md">Sort</span>
        </div>
      </button>
    </div>
    </>
  );
};
