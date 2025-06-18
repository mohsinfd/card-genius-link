
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardData } from '../contexts/CardDataContext';
import { useFilters } from '../contexts/FilterContext';
import { Card } from '../data/cards';
import CardItem from '../components/CardItem';
import { Search, Filter, X } from 'lucide-react';

const Cards = () => {
  const navigate = useNavigate();
  const { cards } = useCardData();
  const { filters, updateFilters, clearFilters } = useFilters();
  const [showFilters, setShowFilters] = useState(false);

  const filteredCards = useMemo(() => {
    const result = cards.filter((card: Card) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!card.name.toLowerCase().includes(searchLower) && 
            !card.tagline.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Lifetime free filter
      if (filters.lifetimeFreeOnly && !card.isLifetimeFree) {
        return false;
      }

      // Rent rewards filter
      if (filters.rentRewardsAllowed && !card.rentRewardsAllowed) {
        return false;
      }

      // Annual fee ranges
      if (filters.annualFeeRanges.length > 0) {
        const matchesFeeRange = filters.annualFeeRanges.some(range => {
          switch (range) {
            case '₹0': return card.annualFee === 0;
            case '₹1-999': return card.annualFee > 0 && card.annualFee < 1000;
            case '≥₹1k': return card.annualFee >= 1000;
            default: return true;
          }
        });
        if (!matchesFeeRange) return false;
      }

      // Lounge access filter
      if (filters.loungeAccess.length > 0) {
        const matchesLounge = filters.loungeAccess.some(access => {
          switch (access) {
            case 'None': return card.loungeAccess === 'None' || card.loungeAccess === '—';
            case '4/yr': return card.loungeAccess.includes('4');
            case 'Unlimited': return card.loungeAccess.includes('Unlimited');
            default: return true;
          }
        });
        if (!matchesLounge) return false;
      }

      return true;
    });

    return result.sort((a, b) =>
      filters.sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [cards, filters]);

  const handleCardClick = (card: Card) => {
    navigate(`/cards/${card.id}`);
  };

  const toggleFilter = (filterType: string, value: string) => {
    if (filterType === 'annualFeeRanges') {
      const currentRanges = filters.annualFeeRanges;
      const newRanges = currentRanges.includes(value)
        ? currentRanges.filter(r => r !== value)
        : [...currentRanges, value];
      updateFilters({ annualFeeRanges: newRanges });
    } else if (filterType === 'loungeAccess') {
      const currentAccess = filters.loungeAccess;
      const newAccess = currentAccess.includes(value)
        ? currentAccess.filter(a => a !== value)
        : [...currentAccess, value];
      updateFilters({ loungeAccess: newAccess });
    }
  };

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 bg-cg-card rounded-lg shadow-sm hover:shadow-md transition-shadow md:hidden"
          >
            <Filter className="w-5 h-5 text-cg-violet" />
          </button>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cg-muted" />
            <input
              type="text"
              placeholder="Search cards or perks…"
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-cg-card rounded-lg border-0 shadow-sm focus:shadow-md focus:outline-none transition-shadow"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-80 bg-cg-card rounded-lg p-6 shadow-cg-card h-fit animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-lg">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-cg-muted hover:text-cg-dark text-sm"
              >
                Clear All
              </button>
            </div>

            {/* Switches */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Quick Filters</h4>
              <label className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={filters.lifetimeFreeOnly}
                  onChange={(e) => updateFilters({ lifetimeFreeOnly: e.target.checked })}
                  className="rounded"
                />
                <span>Lifetime-Free only</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filters.rentRewardsAllowed}
                  onChange={(e) => updateFilters({ rentRewardsAllowed: e.target.checked })}
                  className="rounded"
                />
                <span>Rent rewards allowed</span>
              </label>
            </div>

            {/* Annual Fee */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Annual Fee</h4>
              {['₹0', '₹1-999', '≥₹1k'].map(range => (
                <label key={range} className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.annualFeeRanges.includes(range)}
                    onChange={() => toggleFilter('annualFeeRanges', range)}
                    className="rounded"
                  />
                  <span>{range}</span>
                </label>
              ))}
            </div>

            {/* Lounge Access */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Lounge Access</h4>
              {['None', '4/yr', 'Unlimited'].map(access => (
                <label key={access} className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.loungeAccess.includes(access)}
                    onChange={() => toggleFilter('loungeAccess', access)}
                    className="rounded"
                  />
                  <span>{access}</span>
                </label>
              ))}
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Sort By</h4>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
                }
                className="w-full p-2 border rounded"
              >
                <option value="asc">Name A-Z</option>
                <option value="desc">Name Z-A</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1">
            {filteredCards.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">No cards match</h3>
                <p className="text-cg-muted mb-4">Try clearing some filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-cg-violet text-white px-6 py-2 rounded-lg hover:bg-cg-violet/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCards.map((card) => (
                  <CardItem
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-4/5 bg-cg-card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-xl">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Same filter content as desktop but in mobile drawer */}
            <div className="space-y-6">
              {/* Quick Filters */}
              <div>
                <h4 className="font-semibold mb-3">Quick Filters</h4>
                <label className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.lifetimeFreeOnly}
                    onChange={(e) => updateFilters({ lifetimeFreeOnly: e.target.checked })}
                    className="rounded"
                  />
                  <span>Lifetime-Free only</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filters.rentRewardsAllowed}
                    onChange={(e) => updateFilters({ rentRewardsAllowed: e.target.checked })}
                    className="rounded"
                  />
                  <span>Rent rewards allowed</span>
                </label>
              </div>

              {/* Annual Fee */}
              <div>
                <h4 className="font-semibold mb-3">Annual Fee</h4>
                {['₹0', '₹1-999', '≥₹1k'].map(range => (
                  <label key={range} className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={filters.annualFeeRanges.includes(range)}
                      onChange={() => toggleFilter('annualFeeRanges', range)}
                      className="rounded"
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>

              {/* Lounge Access */}
              <div>
                <h4 className="font-semibold mb-3">Lounge Access</h4>
                {['None', '4/yr', 'Unlimited'].map(access => (
                  <label key={access} className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={filters.loungeAccess.includes(access)}
                      onChange={() => toggleFilter('loungeAccess', access)}
                      className="rounded"
                    />
                    <span>{access}</span>
                  </label>
                ))}
              </div>

              {/* Sort By */}
              <div>
                <h4 className="font-semibold mb-3">Sort By</h4>
                <select
                  value={filters.sortOrder}
                  onChange={(e) =>
                    updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="asc">Name A-Z</option>
                  <option value="desc">Name Z-A</option>
                </select>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-cg-violet text-white py-3 rounded-lg font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
