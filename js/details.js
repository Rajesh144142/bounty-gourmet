const PRODUCT_DETAILS = {
  "Oranges": {
    description: "Fresh hand-picked organic oranges, packed with vitamins and sweet citrus flavor.",
    protein: "0.9g",
    minerals: "Vitamin C (130%), Potassium (5%), Calcium (4%)",
    pros: ["Rich in Vitamin C, boosts immunity", "High hydration and dietary fiber"],
    cons: ["Acidic content, consume in moderation", "Highly perishable"]
  },
  "Apples": {
    description: "Crisp, crunchy organic red apples sourced directly from local orchards.",
    protein: "0.3g",
    minerals: "Vitamin C (14%), Potassium (3%), Iron (1%)",
    pros: ["High soluble fiber, excellent for digestion", "Heart healthy and regulates blood sugar"],
    cons: ["Seeds contain traces of cyanide (discard core)", "Skin may have wax coatings"]
  },
  "Bananas": {
    description: "Sweet, nutrient-dense ripe bananas providing a rich source of potassium and energy.",
    protein: "1.3g",
    minerals: "Potassium (12%), Vitamin B6 (20%), Magnesium (8%)",
    pros: ["Rich energy booster, great pre/post workout", "Helps prevent muscle cramps"],
    cons: ["High glycemic index, sugar spikes", "Ripens very quickly"]
  },
  "Mangoes": {
    description: "Gourmet, sweet and fragrant Alphonso mangoes with rich tropical juiciness.",
    protein: "0.8g",
    minerals: "Vitamin A (25%), Vitamin C (76%), Folate (11%)",
    pros: ["Protects eye health, rich in antioxidants", "Sweet natural gourmet flavor"],
    cons: ["High sugar content", "Can cause heat rash if overconsumed"]
  },
  "Carrots": {
    description: "Crunchy, sweet, and freshly harvested organic carrots packed with beta-carotene.",
    protein: "0.9g",
    minerals: "Vitamin A / Beta-Carotene (334%), Potassium (9%)",
    pros: ["Supports vision and healthy skin", "Rich in fiber and anti-aging antioxidants"],
    cons: ["Hard to digest raw in large amounts", "Excess intake can cause mild skin yellowing"]
  },
  "Potato": {
    description: "Starchy, versatile organic potatoes perfect for boiling, baking, or roasting.",
    protein: "2.0g",
    minerals: "Vitamin C (28%), Potassium (26%), Iron (9%)",
    pros: ["Highly energetic complex starch", "Very versatile for daily cooking"],
    cons: ["High glycemic index when boiled/fried", "Must be stored in dark to avoid greening"]
  },
  "Garlic": {
    description: "Pungent and aromatic garlic bulbs offering powerful natural health benefits.",
    protein: "6.4g",
    minerals: "Selenium (12%), Manganese (23%), Vitamin B6 (15%)",
    pros: ["Strong natural antibacterial & anti-inflammatory", "Helps regulate blood pressure"],
    cons: ["Leaves strong mouth odor", "Can irritate sensitive stomach lining"]
  },
  "Onions": {
    description: "Crisp and flavorful red onions, a perfect seasoning base for any culinary dish.",
    protein: "1.1g",
    minerals: "Vitamin C (12%), Folate (5%), Chromium (20%)",
    pros: ["Contains quercetin, lowers cholesterol", "Supports healthy bone density"],
    cons: ["Causes tearing when chopped", "Strong residual breath smell"]
  },
  "Katla": {
    description: "Freshwater local Katla fish, fresh-caught and rich in calcium.",
    protein: "19.2g",
    minerals: "Omega-3 Fatty Acids, Calcium (15%), Phosphorus (20%)",
    pros: ["Premium lean protein, supports brain function", "Excellent source of calcium for bones"],
    cons: ["Contains numerous fine bones", "Requires careful cleaning and scaling"]
  },
  "Hilsha": {
    description: "Premium silver Hilsa fish, highly sought after for its rich signature oils and taste.",
    protein: "22.0g",
    minerals: "Omega-3 (EPA/DHA), Iron (12%), Calcium (10%)",
    pros: ["Incredibly rich, unique flavor profile", "Extremely high in cardiorespiratory Omega-3s"],
    cons: ["Highly bony fish, requires skilled eating", "Rich in fats, heavy to digest"]
  },
  "Shrimp": {
    description: "Freshwater sweet shrimp, low in calories and exceptionally high in protein.",
    protein: "24.0g",
    minerals: "Selenium (48%), Vitamin B12 (19%), Zinc (13%)",
    pros: ["Extremely low calorie, high purity protein", "Contains brain-healthy astaxanthin"],
    cons: ["Common allergen", "Moderately high cholesterol"]
  },
  "Rohu": {
    description: "Local river-caught Rohu fish, popular for its tender flesh and high digestibility.",
    protein: "19.7g",
    minerals: "Omega-3 Fatty Acids, Phosphorus, Vitamin C",
    pros: ["Lean low-fat protein, highly digestible", "Supports immune system functions"],
    cons: ["Contains fine y-shaped bones", "Must be eaten fresh"]
  },
  "Coca Cola": {
    description: "Classic sparkling soda pop served chilled for instant carbonated refreshment.",
    protein: "0g",
    minerals: "Sodium (1%)",
    pros: ["Immediate cooling relief", "Quick caffeine boost"],
    cons: ["High in refined sugars", "Dehydrates the body, acidic pH"]
  },
  "Lays Chips": {
    description: "Crisp, thin, and classic salted potato chips, perfect for quick snacking and parties.",
    protein: "2.1g",
    minerals: "Sodium (8%), Potassium (10%), Iron (2%)",
    pros: ["Very crispy, classic salt taste", "Excellent party snack"],
    cons: ["High in sodium and trans-fats", "Low nutritional value"]
  },
  "Kurkure": {
    description: "Crunchy, spicy, and tangy puff snacks made from premium rice, corn, and spice blends.",
    protein: "1.9g",
    minerals: "Sodium (12%), Potassium (4%)",
    pros: ["Highly crunchy and savory blend", "Loved spicy snacks flavor"],
    cons: ["Processed flour base, high sodium", "Spicy ingredients can cause acidity"]
  },
  "Noodles": {
    description: "Quick-cooking instant noodles packaged with a savory seasoning pack.",
    protein: "7.0g",
    minerals: "Iron (8%), Sodium (42%), Thiamine (15%)",
    pros: ["Extremely quick to prepare", "Highly shelf-stable and affordable"],
    cons: ["Processed refined flour (Maida)", "Very high in sodium and preservatives"]
  }
};

function initialiseDetails() {
  const detailsModal = document.getElementById('details-modal');
  const closeDetailsBtn = document.getElementById('close-details-btn');

  // Add click listeners to product boxes to open the modal
  document.querySelectorAll('.product-box').forEach((box) => {
    // Attach listener to open details on card click (except if add-cart button clicked)
    box.addEventListener('click', (event) => {
      if (event.target.closest('.add-cart')) {
        return; // Let the add-cart logic handle this click
      }

      const title = box.querySelector('.product-title')?.textContent.trim() || '';
      const price = box.querySelector('.price')?.textContent.trim() || '';
      const imgUrl = box.querySelector('.product-img')?.src || '';

      openProductDetails(title, price, imgUrl);
    });
  });

  // Close modal click listeners
  closeDetailsBtn?.addEventListener('click', () => {
    if (detailsModal) detailsModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === detailsModal) {
      detailsModal.style.display = 'none';
    }
  });

  function openProductDetails(title, price, imgUrl) {
    const data = PRODUCT_DETAILS[title];
    if (!data) return;

    // Populate standard items
    const titleEl = document.getElementById('details-title');
    const priceEl = document.getElementById('details-price');
    const imgEl = document.getElementById('details-img');
    const descEl = document.getElementById('details-desc');

    if (titleEl) titleEl.textContent = title;
    if (priceEl) priceEl.textContent = price;
    if (imgEl) {
      imgEl.src = imgUrl;
      imgEl.alt = title;
    }
    if (descEl) descEl.textContent = data.description;

    // Populate nutritional items
    const proteinEl = document.getElementById('details-protein');
    const mineralsEl = document.getElementById('details-minerals');
    if (proteinEl) proteinEl.textContent = data.protein;
    if (mineralsEl) mineralsEl.textContent = data.minerals;

    // Populate pros
    const prosContainer = document.getElementById('details-pros');
    if (prosContainer) {
      prosContainer.innerHTML = '';
      data.pros.forEach((pro) => {
        const li = document.createElement('li');
        li.textContent = pro;
        prosContainer.appendChild(li);
      });
    }

    // Populate cons
    const consContainer = document.getElementById('details-cons');
    if (consContainer) {
      consContainer.innerHTML = '';
      data.cons.forEach((con) => {
        const li = document.createElement('li');
        li.textContent = con;
        consContainer.appendChild(li);
      });
    }

    // Display modal
    if (detailsModal) {
      detailsModal.style.display = 'block';
    }
  }
}
