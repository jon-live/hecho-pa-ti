// ─────────────────────────────────────────────────────────────
// Hecho Pa' Ti — product catalog
// Each item: [kind, name_es, name_en, desc_es, desc_en, priceUSD, options]
//   kind: "c" = personalizado / made to order (Winstone OEM, 3–4 weeks)
//         "s" = en stock / ships in 1–2 days (1688/Taobao stock)
//   options (optional object):
//     p: true          → shows a "name / date" box for personalization
//     v: ["Rosa","Lila"] → variant chooser (color, state, size…)
//     min: 20          → minimum quantity
// Image: put a file at assets/<catId>-<index>.jpg (e.g. assets/fe-0.jpg)
// and it will be used automatically; otherwise a colored tile is shown.
// ─────────────────────────────────────────────────────────────
window.HPT_CATALOG = [
 {id:"fe", tile:"t1", es:["Fe y Protección","Para la casa, el carro y la cartera."], en:["Faith & Protection","For the home, the car and your pocket."], items:[
  ["c","Llavero Virgen de Guadalupe","Guadalupe Keychain","Metal esmaltado, dorado. Grabado opcional.","Enamel metal, gold finish. Optional engraving.",9,{p:true}],
  ["c","Llavero San Judas Tadeo","St. Jude Keychain","Metal esmaltado verde y oro.","Green and gold enamel metal.",9,{p:true}],
  ["c","Pin San Miguel Arcángel","St. Michael Lapel Pin","Esmalte duro, 1.2 pulgadas.","Hard enamel, 1.2 in.",8],
  ["c","Moneda de bolsillo Guadalupe","Guadalupe Pocket Coin","Latón, 1.5 pulgadas, con estuche.","Brass, 1.5 in, with pouch.",12,{p:true}],
  ["s","Rosario de madera","Wooden Rosary","Cuentas de madera, cruz de metal.","Wood beads, metal cross.",8],
  ["s","Imagen Virgen de Guadalupe 8\"","Guadalupe Statue 8 in","Resina pintada a mano.","Hand-painted resin.",24],
  ["s","Imagen San Judas 8\"","St. Jude Statue 8 in","Resina pintada a mano.","Hand-painted resin.",24],
  ["c","Imán Sagrado Corazón","Sacred Heart Magnet","Metal 3D para el refri.","3D metal fridge magnet.",7]]},

 {id:"carro", tile:"t2", es:["Mi Carro","Lo que cuelga del espejo y lo que dice tu placa."], en:["My Car","What hangs from the mirror and what your plate says."], items:[
  ["c","Aromatizante Guadalupe","Guadalupe Car Charm","PVC con aroma a vainilla, cordón.","Scented PVC charm with cord.",8],
  ["c","Aromatizante San Judas","St. Jude Car Charm","PVC, aroma coco.","PVC, coconut scent.",8],
  ["c","Colgante \"Hecho en México\"","\"Hecho en México\" Charm","PVC con bandera, doble cara.","Two-sided PVC with flag.",7],
  ["c","Placa metálica de tu estado","Metal State Plaque","Para el tablero. Elige tu estado.","Dashboard mount. Pick your state.",14,{v:["Jalisco","Michoacán","Zacatecas","Guanajuato","Sinaloa","Oaxaca","Puebla","Durango","Guerrero","Otro / Other"]}],
  ["s","Rosario para espejo","Rearview Rosary","Cuentas grandes, cruz dorada.","Large beads, gold cross.",9],
  ["s","Cubre volante sarape","Sarape Steering Wheel Cover","Tejido multicolor, 15 pulgadas.","Multicolor weave, 15 in.",19],
  ["s","Marco de placa personalizado","Custom License Frame","Acero inoxidable, texto a tu gusto.","Stainless steel, your text.",14,{p:true}],
  ["c","Llavero rin de lujo","Alloy Wheel Keychain","Metal con rin giratorio.","Metal with spinning rim.",11]]},

 {id:"cocina", tile:"t3", es:["Cocina Mexicana","Básicos que toda cocina necesita."], en:["Mexican Kitchen","Basics every kitchen needs."], items:[
  ["s","Tortillero de tela bordado","Embroidered Tortilla Warmer","Algodón con forro térmico. Bordado \"Familia\" + apellido opcional.","Cotton with thermal lining. Optional \"Familia\" + last name.",10,{p:true}],
  ["s","Prensa para tortillas 8\"","Tortilla Press 8 in","Aluminio fundido, pesada.","Cast aluminum, heavy duty.",24],
  ["s","Exprimidor de limón","Lime Squeezer","Aluminio.","Aluminum.",8,{v:["Verde / Green","Amarillo / Yellow"]}],
  ["s","Taza de peltre","Enamel Mug","Peltre clásico, 12 oz.","Classic enamelware, 12 oz.",9,{v:["Azul / Blue","Rojo / Red","Verde / Green","Blanco / White"]}],
  ["s","Juego de 4 platos de peltre","Enamel Plate Set of 4","Peltre 10 pulgadas.","Enamelware, 10 in.",26],
  ["s","Molcajete mini para salsa","Mini Salsa Molcajete","Piedra volcánica, 4 pulgadas.","Volcanic stone, 4 in.",18],
  ["c","Portavasos Lotería (6)","Lotería Coasters (6)","PVC suave: El Gallo, La Luna, El Corazón…","Soft PVC: El Gallo, La Luna, El Corazón…",14],
  ["c","Destapador imán Lotería","Lotería Magnet Opener","Metal, se pega al refri.","Metal, sticks to the fridge.",9]]},

 {id:"quince", tile:"t5", es:["Mi Quince","Recuerdos para 100 invitados o más."], en:["My Quince","Favors for 100 guests or more."], items:[
  ["c","Espejo recuerdo con nombre","Keepsake Mirror with Name","PVC, nombre y fecha impresos.","PVC, name and date printed.",5,{p:true,v:["Rosa / Pink","Lila / Lilac"],min:50}],
  ["c","Monedero recuerdo","Keepsake Coin Purse","PVC con cierre, nombre y fecha.","Zip PVC, name and date.",5,{p:true,min:50}],
  ["c","Pin corona de Quince","Quince Crown Pin","Esmalte dorado con nombre.","Gold enamel with name.",6,{p:true,min:50}],
  ["c","Llavero \"Mis XV\"","\"Mis XV\" Keychain","Metal dorado con fecha grabada.","Gold metal with engraved date.",6,{p:true,min:50}],
  ["s","Corona tiara de cristal","Crystal Tiara","Aleación con cristales, 3 pulgadas.","Alloy with crystals, 3 in.",38],
  ["s","Libro de firmas","Guest Book","Tapa dura rosa, 40 hojas.","Pink hardcover, 40 pages.",22],
  ["s","Set de 50 bolsas de recuerdo","50 Favor Bags","Organza con listón.","Organza with ribbon.",16],
  ["s","Letrero \"Mis XV Años\"","\"Mis XV Años\" Sign","Acrílico dorado, 24 pulgadas.","Gold acrylic, 24 in.",34]]},

 {id:"fiesta", tile:"t6", es:["Fiesta","Cumpleaños, Día de Muertos, Navidad."], en:["Fiesta","Birthdays, Día de Muertos, Christmas."], items:[
  ["s","Papel picado 5 m","Papel Picado 5 m","Banderines de plástico, multicolor.","Plastic banners, multicolor.",8],
  ["s","Piñata estrella","Star Piñata","7 picos, 20 pulgadas.","7 points, 20 in.",22],
  ["s","Máscara calavera","Calavera Mask","Resina pintada, Día de Muertos.","Painted resin, Día de Muertos.",15],
  ["s","Corona de flores","Flower Crown","Flores de tela, ajustable.","Fabric flowers, adjustable.",12],
  ["s","Molde calaverita de azúcar","Sugar Skull Mold","Silicona, 3 tamaños.","Silicone, 3 sizes.",10],
  ["c","Pin catrina esmaltado","Catrina Enamel Pin","Esmalte duro, 1.5 pulgadas.","Hard enamel, 1.5 in.",8],
  ["s","Set de 12 globos mexicanos","12 Mexican Balloons","Verde, blanco y rojo.","Green, white and red.",6],
  ["c","Medalla de torneo","Tournament Medal","Metal 2 pulgadas con listón. Para ligas y escuelas.","2 in metal with ribbon. For leagues and schools.",7,{p:true,min:20}]]},

 {id:"orgullo", tile:"t4", es:["Orgullo","Tu estado, tu barrio, tu pan dulce."], en:["Pride","Your state, your barrio, your pan dulce."], items:[
  ["c","Llavero escudo de tu estado","State Crest Keychain","32 estados, metal esmaltado.","All 32 states, enamel metal.",9,{v:["Jalisco","Michoacán","Zacatecas","Guanajuato","Sinaloa","Oaxaca","Puebla","Durango","Guerrero","Otro / Other"]}],
  ["c","Imanes Lotería (5)","Lotería Magnets (5)","Metal 3D en caja: El Sol, La Sirena, El Nopal…","3D metal in gift box: El Sol, La Sirena, El Nopal…",14],
  ["c","Llavero concha","Concha Keychain","PVC 3D.","3D PVC.",8,{v:["Rosa / Pink","Chocolate"]}],
  ["c","Funda AirPods concha","Concha AirPods Case","Silicona con gancho.","Silicone with clip.",12],
  ["c","Pin \"La Chancla\"","\"La Chancla\" Pin","Esmalte, 1 pulgada. Regalo para mamá.","Enamel, 1 in. A gift for mom.",8],
  ["c","Soporte celular nopal","Nopal Phone Stand","PVC 3D.","3D PVC.",10],
  ["s","Hebilla vaquera águila","Eagle Cowboy Buckle","Aleación plateada, 3.5 pulgadas.","Silver alloy, 3.5 in.",22],
  ["s","Cobija sarape 50×70","Sarape Blanket 50×70","Acrílico tejido, multicolor.","Woven acrylic, multicolor.",32]]}
];
