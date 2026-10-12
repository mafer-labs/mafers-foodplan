const MENU = {
  1: {
    es: { b: "Queso semi duro (90g) + Arepa asada (100g) + Aguacate, 1 trozo",
          l: "Pechuga empanizada en air fryer (90g) + 2 papas medianas + Ensalada rallada con 1 cdta mayonesa",
          d: "Hamburguesa de carne molida + Casabe + Tomate, lechuga, pepino y mostaza" },
    en: { b: "Semi-hard cheese (90g) + Grilled arepa (100g) + Avocado, 1 slice",
          l: "Air-fryer breaded chicken breast (90g) + 2 medium potatoes + Shredded salad with 1 tsp mayo",
          d: "Ground beef burger + Cassava bread + Tomato, lettuce, cucumber & mustard" },
    no: { b: "Halvfast ost (90g) + Grillet arepa (100g) + Avokado, 1 skive",
          l: "Air-fryer panert kyllingbryst (90g) + 2 mellomstore poteter + Revet salat med 1 ts majones",
          d: "Kjøttdeigburger + Kassavabrød + Tomat, salat, agurk og sennep" }
  },
  2: {
    es: { b: "Jamón de pavo (3 rebanadas) + Arepa de batata (1) + Alfalfa, tomate y margarina vegetal (1 cdta)",
          l: "Calabacines rellenos con carne molida (90g) + Arroz blanco (½ tz)",
          d: "Ensalada de atún (90g) + Arepa pequeña + Cebolla y tomate" },
    en: { b: "Turkey ham (3 slices) + Sweet potato arepa (1) + Alfalfa, tomato & vegan margarine (1 tsp)",
          l: "Zucchini stuffed with ground beef (90g) + White rice (½ cup)",
          d: "Tuna salad (90g) + Small arepa + Onion & tomato" },
    no: { b: "Kalkunskinke (3 skiver) + Søtpotet-arepa (1) + Alfalfa, tomat og vegansk margarin (1 ts)",
          l: "Squash fylt med kjøttdeig (90g) + Hvit ris (½ kopp)",
          d: "Tunfisksalat (90g) + Liten arepa + Løk og tomat" }
  },
  3: {
    es: { b: "Pollo en salsa (90g) + 2 Papas rellenas (100g) + Aceite de oliva (1 cdta)",
          l: "Atún al ajillo (90g) + Yuca sancochada + Ensalada de berros",
          d: "Carne molida (4 cdas) + Tortilla de maíz (burrito) + Guacamole (2 cdas)" },
    en: { b: "Chicken in sauce (90g) + 2 stuffed potatoes (100g) + Olive oil (1 tsp)",
          l: "Garlic tuna (90g) + Boiled cassava + Watercress salad",
          d: "Ground beef (4 tbsp) + Corn tortilla (burrito style) + Guacamole (2 tbsp)" },
    no: { b: "Kylling i saus (90g) + 2 fylte poteter (100g) + Olivenolje (1 ts)",
          l: "Hvitløkstunfisk (90g) + Kokt kassava + Brønnkarsesalat",
          d: "Kjøttdeig (4 ss) + Maistortilla (burrito) + Guacamole (2 ss)" }
  },
  4: {
    es: { b: "Carne molida magra (90g) + Arepa con ajonjolí",
          l: "Arroz con pollo y vegetales salteados (90g pollo + ½ tz arroz) + Ensalada",
          d: "Jamón y queso mozzarella de búfala (3 rebanadas) + Tortilla de plátano + Vegetales" },
    en: { b: "Lean ground beef (90g) + Sesame-topped arepa",
          l: "Chicken & vegetable rice (90g chicken + ½ cup rice) + Salad",
          d: "Ham & buffalo mozzarella (3 slices) + Plantain tortilla + Vegetables" },
    no: { b: "Mager kjøttdeig (90g) + Arepa med sesamfrø",
          l: "Ris med kylling og grønnsaker (90g kylling + ½ kopp ris) + Salat",
          d: "Skinke og bøffelmozzarella (3 skiver) + Banantortilla + Grønnsaker" }
  },
  5: {
    es: { b: "Ensalada de atún (6 cdas / 90g) + Casabe (60g) + Aguacate (1 trozo)",
          l: "Parrilla de carne con cebolla y pimentón + Bollitos de maíz + Ensalada mixta",
          d: "Buñuelos de yuca en air fryer · Cena ligera según plan" },
    en: { b: "Tuna salad (6 tbsp / 90g) + Cassava bread (60g) + Avocado (1 slice)",
          l: "Grilled beef with onion & peppers + Corn dumplings + Mixed salad",
          d: "Yuca fritters in air fryer · Light dinner per plan" },
    no: { b: "Tunfisksalat (6 ss / 90g) + Kassavabrød (60g) + Avokado (1 skive)",
          l: "Grillet biff med løk og paprika + Maisballer + Blandet salat",
          d: "Kassavaboller i air fryer · Lett middag per plan" }
  },
  6: {
    es: { b: "Pollo esmechado (90g) + Tortillas de plátano verde o maduro + Margarina vegetal o aguacate (1 cdta)",
          l: "Asado negro (90g) + Arroz blanco (1 tz) + Ensalada de tomate y pepino",
          d: "Jamón de pavo + Galletas de arroz (2 paq) + Ensalada de tu preferencia" },
    en: { b: "Shredded chicken (90g) + Green or ripe plantain tortilla + Vegan margarine or avocado (1 tsp)",
          l: "Asado negro beef (90g) + White rice (1 cup) + Tomato & cucumber salad",
          d: "Turkey ham + Rice crackers (2 packs) + Salad of your choice" },
    no: { b: "Revet kylling (90g) + Grønn eller moden banantortilla + Vegansk margarin eller avokado (1 ts)",
          l: "Asado negro oksekjøtt (90g) + Hvit ris (1 kopp) + Tomat- og agurkesalat",
          d: "Kalkunskinke + Riskaker (2 pakker) + Salat etter eget valg" }
  },
  7: {
    es: { b: "Pavo (90g) + Crepes de harina de arroz (2 und) + Margarina vegetal + Vegetales",
          l: "Pescado al horno (90g) + Casabe (40g) + Ensalada de papa y zanahoria",
          d: "Queso amarillo + 1 rebanada de jamón + Yuca sancochada + Alfalfa" },
    en: { b: "Turkey (90g) + Rice flour crepes (2) + Vegan margarine + Vegetables",
          l: "Baked fish (90g) + Cassava bread (40g) + Potato & carrot salad",
          d: "Yellow cheese + 1 ham slice + Boiled cassava + Alfalfa" },
    no: { b: "Kalkun (90g) + Rismelspannekaker (2 stk) + Vegansk margarin + Grønnsaker",
          l: "Bakt fisk (90g) + Kassavabrød (40g) + Potet- og gulrotsalat",
          d: "Gul ost + 1 skinkeskive + Kokt kassava + Alfalfa" }
  },
  8: {
    es: { b: "Pollo esmechado (90g / 6 cdas) + Arepa asada (100g) + Aguacate",
          l: "Pollo a la plancha (90g) + Arroz blanco (1½ tz) + Brócoli con tomate",
          d: "Tortilla de calabacín / 2 claras de huevo + Jamón rallado" },
    en: { b: "Shredded chicken (90g / 6 tbsp) + Grilled arepa (100g) + Avocado",
          l: "Grilled chicken (90g) + White rice (1½ cups) + Broccoli with tomato",
          d: "Zucchini omelette / 2 egg whites + Grated ham" },
    no: { b: "Revet kylling (90g / 6 ss) + Grillet arepa (100g) + Avokado",
          l: "Grillet kylling (90g) + Hvit ris (1½ kopper) + Brokkoli med tomat",
          d: "Squashomelett / 2 eggehviter + Revet skinke" }
  },
  9: {
    es: { b: "Plátano maduro horneado o en air fryer + Queso mozzarella de búfala o de cabra",
          l: "Hamburguesa de carne (90g) + Pan sin gluten + 1 Papa brava al horno",
          d: "Ensalada caprese: mozzarella de búfala o cabra (30g) + Tomate + Galleta de soda SG (2 paq)" },
    en: { b: "Baked or air-fryer ripe plantain + Buffalo or goat mozzarella cheese",
          l: "Beef burger (90g) + GF hamburger bun + 1 baked spicy potato",
          d: "Caprese salad: buffalo or goat mozzarella (30g) + Tomato + GF soda crackers (2 packs)" },
    no: { b: "Bakt eller air-fryer moden banan + Bøffel- eller geitmozzarella",
          l: "Hamburgerkjøtt (90g) + Glutenfritt hamburgerbrød + 1 bakt krydret potet",
          d: "Caprese-salat: bøffel- eller geitmozzarella (30g) + Tomat + Glutenfrie sodakjeks (2 pakker)" }
  },
  10: {
    es: { b: "Queso de cabra (90g) + Arepa mediana (100g) + Margarina vegetal (1 cdta)",
          l: "Croquetas de pescado en air fryer (90g) + Arroz blanco (1 tz) + Vegetales",
          d: "Sopa combinada de auyama, apio y carne magra (90g)" },
    en: { b: "Goat cheese (90g) + Medium arepa (100g) + Vegan margarine (1 tsp)",
          l: "Air-fryer fish croquettes (90g) + White rice (1 cup) + Vegetables",
          d: "Combined pumpkin, celery & lean beef soup (90g)" },
    no: { b: "Geitost (90g) + Medium arepa (100g) + Vegansk margarin (1 ts)",
          l: "Air-fryer fiskekaker (90g) + Hvit ris (1 kopp) + Grønnsaker",
          d: "Kombinert gresskar-, selleri- og magert kjøttsuppe (90g)" }
  }
};

/* ============================================================
   RANDOM MEAL COMBOS — Nutritional values per Lic. Ana K. Rodríguez
   All items: gluten-free, low-FODMAP, lactose-free, no added sugar
   Ingredients common in Venezuela included throughout
   ============================================================ */
const COMBOS = {
  es: {
    prot: [
      "Pollo a la plancha (90g)",
      "Carne de res magra asada (90g)",
      "Pescado a la plancha (90g) — carite, pargo o mero",
      "Atún al natural (90g) — sin aceite",
      "Pavo horneado (90g)",
      "Lomo de cerdo a la plancha (90g)",
      "Carne molida magra sofrita (90g)",
      "Pollo esmechado en salsa de tomate natural (90g)",
      "Pechuga al horno con hierbas (90g)",
      "Croquetas de pescado en air fryer (90g)",
      "Sardinas frescas a la plancha (2 und)",
      "Claras de huevo revueltas (3 und)",
      "Pisillo de pescado (carite / 6 cdas)",
      "Jamón de pavo (3 rebanadas)",
      "Bistec de res a la plancha (90g)",
      "Pollo guisado en salsa de vegetales (90g)",
      "Pescado sudado con vegetales (90g)"
    ],
    carb: [
      "Arepa asada mediana (1 und / 100g)",
      "Arroz blanco (½ tz cocido)",
      "Yuca sancochada (120g)",
      "Batata al vapor (1 und mediana)",
      "Casabe (60g)",
      "Papa sancochada (1 und mediana)",
      "Plátano verde sancochado (¼ und)",
      "Plátano maduro horneado (¼ und)",
      "Bollito de maíz (2 und)",
      "Tortilla de maíz (1 und)",
      "Galletas de arroz SG (2 paquetes)",
      "Arepa de batata (1 und mediana)",
      "Apio sancochado (120g)",
      "Ñame sancochado (120g)",
      "Ocumo sancochado (120g)",
      "Quinoa cocida (½ tz)",
      "Papa rellena air fryer (1 und)"
    ],
    veg: [
      "Calabacín salteado en aceite de oliva (1 tz)",
      "Brócoli al vapor con limón (1 tz)",
      "Vainitas sancochadas (½ tz)",
      "Zanahoria asada en horno (½ tz)",
      "Espinacas salteadas con ajo (1 tz)",
      "Berenjena a la plancha (1 tz)",
      "Ensalada de tomate, pepino y cebollín",
      "Acelga al vapor (1 tz)",
      "Palmito con limón y cilantro (1 tz)",
      "Auyama sancochada (½ tz)",
      "Ensalada de berros y tomate",
      "Chayota sancochada (1 tz)",
      "Crema de auyama sin harina (1 tz)",
      "Ensalada mixta: lechuga, tomate, pepino",
      "Champiñones salteados (1 tz)",
      "Repollo salteado (1 tz)",
      "Célery con tomate y albahaca",
      "Coliflor al vapor (1 tz)"
    ],
    fat: [
      "Aguacate (1/8 und)",
      "Aceite de oliva extra virgen (1 cdta)",
      "Aceitunas verdes (5 und)",
      "Almendras sin sal (6 und)",
      "Margarina vegetal SG (1 cdta)",
      "Ajonjolí tostado (1 cdta — como grasa del día)"
    ]
  },
  en: {
    prot: [
      "Grilled chicken breast (90g)",
      "Lean roast beef (90g)",
      "Grilled fish (90g) — snapper, grouper or mackerel",
      "Canned tuna in water (90g)",
      "Baked turkey (90g)",
      "Grilled pork loin (90g)",
      "Sautéed lean ground beef (90g)",
      "Shredded chicken in tomato sauce (90g)",
      "Herb-baked chicken breast (90g)",
      "Air-fryer fish croquettes (90g)",
      "Fresh grilled sardines (2 units)",
      "Scrambled egg whites (3 units)",
      "Fish pisillo / flaked fish (6 tbsp)",
      "Turkey ham (3 slices)",
      "Grilled beef steak (90g)",
      "Chicken stewed in vegetable sauce (90g)",
      "Steamed fish with vegetables (90g)"
    ],
    carb: [
      "Grilled medium arepa (1 / 100g)",
      "White rice (½ cup cooked)",
      "Boiled cassava (120g)",
      "Steamed sweet potato (1 medium)",
      "Cassava bread (60g)",
      "Boiled potato (1 medium)",
      "Boiled green plantain (¼ unit)",
      "Baked ripe plantain (¼ unit)",
      "Corn dumplings (2 units)",
      "Corn tortilla (1 unit)",
      "GF rice crackers (2 packs)",
      "Sweet potato arepa (1 medium)",
      "Boiled apio / arracacha (120g)",
      "Boiled yam / ñame (120g)",
      "Boiled taro / ocumo (120g)",
      "Cooked quinoa (½ cup)",
      "Air-fryer stuffed potato (1 unit)"
    ],
    veg: [
      "Zucchini sautéed in olive oil (1 cup)",
      "Steamed broccoli with lemon (1 cup)",
      "Boiled green beans (½ cup)",
      "Oven-roasted carrot (½ cup)",
      "Spinach sautéed with garlic (1 cup)",
      "Grilled eggplant (1 cup)",
      "Tomato, cucumber & spring onion salad",
      "Steamed chard (1 cup)",
      "Hearts of palm with lemon & cilantro (1 cup)",
      "Boiled pumpkin / auyama (½ cup)",
      "Watercress & tomato salad",
      "Boiled chayote (1 cup)",
      "Pumpkin cream soup without flour (1 cup)",
      "Mixed salad: lettuce, tomato, cucumber",
      "Sautéed mushrooms (1 cup)",
      "Sautéed cabbage (1 cup)",
      "Celery with tomato & basil",
      "Steamed cauliflower (1 cup)"
    ],
    fat: [
      "Avocado (1/8 unit)",
      "Extra-virgin olive oil (1 tsp)",
      "Green olives (5 units)",
      "Unsalted almonds (6 units)",
      "GF vegan margarine (1 tsp)",
      "Toasted sesame seeds (1 tsp — counts as daily fat)"
    ]
  },
  no: {
    prot: [
      "Grillet kyllingbryst (90g)",
      "Magert stekt oksekjøtt (90g)",
      "Grillet fisk (90g) — snapper, steinbit eller makrell",
      "Hermetisk tunfisk i vann (90g)",
      "Bakt kalkun (90g)",
      "Grillet svinefilet (90g)",
      "Sautert mager kjøttdeig (90g)",
      "Revet kylling i tomatsaus (90g)",
      "Urtebasert bakt kyllingbryst (90g)",
      "Air-fryer fiskekaker (90g)",
      "Ferske grillede sardiner (2 stk)",
      "Eggehviter, rørt (3 stk)",
      "Flakket fisk / pisillo (6 ss)",
      "Kalkunskinke (3 skiver)",
      "Grillet biff (90g)",
      "Kyllinggryte i grønnsakssaus (90g)",
      "Dampet fisk med grønnsaker (90g)"
    ],
    carb: [
      "Grillet medium arepa (1 stk / 100g)",
      "Hvit ris (½ kopp kokt)",
      "Kokt kassava (120g)",
      "Dampet søtpotet (1 medium)",
      "Kassavabrød (60g)",
      "Kokt potet (1 medium)",
      "Kokt grønn banan (¼ stk)",
      "Bakt moden banan (¼ stk)",
      "Maisballer (2 stk)",
      "Maistortilla (1 stk)",
      "Glutenfrie riskaker (2 pakker)",
      "Søtpotet-arepa (1 medium)",
      "Kokt apio / arracacha (120g)",
      "Kokt yam / ñame (120g)",
      "Kokt taro / ocumo (120g)",
      "Kokt quinoa (½ kopp)",
      "Air-fryer fylt potet (1 stk)"
    ],
    veg: [
      "Squash sautert i olivenolje (1 kopp)",
      "Dampet brokkoli med sitron (1 kopp)",
      "Kokte grønne bønner (½ kopp)",
      "Ovnsbakt gulrot (½ kopp)",
      "Spinat sautert med hvitløk (1 kopp)",
      "Grillet aubergine (1 kopp)",
      "Tomat, agurk og vårløksalat",
      "Dampet mangold (1 kopp)",
      "Palmehjerter med sitron og koriander (1 kopp)",
      "Kokt gresskar / auyama (½ kopp)",
      "Brønnkarse- og tomatsalat",
      "Kokt chayote (1 kopp)",
      "Gresskarkremsuppe uten mel (1 kopp)",
      "Blandet salat: salat, tomat, agurk",
      "Sauterte sopp (1 kopp)",
      "Sautert kål (1 kopp)",
      "Selleri med tomat og basilikum",
      "Dampet blomkål (1 kopp)"
    ],
    fat: [
      "Avokado (1/8 stk)",
      "Ekstra jomfru olivenolje (1 ts)",
      "Grønne oliven (5 stk)",
      "Usaltede mandler (6 stk)",
      "Glutenfri vegansk margarin (1 ts)",
      "Ristede sesamfrø (1 ts — teller som dagens fett)"
    ]
  }
};

/* ============================================================
   MEAL SWAP OPTIONS — per nutritionist food list substitutions
   Grouped by meal type. All within same caloric/macro group.
   ============================================================ */
const SWAPS = {
  b: {  // Breakfast protein swaps
    es: ["Queso de cabra (90g)","Queso semi duro (90g)","Jamón de pavo (3 reb)","Pollo esmechado (90g)","Carne molida magra (90g)","Pavo (90g)","Atún al natural (90g)","2 claras + 1 huevo entero","Pisillo de pescado (6 cdas)","Sardinas frescas (2 und)"],
    en: ["Goat cheese (90g)","Semi-hard cheese (90g)","Turkey ham (3 slices)","Shredded chicken (90g)","Lean ground beef (90g)","Turkey (90g)","Canned tuna (90g)","2 whites + 1 whole egg","Flaked fish (6 tbsp)","Fresh sardines (2 units)"],
    no: ["Geitost (90g)","Halvfast ost (90g)","Kalkunskinke (3 skiver)","Revet kylling (90g)","Mager kjøttdeig (90g)","Kalkun (90g)","Hermetisk tunfisk (90g)","2 hviter + 1 helt egg","Flakket fisk (6 ss)","Ferske sardiner (2 stk)"]
  },
  l: {  // Lunch protein swaps
    es: ["Pechuga de pollo a la plancha (90g)","Bistec de res magro (90g)","Pescado al horno: carite, pargo o mero (90g)","Atún al ajillo (90g)","Lomo de cerdo a la plancha (90g)","Carne molida en hamburguesa (90g)","Pollo guisado sin harina (90g)","Sardinas frescas (2 und)","Croquetas de pescado AF (90g)","Pisillo de pescado (6 cdas)"],
    en: ["Grilled chicken breast (90g)","Lean beef steak (90g)","Baked fish: snapper, grouper or mackerel (90g)","Garlic tuna (90g)","Grilled pork loin (90g)","Ground beef burger (90g)","Chicken stew without flour (90g)","Fresh sardines (2 units)","AF fish croquettes (90g)","Flaked fish (6 tbsp)"],
    no: ["Grillet kyllingbryst (90g)","Mager biffstek (90g)","Bakt fisk: snapper, steinbit eller makrell (90g)","Hvitløkstunfisk (90g)","Grillet svinefilet (90g)","Kjøttdeigburger (90g)","Kyllinggryte uten mel (90g)","Ferske sardiner (2 stk)","Luftfriterte fiskekaker (90g)","Flakket fisk (6 ss)"]
  },
  d: {  // Dinner swaps (lighter)
    es: ["Ensalada de atún (90g)","Tortilla de calabacín + 2 claras","Sopa de auyama + carne magra (90g)","Jamón de pavo + galletas de arroz (2 paq)","Queso búfala (30g) + ensalada caprese","Pollo esmechado + arepa pequeña","Pisillo de pescado + casabe (40g)","Hamburguesa de carne (90g) + lechuga wrap"],
    en: ["Tuna salad (90g)","Zucchini omelette + 2 egg whites","Pumpkin soup + lean beef (90g)","Turkey ham + rice crackers (2 packs)","Buffalo cheese (30g) + caprese salad","Shredded chicken + small arepa","Flaked fish + cassava bread (40g)","Beef burger (90g) + lettuce wrap"],
    no: ["Tunfisksalat (90g)","Squashomelett + 2 eggehviter","Gresskarsuppe + magert kjøtt (90g)","Kalkunskinke + riskaker (2 pakker)","Bøffelost (30g) + caprese-salat","Revet kylling + liten arepa","Flakket fisk + kassavabrød (40g)","Kjøttdeigburger (90g) + salatblad-wrap"]
  }
};


/* ============================================================
   APP STATE
   ============================================================ */
