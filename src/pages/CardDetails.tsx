import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCardData } from '../contexts/CardDataContext';
import { useCollection } from '../contexts/CollectionContext';
import { useToast } from '../hooks/use-toast';
import { trackEvent } from '../lib/analytics';

const CardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cards } = useCardData();
  const card = cards.find(c => c.id === id);
  const navigate = useNavigate();
  const { isInCollection, addToCollection, removeFromCollection } = useCollection();
  const { toast } = useToast();

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cg-muted">Card not found.</p>
      </div>
    );
  }

  const inCollection = isInCollection(card.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://example.com/offer/${card.id}`);
    toast({ description: 'Affiliate link copied to clipboard.' });
    trackEvent('copy_link', { id: card.id });
  };

  const toggleCollection = () => {
    if (inCollection) {
      removeFromCollection(card.id);
    } else {
      addToCollection(card.id);
    }
  };

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <button onClick={() => navigate(-1)} className="text-cg-violet">Back</button>
        <div className="bg-cg-card p-6 rounded-lg shadow-cg-card">
          <div className="flex gap-4 items-center mb-4">
            <img src={card.image} alt={card.name} className="w-20 h-12 object-contain rounded-lg bg-white" />
            <div>
              <h1 className="font-heading text-xl font-semibold">{card.name}</h1>
              <p className="text-cg-muted">{card.tagline}</p>
            </div>
          </div>
          <p className="text-sm mb-4">Annual fee: ₹{card.annualFee}</p>
          <button
            onClick={handleCopyLink}
            className="w-full bg-gradient-orange text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow mb-3"
          >
            Copy Affiliate Link
          </button>
          <button
            onClick={toggleCollection}
            className="w-full bg-cg-violet text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow"
          >
            {inCollection ? 'Remove from Collection' : 'Add to Collection'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
