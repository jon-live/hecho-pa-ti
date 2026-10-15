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
 {id:"fe", tile:"t1", es:["Fe","La Virgencita, San Juditas y tu protección."], en:["Faith","Guadalupe, St. Jude and your protection."], zh:["信仰与守护","家里、车上和随身携带。"], items:[
  ["c","Llaverito Virgencita de Guadalupe","Guadalupe Keychain","Metal esmaltado, dorado. Grabado opcional.","Enamel metal, gold finish. Optional engraving.",9,{p:true,sp:"key"}],
  ["c","Llaverito San Juditas","St. Jude Keychain","Metal esmaltado verde y oro.","Green and gold enamel metal.",9,{p:true,sp:"key"}],
  ["c","Pin San Miguel Arcángel","St. Michael Lapel Pin","Esmalte duro, 1.2 pulgadas.","Hard enamel, 1.2 in.",8,{sp:"pin"}],
  ["c","Moneda de bolsillo Guadalupe","Guadalupe Pocket Coin","Latón, 1.5 pulgadas, con estuche.","Brass, 1.5 in, with pouch.",12,{p:true,sp:"coin"}],
  ["s","Rosario de madera","Wooden Rosary","Cuentas de madera, cruz de metal.","Wood beads, metal cross.",8,{sp:"stock"}],
  ["s","Imagen Virgen de Guadalupe 8\"","Guadalupe Statue 8 in","Resina pintada a mano.","Hand-painted resin.",24,{sp:"stock"}],
  ["s","Imagen San Judas 8\"","St. Jude Statue 8 in","Resina pintada a mano.","Hand-painted resin.",24,{sp:"stock"}],
  ["c","Imán Sagrado Corazón","Sacred Heart Magnet","Metal 3D para el refri.","3D metal fridge magnet.",7,{sp:"mag3d"}]]},

 {id:"carro", tile:"t2", es:["Pa'l carro","Lo que cuelga del espejo y lo que dice tu placa."], en:["My Car","What hangs from the mirror and what your plate says."], zh:["我的车","后视镜挂件和车牌装饰。"], items:[
  ["c","Aromatizante Guadalupe","Guadalupe Car Charm","PVC con aroma a vainilla, cordón.","Scented PVC charm with cord.",8,{sp:"pvc"}],
  ["c","Aromatizante San Judas","St. Jude Car Charm","PVC, aroma coco.","PVC, coconut scent.",8,{sp:"pvc"}],
  ["c","Colgante \"Hecho en México\"","\"Hecho en México\" Charm","PVC con bandera, doble cara.","Two-sided PVC with flag.",7,{sp:"pvc"}],
  ["c","Placa metálica de tu estado","Metal State Plaque","Para el tablero. Elige tu estado.","Dashboard mount. Pick your state.",14,{v:["Jalisco","Michoacán","Zacatecas","Guanajuato","Sinaloa","Oaxaca","Puebla","Durango","Guerrero","Otro / Other"],sp:"plaque"}],
  ["s","Rosario para espejo","Rearview Rosary","Cuentas grandes, cruz dorada.","Large beads, gold cross.",9,{sp:"stock"}],
  ["s","Cubre volante sarape","Sarape Steering Wheel Cover","Tejido multicolor, 15 pulgadas.","Multicolor weave, 15 in.",19,{sp:"stock"}],
  ["s","Marco de placa personalizado","Custom License Frame","Acero inoxidable, texto a tu gusto.","Stainless steel, your text.",14,{p:true,sp:"frame"}],
  ["c","Llavero rin de lujo","Alloy Wheel Keychain","Metal con rin giratorio.","Metal with spinning rim.",11,{sp:"key3d"}],
  ["c","Colgante de espejo con borla","Rearview Tassel Charm","Medallón de metal esmaltado con borla de hilo y nudo tejido. Pa'l retrovisor.","Enamel metal medallion with thread tassel and woven knot. For the rearview mirror.",12,{p:true,v:["Virgencita de Guadalupe","San Juditas","Mi estado / My state"],sp:"charm"}]]},

 {id:"cocina", tile:"t3", es:["Pa' la cocina","Lo básico que toda cocina mexicana necesita."], en:["Mexican Kitchen","Basics every kitchen needs."], zh:["墨西哥厨房","每个厨房都需要的基础用品。"], items:[
  ["s","Tortillero de tela bordado","Embroidered Tortilla Warmer","Algodón con forro térmico. Bordado \"Familia\" + apellido opcional.","Cotton with thermal lining. Optional \"Familia\" + last name.",10,{p:true,sp:"stock"}],
  ["s","Prensa para tortillas 8\"","Tortilla Press 8 in","Aluminio fundido, pesada.","Cast aluminum, heavy duty.",24,{sp:"stock"}],
  ["s","Exprimidor de limón","Lime Squeezer","Aluminio.","Aluminum.",8,{v:["Verde / Green","Amarillo / Yellow"],sp:"stock"}],
  ["s","Taza de peltre","Enamel Mug","Peltre clásico, 12 oz.","Classic enamelware, 12 oz.",9,{v:["Azul / Blue","Rojo / Red","Verde / Green","Blanco / White"],sp:"stock"}],
  ["s","Juego de 4 platos de peltre","Enamel Plate Set of 4","Peltre 10 pulgadas.","Enamelware, 10 in.",26,{sp:"stock"}],
  ["s","Molcajete mini para salsa","Mini Salsa Molcajete","Piedra volcánica, 4 pulgadas.","Volcanic stone, 4 in.",18,{sp:"stock"}],
  ["c","Portavasos Lotería (6)","Lotería Coasters (6)","PVC suave: El Gallo, La Luna, El Corazón…","Soft PVC: El Gallo, La Luna, El Corazón…",14,{sp:"coaster"}],
  ["c","Destapador imán Lotería","Lotería Magnet Opener","Metal, se pega al refri.","Metal, sticks to the fridge.",9,{sp:"opener"}]]},

 {id:"quince", tile:"t5", es:["Recuerditos de XV","Paquetes de 50 y 100 pzas con nombre y fecha."], en:["Quince Favors","Packs of 50 and 100 with name and date."], zh:["十五岁成人礼","100 位以上宾客的回礼。"], items:[
  ["c","Espejito recuerdo con nombre","Keepsake Mirror with Name","PVC, nombre y fecha impresos.","PVC, name and date printed.",5,{p:true,v:["Rosa / Pink","Lila / Lilac"],min:50,sp:"mirrorpvc"}],
  ["c","Monederito recuerdo","Keepsake Coin Purse","PVC con cierre, nombre y fecha.","Zip PVC, name and date.",5,{p:true,min:50,sp:"purse"}],
  ["c","Pin corona de Quince","Quince Crown Pin","Esmalte dorado con nombre.","Gold enamel with name.",6,{p:true,min:50,sp:"pin"}],
  ["c","Llaverito \"Mis XV\"","\"Mis XV\" Keychain","Metal dorado con fecha grabada.","Gold metal with engraved date.",6,{p:true,min:50,sp:"key"}],
  ["s","Corona tiara de cristal","Crystal Tiara","Aleación con cristales, 3 pulgadas.","Alloy with crystals, 3 in.",38,{sp:"stock"}],
  ["s","Libro de firmas","Guest Book","Tapa dura rosa, 40 hojas.","Pink hardcover, 40 pages.",22,{sp:"stock"}],
  ["s","Set de 50 bolsas de recuerdo","50 Favor Bags","Organza con listón.","Organza with ribbon.",16,{sp:"stock"}],
  ["s","Letrero \"Mis XV Años\"","\"Mis XV Años\" Sign","Acrílico dorado, 24 pulgadas.","Gold acrylic, 24 in.",34,{sp:"stock"}],
  ["c","Espejito metálico dorado con nombre","Gold Metal Compact with Name","Estuche de metal dorado con esmalte, doble espejo, caja de regalo.","Gold metal compact with enamel lid, dual mirror, gift box.",12,{p:true,min:20,sp:"mirrormetal"}]]},

 {id:"fiesta", tile:"t6", es:["Fiesta","Cumpleaños, bautizos, Día de Muertos, Navidad."], en:["Fiesta","Birthdays, Día de Muertos, Christmas."], zh:["派对","生日、亡灵节、圣诞节。"], items:[
  ["s","Papel picado 5 m","Papel Picado 5 m","Banderines de plástico, multicolor.","Plastic banners, multicolor.",8,{sp:"stock"}],
  ["s","Piñata estrella","Star Piñata","7 picos, 20 pulgadas.","7 points, 20 in.",22,{sp:"stock"}],
  ["s","Máscara calavera","Calavera Mask","Resina pintada, Día de Muertos.","Painted resin, Día de Muertos.",15,{sp:"stock"}],
  ["s","Corona de flores","Flower Crown","Flores de tela, ajustable.","Fabric flowers, adjustable.",12,{sp:"stock"}],
  ["s","Molde calaverita de azúcar","Sugar Skull Mold","Silicona, 3 tamaños.","Silicone, 3 sizes.",10,{sp:"stock"}],
  ["c","Pin catrina esmaltado","Catrina Enamel Pin","Esmalte duro, 1.5 pulgadas.","Hard enamel, 1.5 in.",8,{sp:"pin"}],
  ["s","Set de 12 globos mexicanos","12 Mexican Balloons","Verde, blanco y rojo.","Green, white and red.",6,{sp:"stock"}],
  ["c","Medalla de torneo","Tournament Medal","Metal 2 pulgadas con listón. Para ligas y escuelas.","2 in metal with ribbon. For leagues and schools.",7,{p:true,min:20,sp:"medal"}],
  ["c","Pulserita de fiesta infantil","Kids Party Slap Bracelet","Pulsera de silicona con figurita 3D. Pa' piñatas, cumpleaños y bautizos.","Silicone slap bracelet with 3D charm. For piñatas, birthdays and baptisms.",4,{min:100,sp:"bracelet"}],
  ["c","Trofeo de liga","League Trophy","Metal con base, placa grabada con el nombre del torneo y el año.","Metal on base, engraved plate with tournament name and year.",45,{p:true,min:5,sp:"trophy"}]]},

 {id:"orgullo", tile:"t4", es:["Orgullo de mi tierra","Tu estado, tu barrio, tu pan dulce."], en:["Hometown Pride","Your state, your barrio, your pan dulce."], zh:["家乡骄傲","你的州、你的社区、你的甜面包。"], items:[
  ["c","Llavero escudo de tu estado","State Crest Keychain","32 estados, metal esmaltado.","All 32 states, enamel metal.",9,{v:["Jalisco","Michoacán","Zacatecas","Guanajuato","Sinaloa","Oaxaca","Puebla","Durango","Guerrero","Otro / Other"],sp:"key"}],
  ["c","Imancitos Lotería (5)","Lotería Magnets (5)","Metal 3D en caja: El Sol, La Sirena, El Nopal…","3D metal in gift box: El Sol, La Sirena, El Nopal…",14,{sp:"mag3d"}],
  ["c","Llaverito de concha","Concha Keychain","PVC 3D.","3D PVC.",8,{v:["Rosa / Pink","Chocolate"],sp:"pvc"}],
  ["c","Funda AirPods concha","Concha AirPods Case","Silicona con gancho.","Silicone with clip.",12,{sp:"airpods"}],
  ["c","Pin \"La Chancla\"","\"La Chancla\" Pin","Esmalte, 1 pulgada. Regalo para mamá.","Enamel, 1 in. A gift for mom.",8,{sp:"pin"}],
  ["c","Soporte celular nopal","Nopal Phone Stand","PVC 3D.","3D PVC.",10,{sp:"stand"}],
  ["s","Hebilla vaquera águila","Eagle Cowboy Buckle","Aleación plateada, 3.5 pulgadas.","Silver alloy, 3.5 in.",22,{sp:"stock"}],
  ["s","Cobija sarape 50×70","Sarape Blanket 50×70","Acrílico tejido, multicolor.","Woven acrylic, multicolor.",32,{sp:"stock"}],
  ["c","Figura 3D de colección","3D Collectible Figure","PVC 3D de 8 cm: tu equipo, tu luchador, tu mascota. Caja ciega opcional.","3 in 3D PVC: your team, your luchador, your mascot. Blind box option.",16,{min:100,sp:"figure"}]]}
];

// Chinese names and descriptions, keyed by item id (<categoryId>-<index>).
// Items missing here fall back to English.
window.HPT_CATALOG_ZH = {
 "fe-0":["瓜达卢佩圣母钥匙扣","珐琅金属，金色。可选刻字。"],
 "fe-1":["圣犹达钥匙扣","绿金双色珐琅金属。"],
 "fe-2":["圣米迦勒徽章","硬珐琅，1.2 英寸。"],
 "fe-3":["瓜达卢佩口袋币","黄铜，1.5 英寸，附收纳袋。"],
 "fe-4":["木质念珠","木珠，金属十字架。"],
 "fe-5":["瓜达卢佩圣母像 8 英寸","手绘树脂。"],
 "fe-6":["圣犹达像 8 英寸","手绘树脂。"],
 "fe-7":["圣心冰箱贴","3D 金属冰箱贴。"],
 "carro-0":["瓜达卢佩车挂香片","PVC 香草味，带挂绳。"],
 "carro-1":["圣犹达车挂香片","PVC，椰子味。"],
 "carro-2":["\"Hecho en México\" 车挂","双面 PVC，带国旗。"],
 "carro-3":["金属州名车牌","仪表台安装。选择你的州。"],
 "carro-4":["后视镜念珠","大珠，金色十字架。"],
 "carro-5":["Sarape 方向盘套","多彩编织，15 英寸。"],
 "carro-6":["定制车牌框","不锈钢，自定义文字。"],
 "carro-7":["轮毂钥匙扣","金属，轮毂可旋转。"],
 "carro-8":["后视镜流苏挂件","珐琅金属吊牌配手工编结流苏。挂后视镜。"],
 "cocina-0":["刺绣玉米饼保温袋","棉布加保温内衬。可选绣 \"Familia\" + 姓氏。"],
 "cocina-1":["玉米饼压饼器 8 英寸","铸铝，厚重耐用。"],
 "cocina-2":["青柠榨汁器","铝制。"],
 "cocina-3":["搪瓷杯","经典搪瓷，12 盎司。"],
 "cocina-4":["搪瓷盘 4 件套","搪瓷，10 英寸。"],
 "cocina-5":["迷你火山岩酱料臼","火山岩，4 英寸。"],
 "cocina-6":["Lotería 杯垫（6 个）","软 PVC：公鸡、月亮、心…"],
 "cocina-7":["Lotería 磁吸开瓶器","金属，可吸在冰箱上。"],
 "quince-0":["刻名纪念镜","PVC，印名字和日期。"],
 "quince-1":["纪念零钱包","拉链 PVC，印名字和日期。"],
 "quince-2":["Quince 皇冠徽章","金色珐琅，刻名字。"],
 "quince-3":["\"Mis XV\" 钥匙扣","金色金属，刻日期。"],
 "quince-4":["水晶头冠","合金镶水晶，3 英寸。"],
 "quince-5":["签名簿","粉色硬壳，40 页。"],
 "quince-6":["回礼袋 50 个","欧根纱配丝带。"],
 "quince-7":["\"Mis XV Años\" 标牌","金色亚克力，24 英寸。"],
 "quince-8":["刻名金色金属化妆镜","金色金属珐琅盖，双面镜，礼盒装。"],
 "fiesta-0":["剪纸彩旗 5 米","塑料彩旗，多色。"],
 "fiesta-1":["星形皮纳塔","7 角，20 英寸。"],
 "fiesta-2":["骷髅面具","手绘树脂，亡灵节。"],
 "fiesta-3":["花环头饰","布艺花朵，可调节。"],
 "fiesta-4":["糖骷髅模具","硅胶，3 种尺寸。"],
 "fiesta-5":["Catrina 珐琅徽章","硬珐琅，1.5 英寸。"],
 "fiesta-6":["墨西哥配色气球 12 个","绿、白、红。"],
 "fiesta-7":["比赛奖牌","2 英寸金属配绶带。适合球队和学校。"],
 "fiesta-8":["儿童派对啪啪圈","硅胶啪啪圈配 3D 小公仔。适合皮纳塔、生日和洗礼。"],
 "fiesta-9":["联赛奖杯","金属配底座，铭牌刻赛事名和年份。"],
 "orgullo-0":["州徽钥匙扣","32 个州，珐琅金属。"],
 "orgullo-1":["Lotería 冰箱贴（5 个）","3D 金属礼盒装：太阳、美人鱼、仙人掌…"],
 "orgullo-2":["Concha 面包钥匙扣","3D PVC。"],
 "orgullo-3":["Concha AirPods 保护套","硅胶带挂钩。"],
 "orgullo-4":["\"La Chancla\" 徽章","珐琅，1 英寸。送妈妈的礼物。"],
 "orgullo-5":["仙人掌手机支架","3D PVC。"],
 "orgullo-6":["雄鹰牛仔皮带扣","银色合金，3.5 英寸。"],
 "orgullo-7":["Sarape 毛毯 50×70","腈纶编织，多彩。"],
 "orgullo-8":["3D 收藏公仔","8 cm 3D PVC：你的球队、摔角手或吉祥物。可盲盒。"]
};
