/**
 * Translations Dictionary
 * Keys correspond to data-i18n attributes in HTML
 * Each language has the same set of keys
 */
const TRANSLATIONS = {

    // ==================== SPANISH (DEFAULT) ====================
    es: {
        // -- Header top bar --
        "header.trackOrder": "Seguí tu compra",
        "header.techService": "Servicio técnico",
        "header.stores": "Sucursales",
        "header.helpCenter": "Centro de ayuda",
        "header.myAccount": "Mi cuenta",
        "header.searchPlaceholder": "Fijate en Frávega",

        // -- Navigation --
        "nav.bestSellers": "Más Vendidos",
        "nav.deals": "Ofertas",
        "nav.climate": "Climatización",
        "nav.coupons": "CUPONERA",
        "nav.tvSpecial": "Especial TV",
        "nav.admiral": "ADMIRAL",
        "nav.bargains": "GANGAS",
        "nav.officialStores": "Tiendas Oficiales",

        // -- Banner --
        "banner.title": "🔥 GRAN PROMOCIÓN 🔥",
        "banner.subtitle": "¡No te pierdas las ofertas más increíbles del año!",
        "timer.days": "Días",
        "timer.hours": "Horas",
        "timer.minutes": "Minutos",
        "timer.seconds": "Segundos",

        // -- Products section --
        "products.sectionTitle": "Productos en Promoción",
        "products.buy": "Comprar",
        "products.addToCart": "Agregar al carrito",
        "products.installments": "cuotas sin interés de",

        // -- Footer --
        "footer.rights": "© 2026 Frávega S.A.C.I. e I. - Todos los derechos reservados",

        // -- Cart page --
        "cart.pageTitle": "Mi carrito",
        "cart.securesite": "SITIO SEGURO",
        "cart.loading": "Cargando carrito...",
        "cart.couponTitle": "Cupón de descuento",
        "cart.couponPlaceholder": "Ingresar cupón",
        "cart.couponBtn": "AGREGAR",
        "cart.summaryTitle": "Resumen de compra",
        "cart.products": "Productos",
        "cart.totalSavings": "Ahorro total",
        "cart.total": "Total",
        "cart.checkout": "Finalizar compra",
        "cart.continueShopping": "Continuar comprando",
        "cart.emptyTitle": "Tu carrito está vacío",
        "cart.emptyText": "¡Descubrí las mejores ofertas!",
        "cart.emptyBtn": "Ver productos",
        "cart.quantity": "Cantidad",
        "cart.subtotal": "Subtotal",
        "cart.soldBy": "Vendido por",
        "cart.remove": "Eliminar",
        "cart.errorTitle": "Error al cargar el carrito",
        "cart.errorText": "Intenta recargar la página",
        "cart.errorBtn": "Recargar",

        // -- Cart footer --
        "cartFooter.copyright": "Copyright 1972-2024 | Todos los derechos reservados Fravega.com. Frávega S.A.C.I. e I. Valentín Gómez 2813 (1191) | Capital Federal | Argentina",
        "cartFooter.disclaimer": "Las fotos son a modo ilustrativo. La venta de cualquiera de los productos publicados está sujeta a la verificación de stock.",

        // -- Product pages shared UI --
        "product.addToCart": "AGREGAR AL CARRITO",
        "product.buyNow": "COMPRAR AHORA",
        "product.freeShipping": "Envío gratis",
        "product.specifications": "Especificaciones",
        "product.description": "Descripción",
        "product.share": "Compartir",
        "product.favorite": "Favorito",

        // -- Language selector --
        "lang.label": "Idioma",
        "lang.es": "Español",
        "lang.en": "English",
        "lang.pt": "Português",
        "lang.fr": "Français",

        // -- JS Dynamic Strings --
        "js.adding": "Agregando...",
        "js.added": "¡Agregado!",
        "js.notFound": "Producto no encontrado",
        "js.processing": "Procesando...",
        "js.errorAdd": "Error al agregar al carrito",
        "js.errorProcess": "Error al procesar la compra",
        "js.emptyCartAlert": "Tu carrito está vacío",

        // -- Cart Dynamic UI --
        "cart.itemVendor": "Vendido por:",
        "cart.itemQuantity": "Cantidad",
        "cart.itemSubtotal": "Subtotal",
        "cart.itemRemoveTitle": "Eliminar producto",

        // -- Product Names --
        "prod.iphone": "iPhone 17 Pro Max 256GB 6.3 Pulgadas",
        "prod.samsung": "Smart TV Samsung 65\" LED Crystal UHD 4K DU7000",
        "prod.macbook": "Macbook Air 15 M4 10cpu 10gpu 24gb 512gb - Medianoche",
        "prod.tablet": "iPad Air 11 Apple Wi-fi + 4G 256GB Space Grey",

        // -- Product Descriptions --
        "prod.iphone.desc": "<p>¡Hola! Te presentamos el iPhone 17 Pro Max 256GB, un dispositivo que combina diseño elegante, rendimiento potente y tecnología de vanguardia. Descubrí sus principales características:</p><p><br /></p><p>Pantalla: Cuenta con una pantalla Super Retina XDR de 6.3 pulgadas, que ofrece imágenes nítidas y colores vibrantes para una experiencia visual inigualable.</p><p><br /></p><p>Memoria: Con 256GB de almacenamiento interno, tendrás espacio suficiente para tus fotos, videos, aplicaciones y más.</p><p><br /></p><p>Procesador: Equipado con el chip A19 Bionic, garantiza un rendimiento rápido y eficiente en todas tus tareas diarias.</p><p><br /></p><p>Cámara: Su sistema de cámara principal de 48MP te permite capturar imágenes detalladas y de alta calidad, mientras que la cámara frontal es ideal para selfies y videollamadas.</p><p><br /></p><p>Batería y carga: La batería está diseñada para durar todo el día, y con la carga rápida, podrás recargar tu dispositivo en poco tiempo.</p><p><br /></p><p>Conectividad: Compatible con redes 5G, asegura una conexión rápida y estable para todas tus necesidades en línea.</p><p><br /></p><p>Sistema operativo: Viene con iOS 19, ofreciendo una experiencia de usuario intuitiva y segura.</p><p><br /></p><p>Los colores están sujetos a disponibilidad.</p><p><br /></p><p>El iPhone 17 Pro Max 256GB es la elección perfecta para quienes buscan un equilibrio entre estilo y funcionalidad. ¡No te lo pierdas!</p>",
        "prod.samsung.desc": "<p>¡Hola! Te presentamos el Smart TV Samsung 65\" Crystal UHD 4K DU7000, un televisor que transforma tu experiencia de entretenimiento en el hogar. Descubrí sus principales características:</p><p><br /></p><p>Pantalla: Cuenta con una impresionante pantalla de 65 pulgadas con tecnología Crystal UHD 4K, que ofrece imágenes nítidas con más de 8 millones de píxeles y colores vibrantes.</p><p><br /></p><p>Procesador: Equipado con el Crystal Processor 4K, optimiza automáticamente el color, contraste y HDR para una calidad de imagen superior.</p><p><br /></p><p>HDR: Compatible con HDR10+, brinda un rango dinámico amplio que revela detalles ocultos en escenas oscuras y brillantes.</p><p><br /></p><p>Smart TV: Con sistema operativo Tizen, accedé a tus apps favoritas como Netflix, Disney+, YouTube, Prime Video y mucho más.</p><p><br /></p><p>Sonido: Sistema de audio de 20W con tecnología Dolby Digital Plus para un sonido envolvente y claro.</p>",
        "prod.macbook.desc": "<p>¡Hola! Te presentamos la MacBook Air 15\" con chip M4, una laptop diseñada para potenciar tu creatividad y productividad. Descubrí sus principales características:</p><p><br /></p><p>Chip Apple M4: El revolucionario chip M4 con CPU de 10 núcleos y GPU de 10 núcleos ofrece un rendimiento excepcional para tareas exigentes como edición de video, desarrollo y diseño gráfico.</p><p><br /></p><p>Pantalla: Impresionante pantalla Liquid Retina de 15.3 pulgadas con resolución de 2880 x 1864 píxeles, brillo de 500 nits y soporte para mil millones de colores.</p><p><br /></p><p>Memoria: 24GB de memoria unificada que permite ejecutar múltiples aplicaciones pesadas simultáneamente sin pérdida de rendimiento.</p><p><br /></p><p>Almacenamiento: 512GB de almacenamiento SSD ultrarrápido para guardar todos tus proyectos, fotos y archivos.</p><p><br /></p><p>Batería: Hasta 18 horas de duración de batería para trabajar todo el día sin preocuparte por el cargador.</p><p><br /></p><p>Cámara y Audio: Cámara FaceTime HD de 1080p y sistema de sonido de seis parlantes con Audio Espacial para llamadas y entretenimiento inmersivo.</p>",
        "prod.tablet.desc": "<p>¡Hola! Te presentamos el iPad Air 11\" con chip M2, una tablet versátil y potente para trabajo y entretenimiento. Descubrí sus principales características:</p><p><br /></p><p>Chip Apple M2: El potente chip M2 con CPU de 8 núcleos y GPU de 10 núcleos ofrece rendimiento de nivel profesional para edición de fotos, videos y apps exigentes.</p><p><br /></p><p>Pantalla: Espectacular pantalla Liquid Retina de 11 pulgadas con resolución de 2360 x 1640 píxeles, True Tone y amplia gama de colores P3.</p><p><br /></p><p>Almacenamiento: 256GB de capacidad para guardar todas tus apps, fotos, videos y documentos.</p><p><br /></p><p>Conectividad: Wi-Fi 6E + Celular 4G/5G para estar conectado en cualquier lugar. También incluye USB-C y Bluetooth 5.3.</p><p><br /></p><p>Cámaras: Cámara trasera de 12MP gran angular para fotos y videos en 4K. Cámara frontal de 12MP ultra gran angular con Center Stage para videollamadas perfectas.</p>"
    },

    // ==================== ENGLISH ====================
    en: {
        // -- Header top bar --
        "header.trackOrder": "Track your order",
        "header.techService": "Technical service",
        "header.stores": "Stores",
        "header.helpCenter": "Help center",
        "header.myAccount": "My account",
        "header.searchPlaceholder": "Search in Frávega",

        // -- Navigation --
        "nav.bestSellers": "Best Sellers",
        "nav.deals": "Deals",
        "nav.climate": "Air Conditioning",
        "nav.coupons": "COUPONS",
        "nav.tvSpecial": "TV Special",
        "nav.admiral": "ADMIRAL",
        "nav.bargains": "BARGAINS",
        "nav.officialStores": "Official Stores",

        // -- Banner --
        "banner.title": "🔥 BIG SALE 🔥",
        "banner.subtitle": "Don't miss the most incredible deals of the year!",
        "timer.days": "Days",
        "timer.hours": "Hours",
        "timer.minutes": "Minutes",
        "timer.seconds": "Seconds",

        // -- Products section --
        "products.sectionTitle": "Products on Sale",
        "products.buy": "Buy",
        "products.addToCart": "Add to cart",
        "products.installments": "interest-free installments of",

        // -- Footer --
        "footer.rights": "© 2026 Frávega S.A.C.I. e I. - All rights reserved",

        // -- Cart page --
        "cart.pageTitle": "My cart",
        "cart.securesite": "SECURE SITE",
        "cart.loading": "Loading cart...",
        "cart.couponTitle": "Discount coupon",
        "cart.couponPlaceholder": "Enter coupon",
        "cart.couponBtn": "APPLY",
        "cart.summaryTitle": "Order summary",
        "cart.products": "Products",
        "cart.totalSavings": "Total savings",
        "cart.total": "Total",
        "cart.checkout": "Checkout",
        "cart.continueShopping": "Continue shopping",
        "cart.emptyTitle": "Your cart is empty",
        "cart.emptyText": "Discover the best deals!",
        "cart.emptyBtn": "Browse products",
        "cart.quantity": "Quantity",
        "cart.subtotal": "Subtotal",
        "cart.soldBy": "Sold by",
        "cart.remove": "Remove",
        "cart.errorTitle": "Error loading cart",
        "cart.errorText": "Try reloading the page",
        "cart.errorBtn": "Reload",

        // -- Cart footer --
        "cartFooter.copyright": "Copyright 1972-2024 | All rights reserved Fravega.com. Frávega S.A.C.I. e I. Valentín Gómez 2813 (1191) | Capital Federal | Argentina",
        "cartFooter.disclaimer": "Photos are for illustration purposes only. The sale of any of the published products is subject to stock verification.",

        // -- Product pages shared UI --
        "product.addToCart": "ADD TO CART",
        "product.buyNow": "BUY NOW",
        "product.freeShipping": "Free shipping",
        "product.specifications": "Specifications",
        "product.description": "Description",
        "product.share": "Share",
        "product.favorite": "Favorite",

        // -- Language selector --
        "lang.label": "Language",
        "lang.es": "Español",
        "lang.en": "English",
        "lang.pt": "Português",
        "lang.fr": "Français",

        // -- JS Dynamic Strings --
        "js.adding": "Adding...",
        "js.added": "Added!",
        "js.notFound": "Product not found",
        "js.processing": "Processing...",
        "js.errorAdd": "Error adding to cart",
        "js.errorProcess": "Error processing purchase",
        "js.emptyCartAlert": "Your cart is empty",

        // -- Cart Dynamic UI --
        "cart.itemVendor": "Sold by:",
        "cart.itemQuantity": "Quantity",
        "cart.itemSubtotal": "Subtotal",
        "cart.itemRemoveTitle": "Remove product",

        // -- Product Names --
        "prod.iphone": "iPhone 17 Pro Max 256GB 6.3 Inches",
        "prod.samsung": "Smart TV Samsung 65\" LED Crystal UHD 4K DU7000",
        "prod.macbook": "Macbook Air 15 M4 10cpu 10gpu 24gb 512gb - Midnight",
        "prod.tablet": "iPad Air 11 Apple Wi-fi + 4G 256GB Space Grey",

        // -- Product Descriptions --
        "prod.iphone.desc": "<p>Hello! Meet the iPhone 17 Pro Max 256GB, a device that combines elegant design, powerful performance, and cutting-edge technology. Discover its main features:</p><p><br /></p><p>Screen: Features a 6.3-inch Super Retina XDR display, offering crisp images and vibrant colors for an unmatched visual experience.</p><p><br /></p><p>Memory: With 256GB of internal storage, you'll have enough space for your photos, videos, apps, and more.</p><p><br /></p><p>Processor: Equipped with the A19 Bionic chip, ensuring fast and efficient performance for all your daily tasks.</p><p><br /></p><p>Camera: Its 48MP main camera system lets you capture detailed, high-quality images, while the front camera is ideal for selfies and video calls.</p><p><br /></p><p>Battery and charging: The battery is designed to last all day, and with fast charging, you can recharge your device in no time.</p><p><br /></p><p>Connectivity: 5G network compatible, ensuring a fast and stable connection for all your online needs.</p><p><br /></p><p>Operating system: Comes with iOS 19, offering an intuitive and secure user experience.</p><p><br /></p><p>Colors are subject to availability.</p><p><br /></p><p>The iPhone 17 Pro Max 256GB is the perfect choice for those seeking a balance of style and functionality. Don't miss out!</p>",
        "prod.samsung.desc": "<p>Hello! Meet the Smart TV Samsung 65\" Crystal UHD 4K DU7000, a television that transforms your home entertainment experience. Discover its main features:</p><p><br /></p><p>Screen: Features an impressive 65-inch screen with Crystal UHD 4K technology, offering sharp images with over 8 million pixels and vibrant colors.</p><p><br /></p><p>Processor: Equipped with the Crystal Processor 4K, it automatically optimizes color, contrast, and HDR for superior image quality.</p><p><br /></p><p>HDR: Compatible with HDR10+, it provides a wide dynamic range that reveals hidden details in dark and bright scenes.</p><p><br /></p><p>Smart TV: With the Tizen operating system, access your favorite apps like Netflix, Disney+, YouTube, Prime Video, and much more.</p><p><br /></p><p>Sound: 20W audio system with Dolby Digital Plus technology for clear and immersive sound.</p>",
        "prod.macbook.desc": "<p>Hello! Meet the MacBook Air 15\" with M4 chip, a laptop designed to boost your creativity and productivity. Discover its main features:</p><p><br /></p><p>Apple M4 Chip: The revolutionary M4 chip with a 10-core CPU and 10-core GPU offers exceptional performance for demanding tasks like video editing, development, and graphic design.</p><p><br /></p><p>Screen: Impressive 15.3-inch Liquid Retina display with 2880 x 1864 layout resolution, 500 nits brightness, and support for one billion colors.</p><p><br /></p><p>Memory: 24GB of unified memory allows you to run multiple heavy applications simultaneously without performance loss.</p><p><br /></p><p>Storage: 512GB of ultra-fast SSD storage to save all your projects, photos, and files.</p><p><br /></p><p>Battery: Up to 18 hours of battery life to work all day without worrying about the charger.</p><p><br /></p><p>Camera and Audio: 1080p FaceTime HD camera and a six-speaker sound system with Spatial Audio for immersive calls and entertainment.</p>",
        "prod.tablet.desc": "<p>Hello! Meet the iPad Air 11\" with M2 chip, a versatile and powerful tablet for work and entertainment. Discover its main features:</p><p><br /></p><p>Apple M2 Chip: The powerful M2 chip with an 8-core CPU and 10-core GPU offers pro-level performance for demanding photo/video editing and apps.</p><p><br /></p><p>Screen: Spectacular 11-inch Liquid Retina display with 2360 x 1640 resolution, True Tone, and P3 wide color gamut.</p><p><br /></p><p>Storage: 256GB of capacity to store all your apps, photos, videos, and documents.</p><p><br /></p><p>Connectivity: Wi-Fi 6E + Cellular 4G/5G to stay connected anywhere. Also includes USB-C and Bluetooth 5.3.</p><p><br /></p><p>Cameras: 12MP wide rear camera for 4K photos and videos. 12MP ultra-wide front camera with Center Stage for perfect video calls.</p>"
    },

    // ==================== PORTUGUESE ====================
    pt: {
        // -- Header top bar --
        "header.trackOrder": "Rastreie seu pedido",
        "header.techService": "Assistência técnica",
        "header.stores": "Lojas",
        "header.helpCenter": "Central de ajuda",
        "header.myAccount": "Minha conta",
        "header.searchPlaceholder": "Pesquisar em Frávega",

        // -- Navigation --
        "nav.bestSellers": "Mais Vendidos",
        "nav.deals": "Ofertas",
        "nav.climate": "Climatização",
        "nav.coupons": "CUPONS",
        "nav.tvSpecial": "Especial TV",
        "nav.admiral": "ADMIRAL",
        "nav.bargains": "PECHINCHAS",
        "nav.officialStores": "Lojas Oficiais",

        // -- Banner --
        "banner.title": "🔥 GRANDE PROMOÇÃO 🔥",
        "banner.subtitle": "Não perca as ofertas mais incríveis do ano!",
        "timer.days": "Dias",
        "timer.hours": "Horas",
        "timer.minutes": "Minutos",
        "timer.seconds": "Segundos",

        // -- Products section --
        "products.sectionTitle": "Produtos em Promoção",
        "products.buy": "Comprar",
        "products.addToCart": "Adicionar ao carrinho",
        "products.installments": "parcelas sem juros de",

        // -- Footer --
        "footer.rights": "© 2026 Frávega S.A.C.I. e I. - Todos os direitos reservados",

        // -- Cart page --
        "cart.pageTitle": "Meu carrinho",
        "cart.securesite": "SITE SEGURO",
        "cart.loading": "Carregando carrinho...",
        "cart.couponTitle": "Cupom de desconto",
        "cart.couponPlaceholder": "Inserir cupom",
        "cart.couponBtn": "ADICIONAR",
        "cart.summaryTitle": "Resumo da compra",
        "cart.products": "Produtos",
        "cart.totalSavings": "Economia total",
        "cart.total": "Total",
        "cart.checkout": "Finalizar compra",
        "cart.continueShopping": "Continuar comprando",
        "cart.emptyTitle": "Seu carrinho está vazio",
        "cart.emptyText": "Descubra as melhores ofertas!",
        "cart.emptyBtn": "Ver produtos",
        "cart.quantity": "Quantidade",
        "cart.subtotal": "Subtotal",
        "cart.soldBy": "Vendido por",
        "cart.remove": "Remover",
        "cart.errorTitle": "Erro ao carregar o carrinho",
        "cart.errorText": "Tente recarregar a página",
        "cart.errorBtn": "Recarregar",

        // -- Cart footer --
        "cartFooter.copyright": "Copyright 1972-2024 | Todos os direitos reservados Fravega.com. Frávega S.A.C.I. e I. Valentín Gómez 2813 (1191) | Capital Federal | Argentina",
        "cartFooter.disclaimer": "As fotos são meramente ilustrativas. A venda de qualquer um dos produtos publicados está sujeita à verificação de estoque.",

        // -- Product pages shared UI --
        "product.addToCart": "ADICIONAR AO CARRINHO",
        "product.buyNow": "COMPRAR AGORA",
        "product.freeShipping": "Frete grátis",
        "product.specifications": "Especificações",
        "product.description": "Descrição",
        "product.share": "Compartilhar",
        "product.favorite": "Favorito",

        // -- Language selector --
        "lang.label": "Idioma",
        "lang.es": "Español",
        "lang.en": "English",
        "lang.pt": "Português",
        "lang.fr": "Français",

        // -- JS Dynamic Strings --
        "js.adding": "Adicionando...",
        "js.added": "Adicionado!",
        "js.notFound": "Produto não encontrado",
        "js.processing": "Processando...",
        "js.errorAdd": "Erro ao adicionar ao carrinho",
        "js.errorProcess": "Erro ao processar a compra",
        "js.emptyCartAlert": "Seu carrinho está vazio",

        // -- Cart Dynamic UI --
        "cart.itemVendor": "Vendido por:",
        "cart.itemQuantity": "Quantidade",
        "cart.itemSubtotal": "Subtotal",
        "cart.itemRemoveTitle": "Remover produto",

        // -- Product Names --
        "prod.iphone": "iPhone 17 Pro Max 256GB 6.3 Polegadas",
        "prod.samsung": "Smart TV Samsung 65\" LED Crystal UHD 4K DU7000",
        "prod.macbook": "Macbook Air 15 M4 10cpu 10gpu 24gb 512gb - Meia-noite",
        "prod.tablet": "iPad Air 11 Apple Wi-fi + 4G 256GB Space Grey",

        // -- Product Descriptions --
        "prod.iphone.desc": "<p>Olá! Conheça o iPhone 17 Pro Max 256GB, um dispositivo que combina design elegante, desempenho poderoso e tecnologia de ponta. Descubra suas principais características:</p><p><br /></p><p>Tela: Possui uma tela Super Retina XDR de 6,3 polegadas, oferecendo imagens nítidas e cores vibrantes para uma experiência visual incomparável.</p><p><br /></p><p>Memória: Com 256GB de armazenamento interno, você terá espaço suficiente para suas fotos, vídeos, aplicativos e muito mais.</p><p><br /></p><p>Processador: Equipado com o chip A19 Bionic, garante desempenho rápido e eficiente em todas as suas tarefas diárias.</p><p><br /></p><p>Câmera: Seu sistema de câmera principal de 48MP permite capturar imagens detalhadas e de alta qualidade, enquanto a câmera frontal é ideal para selfies e videochamadas.</p><p><br /></p><p>Bateria e Carregamento: A bateria foi projetada para durar o dia todo e, com o carregamento rápido, você pode recarregar seu dispositivo rapidamente.</p><p><br /></p><p>Conectividade: Compatível com redes 5G, garantindo uma conexão rápida e estável para todas as suas necessidades online.</p><p><br /></p><p>Sistema Operacional: Vem com o iOS 19, oferecendo uma experiência de usuário intuitiva e segura.</p><p><br /></p><p>As cores estão sujeitas a disponibilidade.</p><p><br /></p><p>O iPhone 17 Pro Max 256GB é a escolha perfeita para quem busca equilíbrio entre estilo e funcionalidade. Não perca!</p>",
        "prod.samsung.desc": "<p>Olá! Conheça a Smart TV Samsung 65\" Crystal UHD 4K DU7000, uma televisão que transforma sua experiência de entretenimento em casa. Descubra suas principais características:</p><p><br /></p><p>Tela: Possui uma impressionante tela de 65 polegadas com tecnologia Crystal UHD 4K, oferecendo imagens nítidas com mais de 8 milhões de pixels e cores vibrantes.</p><p><br /></p><p>Processador: Equipado com o Crystal Processor 4K, otimiza automaticamente cor, contraste e HDR para qualidade de imagem superior.</p><p><br /></p><p>HDR: Compatível com HDR10+, oferece uma ampla faixa dinâmica que revela detalhes ocultos em cenas escuras e claras.</p><p><br /></p><p>Smart TV: Com o sistema operacional Tizen, acesse seus apps favoritos como Netflix, Disney+, YouTube, Prime Video e muito mais.</p><p><br /></p><p>Som: Sistema de áudio de 20W com tecnologia Dolby Digital Plus para um som envolvente e claro.</p>",
        "prod.macbook.desc": "<p>Olá! Conheça o MacBook Air 15\" com chip M4, um laptop projetado para impulsionar sua criatividade e produtividade. Descubra suas principais características:</p><p><br /></p><p>Chip Apple M4: O revolucionário chip M4 com CPU de 10 núcleos e GPU de 10 núcleos oferece desempenho excepcional para tarefas exigentes, como edição de vídeo, desenvolvimento e design gráfico.</p><p><br /></p><p>Tela: Impressionante tela Liquid Retina de 15,3 polegadas com resolução de 2880 x 1864, brilho de 500 nits e suporte para um bilhão de cores.</p><p><br /></p><p>Memória: 24GB de memória unificada permite executar vários aplicativos pesados simultaneamente sem perda de desempenho.</p><p><br /></p><p>Armazenamento: 512GB de armazenamento SSD ultrarrápido para salvar todos os seus projetos, fotos e arquivos.</p><p><br /></p><p>Bateria: Até 18 horas de duração da bateria para trabalhar o dia todo sem se preocupar com o carregador.</p><p><br /></p><p>Câmera e Áudio: Câmera FaceTime HD 1080p e sistema de som de seis alto-falantes com Áudio Espacial para chamadas e entretenimento imersivos.</p>",
        "prod.tablet.desc": "<p>Olá! Conheça o iPad Air 11\" com chip M2, um tablet versátil e poderoso para trabalho e entretenimento. Descubra suas principais características:</p><p><br /></p><p>Chip Apple M2: O poderoso chip M2 com CPU de 8 núcleos e GPU de 10 núcleos oferece desempenho de nível profissional para edição de fotos, vídeos e aplicativos exigentes.</p><p><br /></p><p>Tela: Espetacular tela Liquid Retina de 11 polegadas com resolução de 2360 x 1640 pixels, True Tone e ampla gama de cores P3.</p><p><br /></p><p>Armazenamento: 256GB de capacidade para armazenar todos os seus aplicativos, fotos, vídeos e documentos.</p><p><br /></p><p>Conectividade: Wi-Fi 6E + Cellular 4G/5G para ficar conectado em qualquer lugar. Também inclui USB-C e Bluetooth 5.3.</p><p><br /></p><p>Câmeras: Câmera traseira grande angular de 12MP para fotos e vídeos em 4K. Câmera frontal ultra grande angular de 12MP com Palco Central para videochamadas perfeitas.</p>"
    },

    // ==================== FRENCH ====================
    fr: {
        // -- Header top bar --
        "header.trackOrder": "Suivre votre commande",
        "header.techService": "Service technique",
        "header.stores": "Magasins",
        "header.helpCenter": "Centre d'aide",
        "header.myAccount": "Mon compte",
        "header.searchPlaceholder": "Rechercher sur Frávega",

        // -- Navigation --
        "nav.bestSellers": "Meilleures Ventes",
        "nav.deals": "Promotions",
        "nav.climate": "Climatisation",
        "nav.coupons": "COUPONS",
        "nav.tvSpecial": "Spécial TV",
        "nav.admiral": "ADMIRAL",
        "nav.bargains": "BONNES AFFAIRES",
        "nav.officialStores": "Boutiques Officielles",

        // -- Banner --
        "banner.title": "🔥 GRANDE PROMO 🔥",
        "banner.subtitle": "Ne manquez pas les offres les plus incroyables de l'année !",
        "timer.days": "Jours",
        "timer.hours": "Heures",
        "timer.minutes": "Minutes",
        "timer.seconds": "Secondes",

        // -- Products section --
        "products.sectionTitle": "Produits en Promotion",
        "products.buy": "Acheter",
        "products.addToCart": "Ajouter au panier",
        "products.installments": "fois sans intérêts de",

        // -- Footer --
        "footer.rights": "© 2026 Frávega S.A.C.I. e I. - Tous droits réservés",

        // -- Cart page --
        "cart.pageTitle": "Mon panier",
        "cart.securesite": "SITE SÉCURISÉ",
        "cart.loading": "Chargement du panier...",
        "cart.couponTitle": "Coupon de réduction",
        "cart.couponPlaceholder": "Entrer le coupon",
        "cart.couponBtn": "AJOUTER",
        "cart.summaryTitle": "Résumé de la commande",
        "cart.products": "Produits",
        "cart.totalSavings": "Économies totales",
        "cart.total": "Total",
        "cart.checkout": "Passer commande",
        "cart.continueShopping": "Continuer mes achats",
        "cart.emptyTitle": "Votre panier est vide",
        "cart.emptyText": "Découvrez les meilleures offres !",
        "cart.emptyBtn": "Voir les produits",
        "cart.quantity": "Quantité",
        "cart.subtotal": "Sous-total",
        "cart.soldBy": "Vendu par",
        "cart.remove": "Supprimer",
        "cart.errorTitle": "Erreur lors du chargement du panier",
        "cart.errorText": "Essayez de recharger la page",
        "cart.errorBtn": "Recharger",

        // -- Cart footer --
        "cartFooter.copyright": "Copyright 1972-2024 | Tous droits réservés Fravega.com. Frávega S.A.C.I. e I. Valentín Gómez 2813 (1191) | Capital Federal | Argentine",
        "cartFooter.disclaimer": "Les photos sont à titre illustratif uniquement. La vente de tout produit publié est soumise à la vérification du stock.",

        // -- Product pages shared UI --
        "product.addToCart": "AJOUTER AU PANIER",
        "product.buyNow": "ACHETER MAINTENANT",
        "product.freeShipping": "Livraison gratuite",
        "product.specifications": "Spécifications",
        "product.description": "Description",
        "product.share": "Partager",
        "product.favorite": "Favori",

        // -- Language selector --
        "lang.label": "Langue",
        "lang.es": "Español",
        "lang.en": "English",
        "lang.pt": "Português",
        "lang.fr": "Français",

        // -- JS Dynamic Strings --
        "js.adding": "Ajout...",
        "js.added": "Ajouté !",
        "js.notFound": "Produit introuvable",
        "js.processing": "Traitement...",
        "js.errorAdd": "Erreur lors de l'ajout",
        "js.errorProcess": "Erreur lors du traitement",
        "js.emptyCartAlert": "Votre panier est vide",

        // -- Cart Dynamic UI --
        "cart.itemVendor": "Vendu par :",
        "cart.itemQuantity": "Quantité",
        "cart.itemSubtotal": "Sous-total",
        "cart.itemRemoveTitle": "Supprimer le produit",

        // -- Product Names --
        "prod.iphone": "iPhone 17 Pro Max 256 Go 6,3 Pouces",
        "prod.samsung": "Smart TV Samsung 65\" LED Crystal UHD 4K DU7000",
        "prod.macbook": "Macbook Air 15 M4 10cpu 10gpu 24go 512go - Minuit",
        "prod.tablet": "iPad Air 11 Apple Wi-fi + 4G 256 Go Gris Sidéral",

        // -- Product Descriptions --
        "prod.iphone.desc": "<p>Bonjour ! Découvrez l'iPhone 17 Pro Max 256 Go, un appareil qui allie design élégant, performances puissantes et technologie de pointe. Découvrez ses principales caractéristiques :</p><p><br /></p><p>Écran : Dispose d'un écran Super Retina XDR de 6,3 pouces, offrant des images nettes et des couleurs éclatantes pour une expérience visuelle inégalée.</p><p><br /></p><p>Mémoire : Avec 256 Go de stockage interne, vous aurez assez d'espace pour vos photos, vidéos, applications et plus encore.</p><p><br /></p><p>Processeur : Équipé de la puce A19 Bionic, garantissant des performances rapides et efficaces pour toutes vos tâches quotidiennes.</p><p><br /></p><p>Appareil Photo : Son système d'appareil photo principal de 48 MP vous permet de capturer des images détaillées de haute qualité, tandis que la caméra frontale est idéale pour les selfies et les appels vidéo.</p><p><br /></p><p>Batterie et Recharge : La batterie est conçue pour durer toute la journée et, grâce à la charge rapide, vous pouvez recharger votre appareil en un rien de temps.</p><p><br /></p><p>Connectivité : Compatible avec les réseaux 5G, garantissant une connexion rapide et stable pour tous vos besoins en ligne.</p><p><br /></p><p>Système d'exploitation : Livré avec iOS 19, offrant une expérience utilisateur intuitive et sécurisée.</p><p><br /></p><p>Les couleurs sont sous réserve de disponibilité.</p><p><br /></p><p>L'iPhone 17 Pro Max 256 Go est le choix idéal pour ceux qui recherchent un équilibre entre style et fonctionnalité. Ne le manquez pas !</p>",
        "prod.samsung.desc": "<p>Bonjour ! Découvrez la Smart TV Samsung 65\" Crystal UHD 4K DU7000, un téléviseur qui transforme votre expérience de divertissement à domicile. Découvrez ses principales caractéristiques :</p><p><br /></p><p>Écran : Doté d'un écran impressionnant de 65 pouces avec technologie Crystal UHD 4K, offrant des images nettes avec plus de 8 millions de pixels et des couleurs éclatantes.</p><p><br /></p><p>Processeur : Équipé du Crystal Processor 4K, il optimise automatiquement les couleurs, le contraste et le HDR pour une qualité d'image supérieure.</p><p><br /></p><p>HDR : Compatible avec HDR10+, il offre une plage dynamique étendue qui révèle les détails cachés dans les scènes sombres et lumineuses.</p><p><br /></p><p>Smart TV : Avec le système d'exploitation Tizen, accédez à vos applications préférées telles que Netflix, Disney+, YouTube, Prime Video et bien plus encore.</p><p><br /></p><p>Son : Système audio 20W avec technologie Dolby Digital Plus pour un son clair et immersif.</p>",
        "prod.macbook.desc": "<p>Bonjour ! Découvrez le MacBook Air 15\" avec puce M4, un ordinateur portable conçu pour stimuler votre créativité et votre productivité. Découvrez ses principales caractéristiques :</p><p><br /></p><p>Puce Apple M4 : La puce M4 révolutionnaire avec processeur 10 cœurs et GPU 10 cœurs offre des performances exceptionnelles pour les tâches exigeantes comme le montage vidéo, le développement et la conception graphique.</p><p><br /></p><p>Écran : Superbe écran Liquid Retina de 15,3 pouces avec une résolution de 2880 x 1864, une luminosité de 500 nits et la prise en charge d'un milliard de couleurs.</p><p><br /></p><p>Mémoire : 24 Go de mémoire unifiée vous permettent d'exécuter simultanément plusieurs applications lourdes sans perte de performances.</p><p><br /></p><p>Stockage : 512 Go de stockage SSD ultra-rapide pour sauvegarder tous vos projets, photos et fichiers.</p><p><br /></p><p>Batterie : Jusqu'à 18 heures d'autonomie pour travailler toute la journée sans vous soucier du chargeur.</p><p><br /></p><p>Appareil photo et Audio : Caméra FaceTime HD 1080p et système audio à six haut-parleurs avec Audio Spatial pour des appels et des divertissements immersifs.</p>",
        "prod.tablet.desc": "<p>Bonjour ! Découvrez l'iPad Air 11\" avec puce M2, une tablette polyvalente et puissante pour le travail et le divertissement. Découvrez ses principales caractéristiques :</p><p><br /></p><p>Puce Apple M2 : La puissante puce M2 avec processeur 8 cœurs et GPU 10 cœurs offre des performances de niveau professionnel pour la retouche photo/vidéo et les applications exigeantes.</p><p><br /></p><p>Écran : Spectaculaire écran Liquid Retina de 11 pouces avec résolution 2360 x 1640, True Tone et large gamme de couleurs P3.</p><p><br /></p><p>Stockage : Capacité de 256 Go pour stocker toutes vos applications, photos, vidéos et documents.</p><p><br /></p><p>Connectivité : Wi-Fi 6E + Cellular 4G/5G pour rester connecté partout. Comprend également l'USB-C et le Bluetooth 5.3.</p><p><br /></p><p>Appareils photo : Caméra arrière grand angle 12MP pour les photos et vidéos en 4K. Caméra frontale ultra grand angle 12MP avec Cadre Centré pour des appels vidéo parfaits.</p>"
    }
};
