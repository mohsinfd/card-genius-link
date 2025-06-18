
import React from 'react';
import { Link } from 'react-router-dom';
import { useCardData } from '../contexts/CardDataContext';
import CardItem from '../components/CardItem';
import { ArrowRight, Search, CreditCard, DollarSign } from 'lucide-react';

const Index = () => {
  const { cards } = useCardData();
  const topCards = cards.slice(0, 4);

  return (
    <div className="min-h-screen bg-cg-bg">
      {/* Hero Section */}
      <section className="bg-gradient-violet text-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Turn Card Data into Profit 💸
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Instant research · easy comparisons · affiliate earnings
          </p>
          <Link
            to="/cards"
            className="inline-flex items-center gap-2 bg-gradient-orange text-white px-8 py-4 rounded-cg-lg font-semibold text-lg hover:shadow-lg transition-shadow"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cg-card p-6 rounded-cg-lg shadow-cg-card text-center animate-fade-in">
              <div className="w-16 h-16 bg-cg-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-cg-violet" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Search & Slice</h3>
              <p className="text-cg-muted">Filter 50+ attributes to find the perfect cards for your audience</p>
            </div>

            <div className="bg-cg-card p-6 rounded-cg-lg shadow-cg-card text-center animate-fade-in">
              <div className="w-16 h-16 bg-cg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-cg-orange" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Curate & Compare</h3>
              <p className="text-cg-muted">Save favourites and compare side-by-side with one tap</p>
            </div>

            <div className="bg-cg-card p-6 rounded-cg-lg shadow-cg-card text-center animate-fade-in">
              <div className="w-16 h-16 bg-cg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-cg-mint" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Earn Profit ₹X</h3>
              <p className="text-cg-muted">Auto-generated referral links with transparent commission tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cards Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-center mb-12">Top Cards to Promote</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCards.map((card) => (
              <div key={card.id} className="transform hover:scale-105 transition-transform">
                <Link
                  to={`/cards/${card.id}`}
                  onClick={() =>
                    window.plausible?.('Card Click', {
                      props: { cardName: card.name },
                    })
                  }
                >
                  <div className="bg-cg-card p-4 rounded-cg-lg shadow-cg-card">
                    <div className="w-full h-24 bg-gradient-to-br from-cg-violet to-purple-600 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-white font-bold">{card.name.split(' ')[0]}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{card.name}</h3>
                    <p className="text-sm text-cg-muted mb-3">{card.tagline}</p>
                    <div className="bg-gradient-orange text-white py-2 px-3 rounded-lg text-center text-sm font-semibold">
                      Earn Profit ₹{card.affiliatePayout}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cg-dark text-white py-12 px-4 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/70 mb-4">
            Rewards & features may change. Always verify with issuer.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
