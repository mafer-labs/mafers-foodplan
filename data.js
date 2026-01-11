const MARIA_PROTOCOL_DATA = {
  userProfile: {
    name: "Maria Fernanda Cordova",
    calories: 1300,
    goals: {
      proteins: 10,  // Based on "Carnes: 10" 
      carbs: 5,      // Based on "Almidones: 5" 
      fruits: 3,     // Based on "Frutas: 3" 
      veggies: 2,    // Based on "Vegetales: 2" 
      fats: 2,       // Based on "Grasas: 2" 
      dairy: 0       // Strictly lactose-free/soya 
    }
  },
  supplements: [
    { name: "Glutamina (Glutanet/Glutapack)", timing: "Before Breakfast", taken: false }, // 
    { name: "Probiotic (Coll Vital/Colozin)", timing: "20 min before Breakfast", taken: false } // 
  ],
  allowedFoods: {
    proteins: [
      "Pollo esmechado (2 cdas)", "Pavo", "Pescado", "Lomo de Cerdo", 
      "Carne Molida (2 cdas)", "Atún", "Queso de Búfala", "Queso de Cabra", 
      "Huevos (max 3/week)", "Claras de Huevo (3)"
    ], // 
    carbs: [
      "Arroz", "Yuca", "Ocumo", "Ñame", "Apio", "Granos (Lentejas/Caraotas)", 
      "Papa (1 unit)", "Arepa (1/2 unit)", "Batata (1/2 unit)", 
      "Plátano (1/4 unit)", "Casabe", "Galletas de Soda/Arroz"
    ], // 
    fruits: [
      "Cambur", "Mango (Cocido)", "Toronja", "Zapote", "Durazno (Cocido)", 
      "Melocotón (Cocido)", "Lechosa", "Fresas (Cocidas)", "Mora", "Piña (1 rueda)"
    ], // 
    fats: [
      "Aceite de Oliva", "Aceite de Canola/Maíz/Girasol", "Aguacate (1/8)", 
      "Aceitunas (5)", "Almendras (6)", "Nueces (2)"
    ] // 
  },
  prohibited: [
    "Azúcar (Blanca/Morena)", "Miel", "Papelón", "Gaseosas", "Malta", 
    "Embutidos (Salchichas/Chorizo)", "Cerdo Graso", "Vísceras", 
    "Queso Amarillo/Fundido", "Mayonesa Comercial", "Cubitos"
  ], // 
  mealPlan: [
    {
      day: 1,
      meals: {
        breakfast: "Queso semi duro 90gr + Arepa Asada 100gr + Aguacate",
        lunch: "Pechuga empanizada (Air Fryer) 90gr + Papas (2) + Ensalada rallada",
        dinner: "Carne molida en Hamburguesa + Casabe + Tomate/Lechuga",
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz"
      }
    }, // 
    {
      day: 2,
      meals: {
        breakfast: "Jamon de Pavo (3 reb) + Arepa de Batata + Alfalfa/Tomate",
        lunch: "Calabacines rellenos con carne (90gr) + Arroz Blanco",
        dinner: "Ensalada de Atún (90gr) + Arepa pequeña + Cebolla/Tomate",
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz"
      }
    }, // 
    {
      day: 3,
      meals: {
        breakfast: "Pollo en salsa 90gr + Papas rellenas (2) + Aceite 1 cdta",
        lunch: "Atún al ajillo (90gr) + Yuca sancochada + Ensalada de berros",
        dinner: "Carne molida (4 cdas) + Tortilla de maíz + Guacamole",
        snackAM: "Fruta de preferencia",
        snackPM: "Fruta + 1 Galleta de arroz"
      }
    } // 
  ]
};
