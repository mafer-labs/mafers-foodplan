const MARIA_PROTOCOL_DATA = {
  userProfile: {
    name: "Maria Fernanda Cordova",
    calories: 1300,
    goals: {
      [cite_start]proteins: 10,  // [cite: 24]
      [cite_start]carbs: 5,      // [cite: 22]
      [cite_start]fruits: 3,     // [cite: 22]
      [cite_start]veggies: 2,    // [cite: 19]
      [cite_start]fats: 2,       // [cite: 25]
      [cite_start]dairy: 0       // [cite: 16]
    }
  },
  supplements: [
    [cite_start]{ name: "Glutamina (Glutanet/Glutapack)", timing: "Before Breakfast", taken: false }, // [cite: 41]
    [cite_start]{ name: "Probiotic (Coll Vital/Colozin)", timing: "20 min before Breakfast", taken: false } // [cite: 41]
  ],
  allowedFoods: {
    proteins: [
      "Pollo esmechado (2 cdas)", "Pavo", "Pescado", "Lomo de Cerdo", 
      "Carne Molida (2 cdas)", "Atún", "Queso de Búfala", "Queso de Cabra", 
      "Huevos (max 3/week)", "Claras de Huevo (3)", "Sardinas frescas"
    [cite_start]], // [cite: 23, 24]
    carbs: [
      "Arroz", "Quinoa", "Pasta (Blanca/Integral)", "Yuca", "Ocumo", "Ñame", "Apio", 
      "Granos (Lentejas/Caraotas/Frijoles)", "Papa (1 unit)", "Puré de papas natural",
      "Arepa (1/2 unit)", "Batata (1/2 unit)", "Plátano (1/4 unit)", 
      "Casabe", "Galletas de Soda/Arroz/Maíz", "Pan sin gluten"
    [cite_start]], // [cite: 22, 23]
    fruits: [
      "Cambur (1 med)", "Mango COCIDO", "Toronja", "Zapote", "Durazno COCIDO", 
      "Melocotón COCIDO", "Lechosa (1 taza)", "Fresas COCIDAS", "Mora", 
      "Piña (1 rueda)", "Mandarina", "Guayaba sin concha COCIDA", 
      "Manzana sin concha COCIDA", "Pera COCIDA"
    [cite_start]], // [cite: 19, 20, 21]
    veggies: [
      "Acelga", "Brócoli", "Tomate", "Calabacín", "Pimentón (como aliño)", 
      "Zanahoria", "Vainita", "Espinacas", "Berenjena", "Pepino", 
      "Chayota", "Cebolla", "Cebollín", "Auyama", "Palmito", "Champiñones"
    [cite_start]], // [cite: 17, 18, 19]
    fats: [
      "Aceite de Oliva", "Aceite de Canola/Maíz/Girasol", "Margarina (sin lácteos)",
      "Aguacate (1/8)", "Aceitunas (5)", "Almendras (6)", "Nueces (2)", 
      "Maní (20 - cuidado gases)", "Pistachos (20)"
    [cite_start]] // [cite: 24, 25]
  },
  prohibited: [
    "Azúcar (Blanca/Morena)", "Miel", "Papelón", "Fructosa", "Gaseosas", "Malta", 
    "Té Dulce", "Bebidas en polvo", "Gatorade", "Snacks con colorantes", "Chupetas/Caramelos",
    "Embutidos (Salchichas/Chorizo/Mortadela)", "Cerdo Graso", "Vísceras", "Tocineta",
    "Queso Amarillo/Fundido/Crema", "Mayonesa Comercial", "Cubitos", "Sopas de sobre"
  [cite_start]], // [cite: 16, 17, 29, 30]
  mealPlan: [
    {
      day: 1,
      meals: {
        [cite_start]breakfast: "Queso semi duro 90gr + Arepa Asada 100gr + Aguacate 1 trozo", // [cite: 1]
        [cite_start]lunch: "Pechuga empanizada (Air Fryer) 90gr + Papas (2) + Ensalada rallada", // [cite: 3]
        [cite_start]dinner: "Carne molida en Hamburguesa + Casabe + Tomate/Lechuga", // [cite: 5]
        [cite_start]snackAM: "Fruta de preferencia", // [cite: 1]
        [cite_start]snackPM: "Fruta + 1 Galleta de arroz o maíz" // [cite: 5]
      }
    },
    {
      day: 2,
      meals: {
        [cite_start]breakfast: "Jamon de Pavo (3 reb) + Arepa de Batata (1) + Alfalfa/tomate + Margarina", // [cite: 1]
        [cite_start]lunch: "Calabacines rellenos con carne molida (90gr) + Arroz Blanco", // [cite: 3]
        [cite_start]dinner: "Ensalada de Atún (90gr) + Arepa pequeña + Cebolla y tomate", // [cite: 5]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 3,
      meals: {
        [cite_start]breakfast: "Pollo en salsa 90gr + Papas rellenas (2) + Aceite 1 cdta", // [cite: 1]
        [cite_start]lunch: "Atún al ajillo (90gr) + Yuca sancochada + Ensalada de berros", // [cite: 3]
        [cite_start]dinner: "Carne molida (4 cdas) + Tortilla de maíz (burrito) + Guacamole (2 cdas)", // [cite: 5]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 4,
      meals: {
        [cite_start]breakfast: "Carne Molida sin grasa + Arepa con Ajonjolí + Aguacate (ensalada)", // [cite: 1]
        [cite_start]lunch: "Arroz con pollo y vegetales + Ensalada", // [cite: 3]
        [cite_start]dinner: "Jamon y queso Mozzarella de bufala (3 reb) + Tortilla de platano + Vegetales", // [cite: 5]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 5,
      meals: {
        [cite_start]breakfast: "Ensalada de Atún (6 cdas/90gr) + Casabe 60gr", // [cite: 1]
        [cite_start]lunch: "Parrilla de Carne con cebolla/pimentón + Bollitos + Ensalada Mixta", // [cite: 3]
        [cite_start]dinner: "Buñuelos de Yuca (Air Fryer)", // [cite: 5]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 6,
      meals: {
        [cite_start]breakfast: "Pollo esmechado 90gr + Tortillas de plátano verde/maduro + Margarina/Aguacate", // [cite: 2] (Corrected from Almuerzo label)
        [cite_start]lunch: "Asado Negro 90gr + Arroz (1 tz) + Ensalada de Tomate y pepino", // [cite: 4]
        [cite_start]dinner: "Jamon de pavo + Galletas de Arroz (2 pq) + Ensalada preferida", // [cite: 6]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 7,
      meals: {
        [cite_start]breakfast: "Pavo 90gr + Crepes de harina de arroz (2 unid) + Margarina+vegetales", // [cite: 2]
        [cite_start]lunch: "Pescado al Horno 90gr + Casabe 40gr + Ensalada de papa y zanahoria", // [cite: 4]
        [cite_start]dinner: "Queso Amarillo + 1 reb Jamon + Yuca + Alfalfa", // [cite: 6]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 8,
      meals: {
        [cite_start]breakfast: "Pollo esmechado (6 cdas/90gr) + Arepa asada 100gr + Aguacate", // [cite: 2]
        [cite_start]lunch: "Pollo a la plancha 90gr + Arroz (1 tz) + Brócoli con tomate", // [cite: 4]
        [cite_start]dinner: "Tortilla de calabacin / 2 papas / 2 Claras de Huevo + Jamon rallado", // [cite: 6]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 9,
      meals: {
        [cite_start]breakfast: "Plátano maduro Horneado + Queso mozzarella de bufala/cabra", // [cite: 2]
        [cite_start]lunch: "Hamburguesa de carne 90gr (pan sin gluten) + 1 papa brava + Vegetales", // [cite: 4]
        [cite_start]dinner: "Ensalada Capressa (30gr Mozzarella bufala) + Galleta de Soda (2 pq)", // [cite: 6]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    },
    {
      day: 10,
      meals: {
        [cite_start]breakfast: "Queso de cabra 90gr + Arepa mediana 100gr + Margarina 1 cdta", // [cite: 2]
        [cite_start]lunch: "Croquetas de pescado (Air fryer) 90gr + Arroz (1 tz) + Vegetales", // [cite: 4]
        [cite_start]dinner: "Sopa combinada de auyama apio y Carne 90gr", // [cite: 6]
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz o maíz"
      }
    }
  ]
};
