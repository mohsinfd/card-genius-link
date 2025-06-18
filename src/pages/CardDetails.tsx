import React from 'react';
import { useParams } from 'react-router-dom';
import { useCardData } from '../contexts/CardDataContext';
import { toast } from '../components/ui/use-toast';

const CardDetails: React.FC = () => {
  const { id } = useParams();
  const { getCardById } = useCardData();
  const card = id ? getCardById(id) : undefined;

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Card not found.</p>
      </div>
    );
  }

  const handleCopyLink = () => {
    const link = `https://example.com/ref/${card.id}`;
    navigator.clipboard.writeText(link);
    toast({ title: 'Affiliate link copied!' });
  };

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-cg-card p-6 rounded-cg-lg shadow-cg-card">
          <div className="w-full h-32 bg-gradient-to-br from-cg-violet to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">
              {card.name.split(' ')[0]}
            </span>
          </div>
          <h2 className="font-heading font-semibold text-2xl mb-2">{card.name}</h2>
          <p className="text-cg-muted mb-4">{card.tagline}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Rewards</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Default: {card.rewardRates.default}%</li>
              {card.rewardRates.online && (
                <li>Online: {card.rewardRates.online}%</li>
              )}
              {card.rewardRates.travel && (
                <li>Travel: {card.rewardRates.travel}%</li>
              )}
              {card.rewardRates.fuel && (
                <li>Fuel: {card.rewardRates.fuel}%</li>
              )}
            </ul>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full bg-gradient-orange text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Copy affiliate link
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
