import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../contexts/CollectionContext';
import { useCardData } from '../contexts/CardDataContext';
import CardItem from '../components/CardItem';
import { Card } from '../data/cards';

const Collection = () => {
  const navigate = useNavigate();
  const { savedCards } = useCollection();
  const { getCardById } = useCardData();

  const cards: Card[] = savedCards
    .map(id => getCardById(id))
    .filter((card): card is Card => Boolean(card));

  const handleCardClick = (card: Card) => {
    navigate(`/cards/${card.id}`);
  };

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-heading font-bold text-2xl mb-6">My Collection</h1>
        {cards.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-heading font-semibold text-xl mb-2">No cards saved</h3>
            <p className="text-cg-muted">Add cards to your collection to see them here.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(card => (
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
  );
};

export default Collection;
