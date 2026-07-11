import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Shirt, 
  Sparkles, 
  DollarSign, 
  Compass, 
  Mail, 
  Plus, 
  Trash2, 
  Check, 
  MapPin,
  TrendingUp, 
  Info,
  Calendar,
  Layers,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';

// Seed items for a fresh experience if localstorage is empty
const SEED_ITEMS = [
  { id: 'seed-1', name: 'Vintage Denim Jacket', category: 'Top', season: 'Winter', color: 'Blue', price: 89.99, wears: 8 },
  { id: 'seed-2', name: 'Summer Floral Dress', category: 'Top', season: 'Summer', color: 'Yellow', price: 59.99, wears: 3 },
  { id: 'seed-3', name: 'Classic White Sneakers', category: 'Shoes', season: 'All Seasons', color: 'White', price: 79.99, wears: 20 },
  { id: 'seed-4', name: 'Slim Fit Black Jeans', category: 'Bottom', season: 'All Seasons', color: 'Black', price: 49.99, wears: 15 },
  { id: 'seed-5', name: 'Winter Woolen Scarf', category: 'Accessory', season: 'Winter', color: 'Gray', price: 29.99, wears: 2 },
  { id: 'seed-6', name: 'Chino Shorts', category: 'Bottom', season: 'Summer', color: 'Beige', price: 39.99, wears: 5 }
];

const SEED_OUTFITS = [
  { 
    id: 'outfit-1', 
    name: 'Casual Winter Walk', 
    season: 'Winter', 
    items: { top: 'seed-1', bottom: 'seed-4', shoes: 'seed-3' } 
  },
  { 
    id: 'outfit-2', 
    name: 'Sunny Day Out', 
    season: 'Summer', 
    items: { top: 'seed-2', bottom: 'seed-6', shoes: 'seed-3' } 
  }
];

const Wardrobe = () => {
  // Navigation & Hash-routing state
  const [activeTab, setActiveTab] = useState('#dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Wardrobe state
  const [items, setItems] = useState([]);
  const [outfits, outfitsSet] = useState([]);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Modals and form state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Top',
    season: 'All Seasons',
    color: '',
    price: '',
    wears: '0'
  });

  // Outfit builder state
  const [builderSlots, setBuilderSlots] = useState({
    top: null, // item object
    bottom: null, // item object
    shoes: null // item object
  });
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [activeSelectionSlot, setActiveSelectionSlot] = useState(null); // 'top' | 'bottom' | 'shoes'
  const [outfitForm, setOutfitForm] = useState({ name: '', season: 'All Seasons' });

  // Trip planner state
  const [tripForm, setTripForm] = useState({ name: '', season: 'All Seasons' });
  const [generatedTripOutfits, setGeneratedTripOutfits] = useState([]);
  const [isTripGenerated, setIsTripGenerated] = useState(false);

  // Contact/Support state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  // Filters for Wardrobe Grid
  const [inventoryFilters, setInventoryFilters] = useState({ category: 'All', season: 'All' });
  // Filters for Cost Tracker
  const [costFilterCategory, setCostFilterCategory] = useState('All');

  // Initial Data Loading & Persistence
  useEffect(() => {
    const savedItems = localStorage.getItem('stylesphere_wardrobe_items');
    const savedOutfits = localStorage.getItem('stylesphere_wardrobe_outfits');
    
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(SEED_ITEMS);
      localStorage.setItem('stylesphere_wardrobe_items', JSON.stringify(SEED_ITEMS));
    }

    if (savedOutfits) {
      outfitsSet(JSON.parse(savedOutfits));
    } else {
      outfitsSet(SEED_OUTFITS);
      localStorage.setItem('stylesphere_wardrobe_outfits', JSON.stringify(SEED_OUTFITS));
    }
  }, []);

  // Listen to hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#dashboard';
      const validTabs = ['#dashboard', '#inventory', '#builder', '#tracker', '#planner', '#contact'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('#dashboard');
      }
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Helper to trigger toast notifications
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Persists items and triggers callback
  const updateItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('stylesphere_wardrobe_items', JSON.stringify(newItems));
  };

  // Persists outfits
  const updateOutfits = (newOutfits) => {
    outfitsSet(newOutfits);
    localStorage.setItem('stylesphere_wardrobe_outfits', JSON.stringify(newOutfits));
  };

  // Add Item to Inventory
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.color || !newItem.price) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const priceNum = parseFloat(newItem.price);
    const wearsNum = parseInt(newItem.wears) || 0;
    if (isNaN(priceNum) || priceNum < 0) {
      showToast('Please enter a valid price.', 'error');
      return;
    }

    const itemToAdd = {
      id: 'item-' + Date.now(),
      name: newItem.name,
      category: newItem.category,
      season: newItem.season,
      color: newItem.color,
      price: priceNum,
      wears: wearsNum
    };

    const updated = [itemToAdd, ...items];
    updateItems(updated);
    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      category: 'Top',
      season: 'All Seasons',
      color: '',
      price: '',
      wears: '0'
    });
    showToast(`Added "${itemToAdd.name}" to inventory!`);
  };

  // Log Wears
  const handleLogWear = (itemId) => {
    const updated = items.map(item => {
      if (item.id === itemId) {
        const newWears = (item.wears || 0) + 1;
        showToast(`Logged wear for ${item.name}! (Total wears: ${newWears})`, 'info');
        return { ...item, wears: newWears };
      }
      return item;
    });
    updateItems(updated);
  };

  // Delete Item
  const handleDeleteItem = (itemId) => {
    const itemToDelete = items.find(i => i.id === itemId);
    const updated = items.filter(item => item.id !== itemId);
    updateItems(updated);
    showToast(`Removed "${itemToDelete ? itemToDelete.name : 'item'}" from wardrobe.`, 'info');
  };

  // Outfit Selection Slots Setup
  const openSelectionModal = (slot) => {
    setActiveSelectionSlot(slot);
    setIsSelectionModalOpen(true);
  };

  const handleSelectItemForSlot = (item) => {
    setBuilderSlots(prev => ({
      ...prev,
      [activeSelectionSlot]: item
    }));
    setIsSelectionModalOpen(false);
    showToast(`Selected ${item.name} as ${activeSelectionSlot}.`, 'info');
  };

  const handleClearSlot = (slot) => {
    setBuilderSlots(prev => ({
      ...prev,
      [slot]: null
    }));
    showToast(`Cleared ${slot} slot.`, 'info');
  };

  const handleSaveOutfit = (e) => {
    e.preventDefault();
    if (!outfitForm.name) {
      showToast('Please provide an outfit name.', 'error');
      return;
    }
    if (!builderSlots.top || !builderSlots.bottom || !builderSlots.shoes) {
      showToast('Please select all 3 components first.', 'error');
      return;
    }

    const savedOutfit = {
      id: 'outfit-' + Date.now(),
      name: outfitForm.name,
      season: outfitForm.season,
      items: {
        top: builderSlots.top.id,
        bottom: builderSlots.bottom.id,
        shoes: builderSlots.shoes.id
      }
    };

    updateOutfits([savedOutfit, ...outfits]);
    setBuilderSlots({ top: null, bottom: null, shoes: null });
    setOutfitForm({ name: '', season: 'All Seasons' });
    showToast(`Outfit "${savedOutfit.name}" saved successfully!`);
  };

  // Trip planner Generator
  const handleGenerateTrip = (e) => {
    e.preventDefault();
    if (!tripForm.name) {
      showToast('Please enter a trip destination name.', 'error');
      return;
    }

    // Filter outfits matching the season
    // "All Seasons" outfit works for all trips. "All Seasons" trip works for all outfits.
    const matching = outfits.filter(outfit => {
      if (tripForm.season === 'All Seasons' || outfit.season === 'All Seasons') {
        return true;
      }
      return outfit.season === tripForm.season;
    });

    setGeneratedTripOutfits(matching);
    setIsTripGenerated(true);
    showToast(`Generated ${matching.length} matching outfits for your trip to ${tripForm.name}!`);
  };

  // Support Form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      showToast('Please complete all form fields.', 'error');
      return;
    }
    showToast('Your message has been sent to our support team!', 'success');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  // Calculations for dashboard
  const totalItemsCount = items.length;
  const totalOutfitsCount = outfits.length;

  const averageCPW = (() => {
    if (items.length === 0) return 0;
    const validItems = items.filter(item => item.price !== undefined);
    if (validItems.length === 0) return 0;

    const sumCPW = validItems.reduce((acc, item) => {
      const wears = Math.max(item.wears || 0, 1); // treating 0 wears as 1 to reflect base item cost
      return acc + (item.price / wears);
    }, 0);
    return sumCPW / validItems.length;
  })();

  // Filter items for Wardrobe view
  const filteredItems = items.filter(item => {
    const categoryMatch = inventoryFilters.category === 'All' || item.category === inventoryFilters.category;
    const seasonMatch = inventoryFilters.season === 'All' || item.season === inventoryFilters.season;
    return categoryMatch && seasonMatch;
  });

  // Filter items for Cost Tracker
  const sortedCostItems = [...items]
    .filter(item => {
      return costFilterCategory === 'All' || item.category === costFilterCategory;
    })
    .map(item => {
      const wears = Math.max(item.wears || 0, 1);
      return {
        ...item,
        cpw: item.price / wears
      };
    })
    .sort((a, b) => a.cpw - b.cpw); // sorting ascending order (best value first)

  // Sub-Navigation items
  const navItems = [
    { label: 'Dashboard', hash: '#dashboard', icon: LayoutDashboard },
    { label: 'Wardrobe Grid', hash: '#inventory', icon: Shirt },
    { label: 'Outfit Builder', hash: '#builder', icon: Sparkles },
    { label: 'Cost Tracker', hash: '#tracker', icon: DollarSign },
    { label: 'Trip Planner', hash: '#planner', icon: Compass },
    { label: 'Support & Help', hash: '#contact', icon: Mail }
  ];

  // Helper to count builder progress
  const selectedCount = [builderSlots.top, builderSlots.bottom, builderSlots.shoes].filter(Boolean).length;

  return (
    <div className="pt-24 min-h-screen bg-background pb-20 px-4 md:px-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-20 right-4 md:right-8 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 text-white font-medium ${
              toast.type === 'error' ? 'bg-red-600' : toast.type === 'info' ? 'bg-accent' : 'bg-green-600'
            }`}
          >
            <Check className="w-5 h-5" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              Wardrobe <span className="text-secondary">Organizer</span>
            </h1>
            <p className="text-gray-500 mt-2">
              Optimize your garments, budget clothes, design outfits, and schedule trips.
            </p>
          </div>
          
          {/* Sub-nav mobile hamburger toggle */}
          <div className="md:hidden flex self-start">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow border border-gray-200 text-primary font-semibold"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <span>Navigate Organizer</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation (Responsive Hamburger & Inline Tabs) */}
        <div className="relative mb-10">
          {/* Desktop Tab Bar */}
          <div className="hidden md:flex flex-wrap gap-2 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.hash;
              return (
                <a
                  key={item.hash}
                  href={item.hash}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-textMain hover:bg-gray-50 hover:text-secondary'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Tab Drawer/Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-30 top-12 left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col gap-2 md:hidden"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.hash;
                  return (
                    <a
                      key={item.hash}
                      href={item.hash}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'text-textMain hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modules Rendering */}
        <div className="min-h-[500px]">
          {/* ========================================================================= */}
          {/* DASHBOARD MODULE */}
          {/* ========================================================================= */}
          {activeTab === '#dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Counters and Averages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Garments Owned</span>
                    <h2 className="text-5xl font-extrabold text-primary mt-2">{totalItemsCount}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-6 flex items-center gap-1.5">
                    <Shirt className="w-4 h-4 text-secondary" />
                    Manage catalog in the Wardrobe tab
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Saved Outfits</span>
                    <h2 className="text-5xl font-extrabold text-primary mt-2">{totalOutfitsCount}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-6 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    Design style blocks in Outfit Builder
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Average Cost Per Wear (CPW)</span>
                    <h2 className="text-5xl font-extrabold text-accent mt-2">${averageCPW.toFixed(2)}</h2>
                  </div>
                  <div className="text-xs text-gray-400 mt-6 flex items-start gap-1">
                    <Info className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                    <span>Average price of an item divided by its wears. Add wears to lower this!</span>
                  </div>
                </div>
              </div>

              {/* Wardrobe Breakdown & Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Category Distribution */}
                <div className="glass p-8 rounded-3xl border border-gray-100 flex flex-col">
                  <h3 className="text-xl font-extrabold text-primary mb-6 flex items-center gap-2">
                    <Layers className="text-secondary" />
                    Category Breakdown
                  </h3>
                  <div className="space-y-5 flex-grow justify-center flex flex-col">
                    {['Top', 'Bottom', 'Shoes', 'Accessory'].map(cat => {
                      const count = items.filter(i => i.category === cat).length;
                      const percentage = totalItemsCount > 0 ? (count / totalItemsCount) * 100 : 0;
                      return (
                        <div key={cat} className="space-y-2">
                          <div className="flex justify-between text-sm font-bold text-textMain">
                            <span>{cat}s</span>
                            <span>{count} ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full transition-all duration-1000" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Tips / Health score */}
                <div className="glass p-8 rounded-3xl border border-gray-100 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-primary mb-4 flex items-center gap-2">
                      <TrendingUp className="text-accent" />
                      Wardrobe Financial Health
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Based on your clothing usage, we calculate the efficiency score of your closet.
                    </p>
                    
                    <div className="p-5 bg-white/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        A+
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">High Efficiency Wardrobe</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          You wear your items frequently. Continue logging wears to optimize your Cost Per Wear statistics.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/40 rounded-2xl text-center border border-gray-100">
                      <span className="text-xs font-bold text-gray-400 uppercase">Most Worn</span>
                      <p className="font-bold text-primary text-sm mt-1 truncate">
                        {items.reduce((max, i) => (i.wears > (max.wears || 0) ? i : max), {}).name || 'No items'}
                      </p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-2xl text-center border border-gray-100">
                      <span className="text-xs font-bold text-gray-400 uppercase">Best Investment</span>
                      <p className="font-bold text-primary text-sm mt-1 truncate">
                        {sortedCostItems.length > 0 ? sortedCostItems[0].name : 'No items'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* WARDROBE MANAGEMENT (INVENTORY) MODULE */}
          {/* ========================================================================= */}
          {activeTab === '#inventory' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Toolbar: Filters and Add Item Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Info size={16} />
                    <span className="text-xs font-semibold uppercase tracking-wider">Filters:</span>
                  </div>
                  {/* Category Filter */}
                  <select
                    value={inventoryFilters.category}
                    onChange={(e) => setInventoryFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="px-3 py-2 bg-background border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Top">Tops</option>
                    <option value="Bottom">Bottoms</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessory">Accessories</option>
                  </select>

                  {/* Season Filter */}
                  <select
                    value={inventoryFilters.season}
                    onChange={(e) => setInventoryFilters(prev => ({ ...prev, season: e.target.value }))}
                    className="px-3 py-2 bg-background border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  >
                    <option value="All">All Seasons</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                    <option value="All Seasons">All Seasons (Seasonless)</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full sm:w-auto bg-primary hover:bg-black text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Plus size={18} />
                  <span>Add New Item</span>
                </button>
              </div>

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
                  <Shirt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-2">No Items Found</h3>
                  <p className="text-gray-500 text-sm">
                    No garments match the current filters. Adjust your filters or add a new piece to get started!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map(item => {
                    const singleCPW = item.price / Math.max(item.wears || 0, 1);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                      >
                        {/* Dummy Card Header to serve as placeholder image */}
                        <div className="h-28 bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center relative">
                          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-primary">
                            {item.category}
                          </span>
                          <span className="absolute top-3 right-3 bg-primary text-white px-2.5 py-1 rounded-full text-xs font-bold">
                            {item.season}
                          </span>
                          <Shirt className="w-12 h-12 text-primary/30" />
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-extrabold text-primary text-lg truncate mb-1">{item.name}</h4>
                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                              <span>Color: <strong>{item.color}</strong></span>
                              <span>Price: <strong>${item.price.toFixed(2)}</strong></span>
                            </div>
                            
                            {/* Analytics info inside item */}
                            <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1 mb-4">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Total Wears:</span>
                                <span className="font-bold text-primary">{item.wears || 0}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Cost Per Wear:</span>
                                <span className="font-bold text-accent">${singleCPW.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLogWear(item.id)}
                              className="flex-grow bg-secondary hover:bg-amber-500 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1"
                            >
                              Log Wear (+1)
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-all border border-red-100"
                              title="Delete Item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Add Item Modal */}
              <AnimatePresence>
                {isAddModalOpen && (
                  <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                      <div className="bg-primary text-white p-6 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Add New Wardrobe Item</h3>
                        <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>

                      <form onSubmit={handleAddItem} className="p-6 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Slim Denim Jacket"
                            value={newItem.name}
                            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                            <select
                              value={newItem.category}
                              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                            >
                              <option value="Top">Top</option>
                              <option value="Bottom">Bottom</option>
                              <option value="Shoes">Shoes</option>
                              <option value="Accessory">Accessory</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Season</label>
                            <select
                              value={newItem.season}
                              onChange={(e) => setNewItem(prev => ({ ...prev, season: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                            >
                              <option value="All Seasons">All Seasons</option>
                              <option value="Summer">Summer</option>
                              <option value="Winter">Winter</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Color *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Dark Blue"
                              value={newItem.color}
                              onChange={(e) => setNewItem(prev => ({ ...prev, color: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price ($) *</label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              required
                              placeholder="49.99"
                              value={newItem.price}
                              onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Initial Wears Count</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={newItem.wears}
                            onChange={(e) => setNewItem(prev => ({ ...prev, wears: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                          />
                        </div>

                        <div className="pt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 border border-gray-200 font-bold py-3 rounded-xl text-sm hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-primary text-white font-bold py-3 rounded-xl text-sm hover:bg-black transition-colors"
                          >
                            Save Item
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* OUTFIT BUILDER MODULE */}
          {/* ========================================================================= */}
          {activeTab === '#builder' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Builder slots (left/middle) */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Sparkles className="text-secondary" />
                    Assemble Fit
                  </h3>
                  {/* Progress tracker */}
                  <span className="px-3.5 py-1.5 bg-gray-100 text-gray-600 rounded-full font-bold text-xs uppercase tracking-wider">
                    Progress: {selectedCount}/3 items
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-secondary h-full transition-all duration-300"
                    style={{ width: `${(selectedCount / 3) * 100}%` }}
                  />
                </div>

                {/* Slots: Top, Bottom, Shoes */}
                <div className="space-y-4 pt-4">
                  {/* TOP Slot */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                    <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                      Top
                    </div>
                    <div className="flex-grow min-w-0">
                      {builderSlots.top ? (
                        <div>
                          <h4 className="font-bold text-primary truncate text-sm">{builderSlots.top.name}</h4>
                          <span className="text-xs text-gray-500">Color: {builderSlots.top.color} &bull; ${builderSlots.top.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Select a shirt, jacket, or dress</span>
                      )}
                    </div>
                    {builderSlots.top ? (
                      <button onClick={() => handleClearSlot('top')} className="text-red-500 hover:text-red-700 p-2 text-xs font-bold">Remove</button>
                    ) : (
                      <button
                        onClick={() => openSelectionModal('top')}
                        className="bg-primary hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        Choose Item
                      </button>
                    )}
                  </div>

                  {/* BOTTOM Slot */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                    <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                      Bottom
                    </div>
                    <div className="flex-grow min-w-0">
                      {builderSlots.bottom ? (
                        <div>
                          <h4 className="font-bold text-primary truncate text-sm">{builderSlots.bottom.name}</h4>
                          <span className="text-xs text-gray-500">Color: {builderSlots.bottom.color} &bull; ${builderSlots.bottom.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Select pants, shorts, or jeans</span>
                      )}
                    </div>
                    {builderSlots.bottom ? (
                      <button onClick={() => handleClearSlot('bottom')} className="text-red-500 hover:text-red-700 p-2 text-xs font-bold">Remove</button>
                    ) : (
                      <button
                        onClick={() => openSelectionModal('bottom')}
                        className="bg-primary hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        Choose Item
                      </button>
                    )}
                  </div>

                  {/* SHOES Slot */}
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
                    <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                      Shoes
                    </div>
                    <div className="flex-grow min-w-0">
                      {builderSlots.shoes ? (
                        <div>
                          <h4 className="font-bold text-primary truncate text-sm">{builderSlots.shoes.name}</h4>
                          <span className="text-xs text-gray-500">Color: {builderSlots.shoes.color} &bull; ${builderSlots.shoes.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Select sneakers, boots, or heels</span>
                      )}
                    </div>
                    {builderSlots.shoes ? (
                      <button onClick={() => handleClearSlot('shoes')} className="text-red-500 hover:text-red-700 p-2 text-xs font-bold">Remove</button>
                    ) : (
                      <button
                        onClick={() => openSelectionModal('shoes')}
                        className="bg-primary hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        Choose Item
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Outfit Form (right) */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-4 mb-6">Save Style Block</h3>
                  {selectedCount < 3 ? (
                    <div className="text-center py-10 text-gray-400 space-y-2">
                      <Info className="mx-auto text-gray-300" size={32} />
                      <p className="text-sm">Complete selecting top, bottom, and shoes to unlock outfit saving form.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveOutfit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Outfit Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. High Street Casual"
                          value={outfitForm.name}
                          onChange={(e) => setOutfitForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ideal Season</label>
                        <select
                          value={outfitForm.season}
                          onChange={(e) => setOutfitForm(prev => ({ ...prev, season: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                          <option value="All Seasons">All Seasons</option>
                          <option value="Summer">Summer</option>
                          <option value="Winter">Winter</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-secondary hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md mt-4"
                      >
                        Save Outfit Structure
                      </button>
                    </form>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Packing & Travel Tip</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Saving outfits binds garments into matching packs which can be auto-loaded during vacation packing in the Trip Planner module.
                  </p>
                </div>
              </div>

              {/* Slot Selection Modal (renders in place) */}
              <AnimatePresence>
                {isSelectionModalOpen && (
                  <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                      <div className="bg-primary text-white p-6 flex justify-between items-center">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Shirt size={20} />
                          <span>Select {activeSelectionSlot}</span>
                        </h3>
                        <button onClick={() => setIsSelectionModalOpen(false)} className="text-white/80 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="p-6 max-h-[400px] overflow-y-auto space-y-3">
                        {items.filter(item => item.category.toLowerCase() === activeSelectionSlot.toLowerCase()).length === 0 ? (
                          <div className="text-center py-10 text-gray-400">
                            <p>No items found for category "{activeSelectionSlot}". Add some in the Wardrobe tab.</p>
                          </div>
                        ) : (
                          items
                            .filter(item => item.category.toLowerCase() === activeSelectionSlot.toLowerCase())
                            .map(item => (
                              <div
                                key={item.id}
                                onClick={() => handleSelectItemForSlot(item)}
                                className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer border border-gray-100 transition-colors"
                              >
                                <div>
                                  <h4 className="font-bold text-primary text-sm">{item.name}</h4>
                                  <span className="text-xs text-gray-500">Color: {item.color} &bull; Season: {item.season}</span>
                                </div>
                                <div className="text-right">
                                  <span className="font-bold text-primary text-sm block">${item.price.toFixed(2)}</span>
                                  <span className="text-xs text-accent">Wears: {item.wears}</span>
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* COST TRACKER MODULE */}
          {/* ========================================================================= */}
          {activeTab === '#tracker' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6"
            >
              {/* Header and filters */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <DollarSign className="text-accent" />
                    CPW Financial Dashboard
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Sorted by Cost Per Wear in ascending order. Best investments first!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Show:</span>
                  <select
                    value={costFilterCategory}
                    onChange={(e) => setCostFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-background border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Top">Tops</option>
                    <option value="Bottom">Bottoms</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessory">Accessories</option>
                  </select>
                </div>
              </div>

              {/* Table / Breakdown */}
              {sortedCostItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>No items found. Add items to track their investment status.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold tracking-wider">
                        <th className="py-4 px-4">Garment</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Base Price</th>
                        <th className="py-4 px-4">Times Worn</th>
                        <th className="py-4 px-4">Cost Per Wear</th>
                        <th className="py-4 px-4">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCostItems.map(item => {
                        const efficiency = item.cpw < 5 ? 'Excellent' : item.cpw < 15 ? 'Good' : 'Needs Wears';
                        return (
                          <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4 font-bold text-primary">{item.name}</td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                {item.category}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-semibold text-gray-600">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-4 font-semibold text-gray-600">{item.wears || 0} wears</td>
                            <td className="py-4 px-4 font-extrabold text-accent">${item.cpw.toFixed(2)}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                efficiency === 'Excellent' 
                                  ? 'bg-green-50 text-green-700' 
                                  : efficiency === 'Good'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-red-50 text-red-700'
                              }`}>
                                {efficiency}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TRIP PLANNER MODULE */}
          {/* ========================================================================= */}
          {activeTab === '#planner' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Trip Form (left/middle) */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-4">Trip Configurator</h3>
                <form onSubmit={handleGenerateTrip} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Trip Destination / Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bahamas Cruise, Alps Skiing"
                      value={tripForm.name}
                      onChange={(e) => setTripForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Anticipated Weather Season</label>
                    <select
                      value={tripForm.season}
                      onChange={(e) => setTripForm(prev => ({ ...prev, season: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="All Seasons">All Seasons</option>
                      <option value="Summer">Summer (Warm & Sunny)</option>
                      <option value="Winter">Winter (Chilly & Cold)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-black text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Compass size={18} />
                    <span>Generate Packing List</span>
                  </button>
                </form>
              </div>

              {/* Trip Suggestions & Packing Breakdown (right) */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-4">Suggested Looks & Outfits</h3>

                {!isTripGenerated ? (
                  <div className="text-center py-16 text-gray-400 space-y-2">
                    <Compass className="mx-auto text-gray-300" size={36} />
                    <p className="text-sm">Configure your trip on the left to pull corresponding styles.</p>
                  </div>
                ) : generatedTripOutfits.length === 0 ? (
                  <div className="bg-amber-50 border border-amber-100 text-amber-700 p-6 rounded-2xl text-sm leading-relaxed">
                    <p className="font-bold mb-1">No Matching Outfits Found</p>
                    <p>We couldn't find any saved outfits configured for the <strong>{tripForm.season}</strong> season. Head over to the <strong>Outfit Builder</strong> tab to create and save some first!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-green-50/50 border border-green-100 text-green-700 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Found {generatedTripOutfits.length} matched looks for {tripForm.name} ({tripForm.season}).</span>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto">
                      {generatedTripOutfits.map(outfit => {
                        const topItem = items.find(i => i.id === outfit.items.top);
                        const bottomItem = items.find(i => i.id === outfit.items.bottom);
                        const shoesItem = items.find(i => i.id === outfit.items.shoes);

                        return (
                          <div key={outfit.id} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-bold text-primary text-sm">{outfit.name}</h4>
                              <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                {outfit.season}
                              </span>
                            </div>
                            
                            {/* Packing Breakdown */}
                            <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-gray-100">
                              <div className="text-xs">
                                <span className="text-gray-400 block font-semibold text-[10px] uppercase">Top</span>
                                <span className="font-bold text-textMain truncate block">{topItem ? topItem.name : 'Deleted Item'}</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-400 block font-semibold text-[10px] uppercase">Bottom</span>
                                <span className="font-bold text-textMain truncate block">{bottomItem ? bottomItem.name : 'Deleted Item'}</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-400 block font-semibold text-[10px] uppercase">Shoes</span>
                                <span className="font-bold text-textMain truncate block">{shoesItem ? shoesItem.name : 'Deleted Item'}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* CONTACT MODULE */}
          {/* ========================================================================= */}
          {activeTab === '#contact' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Form */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                  <Mail className="text-secondary" />
                  Support Desk
                </h3>
                <p className="text-gray-500 text-sm mb-6">Need help with organizing your wardrobe? Send us a ticket.</p>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@example.com" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Feature request, bug reporting..." 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea 
                      rows="4" 
                      required
                      placeholder="Explain how we can help..." 
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none" 
                    ></textarea>
                  </div>
                  <button className="w-full bg-primary hover:bg-black text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md mt-2">
                    Send Help Request
                  </button>
                </form>
              </div>

              {/* Map & Office Coordinates */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between">
                <div className="h-72 bg-gray-100 relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531550415!3d-37.81720974202164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1614736025132!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="StyleSphere HQ Map"
                  ></iframe>
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="text-lg font-extrabold text-primary">Headquarters</h4>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p className="flex items-center gap-2"><MapPin size={16} className="text-secondary flex-shrink-0" /> 123 Fashion Ave, Style City, NY 10001</p>
                    <p className="flex items-center gap-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p className="flex items-center gap-2"><strong>Support Email:</strong> contact@stylesphere.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;
