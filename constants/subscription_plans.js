const subscriptionPlans = {
  basic: {
    name: "Basic",
    amount: 99,
    durationMonths: 3,
    deviceType: ["mobile"],
  },
  standard: {
    name: "Standard",
    amount: 299,
    durationMonths: 3,
    deviceType: ["mobile", "laptop"],
  },
  premium: {
    name: "Premium",
    amount: 999,
    durationMonths: 6,
    deviceType: ["mobile", "laptop", "tablet", "tv"],
  },
  gold: {
    name: "Gold",
    amount: 1200,
    durationMonths: 12,
    deviceType: ["mobile", "laptop", "tablet", "tv"],
  },
};

export default subscriptionPlans;
