// RATNAYA JEWELLERS — Central Product Catalog
const RATNAYA_PRODUCTS = [
  // --- EARRINGS ---
  {
    sku: "RAT-EAR-01",
    name: "The Apsara Emerald Floral Studs",
    category: "Earrings",
    categoryLabel: "18K GOLD • NATURAL EMERALDS",
    price: 38500,
    tag: "BESTSELLER",
    images: [
      "assets/images/prod-emerald-studs.jpg"
    ],
    shortDesc: "Natural Colombian Emerald • Brilliant VVS Diamonds • 18K Yellow Gold",
    description: "The Apsara Floral Studs capture the eternal elegance of blooming sacred flora. Centered with natural, vivid green Colombian emeralds surrounded by a luminous halo of brilliant-cut VVS diamonds, these studs are handcrafted in solid 18K hallmarked yellow gold with secure screw backs for comfortable daily wear.",
    purity: "18K Solid Yellow Gold (750 Purity)",
    gemstones: "Natural Colombian Emeralds (0.68 ct total) & VVS-VS Brilliant Diamonds (0.34 ct total)",
    grossWeight: "4.85 grams",
    dimensions: "11.2 mm diameter",
    certification: "BIS 916 Hallmarked & SGL Diamond Certificate",
    shipping: "Complimentary Insured Express Delivery (2–4 Business Days)",
    relatedSkus: ["RAT-EAR-02", "RAT-NEC-01", "RAT-RNG-01", "RAT-BRC-01"]
  },
  {
    sku: "RAT-EAR-02",
    name: "The Parijat Emerald Ear Studs",
    category: "Earrings",
    categoryLabel: "18K GOLD • EMERALD & DIAMOND",
    price: 34000,
    tag: "SIGNATURE",
    images: [
      "assets/images/cat-earrings.jpg"
    ],
    shortDesc: "Handcrafted Milgrain Setting • Certified Natural Gemstones",
    description: "Inspired by the divine night-flowering Parijat blossom, these handcrafted ear studs feature micro-milgrain gold bezels encapsulating intense forest-green emerald cabochons. Balanced for both black-tie occasions and understated daily grace.",
    purity: "18K Yellow Gold",
    gemstones: "Certified Natural Zambian Emeralds (0.55 ct total)",
    grossWeight: "4.20 grams",
    dimensions: "10.0 mm diameter",
    certification: "BIS Hallmarked & Gemmological Lab Certified",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-EAR-01", "RAT-EAR-03", "RAT-RNG-04", "RAT-NEC-02"]
  },
  {
    sku: "RAT-EAR-03",
    name: "The Ira Modern Emerald Drops",
    category: "Earrings",
    categoryLabel: "18K GOLD • CONTEMPORARY",
    price: 46000,
    tag: "CAMPAIGN",
    images: [
      "assets/images/hero-model.jpg"
    ],
    shortDesc: "Linear Articulated Setting • Pear Emerald Drops",
    description: "Architectural articulation meets contemporary Indian heritage. Sleek linear gold stems descend into teardrop Colombian emeralds that catch every movement with fluid luminescence.",
    purity: "18K Solid Gold",
    gemstones: "Pear-Cut Emeralds & Round Brilliant Diamonds (0.82 ct total)",
    grossWeight: "5.60 grams",
    dimensions: "34 mm drop length",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-EAR-01", "RAT-NEC-01", "RAT-RNG-01", "RAT-BRC-01"]
  },
  {
    sku: "RAT-EAR-04",
    name: "The Rooh Floral Studs",
    category: "Earrings",
    categoryLabel: "18K GOLD • DAILY WEAR",
    price: 29500,
    tag: "EVERYDAY",
    images: [
      "assets/images/campaign-modern-fashion.jpg"
    ],
    shortDesc: "Featherlight Bezel Setting • Certified Hallmark",
    description: "Featherlight everyday studs created for modern living. Clean geometry with cushion emerald centers set into a flush 18K yellow gold bezel that never snags fabric or hair.",
    purity: "18K Solid Yellow Gold",
    gemstones: "Natural Round Emeralds (0.40 ct)",
    grossWeight: "3.75 grams",
    dimensions: "8.5 mm diameter",
    certification: "BIS 916 Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-EAR-01", "RAT-EAR-02", "RAT-RNG-05", "RAT-MAN-01"]
  },

  // --- RINGS ---
  {
    sku: "RAT-RNG-01",
    name: "The Nilambari Sapphire Lotus Ring",
    category: "Rings",
    categoryLabel: "ROYAL SAPPHIRE • HAUTE JOAILLERIE",
    price: 145000,
    tag: "HAUTE JOAILLERIE",
    images: [
      "assets/images/prod-ratnaya-sapphire-lotus-ring.jpg",
      "assets/images/prod-ratnaya-sapphire-lotus-ring-angles.jpg"
    ],
    shortDesc: "Invisible-Set Royal Sapphires • Marquise Diamond Starburst",
    description: "A triumph of high jewellery engineering. A triple-row architectural band of invisible-set square royal blue sapphires crowns a majestic 14-stone marquise and round brilliant diamond lotus starburst. Designed to sit flush with sublime ergonomic balance on the finger.",
    purity: "18K Solid White Gold & Platinum",
    gemstones: "Calibrated Invisible-Set Royal Blue Sapphires (2.85 ct) & Marquise VVS Diamonds (1.42 ct)",
    grossWeight: "9.20 grams",
    dimensions: "Crown Height: 24 mm • Band Width: 8.5 mm",
    certification: "BIS Hallmarked & International Gemmological Certificate",
    shipping: "Insured White-Glove Hand Delivery",
    relatedSkus: ["RAT-RNG-02", "RAT-RNG-03", "RAT-EAR-01", "RAT-BRC-01"]
  },
  {
    sku: "RAT-RNG-02",
    name: "The Padmaraga Ruby Architectural Band",
    category: "Rings",
    categoryLabel: "PIGEON BLOOD RUBY • HIGH JEWELLERY",
    price: 185000,
    tag: "MASTERPIECE",
    images: [
      "assets/images/prod-ratnaya-ruby-cigar-band.jpg",
      "assets/images/prod-ratnaya-ruby-cigar-band-profile.jpg"
    ],
    shortDesc: "Calibrated Invisible-Set Rubies • Brilliant Cut Diamond Framing",
    description: "An opulent wide statement cigar band featuring precision-calibrated pigeon blood rubies in an invisible channel, bordered by geometric rows of pavé diamonds and a central diamond spine in solid platinum-toned 18K white gold.",
    purity: "18K Solid White Gold",
    gemstones: "Calibrated Burmese-Color Rubies (3.60 ct) & Pavé Diamonds (0.95 ct)",
    grossWeight: "11.40 grams",
    dimensions: "Band Width: 14.5 mm",
    certification: "Certified Natural Pigeon Blood Rubies • BIS Hallmarked",
    shipping: "Insured White-Glove Hand Delivery",
    relatedSkus: ["RAT-RNG-01", "RAT-RNG-03", "RAT-NEC-01", "RAT-BRC-02"]
  },
  {
    sku: "RAT-RNG-03",
    name: "The Marakata Emerald Lotus Ring",
    category: "Rings",
    categoryLabel: "COLOMBIAN EMERALD • 18K WHITE GOLD",
    price: 158000,
    tag: "SIGNATURE",
    images: [
      "assets/images/prod-ratnaya-emerald-lotus-ring.jpg"
    ],
    shortDesc: "Invisible-Set Emeralds • Marquise Diamond Cluster Bloom",
    description: "The emerald twin of the Nilambari design. Hand-matched Colombian green emeralds calibrated to fraction-of-a-millimeter precision beneath a brilliant marquise diamond flower blooming with regal radiance.",
    purity: "18K Solid White Gold",
    gemstones: "Precision-Set Green Emeralds (2.65 ct) & Marquise Diamonds (1.42 ct)",
    grossWeight: "9.15 grams",
    dimensions: "Crown Height: 24 mm • Band Width: 8.5 mm",
    certification: "BIS Hallmarked & SGL Certified",
    shipping: "Insured Express Delivery",
    relatedSkus: ["RAT-RNG-01", "RAT-RNG-04", "RAT-EAR-01", "RAT-BRC-01"]
  },
  {
    sku: "RAT-RNG-04",
    name: "The Sovereign Emerald Cocktail Ring",
    category: "Rings",
    categoryLabel: "18K GOLD • STATEMENT",
    price: 64500,
    tag: "CLASSIC",
    images: [
      "assets/images/prod-cocktail-ring.jpg"
    ],
    shortDesc: "Cushion-Cut Emerald • Pavé Halo • Hand Engraved Band",
    description: "A heritage cocktail ring boasting an impressive cushion-cut emerald encircled by a double pavé diamond halo and engraved filigree along the under-gallery.",
    purity: "18K Solid Yellow Gold",
    gemstones: "Cushion Emerald (1.85 ct) & Diamonds (0.50 ct)",
    grossWeight: "7.10 grams",
    dimensions: "Centerpiece: 16 mm × 14 mm",
    certification: "BIS 916 Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-RNG-01", "RAT-RNG-05", "RAT-NEC-01", "RAT-EAR-01"]
  },
  {
    sku: "RAT-RNG-05",
    name: "The Noor Diamond Stacking Bands",
    category: "Rings",
    categoryLabel: "18K YELLOW GOLD • DIAMOND",
    price: 48000,
    tag: "BESTSELLER",
    images: [
      "assets/images/prod-gold-bands.jpg"
    ],
    shortDesc: "Brilliant Solitaire & Vintage Pavé Band Set",
    description: "A modular two-ring set comprising a round brilliant diamond solitaire in crown prongs alongside a contour vintage pavé eternity band, crafted to be worn together or individually.",
    purity: "18K Yellow Gold",
    gemstones: "Solitaire (0.35 ct) & Pavé Diamonds (0.28 ct)",
    grossWeight: "5.80 grams",
    dimensions: "Combined Width: 5.2 mm",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-RNG-06", "RAT-RNG-01", "RAT-EAR-04", "RAT-MAN-01"]
  },
  {
    sku: "RAT-RNG-06",
    name: "The Sitara Solitaire Ring",
    category: "Rings",
    categoryLabel: "18K GOLD • SOLITAIRE",
    price: 52000,
    tag: "SOLITAIRE",
    images: [
      "assets/images/cat-rings-backup.jpg"
    ],
    shortDesc: "Certified Natural Diamond • Six-Prong Crown Setting",
    description: "The timeless solitaire engagement ring, perfected. A six-prong knife-edge crown setting lifts a certified round brilliant natural diamond to capture ambient light from every facet.",
    purity: "18K Solid Gold",
    gemstones: "Natural Solitaire Diamond (0.45 ct, F-G Color, VVS2)",
    grossWeight: "4.10 grams",
    dimensions: "Band Width: 2.1 mm",
    certification: "IGI Diamond Certificate & BIS Hallmark",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-RNG-05", "RAT-RNG-01", "RAT-EAR-01", "RAT-NEC-01"]
  },

  // --- NECKLACES ---
  {
    sku: "RAT-NEC-01",
    name: "The Maya Teardrop Emerald Pendant",
    category: "Necklaces",
    categoryLabel: "18K GOLD • NATURAL EMERALD",
    price: 42000,
    tag: "BESTSELLER",
    images: [
      "assets/images/prod-teardrop-pendant.jpg"
    ],
    shortDesc: "Pear-Cut Vibrant Colombian Emerald • 18K Gold Chain",
    description: "A vivid pear-shaped natural emerald surrounded by micro-pavé diamonds on a delicate yet durable diamond-cut 18K solid yellow gold chain with adjustable 16-18 inch lengths.",
    purity: "18K Yellow Gold",
    gemstones: "Pear Emerald (0.95 ct) & Diamonds (0.22 ct)",
    grossWeight: "5.30 grams",
    dimensions: "Pendant: 18 mm × 10 mm • Chain: 18 inches",
    certification: "BIS Hallmarked & SGL Certificate",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-EAR-01", "RAT-RNG-01", "RAT-BRC-01", "RAT-NEC-02"]
  },
  {
    sku: "RAT-NEC-02",
    name: "The Ananya Bezel Emerald Chain",
    category: "Necklaces",
    categoryLabel: "18K GOLD • STATEMENT",
    price: 34500,
    tag: "SIGNATURE",
    images: [
      "assets/images/cat-necklaces.jpg"
    ],
    shortDesc: "Station Bezel Emeralds • Hand-polished 18K Links",
    description: "Five flush-bezel natural emeralds positioned at graceful intervals along an ethereal 18K solid gold chain designed for effortless layering.",
    purity: "18K Solid Gold",
    gemstones: "Natural Round Emeralds (0.75 ct total)",
    grossWeight: "6.20 grams",
    dimensions: "Chain Length: 17 inches",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-NEC-01", "RAT-EAR-02", "RAT-BRC-01", "RAT-RNG-03"]
  },
  {
    sku: "RAT-NEC-03",
    name: "The Gifting Solitaire Pendant",
    category: "Necklaces",
    categoryLabel: "18K GOLD • GIFTING EDIT",
    price: 27500,
    tag: "GIFTING",
    images: [
      "assets/images/gifting-editorial.jpg"
    ],
    shortDesc: "Brilliant Diamond • Luxury Casket Packaging",
    description: "The quintessential luxury gift. A certified round brilliant diamond in an architectural bezel setting, accompanied by our signature ribboned emerald velvet box.",
    purity: "18K Yellow Gold",
    gemstones: "Natural Brilliant Diamond (0.25 ct)",
    grossWeight: "3.40 grams",
    dimensions: "16-18 inches adjustable",
    certification: "BIS Hallmarked & Diamond Authenticity Card",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-NEC-01", "RAT-EAR-04", "RAT-RNG-05", "RAT-MAN-02"]
  },

  // --- BRACELETS ---
  {
    sku: "RAT-BRC-01",
    name: "The Veda Emerald Tennis Bracelet",
    category: "Bracelets",
    categoryLabel: "18K GOLD • HIGH JEWELLERY",
    price: 58000,
    tag: "NEW",
    images: [
      "assets/images/prod-emerald-bracelet.jpg"
    ],
    shortDesc: "Alternating Oval Emeralds & Diamonds • 18K Gold",
    description: "A modern heirloom tennis bracelet featuring matched oval-cut Colombian emeralds paired with brilliant diamonds in four-prong flexible articulating links with a safety double-clasp.",
    purity: "18K Solid Yellow Gold",
    gemstones: "Emeralds (3.20 ct) & Diamonds (1.10 ct)",
    grossWeight: "12.80 grams",
    dimensions: "Length: 7 inches (customizable on request)",
    certification: "BIS Hallmarked",
    shipping: "Insured White-Glove Hand Delivery",
    relatedSkus: ["RAT-RNG-01", "RAT-EAR-01", "RAT-NEC-01", "RAT-BRC-02"]
  },
  {
    sku: "RAT-BRC-02",
    name: "The Classic Emerald Line Bracelet",
    category: "Bracelets",
    categoryLabel: "18K GOLD • TENNIS LINE",
    price: 62000,
    tag: "CLASSIC",
    images: [
      "assets/images/cat-bracelets.jpg"
    ],
    shortDesc: "Continuous Line of Natural Emeralds in Gold Bezels",
    description: "A continuous ribbon of vibrant square-cut emeralds encased in hand-polished 18K gold bezels that glide comfortably around the wrist.",
    purity: "18K Solid Gold",
    gemstones: "Natural Square Emeralds (4.15 ct total)",
    grossWeight: "14.20 grams",
    dimensions: "Length: 7.25 inches",
    certification: "BIS Hallmarked",
    shipping: "Insured Express Delivery",
    relatedSkus: ["RAT-BRC-01", "RAT-RNG-02", "RAT-NEC-02", "RAT-EAR-03"]
  },
  {
    sku: "RAT-BRC-03",
    name: "The Modern Gold Bangle",
    category: "Bracelets",
    categoryLabel: "18K GOLD • EVERYDAY LUXURY",
    price: 39000,
    tag: "SIGNATURE",
    images: [
      "assets/images/signature-banner.jpg"
    ],
    shortDesc: "Sculptural Hinged Bangle with Concealed Lock",
    description: "Solid, minimalist 18K yellow gold bangle with subtle bevels and a precision-engineered invisible push-button clasp.",
    purity: "18K Yellow Gold",
    gemstones: "Accent Flush Diamond (0.05 ct)",
    grossWeight: "10.50 grams",
    dimensions: "Inner Circumference: 6.5 inches",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-BRC-01", "RAT-RNG-05", "RAT-EAR-04", "RAT-MAN-01"]
  },

  // --- MANGALSUTRAS ---
  {
    sku: "RAT-MAN-01",
    name: "The Tara Solitaire Trio Mangalsutra",
    category: "Mangalsutras",
    categoryLabel: "18K GOLD • MODERN MANGALSUTRA",
    price: 48000,
    tag: "BESTSELLER",
    images: [
      "assets/images/prod-modern-mangalsutra.jpg"
    ],
    shortDesc: "Auspicious Black Beads • Brilliant Diamond Trio",
    description: "Reimagined for the modern Indian woman. Micro auspicious black onyx beads on fine 18K gold chain, crowned by a trio of certified natural diamonds representing past, present, and forever.",
    purity: "18K Yellow Gold",
    gemstones: "Natural Diamonds (0.38 ct) & Certified Black Beads",
    grossWeight: "5.90 grams",
    dimensions: "Length: 16–18 inches adjustable",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-MAN-02", "RAT-MAN-03", "RAT-EAR-01", "RAT-RNG-05"]
  },
  {
    sku: "RAT-MAN-02",
    name: "The Leela Delicate Mangalsutra",
    category: "Mangalsutras",
    categoryLabel: "18K GOLD • MINIMALIST",
    price: 36500,
    tag: "MODERN",
    images: [
      "assets/images/cat-mangalsutras.jpg"
    ],
    shortDesc: "Featherlight Everyday Design • Solid Gold Links",
    description: "Designed for effortless daily wear under western shirts and traditional attire alike. Minimalist gold bar set with sparkling diamonds and auspicious beads.",
    purity: "18K Solid Gold",
    gemstones: "Natural Diamonds (0.24 ct)",
    grossWeight: "4.60 grams",
    dimensions: "Length: 16 inches",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-MAN-01", "RAT-EAR-04", "RAT-NEC-01", "RAT-RNG-06"]
  },
  {
    sku: "RAT-MAN-03",
    name: "The Vanya Emerald Drop Mangalsutra",
    category: "Mangalsutras",
    categoryLabel: "18K GOLD • HEIRLOOM",
    price: 54000,
    tag: "HEIRLOOM",
    images: [
      "assets/images/signature-collection.jpg"
    ],
    shortDesc: "Natural Teardrop Emerald • Diamond Halo Motif",
    description: "An auspicious statement piece pairing traditional black beads with an exquisite Colombian emerald drop enveloped in a halo of diamonds.",
    purity: "18K Solid Gold",
    gemstones: "Emerald (0.65 ct) & Diamonds (0.30 ct)",
    grossWeight: "7.10 grams",
    dimensions: "Length: 18 inches",
    certification: "BIS Hallmarked",
    shipping: "Complimentary Insured Delivery",
    relatedSkus: ["RAT-MAN-01", "RAT-NEC-01", "RAT-EAR-01", "RAT-RNG-04"]
  }
];

// Helper to look up a product by SKU or slug
function getProductBySku(sku) {
  if (!sku) return RATNAYA_PRODUCTS[0];
  const found = RATNAYA_PRODUCTS.find(p => p.sku.toLowerCase() === sku.toLowerCase());
  return found || RATNAYA_PRODUCTS[0];
}
