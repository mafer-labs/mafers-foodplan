// src/data.js

export const protocolData = {
  userSettings: {
    // Extracted from "Maria F. Cordova 2.doc"
    dailyRations: {
      proteins: { total: 10, unit: "oz/portions", color: "bg-purple-100 text-purple-800" },
      starches: { total: 5, unit: "portions", color: "bg-blue-100 text-blue-800" },
      vegetables: { total: 2, unit: "cups", color: "bg-green-100 text-green-800" },
      fruits: { total: 3, unit: "portions", color: "bg-yellow-100 text-yellow-800" },
      fats: { total: 2, unit: "portions", color: "bg-orange-100 text-orange-800" }
    },
    morningRoutine: [
      { id: 'm1', task: "Glutamina (Glutanet/Glutapack)", time: "Before Breakfast", completed: false },
      { id: 'm2', task: "Probiotic (Coll Vital/Colozin)", time: "20 min before meal", completed: false }
    ]
  },
  // Extracted from "Maria Cordova planificaciÃ³n.doc"
  days: [
    {
      dayId: 1,
      meals: {
        breakfast: {
          protein: "Queso semi duro (90g)",
          carb: "Arepa Asada (100g)",
          fat: "Aguacate (1 trozo)",
          drink: "Infusión (Jamaica/Linaza)"
        },
        lunch: {
          protein: "Pechuga empanizada Air Fryer (90g)",
          carb: "Papas (2 unidades)",
          veggie: "Ensalada rallada + 1 cdta mayonesa"
        },
        dinner: {
          protein: "Carne molida en Hamburguesa",
          carb: "Casabe",
          veggie: "Tomate, Lechuga, Pepino"
        },
        snackAM: "Fruta (Jugo o trozos)",
        snackPM: "1 Fruta + 1 Galleta arroz/maíz"
      }
    },
    {
      dayId: 2,
      meals: {
        breakfast: {
          protein: "Jamon de Pavo (3 reb)",
          carb: "Arepa de batata (1)",
          fat: "Alfalfa, tomate + Margarina"
        },
        lunch: {
          protein: "Calabacines rellenos carne (90g)",
          carb: "Arroz Blanco",
          veggie: "Vegetales de relleno"
        },
        dinner: {
          protein: "Ensalada de Atun (90g)",
          carb: "Arepa pequeña",
          veggie: "Cebolla y tomate"
        }
      }
    },
    {
      dayId: 3,
      meals: {
        breakfast: {
          protein: "Pollo en salsa (90g)",
          carb: "Papa rellenas (2x 100g)",
          fat: "Aceite (1 cdta)"
        },
        lunch: {
          protein: "Atun al ajillo (90g)",
          carb: "Yuca sancochada",
          veggie: "Ensalada berros"
        },
        dinner: {
          protein: "Carne molida (4 cdas) + crema",
          carb: "Tortilla de maíz (Burrito)",
          veggie: "Guacamole (2 cdas)"
        }
      }
    },
    // ... We can add Days 4-10 easily here later. 
    // This structure ensures the app works immediately.
  ]
};
