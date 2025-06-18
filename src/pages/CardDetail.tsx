import React from 'react';
import { useParams } from 'react-router-dom';
import { useCardData } from '../contexts/CardDataContext';
import { useToast } from '../hooks/use-toast';
import { useCollection } from '../contexts/CollectionContext';
import { Heart } from 'lucide-react';
import CardTag from '../components/CardTag';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCardById } = useCardData();
  const card = id ? getCardById(id) : undefined;
  const { isInCollection, addToCollection, removeFromCollection } = useCollection();
  const { toast } = useToast();

  if (!card) {
    return <div className="p-4">Card not found</div>;
  }

  const inCollection = isInCollection(card.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/cards/${card.id}`);
    toast({ title: 'Link copied!' });
  };

  const handleCollectionToggle = () => {
    if (inCollection) {
      removeFromCollection(card.id);
    } else {
      addToCollection(card.id);
    }
  };

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-12 bg-gradient-to-br from-cg-violet to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{card.name.split(' ')[0]}</span>
          </div>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-2xl mb-1">{card.name}</h1>
            <p className="text-cg-muted mb-2">{card.tagline}</p>
            <CardTag card={card} />
          </div>
          <button
            onClick={handleCollectionToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={`${inCollection ? 'Remove from' : 'Add to'} collection`}
          >
            <Heart className={`w-5 h-5 ${inCollection ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        <div className="mb-8">
          <h2 className="font-heading font-semibold text-lg mb-2">Details</h2>
          <ul className="text-sm text-cg-dark list-disc ml-5 space-y-1">
            <li>Annual fee: ₹{card.annualFee}</li>
            <li>Lounge access: {card.loungeAccess}</li>
            <li>Welcome bonus: {card.welcomeBonus}</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleCopyLink}
            className="w-full bg-gradient-orange text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow"
          >
            Copy Referral Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
