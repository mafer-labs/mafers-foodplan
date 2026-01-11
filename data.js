// data.js

export const protocolData = {
  userSettings: {
    dailyRations: {
      // Source: "DISTRIBUCIÓN DE ALIMENTOS POR RACIONES DIARIAS"
      [cite_start]proteins: { total: 10, unit: "portions" },   // [cite: 16]
      [cite_start]starches: { total: 5, unit: "portions" },    // [cite: 16]
      [cite_start]vegetables: { total: 2, unit: "cups" },      // [cite: 16]
      [cite_start]fruits: { total: 3, unit: "portions" },      // [cite: 16]
      [cite_start]fats: { total: 2, unit: "portions" }         // [cite: 16]
    },
    morningRoutine: [
      // Source: "Glutanet 1 sobre... antes de desayunar" / "Coll Vital... 15 o 20 min para desayunar"
      [cite_start]{ id: 1, task: "Glutamine (Glutanet/Glutapack)", time: "Before Breakfast", completed: false }, // [cite: 41]
      [cite_start]{ id: 2, task: "Probiotics (Coll Vital/Colozin)", time: "20 mins before meal", completed: false } // [cite: 41]
    ]
  },
  days: [
    {
      dayId: 1,
      meals: {
        breakfast: {
          [cite_start]protein: "Queso semi duro (90g)", // [cite: 1]
          [cite_start]carb: "Arepa Asada (100g)",      // [cite: 1]
          [cite_start]fat: "Aguacate (1 trozo)",       // [cite: 1]
          [cite_start]drink: "Infusión (Jamaica/Linaza)" // [cite: 1]
        },
        lunch: {
          [cite_start]protein: "Pechuga empanizada air fryer (90g)", // [cite: 3]
          [cite_start]carb: "Papas (2 unidades)",                    // [cite: 3]
          [cite_start]veggie: "Ensalada rallada + 1 cdta mayonesa"   // [cite: 3]
        },
        dinner: {
          [cite_start]protein: "Carne molida en Hamburguesa",       // [cite: 5]
          [cite_start]carb: "Casabe",                               // [cite: 5]
          [cite_start]veggie: "Tomate, Lechuga, Pepino"             // [cite: 5]
        },
        [cite_start]snackAM: "Fruta de preferencia (Jugo o trozos)", // [cite: 1]
        [cite_start]snackPM: "1 Fruta + 1 Galleta de arroz/maíz"     // [cite: 5]
      }
    },
    // You can add Day 2, Day 3 here later...
  ]
};
