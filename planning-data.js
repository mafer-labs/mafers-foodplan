/* Ingredient portions refer to one occurrence in the original meal, not a new prescription. */
const INGREDIENTS = {
  chicken:['Pollo cocido','Cooked chicken','Tilberedt kylling',true],
  beef:['Carne de res cocida','Cooked beef','Tilberedt oksekjøtt',true],
  mince:['Carne molida cocida','Cooked ground beef','Tilberedt kjøttdeig',true],
  fish:['Pescado cocido','Cooked fish','Tilberedt fisk',true],
  turkey:['Pavo cocido','Cooked turkey','Tilberedt kalkun',true],
  pork:['Cerdo cocido','Cooked pork','Tilberedt svinekjøtt',true],
  arepa:['Arepas','Arepas','Arepaer',true],
  sweetArepa:['Arepas de batata','Sweet potato arepas','Søtpotetarepaer',true],
  rice:['Arroz cocido','Cooked rice','Kokt ris',true],
  cassava:['Yuca cocida','Cooked cassava','Kokt kassava',true],
  plantain:['Plátano cocido / tortillas','Cooked plantain / tortillas','Tilberedt kokebanan / tortillas',true],
  dumpling:['Bollitos de maíz','Corn dumplings','Maisballer',true],
  croquette:['Croquetas de pescado','Fish croquettes','Fiskekaker',true],
  fritter:['Buñuelos de yuca','Cassava fritters','Kassavaboller',true],
  soup:['Sopa de auyama y carne','Pumpkin and beef soup','Gresskar- og kjøttsuppe',true],
  crepe:['Crepes de arroz','Rice flour crepes','Rismelspannekaker',true],
  tuna:['Atún','Tuna','Tunfisk',false], cheese:['Queso','Cheese','Ost',false],
  ham:['Jamón / jamón de pavo','Ham / turkey ham','Skinke / kalkunskinke',false],
  avocado:['Aguacate / guacamole','Avocado / guacamole','Avokado / guacamole',false],
  potato:['Papa','Potato','Potet',false], salad:['Ensalada / vegetales frescos','Salad / fresh vegetables','Salat / ferske grønnsaker',false],
  tomato:['Tomate','Tomato','Tomat',false], cucumber:['Pepino','Cucumber','Agurk',false],
  lettuce:['Lechuga','Lettuce','Salatblader',false], onion:['Cebolla','Onion','Løk',false],
  garlic:['Ajo','Garlic','Hvitløk',false], pepper:['Pimentón','Bell pepper','Paprika',false],
  zucchini:['Calabacín','Zucchini','Squash',false], broccoli:['Brócoli','Broccoli','Brokkoli',false],
  carrot:['Zanahoria','Carrot','Gulrot',false], sprouts:['Alfalfa','Alfalfa sprouts','Alfalfaspirer',false],
  watercress:['Berros','Watercress','Brønnkarse',false], egg:['Huevos / claras','Eggs / egg whites','Egg / eggehviter',false],
  cassavaBread:['Casabe','Cassava bread','Kassavabrød',false], tortilla:['Tortillas de maíz','Corn tortillas','Maistortillas',false],
  crackers:['Galletas sin gluten','Gluten-free crackers','Glutenfrie kjeks',false], bun:['Pan sin gluten','Gluten-free buns','Glutenfrie brød',false],
  oil:['Aceite de oliva','Olive oil','Olivenolje',false], margarine:['Margarina vegetal','Vegan margarine','Vegansk margarin',false],
  mayo:['Mayonesa','Mayonnaise','Majones',false], mustard:['Mostaza','Mustard','Sennep',false], sesame:['Ajonjolí','Sesame','Sesam',false],
  fruit:['Fruta de la lista del plan','Fruit from the plan list','Frukt fra planlisten',false]
};
// Breakfast/lunch swaps replace the protein, retaining the original sides.
const MEAL_PARTS = {
  1:{b:['cheese','arepa','avocado'],l:['chicken','potato','salad','mayo'],d:['mince','cassavaBread','tomato','lettuce','cucumber','mustard']},
  2:{b:['ham','sweetArepa','sprouts','tomato','margarine'],l:['mince','zucchini','rice'],d:['tuna','arepa','onion','tomato']},
  3:{b:['chicken','potato','oil'],l:['tuna','garlic','cassava','watercress'],d:['mince','tortilla','avocado']},
  4:{b:['mince','arepa','sesame'],l:['chicken','rice','salad'],d:['ham','cheese','plantain','salad']},
  5:{b:['tuna','cassavaBread','avocado'],l:['beef','onion','pepper','dumpling','salad'],d:['fritter']},
  6:{b:['chicken','plantain','margarine'],l:['beef','rice','tomato','cucumber'],d:['ham','crackers','salad']},
  7:{b:['turkey','crepe','margarine','salad'],l:['fish','cassavaBread','potato','carrot'],d:['cheese','ham','cassava','sprouts']},
  8:{b:['chicken','arepa','avocado'],l:['chicken','rice','broccoli','tomato'],d:['egg','zucchini','ham']},
  9:{b:['cheese','plantain'],l:['mince','bun','potato'],d:['cheese','tomato','crackers']},
  10:{b:['cheese','arepa','margarine'],l:['croquette','rice','salad'],d:['soup']}
};
const SWAP_PARTS = {
  b:[['cheese'],['cheese'],['ham'],['chicken'],['mince'],['turkey'],['tuna'],['egg'],['fish'],['fish']],
  l:[['chicken'],['beef'],['fish'],['tuna','garlic'],['pork'],['mince'],['chicken'],['fish'],['croquette'],['fish']],
  d:[['tuna','salad'],['egg','zucchini'],['soup'],['ham','crackers'],['cheese','tomato'],['chicken','arepa'],['fish','cassavaBread'],['mince','lettuce']]
};
function mealParts(day,type) {
  if (type === 'sa') return ['fruit'];
  if (type === 'sp') return ['fruit','crackers'];
  const index = swapOverrides[`d${day}_${type}`];
  if (Number.isInteger(index) && SWAP_PARTS[type]?.[index]) {
    return type === 'd' ? SWAP_PARTS.d[index] : [...SWAP_PARTS[type][index],...MEAL_PARTS[day][type].slice(1)];
  }
  return MEAL_PARTS[day][type];
}
function mealText(day,type,language=lang) {
  const index=swapOverrides[`d${day}_${type}`];
  const original=MENU[day][language][type];
  if (!Number.isInteger(index) || !SWAPS[type]?.[language]?.[index]) return original;
  const replacement=SWAPS[type][language][index];
  if(type==='d') return replacement;
  const embeddedSides = {
    '2_l': {es:'Calabacín + Arroz blanco (½ tz)',en:'Zucchini + White rice (½ cup)',no:'Squash + Hvit ris (½ kopp)'},
    '4_l': {es:'Arroz (½ tz) + Vegetales salteados + Ensalada',en:'Rice (½ cup) + Sautéed vegetables + Salad',no:'Ris (½ kopp) + Sauterte grønnsaker + Salat'},
    '5_l': {es:'Cebolla y pimentón + Bollitos de maíz + Ensalada mixta',en:'Onion & peppers + Corn dumplings + Mixed salad',no:'Løk og paprika + Maisballer + Blandet salat'}
  };
  if(embeddedSides[`${day}_${type}`]) return replacement+' + '+embeddedSides[`${day}_${type}`][language];
  // Day 9 breakfast lists the protein after the plantain.
  if(day===9 && type==='b') return original.split(' + ')[0]+' + '+replacement;
  const sides=original.split(' + ').slice(1).join(' + ');
  return replacement+(sides ? ' + '+sides : '');
}
