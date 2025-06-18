
export interface Card {
  id: string;
  name: string;
  image: string;
  tagline: string;
  annualFee: number;
  isLifetimeFree: boolean;
  rewardRates: {
    default: number;
    online?: number;
    travel?: number;
    fuel?: number;
  };
  loungeAccess: string;
  welcomeBonus: string;
  rentRewardsAllowed: boolean;
  affiliatePayout: number;
}

export const cards: Card[] = [
  {
    id: "axis-magnus",
    name: "Axis Magnus",
    image: "/img/magnus.svg",
    tagline: "Unlimited lounges · High points",
    annualFee: 10000,
    isLifetimeFree: false,
    rewardRates: { default: 1, online: 5, travel: 5 },
    loungeAccess: "Unlimited domestic & international",
    welcomeBonus: "Flight voucher worth ₹10k on ₹1L in 90 days",
    rentRewardsAllowed: false,
    affiliatePayout: 700
  },
  {
    id: "hdfc-millennia",
    name: "HDFC Millennia",
    image: "/img/millennia.svg",
    tagline: "E-commerce queen · 5% cashback",
    annualFee: 1000,
    isLifetimeFree: false,
    rewardRates: { default: 1, online: 5 },
    loungeAccess: "4 domestic / yr",
    welcomeBonus: "₹1k voucher on first txn",
    rentRewardsAllowed: true,
    affiliatePayout: 350
  },
  {
    id: "sbi-cashback",
    name: "SBI Cashback",
    image: "/img/sbi.svg",
    tagline: "Flat 5% online · ₹0 fee*",
    annualFee: 0,
    isLifetimeFree: true,
    rewardRates: { default: 1, online: 5 },
    loungeAccess: "None",
    welcomeBonus: "—",
    rentRewardsAllowed: false,
    affiliatePayout: 250
  },
  {
    id: "axis-flipkart",
    name: "Axis Flipkart",
    image: "/img/flipkart.svg",
    tagline: "Unlimited cashback king",
    annualFee: 500,
    isLifetimeFree: false,
    rewardRates: { default: 1.5, online: 5, travel: 5 },
    loungeAccess: "4 domestic / yr",
    welcomeBonus: "₹600 Flipkart voucher",
    rentRewardsAllowed: true,
    affiliatePayout: 400
  },
  {
    id: "idfc-wow",
    name: "IDFC WOW",
    image: "/img/wow.svg",
    tagline: "100% digital · ₹0 fee · rent OK",
    annualFee: 0,
    isLifetimeFree: true,
    rewardRates: { default: 1, fuel: 3 },
    loungeAccess: "—",
    welcomeBonus: "—",
    rentRewardsAllowed: true,
    affiliatePayout: 200
  }
];
