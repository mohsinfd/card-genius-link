
import React from 'react';
import { Card } from '../data/cards';
import { useCollection } from '../contexts/CollectionContext';
import { Heart } from 'lucide-react';
import CardTag from './CardTag';
import { Skeleton } from './ui/skeleton';

interface CardItemProps {
  card: Card;
  onClick?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick }) => {
  const { isInCollection, addToCollection, removeFromCollection } = useCollection();
  const inCollection = isInCollection(card.id);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  const handleCollectionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCollection) {
      removeFromCollection(card.id);
    } else {
      addToCollection(card.id);
    }
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // For demo purposes, just show an alert
    alert(`Affiliate link for ${card.name} copied!`);
  };

  return (
    <div
      className="bg-cg-card p-4 rounded-cg-md shadow-cg-card cursor-pointer hover:shadow-lg transition-shadow transform transition-transform hover:scale-105 hover:opacity-95 animate-fade-in"
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Card Image */}
        <div className="relative w-16 h-10 flex-shrink-0">
          {!imgLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
          )}
          <img
            src={card.image}
            alt={`${card.name} logo`}
            className={`w-16 h-10 object-contain rounded-lg bg-white transition-opacity ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Card Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-heading font-semibold text-cg-dark truncate">{card.name}</h3>
              <p className="text-sm text-cg-muted mb-2">{card.tagline}</p>
            </div>
            
            <button
              onClick={handleCollectionToggle}
              className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={`${inCollection ? 'Remove from' : 'Add to'} collection`}
            >
              <Heart 
                className={`w-5 h-5 ${inCollection ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </button>
          </div>

          <CardTag card={card} />
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handleCTAClick}
          className="w-full bg-gradient-orange text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow"
        >
          Earn Profit ₹{card.affiliatePayout}
        </button>
      </div>
    </div>
  );
};

export default CardItem;
