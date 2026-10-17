// ─────────────────────────────────────────────────────────────
// Casa Nopal — product spec templates, by manufacturing type.
// Each catalog item points at one of these with opt.sp = "<key>".
// Sizes are standard defaults for each product type; confirm final
// dimensions with the factory on the digital proof before production.
// Fields: m material · s size · f finish · a attachment/back · p packaging
//         z personalization · q minimum & lead time
// ─────────────────────────────────────────────────────────────
window.HPT_SPECS = {
 labels:{
  es:{m:"Material",s:"Tamaño",f:"Acabado",a:"Sujeción",p:"Empaque",z:"Personalización",q:"Mínimo y tiempo",how:"Cómo se hace",made:"Hecho a tu medida",stockt:"Listo para enviar"},
  en:{m:"Material",s:"Size",f:"Finish",a:"Attachment",p:"Packaging",z:"Personalization",q:"Minimum & lead time",how:"How it's made",made:"Made to order",stockt:"Ready to ship"},
  zh:{m:"材质",s:"尺寸",f:"工艺",a:"配件",p:"包装",z:"个性化",q:"起订量与交期",how:"制作流程",made:"按需定制",stockt:"现货"}
 },
 types:{
  pin:{
   es:{m:"Aleación de zinc fundida a presión",s:"3 cm (1.2 in) · 2 mm de grosor",f:"Esmalte duro pulido al ras, baño de oro, plata o níquel negro",a:"Broche de mariposa o de goma (2 broches si es mayor de 3.5 cm)",p:"Bolsa individual; tarjeta de cartón opcional",z:"Nombre o fecha grabados al reverso",q:"Desde 50 piezas · 3–4 semanas"},
   en:{m:"Die-cast zinc alloy",s:"1.2 in (3 cm) · 2 mm thick",f:"Hard enamel polished flush, gold, silver or black nickel plating",a:"Butterfly or rubber clutch (2 clutches above 1.4 in)",p:"Individual bag; backing card optional",z:"Name or date engraved on the back",q:"From 50 pcs · 3–4 weeks"},
   zh:{m:"锌合金压铸",s:"3 cm · 厚 2 mm",f:"硬珐琅抛光平面，镀金、镀银或黑镍",a:"蝴蝶扣或橡胶扣（大于 3.5 cm 配两个）",p:"独立 OPP 袋；可选卡纸",z:"背面刻名字或日期",q:"50 件起 · 3–4 周"}},
  key:{
   es:{m:"Aleación de zinc fundida a presión",s:"Dije de 4 cm (1.5 in) · argolla de 3 cm",f:"Esmalte de color con relieve, baño de oro o plata, doble cara opcional",a:"Argolla y cadena de metal",p:"Bolsa individual",z:"Nombre, fecha o frase grabados al reverso",q:"Desde 50 piezas · 3–4 semanas"},
   en:{m:"Die-cast zinc alloy",s:"1.5 in (4 cm) pendant · 1.2 in split ring",f:"Raised color enamel, gold or silver plating, two-sided optional",a:"Metal split ring and chain",p:"Individual bag",z:"Name, date or phrase engraved on the back",q:"From 50 pcs · 3–4 weeks"},
   zh:{m:"锌合金压铸",s:"吊坠 4 cm · 钥匙环 3 cm",f:"浮雕上色珐琅，镀金或镀银，可双面",a:"金属钥匙环和链",p:"独立 OPP 袋",z:"背面刻名字、日期或短语",q:"50 件起 · 3–4 周"}},
  key3d:{
   es:{m:"Aleación de zinc, piezas móviles",s:"4.5 cm (1.8 in)",f:"Modelado 3D, rin giratorio, baño cromo o negro mate",a:"Mosquetón y argolla de acero",p:"Caja de regalo",z:"Color del rin y placa con nombre",q:"Desde 50 piezas · 4 semanas"},
   en:{m:"Zinc alloy with moving parts",s:"1.8 in (4.5 cm)",f:"3D modeled, spinning rim, chrome or matte black plating",a:"Steel carabiner and split ring",p:"Gift box",z:"Rim color and name plate",q:"From 50 pcs · 4 weeks"},
   zh:{m:"锌合金，含活动部件",s:"4.5 cm",f:"3D 建模，轮毂可旋转，镀铬或哑黑",a:"钢制登山扣和钥匙环",p:"礼盒",z:"轮毂颜色和名字牌",q:"50 件起 · 4 周"}},
  coin:{
   es:{m:"Latón o aleación de zinc",s:"4 cm (1.5 in) · 3 mm de grosor",f:"Relieve a dos caras, oro antiguo o plata, esmalte opcional",a:"—",p:"Cápsula de acrílico y bolsita de terciopelo",z:"Nombre y fecha en el reverso",q:"Desde 50 piezas · 3–4 semanas"},
   en:{m:"Brass or zinc alloy",s:"1.5 in (4 cm) · 3 mm thick",f:"Two-sided relief, antique gold or silver, optional enamel",a:"—",p:"Acrylic capsule and velvet pouch",z:"Name and date on the back",q:"From 50 pcs · 3–4 weeks"},
   zh:{m:"黄铜或锌合金",s:"4 cm · 厚 3 mm",f:"双面浮雕，仿古金或银，可上珐琅",a:"—",p:"亚克力圆盒加绒布袋",z:"背面刻名字和日期",q:"50 件起 · 3–4 周"}},
  mag3d:{
   es:{m:"Aleación de zinc en relieve 3D",s:"6 × 5 cm (2.4 × 2 in)",f:"Esmalte de color, baño de oro; opción de pieza giratoria 360° o ventana con brillantina",a:"Imán fuerte al reverso",p:"Bolsa individual; caja de regalo para sets",z:"Texto o nombre en la base",q:"Desde 50 piezas · 4 semanas"},
   en:{m:"3D relief zinc alloy",s:"2.4 × 2 in (6 × 5 cm)",f:"Color enamel, gold plating; optional 360° spinning element or glitter window",a:"Strong magnet on the back",p:"Individual bag; gift box for sets",z:"Text or name on the base",q:"From 50 pcs · 4 weeks"},
   zh:{m:"锌合金 3D 浮雕",s:"6 × 5 cm",f:"上色珐琅，镀金；可选 360° 旋转件或流沙窗",a:"背面强磁",p:"独立袋；套装配礼盒",z:"底座刻文字或名字",q:"50 件起 · 4 周"}},
  pvc:{
   es:{m:"PVC suave (goma)",s:"5 cm (2 in) · 4 mm de grosor",f:"Relieve 2D o 3D, hasta 6 colores, doble cara opcional, aroma opcional (vainilla, coco)",a:"Cordón, argolla o ventosa según el modelo",p:"Bolsa individual",z:"Nombre impreso o en relieve",q:"Desde 100 piezas · 3–4 semanas"},
   en:{m:"Soft PVC (rubber)",s:"2 in (5 cm) · 4 mm thick",f:"2D or 3D relief, up to 6 colors, two-sided optional, scent optional (vanilla, coconut)",a:"Cord, split ring or suction cup by model",p:"Individual bag",z:"Printed or raised name",q:"From 100 pcs · 3–4 weeks"},
   zh:{m:"软 PVC（滴胶）",s:"5 cm · 厚 4 mm",f:"2D 或 3D 浮雕，最多 6 色，可双面，可加香味（香草、椰子）",a:"挂绳、钥匙环或吸盘",p:"独立袋",z:"印刷或浮雕名字",q:"100 件起 · 3–4 周"}},
  charm:{
   es:{m:"Medallón de aleación de zinc + borla de hilo",s:"Medallón de 4.5 cm · borla de 12 cm · cordón ajustable",f:"Esmalte de color, baño de oro, nudo tejido a mano",a:"Lazo para el espejo retrovisor",p:"Caja de regalo",z:"Imagen, color de la borla y nombre al reverso",q:"Desde 50 piezas · 4 semanas"},
   en:{m:"Zinc alloy medallion + thread tassel",s:"1.8 in medallion · 4.7 in tassel · adjustable cord",f:"Color enamel, gold plating, hand-tied knot",a:"Loop for the rearview mirror",p:"Gift box",z:"Image, tassel color and name on the back",q:"From 50 pcs · 4 weeks"},
   zh:{m:"锌合金吊牌 + 流苏",s:"吊牌 4.5 cm · 流苏 12 cm · 可调挂绳",f:"上色珐琅，镀金，手工编结",a:"后视镜挂环",p:"礼盒",z:"图案、流苏颜色和背面名字",q:"50 件起 · 4 周"}},
  plaque:{
   es:{m:"Aleación de zinc",s:"9 × 4.5 cm (3.5 × 1.8 in)",f:"Relieve con esmalte, baño cromo o dorado",a:"Cinta adhesiva 3M para el tablero",p:"Caja de regalo",z:"Estado, escudo y nombre",q:"Desde 50 piezas · 4 semanas"},
   en:{m:"Zinc alloy",s:"3.5 × 1.8 in (9 × 4.5 cm)",f:"Enamel relief, chrome or gold plating",a:"3M adhesive for the dashboard",p:"Gift box",z:"State, crest and name",q:"From 50 pcs · 4 weeks"},
   zh:{m:"锌合金",s:"9 × 4.5 cm",f:"浮雕珐琅，镀铬或镀金",a:"3M 胶贴于仪表台",p:"礼盒",z:"州名、州徽和名字",q:"50 件起 · 4 周"}},
  frame:{
   es:{m:"Acero inoxidable",s:"Placa estándar de EE. UU. 12 × 6 in",f:"Pulido espejo o negro mate, texto grabado láser",a:"4 tornillos incluidos",p:"Bolsa con burbuja",z:"Tu frase arriba y abajo",q:"Desde 1 pieza · 2–3 semanas"},
   en:{m:"Stainless steel",s:"Standard U.S. plate 12 × 6 in",f:"Mirror polish or matte black, laser-engraved text",a:"4 screws included",p:"Bubble bag",z:"Your phrase top and bottom",q:"From 1 pc · 2–3 weeks"},
   zh:{m:"不锈钢",s:"美国标准车牌 12 × 6 英寸",f:"镜面或哑黑，激光刻字",a:"含 4 颗螺丝",p:"气泡袋",z:"上下可刻你的文字",q:"1 件起 · 2–3 周"}},
  medal:{
   es:{m:"Aleación de zinc",s:"5 cm (2 in) · 3 mm · listón de 2 cm de ancho",f:"Relieve a dos caras, oro, plata o bronce; listón sublimado con tu diseño",a:"Listón para el cuello; caja o base giratoria opcional",p:"Bolsa individual",z:"Nombre del torneo, año, categoría y lugar",q:"Desde 20 piezas · 3–4 semanas"},
   en:{m:"Zinc alloy",s:"2 in (5 cm) · 3 mm · 0.8 in wide ribbon",f:"Two-sided relief, gold, silver or bronze; sublimated ribbon with your design",a:"Neck ribbon; box or spinning stand optional",p:"Individual bag",z:"Tournament name, year, category and place",q:"From 20 pcs · 3–4 weeks"},
   zh:{m:"锌合金",s:"5 cm · 厚 3 mm · 绶带宽 2 cm",f:"双面浮雕，金、银或铜；热转印绶带",a:"挂绳；可选礼盒或旋转底座",p:"独立袋",z:"赛事名、年份、组别和名次",q:"20 件起 · 3–4 周"}},
  mirrormetal:{
   es:{m:"Aleación de zinc",s:"7 cm (2.75 in) · doble espejo (normal y aumento)",f:"Tapa esmaltada o calada, baño de oro",a:"Bisagra y cierre de presión",p:"Caja de regalo individual",z:"Nombre y fecha en la tapa",q:"Desde 50 piezas · 4 semanas"},
   en:{m:"Zinc alloy",s:"2.75 in (7 cm) · dual mirror (regular and magnifying)",f:"Enamel or cut-out lid, gold plating",a:"Hinge and snap closure",p:"Individual gift box",z:"Name and date on the lid",q:"From 50 pcs · 4 weeks"},
   zh:{m:"锌合金",s:"7 cm · 双面镜（平面和放大）",f:"珐琅或镂空盖，镀金",a:"铰链和按扣",p:"独立礼盒",z:"盖面刻名字和日期",q:"50 件起 · 4 周"}},
  mirrorpvc:{
   es:{m:"PVC suave con espejo de vidrio",s:"7 cm (2.75 in)",f:"Figura en relieve, hasta 6 colores",a:"Bisagra; versión de mano con mango",p:"Bolsa individual",z:"Nombre y fecha impresos",q:"Desde 50 piezas · 3–4 semanas"},
   en:{m:"Soft PVC with glass mirror",s:"2.75 in (7 cm)",f:"Raised figure, up to 6 colors",a:"Hinge; hand-mirror version with handle",p:"Individual bag",z:"Printed name and date",q:"From 50 pcs · 3–4 weeks"},
   zh:{m:"软 PVC 配玻璃镜",s:"7 cm",f:"浮雕造型，最多 6 色",a:"铰链；手持款带手柄",p:"独立袋",z:"印名字和日期",q:"50 件起 · 3–4 周"}},
  purse:{
   es:{m:"Silicona suave",s:"8 × 7 cm (3 × 2.75 in)",f:"Figura en relieve, colores sólidos",a:"Cierre de cremallera y argolla",p:"Bolsa individual",z:"Nombre y fecha impresos",q:"Desde 50 piezas · 3–4 semanas"},
   en:{m:"Soft silicone",s:"3 × 2.75 in (8 × 7 cm)",f:"Raised figure, solid colors",a:"Zipper and key ring",p:"Individual bag",z:"Printed name and date",q:"From 50 pcs · 3–4 weeks"},
   zh:{m:"软硅胶",s:"8 × 7 cm",f:"浮雕造型，纯色",a:"拉链和钥匙环",p:"独立袋",z:"印名字和日期",q:"50 件起 · 3–4 周"}},
  coaster:{
   es:{m:"PVC suave antideslizante",s:"9 cm (3.5 in) · 4 mm",f:"Relieve a todo color, lavable",a:"—",p:"Set de 6 en caja",z:"Tus 6 cartas favoritas; apellido opcional",q:"Desde 50 sets · 3–4 semanas"},
   en:{m:"Non-slip soft PVC",s:"3.5 in (9 cm) · 4 mm",f:"Full-color relief, washable",a:"—",p:"Set of 6 in a box",z:"Your 6 favorite cards; last name optional",q:"From 50 sets · 3–4 weeks"},
   zh:{m:"防滑软 PVC",s:"9 cm · 厚 4 mm",f:"全彩浮雕，可水洗",a:"—",p:"6 件套盒装",z:"任选 6 张牌；可加姓氏",q:"50 套起 · 3–4 周"}},
  opener:{
   es:{m:"Aleación de zinc + cubierta de PVC 3D",s:"9 cm (3.5 in)",f:"Figura en relieve a color, abridor de acero",a:"Imán fuerte para el refri",p:"Bolsa individual",z:"Diseño y texto",q:"Desde 100 piezas · 4 semanas"},
   en:{m:"Zinc alloy + 3D PVC cover",s:"3.5 in (9 cm)",f:"Color relief figure, steel opener",a:"Strong magnet for the fridge",p:"Individual bag",z:"Design and text",q:"From 100 pcs · 4 weeks"},
   zh:{m:"锌合金 + 3D PVC 外壳",s:"9 cm",f:"彩色浮雕，钢制开瓶口",a:"强磁吸冰箱",p:"独立袋",z:"图案和文字",q:"100 件起 · 4 周"}},
  stand:{
   es:{m:"PVC 3D sobre base de silicona",s:"8 cm (3 in) de alto",f:"Figura pintada, sostiene el celular en vertical u horizontal",a:"Base antideslizante",p:"Caja individual",z:"Figura y texto en la base",q:"Desde 100 piezas · 4–5 semanas"},
   en:{m:"3D PVC on silicone base",s:"3 in (8 cm) tall",f:"Painted figure, holds the phone upright or sideways",a:"Non-slip base",p:"Individual box",z:"Figure and text on the base",q:"From 100 pcs · 4–5 weeks"},
   zh:{m:"3D PVC 配硅胶底座",s:"高 8 cm",f:"上色公仔，可竖放或横放手机",a:"防滑底座",p:"独立盒",z:"造型和底座文字",q:"100 件起 · 4–5 周"}},
  airpods:{
   es:{m:"Silicona suave",s:"Para AirPods 1, 2, 3 o Pro (indícalo en notas)",f:"Figura 3D a color",a:"Mosquetón",p:"Bolsa individual",z:"Color y diseño",q:"Desde 100 piezas · 4 semanas"},
   en:{m:"Soft silicone",s:"Fits AirPods 1, 2, 3 or Pro (say which in notes)",f:"3D color figure",a:"Carabiner",p:"Individual bag",z:"Color and design",q:"From 100 pcs · 4 weeks"},
   zh:{m:"软硅胶",s:"适配 AirPods 1/2/3/Pro（备注说明）",f:"3D 彩色造型",a:"登山扣",p:"独立袋",z:"颜色和图案",q:"100 件起 · 4 周"}},
  figure:{
   es:{m:"PVC 3D pintado a mano",s:"8 cm (3 in) de alto",f:"Molde propio, hasta 8 colores, base con nombre",a:"—",p:"Caja individual o caja ciega",z:"Diseño completo a partir de tu foto o dibujo",q:"Desde 100 piezas · 5–6 semanas (incluye molde)"},
   en:{m:"Hand-painted 3D PVC",s:"3 in (8 cm) tall",f:"Own mold, up to 8 colors, base with name",a:"—",p:"Individual box or blind box",z:"Full design from your photo or drawing",q:"From 100 pcs · 5–6 weeks (includes mold)"},
   zh:{m:"手绘 3D PVC",s:"高 8 cm",f:"开模，最多 8 色，底座带名字",a:"—",p:"独立盒或盲盒",z:"根据你的照片或画稿设计",q:"100 件起 · 5–6 周（含开模）"}},
  trophy:{
   es:{m:"Aleación de zinc con base de madera o cristal",s:"20 cm (8 in) de alto",f:"Baño de oro o plata, figura a elegir (balón, copa, estrella)",a:"Placa grabada en la base",p:"Caja de regalo",z:"Nombre del torneo, año, categoría",q:"Desde 5 piezas · 4 semanas"},
   en:{m:"Zinc alloy on wood or crystal base",s:"8 in (20 cm) tall",f:"Gold or silver plating, choose the figure (ball, cup, star)",a:"Engraved plate on the base",p:"Gift box",z:"Tournament name, year, category",q:"From 5 pcs · 4 weeks"},
   zh:{m:"锌合金配木质或水晶底座",s:"高 20 cm",f:"镀金或镀银，可选造型（球、杯、星）",a:"底座刻字铭牌",p:"礼盒",z:"赛事名、年份、组别",q:"5 件起 · 4 周"}},
  bracelet:{
   es:{m:"Silicona con figura de PVC 3D",s:"22 cm (8.7 in), se ajusta sola",f:"Colores sólidos, figura intercambiable",a:"Pulsera de golpe (slap)",p:"Bolsa individual",z:"Figura, colores y texto",q:"Desde 100 piezas · 3–4 semanas"},
   en:{m:"Silicone with 3D PVC charm",s:"8.7 in (22 cm), self-adjusting",f:"Solid colors, swappable charm",a:"Slap bracelet",p:"Individual bag",z:"Charm, colors and text",q:"From 100 pcs · 3–4 weeks"},
   zh:{m:"硅胶配 3D PVC 配饰",s:"22 cm，自动卷合",f:"纯色，配饰可换",a:"啪啪圈",p:"独立袋",z:"造型、颜色和文字",q:"100 件起 · 3–4 周"}},
  stock:{
   es:{m:"Ver descripción",s:"Ver descripción",f:"Producto de línea, sin personalizar",a:"—",p:"Empaque del fabricante",z:"No aplica",q:"Sin mínimo · llega con tu pedido en 3–5 semanas"},
   en:{m:"See description",s:"See description",f:"Stock product, not personalized",a:"—",p:"Manufacturer packaging",z:"Not available",q:"No minimum · arrives with your order in 3–5 weeks"},
   zh:{m:"见描述",s:"见描述",f:"现货商品，不做个性化",a:"—",p:"厂家包装",z:"不支持",q:"无起订量 · 随订单 3–5 周到货"}}
 }
};
