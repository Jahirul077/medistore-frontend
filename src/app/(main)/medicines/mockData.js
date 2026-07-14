// Mock categories matching Categories model
export const CATEGORIES = [
  { id: "cat-1", title: "Capsule" },
  { id: "cat-2", title: "Tablet" },
  { id: "cat-3", title: "Syrup" },
  { id: "cat-4", title: "Injection" },
  { id: "cat-5", title: "Inhaler" },
];

// Mock manufacturers matching Medicines model
export const MANUFACTURERS = [
  "Square Pharmaceuticals",
  "Beximco Pharmaceuticals",
  "Incepta Pharmaceuticals",
  "Renata Limited",
  "Acme Laboratories",
];

// Mock medicines database matching new schema structure
export const MEDICINES_DATA = [
  {
    id: "fc93b9d7-5153-4589-a3c8-e0279654b00a",
    title: "Seclo 20",
    genericName: "Omeprazole",
    strength: "20mg",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-1",
    categories: { id: "cat-1", title: "Capsule" },
    manufacturer: "Square Pharmaceuticals",
    price: 3.5,
    oldPrice: 4.2,
    rating: 4.8,
    reviews: 124,
    description:
      "Highly effective proton pump inhibitor for reducing stomach acid, treating GERD, heartburn, and gastric ulcers.",
  },
  {
    id: "ac93b9d7-5153-4589-a3c8-e0279654b00b",
    title: "Napa Extend",
    genericName: "Paracetamol",
    strength: "665mg",
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-2",
    categories: { id: "cat-2", title: "Tablet" },
    manufacturer: "Beximco Pharmaceuticals",
    price: 2.2,
    oldPrice: 2.75,
    rating: 4.9,
    reviews: 98,
    description:
      "Extended-release paracetamol formulation designed to provide long-lasting relief from severe pain and fever.",
  },
  {
    id: "dc93b9d7-5153-4589-a3c8-e0279654b00c",
    title: "Ceevit",
    genericName: "Ascorbic Acid",
    strength: "250mg",
    image:
      "https://images.unsplash.com/photo-1616679911721-fe6eec14035a?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-2",
    categories: { id: "cat-2", title: "Chewable Tablet" },
    manufacturer: "Incepta Pharmaceuticals",
    price: 4.0,
    oldPrice: 4.5,
    rating: 4.7,
    reviews: 215,
    description:
      "Chewable Vitamin C supplement providing strong antioxidant support, skin health, and immune system defense.",
  },
  {
    id: "med-4",
    title: "Tofen Syrup",
    genericName: "Ketotifen",
    strength: "1mg/5ml",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-3",
    categories: { id: "cat-3", title: "Syrup" },
    manufacturer: "Beximco Pharmaceuticals",
    price: 6.8,
    oldPrice: 8.0,
    rating: 4.5,
    reviews: 64,
    description:
      "Antihistamine syrup used for the prevention and long-term treatment of bronchial asthma and allergic rhinitis.",
  },
  {
    id: "med-5",
    title: "Maxpro 20",
    genericName: "Esomeprazole",
    strength: "20mg",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-1",
    categories: { id: "cat-1", title: "Capsule" },
    manufacturer: "Renata Limited",
    price: 5.0,
    oldPrice: 5.8,
    rating: 4.8,
    reviews: 154,
    description:
      "Advanced acid reducer that relieves persistent heartburn and acid reflux symptoms effectively in adults.",
  },
  {
    id: "med-6",
    title: "Alatrol 10",
    genericName: "Cetirizine Hydrochloride",
    strength: "10mg",
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-2",
    categories: { id: "cat-2", title: "Tablet" },
    manufacturer: "Square Pharmaceuticals",
    price: 1.8,
    oldPrice: 2.1,
    rating: 4.6,
    reviews: 112,
    description:
      "Non-sedating antihistamine providing 24-hour relief from allergy symptoms like sneezing, runny nose, and itchy eyes.",
  },
  {
    id: "med-7",
    title: "Sergel 20",
    genericName: "Esomeprazole Sodium",
    strength: "20mg",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-4",
    categories: { id: "cat-4", title: "Injection" },
    manufacturer: "Healthcare Pharmaceuticals",
    price: 14.5,
    oldPrice: 16.0,
    rating: 4.9,
    reviews: 43,
    description:
      "Intravenous proton pump inhibitor injection for fast relief in patients unable to take oral medication.",
  },
  {
    id: "med-8",
    title: "Ecohaler 200",
    genericName: "Salbutamol",
    strength: "100mcg",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=300&auto=format&fit=crop",
    categoriesId: "cat-5",
    categories: { id: "cat-5", title: "Inhaler" },
    manufacturer: "Acme Laboratories",
    price: 9.9,
    oldPrice: 11.5,
    rating: 4.7,
    reviews: 79,
    description:
      "Bronchodilator inhaler providing rapid relief from acute asthma attacks and chronic obstructive pulmonary symptoms.",
  },
];

// Mock details mapping
export const MOCK_MEDICINES_DETAILS = {
  "fc93b9d7-5153-4589-a3c8-e0279654b00a": {
    id: "fc93b9d7-5153-4589-a3c8-e0279654b00a",
    title: "Seclo 20",
    genericName: "Omeprazole",
    strength: "20mg",
    description: "Highly effective proton pump inhibitor for reducing stomach acid, treating GERD, heartburn, and gastric ulcers. It provides 24-hour relief by blocking acid production at its source.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    manufacturer: "Square Pharmaceuticals Ltd.",
    categories: {
      id: "cat-1",
      title: "Capsule",
    },
    dosage: "Take 1 capsule daily 30 minutes before breakfast, or as prescribed by a registered physician.",
    sideEffects: "Headache, mild diarrhea, abdominal discomfort, nausea, or dizziness in some patients.",
    storage: "Store below 30°C in a dry place, away from direct sunlight. Keep out of reach of children.",
    inventories: [
      {
        id: "inv-1-1",
        price: "7.00",
        stock: 796,
        seller: {
          id: "sel-1",
          name: "Vendor Pharmacy",
          email: "seller@medistore.com",
        },
      },
      {
        id: "inv-1-2",
        price: "6.80",
        stock: 250,
        seller: {
          id: "sel-2",
          name: "Lazz Pharma",
          email: "lazz@medistore.com",
        },
      },
    ],
  },
  "ac93b9d7-5153-4589-a3c8-e0279654b00b": {
    id: "ac93b9d7-5153-4589-a3c8-e0279654b00b",
    title: "Napa Extend",
    genericName: "Paracetamol",
    strength: "665mg",
    description: "Extended-release paracetamol formulation designed to provide long-lasting relief from severe body aches, joint pain, headache, and persistent fever.",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    categories: {
      id: "cat-2",
      title: "Tablet",
    },
    dosage: "Adults: 1 to 2 tablets every 6 to 8 hours as required. Do not exceed 6 tablets in a 24-hour period.",
    sideEffects: "Side effects are rare when taken at recommended dosages. Skin rashes or blood disorders may occur rarely.",
    storage: "Store below 30°C in a cool and dry place. Protect from moisture and heat.",
    inventories: [
      {
        id: "inv-2-1",
        price: "2.20",
        stock: 1200,
        seller: {
          id: "sel-1",
          name: "Vendor Pharmacy",
          email: "seller@medistore.com",
        },
      },
      {
        id: "inv-2-2",
        price: "2.10",
        stock: 450,
        seller: {
          id: "sel-3",
          name: "Model Pharmacy Ltd.",
          email: "model@medistore.com",
        },
      },
    ],
  },
  "dc93b9d7-5153-4589-a3c8-e0279654b00c": {
    id: "dc93b9d7-5153-4589-a3c8-e0279654b00c",
    title: "Ceevit",
    genericName: "Ascorbic Acid",
    strength: "250mg",
    description: "Chewable Vitamin C supplement providing strong antioxidant support, healthy skin, collages production, and immune system defense against colds and infections.",
    image: "https://images.unsplash.com/photo-1616679911721-fe6eec14035a?q=80&w=600&auto=format&fit=crop",
    manufacturer: "Incepta Pharmaceuticals Ltd.",
    categories: {
      id: "cat-2",
      title: "Chewable Tablet",
    },
    dosage: "Chew 1 to 2 tablets daily, or as advised by your healthcare consultant.",
    sideEffects: "Excessive consumption may cause digestive irritation or diarrhea.",
    storage: "Keep tightly closed in a cool, dry place. Protect from moisture.",
    inventories: [
      {
        id: "inv-3-1",
        price: "4.00",
        stock: 680,
        seller: {
          id: "sel-2",
          name: "Lazz Pharma",
          email: "lazz@medistore.com",
        },
      },
    ],
  },
  "med-4": {
    id: "med-4",
    title: "Ketotifen",
    genericName: "Ketotifen",
    strength: "1mg/5ml",
    description: "Antihistamine syrup used for the prevention and long-term treatment of bronchial asthma, allergic bronchitis, and allergic rhinitis in infants and children.",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    categories: {
      id: "cat-3",
      title: "Syrup",
    },
    dosage: "Children: 5ml (1 teaspoonful) twice daily with meals, or as prescribed by a pediatrician.",
    sideEffects: "Drowsiness, dry mouth, mild dizziness, or light excitability in children.",
    storage: "Store below 25°C. Do not freeze. Keep container tightly closed.",
    inventories: [
      {
        id: "inv-4-1",
        price: "6.80",
        stock: 310,
        seller: {
          id: "sel-3",
          name: "Model Pharmacy Ltd.",
          email: "model@medistore.com",
        },
      },
    ],
  },
  "med-5": {
    id: "med-5",
    title: "Maxpro 20",
    genericName: "Esomeprazole",
    strength: "20mg",
    description: "Advanced acid reducer that relieves persistent heartburn, acid reflux (GERD) symptoms, and promotes healing of acid-induced damage to the esophagus.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop",
    manufacturer: "Renata Limited",
    categories: {
      id: "cat-1",
      title: "Capsule",
    },
    dosage: "Take 1 capsule daily 30-60 minutes before meals. Duration depends on the clinical condition.",
    sideEffects: "Headache, nausea, gas, diarrhea, dry mouth.",
    storage: "Store in a cool dry place, dry light-protected environment below 30°C.",
    inventories: [
      {
        id: "inv-5-1",
        price: "5.00",
        stock: 940,
        seller: {
          id: "sel-1",
          name: "Vendor Pharmacy",
          email: "seller@medistore.com",
        },
      },
    ],
  },
};

// Fallback details if dynamic ID not in mock list
export const DEFAULT_MEDICINE = {
  id: "fc93b9d7-5153-4589-a3c8-e0279654b00a",
  title: "Seclo 20",
  genericName: "Omeprazole",
  strength: "20mg",
  description: "Highly effective proton pump inhibitor for reducing stomach acid, treating GERD, heartburn, and gastric ulcers. It provides 24-hour relief by blocking acid production at its source.",
  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
  manufacturer: "Square Pharmaceuticals Ltd.",
  categories: {
    id: "cat-1",
    title: "Capsule",
  },
  dosage: "Take 1 capsule daily 30 minutes before breakfast, or as prescribed by a registered physician.",
  sideEffects: "Headache, mild diarrhea, abdominal discomfort, nausea, or dizziness in some patients.",
  storage: "Store below 30°C in a dry place, away from direct sunlight. Keep out of reach of children.",
  inventories: [
    {
      id: "0ddf85da-6f56-4ea3-8139-5bfba8ce92ff",
      price: "7.00",
      stock: 796,
      seller: {
        id: "53df92d4-1fb9-47cd-940b-2b01a7063832",
        name: "Vendor Pharmacy",
        email: "seller@medistore.com",
      },
    },
  ],
};
