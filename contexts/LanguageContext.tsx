import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import NextRouter from 'next/router'

type Lang = 'en' | 'es' | 'pl'

type LanguageCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const Ctx = createContext<LanguageCtx | undefined>(undefined)

const STORAGE_KEY = 'obscura_lang'

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Hero
    'hero.title': 'Security Camera Installation in Chicago — No Subscription. Your Footage Never Leaves Your House.',
    'hero.subtitle': 'Friendly but stern. A superior, private CCTV solution anyone can afford. Our $375 one-time service covers both visits — consultation and installation. You buy the equipment; the footage stays in your home.',
    'hero.imageAlt': 'Security camera installation at a Chicago property',
    'hero.ctaBook': 'Book Consultation',
    'hero.ctaExplore': 'Explore Services',
    'hero.feature1': 'Extreme HD CCTV',
    'hero.feature2': 'Infrared Night Vision',
    'hero.feature3': 'Private Solution',
    'hero.feature4': 'Motion Alerts + Recording',
    'hero.card.title': 'One flat service price',
    'hero.card.once': 'one-time',
    'hero.card.line1': 'Covers both visits — consultation & coverage map, then installation',
    'hero.card.line2': 'Equipment paid separately — you own it outright',
    'hero.card.line3': 'No subscription. No monthly fees. Ever.',

    // Trust strip
    'trust.item1': 'Installed by trained professionals',
    'trust.item2': 'Chicago local — within 50 miles of downtown',
    'trust.item3': 'Written contract protects both parties',
    'trust.item4': 'No subscription, ever — footage stored in your home',

    // Packages
    'packages.title': 'Camera Packages',
    'packages.subtitle': 'Pick the setup that fits your property. You pay for equipment separately, at cost; our $375 service covers both visits.',
    'packages.equipmentLabel': 'Typical equipment cost (estimate, not a quote)',
    'packages.serviceCost': '+ $375 installation service',
    'packages.totalLabel': 'Example total',
    'packages.popular': 'Most popular',
    'packages.cta': 'Get Started',
    'packages.escalation.title': 'Bigger or unusual property?',
    'packages.escalation.body': 'The $375 covers a standard install. Anything beyond is quoted flat in writing at your consultation — approved by you before install day, never a surprise: extra cameras +$35 each · second structure +$150 · difficult runs +$75–$200 · extra visit +$95 · 50–75 miles +$50.',
    'packages.wireless.name': 'Wireless Local',
    'packages.wireless.for': 'For apartments, condos, renters',
    'packages.wireless.eq1': 'eufy eufyCam S330 (eufyCam 3) 2–4 camera kit',
    'packages.wireless.eq2': 'HomeBase 3 local storage',
    'packages.wireless.eq3': 'Battery-powered, 4K, local AI',
    'packages.wireless.equipmentCost': '$350–$550',
    'packages.wireless.total': '$725–$925',
    'packages.wired.name': 'Wired Pro',
    'packages.wired.for': 'For houses',
    'packages.wired.eq1': 'Reolink RLK8-800B4 — 4× 4K PoE cameras',
    'packages.wired.eq2': '8-channel NVR with 2TB',
    'packages.wired.eq3': '24/7 local recording, no cloud',
    'packages.wired.equipmentCost': '$450–$650',
    'packages.wired.total': '$825–$1,025',
    'packages.big.name': 'Big Property',
    'packages.big.for': 'For corner lots, multi-unit, small business',
    'packages.big.eq1': 'Reolink RLK16 or Lorex 4K Fusion 8-camera PoE system',
    'packages.big.eq2': 'Local NVR recording, no cloud',
    'packages.big.eq3': 'Scales for larger properties',
    'packages.big.equipmentCost': '$700–$1,000',
    'packages.big.total': '$1,075–$1,375',

    // How it works
    'how.title': 'How It Works',
    'how.subtitle': 'Two visits, no surprises.',
    'how.step1.title': 'Consultation & coverage map',
    'how.step1.desc': 'We walk the property and map every angle.',
    'how.step2.title': 'Approve your equipment list',
    'how.step2.desc': 'Exact parts, you pay for equipment first, it ships to you.',
    'how.step3.title': 'Installation & walkthrough',
    'how.step3.desc': 'Second visit: install, app setup, and we show you how everything works.',

    // Comparison
    'comparison.title': 'OBSCURA vs Ring vs ADT',
    'comparison.subtitle': 'A straightforward look at where your footage lives and what you pay.',
    'comparison.col.provider': 'Provider',
    'comparison.col.obscura': 'OBSCURA',
    'comparison.col.ring': 'Ring',
    'comparison.col.adt': 'ADT',
    'comparison.row.storage': 'Where footage is stored',
    'comparison.row.monthly': 'Monthly cost',
    'comparison.row.fiveYear': '5-year cost (service)',
    'comparison.row.access': 'Who can access footage',
    'comparison.row.police': 'Police sharing',
    'comparison.o.storage': 'In your home (local NVR/HomeBase)',
    'comparison.o.monthly': '$0',
    'comparison.o.fiveYear': '$375 once',
    'comparison.o.access': 'Only you',
    'comparison.o.police': 'Only via legal request to you',
    'comparison.r.storage': 'Amazon cloud',
    'comparison.r.monthly': 'Subscription required for recordings',
    'comparison.r.fiveYear': 'Hundreds per year, every year',
    'comparison.r.access': 'Amazon & its partners',
    'comparison.r.police': 'Has shared with police programs',
    'comparison.a.storage': 'Company cloud',
    'comparison.a.monthly': 'Monthly monitoring required',
    'comparison.a.fiveYear': 'Thousands over a contract',
    'comparison.a.access': 'The monitoring company',
    'comparison.a.police': 'Via company policy',

    // Services
    'services.title': 'Services & Pricing',
    'services.subtitle': '$375 one-time fee includes two in-person appointments in Chicago, IL. First meeting covers consultation and coverage map; second is installation once you have your equipment.',
    'services.whatYouGetTitle': 'What You Get',
    'services.feature1': 'CCTV (extreme high definition)',
    'services.feature2': 'Infrared night time viewing',
    'services.feature3': 'Private solution (authorities can request videos, not take them)',
    'services.feature4': 'Intercom',
    'services.feature5': 'Push notifications for motion detection',
    'services.feature6': 'Automatic recording on motion',
    'services.feature7': 'Good cable management',
    'services.consultationTitle': 'Consultation & Install Support',
    'services.consultationDesc': 'We help you plan coverage zones, choose camera units and memory cards, place your Amazon order, and coordinate mounting with our installation partner. Extra customization packages are available by quote.',
    'services.ctaRequest': 'Request Consultation',

    // About
    'about.title': 'Built for Chicago. Friendly but Stern.',
    'about.para1': 'We deliver superior, private security tailored to your property—without the bloat.',
    'about.para2': 'Every job runs on a written contract that protects both parties. In the event of a security breach, we provide long-term email support and optional services like data extraction from recordings, composite images, or audio transcriptions.',
    'about.para3': 'We\'re simpler and sexier than big names like Ring—private by default, with straightforward pricing and no upsells. Extra customizations are quoted as needed.',
    'about.hours': 'Operating hours: 10am–6pm',
    'about.location': 'Target city: Chicago, IL',
    'about.support': 'Support: long-term email support for clients',

    // Contact
    'contact.title': 'Contact & Consultation',
    'contact.subtitle': 'Operating hours: 10am–6pm. Request a consultation and we\'ll respond by email. We serve Chicago, IL.',
    'contact.nameLabel': 'Full Name',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Phone',
    'contact.addressLabel': 'Address (optional)',
    'contact.messageLabel': 'Message',
    'contact.languageLabel': 'Preferred Language',
    'contact.languageEn': 'English',
    'contact.languageEs': 'Español',
    'contact.languagePl': 'Polski',
    'contact.submitButton': 'Request Consultation',
    'contact.required': 'Required',
    'contact.sending': 'Sending...',
    'contact.success': 'Request sent. We\'ll email you back soon.',
    'contact.error': 'Failed to send. Please try again later.',

    // Legal
    'legal.title': 'Legal & Warranty',
    'legal.contractsPara': 'Contracts: We use comprehensive contracts that protect both parties. They cover accidental property damage and hardware failure liability. If a component fails, we assist with replacement parts and re-installation for a $50 service fee.',
    'legal.privacyPara': 'Privacy: OBSCURA is a private solution. Video is owned by the client. Authorities may request footage via proper legal channels—your data is not automatically shared.',
    'legal.warrantyPara': 'Warranty & Support: Long-term email support is included. In the event of a security breach, we offer custom solutions (by quote), including information extraction from recordings, composites, and audio transcriptions.',
    'legal.disclaimerNote': 'Note: We are not currently licensed installers. Our service includes consultation, planning, and coordination with a professional installation partner.',

    // Footer
    'footer.copyright': '© {year} OBSCURA – Custom Security Solutions. Chicago, IL.',
    'footer.services': 'Services',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',

    // Navigation
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cta': 'Request Consultation',
    'nav.packages': 'Packages',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our security solutions in Chicagoland',
    'faq.question1': 'Which Chicago neighborhoods do you serve?',
    'faq.answer1': 'We serve all of Chicagoland including downtown Loop, Lincoln Park, Lakeview, Wicker Park, Logan Square, Hyde Park, Bronzeville, and surrounding suburbs like Evanston, Oak Park, Naperville, Schaumburg, and Arlington Heights. If you\'re within 50 miles of downtown Chicago, we\'ve got you covered.',
    'faq.question2': 'What makes your security system different from Ring or ADT?',
    'faq.answer2': 'Unlike Ring (which shares data with police) or ADT (expensive monthly fees), OBSCURA provides complete privacy - your footage belongs to you alone. We offer a one-time $375 fee with no subscriptions, extreme HD cameras with infrared night vision, and personalized consultation for your specific property layout.',
    'faq.question3': 'How does the $375 service work exactly?',
    'faq.answer3': 'The $375 covers both visits: initial in-person consultation at your Chicago property, custom camera placement plan, exact equipment list, and a second visit for installation and app setup. You pay for equipment separately, at cost. No hidden fees, no monthly charges, ever.',
    'faq.question4': 'Do I need permits for security cameras in Chicago?',
    'faq.answer4': 'In Chicago, you generally don\'t need permits for residential security cameras on your own property. However, cameras should not point directly at neighbors\' private areas. We\'ll help position cameras legally and effectively during your consultation.',
    'faq.question5': 'What happens during Chicago winters? Will the cameras still work?',
    'faq.answer5': 'Yes, absolutely. The equipment we recommend is weatherproof and rated for Chicago\'s harsh winters (-40°F to 140°F). We\'ve tested these systems through multiple Chicago winters with snow, ice, and extreme temperature swings.',
    'faq.question6': 'How private is my security footage?',
    'faq.answer6': 'Completely private. Unlike other services, OBSCURA never accesses your footage. Your recordings stay on your property on local storage. Authorities can only request footage through proper legal channels - we don\'t have access to share it automatically.',
    'faq.question7': 'Can you help with apartment/condo security in Chicago?',
    'faq.answer7': 'Yes, we specialize in Chicago apartment and condo security. We\'ll work with your building management and help you navigate HOA rules. Many Chicago renters and condo owners use our service for doorbell cameras, balcony cameras, and interior monitoring.',
    'faq.question9': 'What if my property needs more than a standard install?',
    'faq.answer9': 'Then we quote it flat at your consultation. The $375 covers a standard install of any package; extra cameras, a second structure, difficult cable runs, or an extra visit are priced in writing and approved by you before installation day. If we find a surprise mid-job — dead wiring, a structural issue — work pauses and you approve a written change order before anything continues. No hourly billing, no surprise charges.',
    'faq.question8': 'What if I\'m not tech-savvy? Will I be able to use the system?',
    'faq.answer8': 'Absolutely. We provide step-by-step setup instructions during installation support, and our email support is available for any questions. The systems we recommend have simple mobile apps that even non-tech users find intuitive. We\'re here to help.',
    'faq.serviceArea': 'Service Area',

    // Cookie Consent
    'cookie.message': 'We use essential cookies for functionality and anonymous analytics to improve the experience. By using this site, you accept cookies.',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'cookie.learnMore': 'Learn more'
  },
  es: {
    // Hero
    'hero.title': 'Instalación de cámaras de seguridad en Chicago — Sin suscripción. Tus grabaciones nunca salen de tu casa.',
    'hero.subtitle': 'Amable pero firme. Una solución CCTV superior y privada que cualquiera puede permitirse. Nuestro servicio único de $375 cubre las dos visitas: consulta e instalación. Tú compras el equipo; las grabaciones se quedan en casa.',
    'hero.imageAlt': 'Instalación de cámaras de seguridad en una propiedad de Chicago',
    'hero.ctaBook': 'Reservar Consulta',
    'hero.ctaExplore': 'Explorar Servicios',
    'hero.feature1': 'CCTV HD Extremo',
    'hero.feature2': 'Visión Nocturna Infrarroja',
    'hero.feature3': 'Solución Privada',
    'hero.feature4': 'Alertas de Movimiento + Grabación',
    'hero.card.title': 'Un precio único de servicio',
    'hero.card.once': 'pago único',
    'hero.card.line1': 'Cubre las dos visitas: consulta y mapa de cobertura, luego la instalación',
    'hero.card.line2': 'El equipo se paga por separado: es tuyo en propiedad',
    'hero.card.line3': 'Sin suscripción. Sin pagos mensuales. Nunca.',

    // Trust strip
    'trust.item1': 'Instalado por profesionales capacitados',
    'trust.item2': 'Local de Chicago — a menos de 50 millas del centro',
    'trust.item3': 'Contrato escrito que protege a ambas partes',
    'trust.item4': 'Sin suscripción, nunca — las grabaciones se guardan en tu casa',

    // Packages
    'packages.title': 'Paquetes de cámaras',
    'packages.subtitle': 'Elige la configuración que se adapte a tu propiedad. Tú pagas el equipo por separado, a coste; nuestro servicio de $375 cubre las dos visitas.',
    'packages.equipmentLabel': 'Coste típico del equipo (estimación, no un presupuesto)',
    'packages.serviceCost': '+ $375 por el servicio de instalación',
    'packages.totalLabel': 'Total de ejemplo',
    'packages.popular': 'Más popular',
    'packages.cta': 'Empezar',
    'packages.escalation.title': '¿Propiedad grande o inusual?',
    'packages.escalation.body': 'Los $375 cubren una instalación estándar. Todo lo demás se cotiza por escrito en tu consulta, con tu aprobación antes del día de instalación, sin sorpresas: cámaras extra +$35 cada una · segunda estructura +$150 · recorridos difíciles +$75–$200 · visita extra +$95 · 50–75 millas +$50.',
    'packages.wireless.name': 'Local inalámbrico',
    'packages.wireless.for': 'Para apartamentos, condominios, inquilinos',
    'packages.wireless.eq1': 'Kit de 2–4 cámaras eufy eufyCam S330 (eufyCam 3)',
    'packages.wireless.eq2': 'Almacenamiento local HomeBase 3',
    'packages.wireless.eq3': 'Batería, 4K, IA local',
    'packages.wireless.equipmentCost': '$350–$550',
    'packages.wireless.total': '$725–$925',
    'packages.wired.name': 'Pro cableado',
    'packages.wired.for': 'Para casas',
    'packages.wired.eq1': 'Reolink RLK8-800B4 — 4 cámaras PoE 4K',
    'packages.wired.eq2': 'NVR de 8 canales con 2 TB',
    'packages.wired.eq3': 'Grabación local 24/7, sin nube',
    'packages.wired.equipmentCost': '$450–$650',
    'packages.wired.total': '$825–$1,025',
    'packages.big.name': 'Gran propiedad',
    'packages.big.for': 'Para esquinas, edificios multifamiliares, pequeñas empresas',
    'packages.big.eq1': 'Sistema PoE de 8 cámaras Reolink RLK16 o Lorex 4K Fusion',
    'packages.big.eq2': 'Grabación local en NVR, sin nube',
    'packages.big.eq3': 'Escalable para propiedades grandes',
    'packages.big.equipmentCost': '$700–$1,000',
    'packages.big.total': '$1,075–$1,375',

    // How it works
    'how.title': 'Cómo funciona',
    'how.subtitle': 'Dos visitas, sin sorpresas.',
    'how.step1.title': 'Consulta y mapa de cobertura',
    'how.step1.desc': 'Recorremos la propiedad y mapeamos cada ángulo.',
    'how.step2.title': 'Aprueba tu lista de equipo',
    'how.step2.desc': 'Piezas exactas, tú pagas el equipo primero, y te lo envían a ti.',
    'how.step3.title': 'Instalación y demostración',
    'how.step3.desc': 'Segunda visita: instalación, configuración de la app y te mostramos cómo funciona todo.',

    // Comparison
    'comparison.title': 'OBSCURA frente a Ring y ADT',
    'comparison.subtitle': 'Una mirada clara a dónde se guardan tus grabaciones y cuánto pagas.',
    'comparison.col.provider': 'Proveedor',
    'comparison.col.obscura': 'OBSCURA',
    'comparison.col.ring': 'Ring',
    'comparison.col.adt': 'ADT',
    'comparison.row.storage': 'Dónde se guardan las grabaciones',
    'comparison.row.monthly': 'Coste mensual',
    'comparison.row.fiveYear': 'Coste a 5 años (servicio)',
    'comparison.row.access': 'Quién puede acceder a las grabaciones',
    'comparison.row.police': 'Compartir con la policía',
    'comparison.o.storage': 'En tu casa (NVR/HomeBase local)',
    'comparison.o.monthly': '$0',
    'comparison.o.fiveYear': '$375 una vez',
    'comparison.o.access': 'Solo tú',
    'comparison.o.police': 'Solo mediante solicitud legal dirigida a ti',
    'comparison.r.storage': 'Nube de Amazon',
    'comparison.r.monthly': 'Se requiere suscripción para grabar',
    'comparison.r.fiveYear': 'Cientos por año, cada año',
    'comparison.r.access': 'Amazon y sus socios',
    'comparison.r.police': 'Ha compartido con programas policiales',
    'comparison.a.storage': 'Nube de la empresa',
    'comparison.a.monthly': 'Requiere monitoreo mensual',
    'comparison.a.fiveYear': 'Miles durante un contrato',
    'comparison.a.access': 'La empresa de monitoreo',
    'comparison.a.police': 'Según la política de la empresa',

    // Services
    'services.title': 'Servicios y Precios',
    'services.subtitle': 'La tarifa única de $375 incluye dos citas en persona en Chicago, IL. La primera reunión cubre consulta y mapa de cobertura; la segunda es la instalación una vez tengas tu equipo.',
    'services.whatYouGetTitle': 'Qué Obtienes',
    'services.feature1': 'CCTV (definición extremadamente alta)',
    'services.feature2': 'Visión nocturna infrarroja',
    'services.feature3': 'Solución privada (las autoridades pueden solicitar videos, no tomarlos)',
    'services.feature4': 'Intercomunicador',
    'services.feature5': 'Notificaciones push para detección de movimiento',
    'services.feature6': 'Grabación automática en movimiento',
    'services.feature7': 'Buena gestión de cables',
    'services.consultationTitle': 'Consulta y Soporte de Instalación',
    'services.consultationDesc': 'Te ayudamos a planificar zonas de cobertura, elegir unidades de cámara y tarjetas de memoria, realizar tu pedido de Amazon y coordinar el montaje con nuestro socio de instalación. Los paquetes de personalización adicionales están disponibles por cotización.',
    'services.ctaRequest': 'Solicitar Consulta',

    // About
    'about.title': 'Construido para Chicago. Amable pero Firme.',
    'about.para1': 'Entregamos seguridad superior y privada adaptada a tu propiedad, sin hinchazón.',
    'about.para2': 'Cada trabajo se realiza con un contrato escrito que protege a ambas partes. En caso de una violación de seguridad, proporcionamos soporte de email a largo plazo y servicios opcionales como extracción de datos de grabaciones, imágenes compuestas o transcripciones de audio.',
    'about.para3': 'Somos más simples y atractivos que grandes nombres como Ring: privados por defecto, con precios directos y sin ventas adicionales. Las personalizaciones adicionales se cotizan según sea necesario.',
    'about.hours': 'Horario de operación: 10am–6pm',
    'about.location': 'Ciudad objetivo: Chicago, IL',
    'about.support': 'Soporte: soporte de email a largo plazo para clientes',

    // Contact
    'contact.title': 'Contacto y Consulta',
    'contact.subtitle': 'Horario de operación: 10am–6pm. Solicita una consulta y te responderemos por email. Servimos a Chicago, IL.',
    'contact.nameLabel': 'Nombre Completo',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Teléfono',
    'contact.addressLabel': 'Dirección (opcional)',
    'contact.messageLabel': 'Mensaje',
    'contact.languageLabel': 'Idioma Preferido',
    'contact.languageEn': 'Inglés',
    'contact.languageEs': 'Español',
    'contact.languagePl': 'Polaco',
    'contact.submitButton': 'Solicitar Consulta',
    'contact.required': 'Requerido',
    'contact.sending': 'Enviando...',
    'contact.success': 'Solicitud enviada. Te responderemos por email pronto.',
    'contact.error': 'Error al enviar. Por favor intenta más tarde.',

    // Legal
    'legal.title': 'Legal y Garantía',
    'legal.contractsPara': 'Contratos: Utilizamos contratos integrales que protegen a ambas partes. Cubren daños accidentales a la propiedad y responsabilidad por falla de hardware. Si un componente falla, ayudamos con piezas de repuesto y reinstalación por una tarifa de servicio de $50.',
    'legal.privacyPara': 'Privacidad: OBSCURA es una solución privada. El video es propiedad del cliente. Las autoridades pueden solicitar grabaciones a través de canales legales apropiados: tus datos no se comparten automáticamente.',
    'legal.warrantyPara': 'Garantía y Soporte: Se incluye soporte de email a largo plazo. En caso de una violación de seguridad, ofrecemos soluciones personalizadas (por cotización), incluyendo extracción de información de grabaciones, composites y transcripciones de audio.',
    'legal.disclaimerNote': 'Nota: Actualmente no somos instaladores con licencia. Nuestro servicio incluye consulta, planificación y coordinación con un socio de instalación profesional.',

    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Todo lo que necesitas saber sobre nuestras soluciones de seguridad en Chicagoland',
    'faq.question1': '¿Qué vecindarios de Chicago atienden?',
    'faq.answer1': 'Servimos a toda Chicagoland incluyendo el centro Loop, Lincoln Park, Lakeview, Wicker Park, Logan Square, Hyde Park, Bronzeville, y suburbios cercanos como Evanston, Oak Park, Naperville, Schaumburg y Arlington Heights. Si estás dentro de 50 millas del centro de Chicago, te cubrimos.',
    'faq.question2': '¿Qué hace diferente su sistema de seguridad de Ring o ADT?',
    'faq.answer2': 'A diferencia de Ring (que comparte datos con la policía) o ADT (tarifas mensuales caras), OBSCURA proporciona privacidad completa: tu grabación te pertenece únicamente a ti. Ofrecemos una tarifa única de $375 sin suscripciones, cámaras HD extremas con visión nocturna infrarroja, y consulta personalizada para el diseño específico de tu propiedad.',
    'faq.question3': '¿Cómo funciona exactamente el servicio de $375?',
    'faq.answer3': 'Los $375 cubren las dos visitas: consulta inicial en persona en tu propiedad de Chicago, plan personalizado de ubicación de cámaras, lista exacta de equipo, y segunda visita para instalación y configuración de la app. Tú pagas el equipo por separado, a coste. Sin tarifas ocultas, sin cargos mensuales, nunca.',
    'faq.question4': '¿Necesito permisos para cámaras de seguridad en Chicago?',
    'faq.answer4': 'En Chicago, generalmente no necesitas permisos para cámaras de seguridad residenciales en tu propiedad. Sin embargo, las cámaras no deben apuntar directamente a áreas privadas de vecinos. Te ayudaremos a posicionar las cámaras legal y efectivamente durante tu consulta.',
    'faq.question5': '¿Qué pasa durante los inviernos de Chicago? ¿Funcionarán las cámaras?',
    'faq.answer5': 'Sí, absolutamente. El equipo que recomendamos es resistente al clima y calificado para los inviernos duros de Chicago (-40°F a 140°F). Hemos probado estos sistemas durante múltiples inviernos de Chicago con nieve, hielo y cambios extremos de temperatura.',
    'faq.question6': '¿Qué tan privado es mi grabación de seguridad?',
    'faq.answer6': 'Completamente privado. A diferencia de otros servicios, OBSCURA nunca accede a tu grabación. Tus grabaciones permanecen en tu propiedad en almacenamiento local. Las autoridades solo pueden solicitar grabaciones a través de canales legales apropiados: no tenemos acceso para compartirlas automáticamente.',
    'faq.question7': '¿Pueden ayudar con seguridad de apartamentos/condominios en Chicago?',
    'faq.answer7': 'Sí, nos especializamos en seguridad de apartamentos y condominios en Chicago. Trabajaremos con la administración de tu edificio y te ayudaremos a navegar las reglas de HOA. Muchos inquilinos y propietarios de condominios en Chicago usan nuestro servicio para cámaras de timbre, cámaras de balcón y monitoreo interior.',
    'faq.question9': '¿Qué pasa si mi propiedad necesita más que una instalación estándar?',
    'faq.answer9': 'Lo cotizamos a precio cerrado en tu consulta. Los $375 cubren la instalación estándar de cualquier paquete; cámaras extra, una segunda estructura, recorridos difíciles de cable o una visita adicional se cotizan por escrito y tú los apruebas antes del día de instalación. Si aparece una sorpresa durante el trabajo — cableado muerto, un problema estructural — el trabajo se pausa y apruebas una orden de cambio escrita antes de continuar. Sin cobro por horas, sin cargos sorpresa.',
    'faq.question8': '¿Y si no soy experto en tecnología? ¿Podré usar el sistema?',
    'faq.answer8': 'Absolutamente. Proporcionamos instrucciones de configuración paso a paso durante el soporte de instalación, y nuestro soporte de email está disponible para cualquier pregunta. Los sistemas que recomendamos tienen aplicaciones móviles simples que incluso usuarios no técnicos encuentran intuitivas. Estamos aquí para ayudar.',
    'faq.serviceArea': 'Área de Servicio',

    // Footer
    'footer.copyright': '© {year} OBSCURA – Soluciones de Seguridad Personalizadas. Chicago, IL.',
    'footer.services': 'Servicios',
    'footer.about': 'Acerca',
    'footer.contact': 'Contacto',
    'footer.legal': 'Legal',

    // Navigation
    'nav.services': 'Servicios',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.cta': 'Solicitar Consulta',
    'nav.packages': 'Paquetes',

    // Cookie Consent
    'cookie.message': 'Utilizamos cookies esenciales para funcionalidad y análisis anónimos para mejorar la experiencia. Al usar este sitio, aceptas las cookies.',
    'cookie.accept': 'Aceptar',
    'cookie.decline': 'Rechazar',
    'cookie.learnMore': 'Saber más'
  },
  pl: {
    // Hero
    'hero.title': 'Instalacja kamer bezpieczeństwa w Chicago — Bez subskrypcji. Twoje nagrania nigdy nie opuszczają domu.',
    'hero.subtitle': 'Przyjazne, ale stanowcze. Doskonałe, prywatne rozwiązanie CCTV, na które każdy może sobie pozwolić. Nasza jednorazowa usługa za $375 obejmuje obie wizyty: konsultację i instalację. Sam kupujesz sprzęt, a nagrania zostają w domu.',
    'hero.imageAlt': 'Instalacja kamer bezpieczeństwa w nieruchomości w Chicago',
    'hero.ctaBook': 'Zarezerwuj Konsultację',
    'hero.ctaExplore': 'Poznaj Usługi',
    'hero.feature1': 'Ekstremalnie Wysokiej Rozdzielczości CCTV',
    'hero.feature2': 'Nocne Widzenie Podczerwone',
    'hero.feature3': 'Prywatne Rozwiązanie',
    'hero.feature4': 'Alerty Ruchu + Nagrywanie',
    'hero.card.title': 'Jedna stała cena usługi',
    'hero.card.once': 'jednorazowo',
    'hero.card.line1': 'Obejmuje obie wizyty: konsultację z mapą pokrycia, a potem instalację',
    'hero.card.line2': 'Sprzęt płatny osobno — jest Twój na własność',
    'hero.card.line3': 'Bez subskrypcji. Bez opłat miesięcznych. Nigdy.',

    // Trust strip
    'trust.item1': 'Instalacje wykonują przeszkoleni profesjonaliści',
    'trust.item2': 'Lokal z Chicago — w promieniu 50 mil od centrum',
    'trust.item3': 'Pisemna umowa chroni obie strony',
    'trust.item4': 'Bez subskrypcji — nagrania przechowywane w Twoim domu',

    // Packages
    'packages.title': 'Pakiety kamer',
    'packages.subtitle': 'Wybierz zestaw odpowiedni dla swojej nieruchomości. Sprzęt płacisz osobno, po koszcie; nasza usługa za $375 obejmuje obie wizyty.',
    'packages.equipmentLabel': 'Typowy koszt sprzętu (szacunek, nie wycena)',
    'packages.serviceCost': '+ $375 za usługę instalacji',
    'packages.totalLabel': 'Przykładowa suma',
    'packages.popular': 'Najpopularniejszy',
    'packages.cta': 'Zacznij',
    'packages.escalation.title': 'Duża lub nietypowa nieruchomość?',
    'packages.escalation.body': 'Cena $375 obejmuje standardową instalację. Wszystko ponad to wyceniamy pisemnie podczas konsultacji — za Twoją zgodą przed dniem instalacji, bez niespodzianek: dodatkowe kamery +$35 za sztukę · drugi budynek +$150 · trudne trasy kablowe +$75–$200 · dodatkowa wizyta +$95 · 50–75 mil +$50.',
    'packages.wireless.name': 'Bezprzewodowy lokalny',
    'packages.wireless.for': 'Dla mieszkań, kondominium, najemców',
    'packages.wireless.eq1': 'Zestaw 2–4 kamer eufy eufyCam S330 (eufyCam 3)',
    'packages.wireless.eq2': 'Lokalny magazyn HomeBase 3',
    'packages.wireless.eq3': 'Bateria, 4K, lokalna AI',
    'packages.wireless.equipmentCost': '$350–$550',
    'packages.wireless.total': '$725–$925',
    'packages.wired.name': 'Przewodowy Pro',
    'packages.wired.for': 'Dla domów jednorodzinnych',
    'packages.wired.eq1': 'Reolink RLK8-800B4 — 4 kamery PoE 4K',
    'packages.wired.eq2': 'Rejestrator NVR 8-kanałowy z 2 TB',
    'packages.wired.eq3': 'Nagrywanie lokalne 24/7, bez chmury',
    'packages.wired.equipmentCost': '$450–$650',
    'packages.wired.total': '$825–$1,025',
    'packages.big.name': 'Duża nieruchomość',
    'packages.big.for': 'Dla narożnych działek, budynków wielorodzinnych, małych firm',
    'packages.big.eq1': 'System PoE 8 kamer Reolink RLK16 lub Lorex 4K Fusion',
    'packages.big.eq2': 'Nagrywanie lokalne na NVR, bez chmury',
    'packages.big.eq3': 'Skalowalne dla większych nieruchomości',
    'packages.big.equipmentCost': '$700–$1,000',
    'packages.big.total': '$1,075–$1,375',

    // How it works
    'how.title': 'Jak to działa',
    'how.subtitle': 'Dwie wizyty, bez niespodzianek.',
    'how.step1.title': 'Konsultacja i mapa pokrycia',
    'how.step1.desc': 'Obchodzimy nieruchomość i mapujemy każdy kąt.',
    'how.step2.title': 'Zatwierdź listę sprzętu',
    'how.step2.desc': 'Dokładne części, najpierw płacisz za sprzęt, a potem trafia do Ciebie.',
    'how.step3.title': 'Instalacja i omówienie',
    'how.step3.desc': 'Druga wizyta: montaż, konfiguracja aplikacji i pokazujemy, jak wszystko działa.',

    // Comparison
    'comparison.title': 'OBSCURA kontra Ring i ADT',
    'comparison.subtitle': 'Proste spojrzenie na to, gdzie trafiają nagrania i ile płacisz.',
    'comparison.col.provider': 'Dostawca',
    'comparison.col.obscura': 'OBSCURA',
    'comparison.col.ring': 'Ring',
    'comparison.col.adt': 'ADT',
    'comparison.row.storage': 'Gdzie przechowywane są nagrania',
    'comparison.row.monthly': 'Koszt miesięczny',
    'comparison.row.fiveYear': 'Koszt w 5 lat (usługa)',
    'comparison.row.access': 'Kto ma dostęp do nagrań',
    'comparison.row.police': 'Udostępnianie policji',
    'comparison.o.storage': 'W Twoim domu (lokalny NVR/HomeBase)',
    'comparison.o.monthly': '$0',
    'comparison.o.fiveYear': '$375 jednorazowo',
    'comparison.o.access': 'Tylko Ty',
    'comparison.o.police': 'Tylko na legalne żądanie skierowane do Ciebie',
    'comparison.r.storage': 'Chmura Amazon',
    'comparison.r.monthly': 'Subskrypcja wymagana do nagrywania',
    'comparison.r.fiveYear': 'Setki rocznie, co roku',
    'comparison.r.access': 'Amazon i jego partnerzy',
    'comparison.r.police': 'Udostępniało programom policyjnym',
    'comparison.a.storage': 'Chmura firmy',
    'comparison.a.monthly': 'Wymagany abonament monitoringu',
    'comparison.a.fiveYear': 'Tysiące w trakcie umowy',
    'comparison.a.access': 'Firma monitoringowa',
    'comparison.a.police': 'Zgodnie z polityką firmy',

    // Services
    'services.title': 'Usługi i Ceny',
    'services.subtitle': 'Jednorazowa opłata $375 obejmuje dwa osobiste spotkania w Chicago, IL. Pierwsze spotkanie obejmuje konsultację i mapę pokrycia; drugie to instalacja po otrzymaniu sprzętu.',
    'services.whatYouGetTitle': 'Co Otrzymujesz',
    'services.feature1': 'CCTV (skrajnie wysoka rozdzielczość)',
    'services.feature2': 'Nocne widzenie podczerwone',
    'services.feature3': 'Prywatne rozwiązanie (władze mogą prosić o nagrania, nie je zabierać)',
    'services.feature4': 'Domofon',
    'services.feature5': 'Powiadomienia push dla wykrywania ruchu',
    'services.feature6': 'Automatyczne nagrywanie przy ruchu',
    'services.feature7': 'Dobre zarządzanie kablami',
    'services.consultationTitle': 'Konsultacja i Wsparcie Instalacji',
    'services.consultationDesc': 'Pomagamy planować strefy pokrycia, wybierać jednostki kamer i karty pamięci, składać zamówienie Amazon i koordynować montaż z naszym partnerem instalacyjnym. Dodatkowe pakiety dostosowań są dostępne według wyceny.',
    'services.ctaRequest': 'Poproś o Konsultację',

    // About
    'about.title': 'Zbudowane dla Chicago. Przyjazne ale Stanowcze.',
    'about.para1': 'Dostarczamy doskonałe, prywatne bezpieczeństwo dostosowane do Twojej nieruchomości — bez nadmiaru.',
    'about.para2': 'Każde zlecenie realizujemy na podstawie pisemnej umowy, która chroni obie strony. W przypadku naruszenia bezpieczeństwa, zapewniamy długoterminowe wsparcie email i opcjonalne usługi, takie jak ekstrakcja danych z nagrań, obrazy kompozytowe lub transkrypcje audio.',
    'about.para3': 'Jesteśmy prostsi i bardziej atrakcyjni niż wielkie marki jak Ring — prywatni domyślnie, z prostymi cenami i bez dodatkowych sprzedaży. Dodatkowe dostosowania są wyceniane według potrzeb.',
    'about.hours': 'Godziny pracy: 10:00–18:00',
    'about.location': 'Miasto docelowe: Chicago, IL',
    'about.support': 'Wsparcie: długoterminowe wsparcie email dla klientów',

    // Contact
    'contact.title': 'Kontakt i Konsultacja',
    'contact.subtitle': 'Godziny pracy: 10:00–18:00. Poproś o konsultację, a odpowiemy emailem. Obsługujemy Chicago, IL.',
    'contact.nameLabel': 'Pełne Imię i Nazwisko',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Telefon',
    'contact.addressLabel': 'Adres (opcjonalny)',
    'contact.messageLabel': 'Wiadomość',
    'contact.languageLabel': 'Preferowany Język',
    'contact.languageEn': 'Angielski',
    'contact.languageEs': 'Hiszpański',
    'contact.languagePl': 'Polski',
    'contact.submitButton': 'Poproś o Konsultację',
    'contact.required': 'Wymagane',
    'contact.sending': 'Wysyłanie...',
    'contact.success': 'Prośba wysłana. Odpowiemy emailem wkrótce.',
    'contact.error': 'Nie udało się wysłać. Spróbuj ponownie później.',

    // Legal
    'legal.title': 'Prawne i Gwarancja',
    'legal.contractsPara': 'Umowy: Używamy kompleksowych umów, które chronią obie strony. Pokrywają przypadkowe uszkodzenia mienia i odpowiedzialność za awarie sprzętu. Jeśli komponent się zepsuje, pomagamy z częściami zamiennymi i ponowną instalacją za opłatą serwisową $50.',
    'legal.privacyPara': 'Prywatność: OBSCURA to prywatne rozwiązanie. Wideo należy do klienta. Władze mogą prosić o nagrania przez odpowiednie kanały prawne — Twoje dane nie są automatycznie udostępniane.',
    'legal.warrantyPara': 'Gwarancja i Wsparcie: Długoterminowe wsparcie email jest wliczone. W przypadku naruszenia bezpieczeństwa, oferujemy niestandardowe rozwiązania (według wyceny), w tym ekstrakcję informacji z nagrań, kompozyty i transkrypcje audio.',
    'legal.disclaimerNote': 'Uwaga: Obecnie nie jesteśmy licencjonowanymi instalatorami. Nasza usługa obejmuje konsultację, planowanie i koordynację z profesjonalnym partnerem instalacyjnym.',

    // Footer
    'footer.copyright': '© {year} OBSCURA – Niestandardowe Rozwiązania Bezpieczeństwa. Chicago, IL.',
    'footer.services': 'Usługi',
    'footer.about': 'O nas',
    'footer.contact': 'Kontakt',
    'footer.legal': 'Prawne',

    // Navigation
    'nav.services': 'Usługi',
    'nav.about': 'O nas',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Poproś o Konsultację',
    'nav.packages': 'Pakiety',

    // FAQ
    'faq.title': 'Często Zadawane Pytania',
    'faq.subtitle': 'Wszystko, co musisz wiedzieć o naszych rozwiązaniach bezpieczeństwa w Chicagoland',
    'faq.question1': 'Które dzielnice Chicago obsługujecie?',
    'faq.answer1': 'Obsługujemy całe Chicagoland, w tym centrum Loop, Lincoln Park, Lakeview, Wicker Park, Logan Square, Hyde Park, Bronzeville i okoliczne przedmieścia takie jak Evanston, Oak Park, Naperville, Schaumburg i Arlington Heights. Jeśli jesteś w promieniu 50 mil od centrum Chicago, cię obejmujemy.',
    'faq.question2': 'Co wyróżnia wasz system bezpieczeństwa od Ring lub ADT?',
    'faq.answer2': 'W przeciwieństwie do Ring (który dzieli się danymi z policją) lub ADT (droga opłata miesięczna), OBSCURA zapewnia całkowitą prywatność - twoje nagrania należą tylko do ciebie. Oferujemy jednorazową opłatę $375 bez subskrypcji, ekstremalnie HD kamery z podczerwienią nocną i spersonalizowaną konsultację dla konkretnego układu twojej nieruchomości.',
    'faq.question3': 'Jak dokładnie działa usługa za $375?',
    'faq.answer3': '$375 obejmuje obie wizyty: początkową konsultację osobistą w twojej nieruchomości w Chicago, spersonalizowany plan rozmieszczenia kamer, dokładną listę sprzętu i drugą wizytę na instalację oraz konfigurację aplikacji. Sprzęt płacisz osobno, po koszcie. Brak ukrytych opłat, brak miesięcznych opłat, nigdy.',
    'faq.question4': 'Czy potrzebuję pozwoleń na kamery bezpieczeństwa w Chicago?',
    'faq.answer4': 'W Chicago generalnie nie potrzebujesz pozwoleń na kamery bezpieczeństwa w domu na własnej nieruchomości. Jednak kamery nie powinny wskazywać bezpośrednio na prywatne obszary sąsiadów. Pomożemy ci umieścić kamery legalnie i skutecznie podczas konsultacji.',
    'faq.question5': 'Co się dzieje podczas chicagowskich zim? Czy kamery nadal będą działać?',
    'faq.answer5': 'Tak, absolutnie. Sprzęt, który polecamy, jest odporny na warunki atmosferyczne i oceniany na chicagowskie surowe zimy (-40°F do 140°F). Testowaliśmy te systemy przez wiele chicagowskich zim ze śniegiem, lodem i ekstremalnymi zmianami temperatury.',
    'faq.question6': 'Jak prywatne są moje nagrania bezpieczeństwa?',
    'faq.answer6': 'Całkowicie prywatne. W przeciwieństwie do innych usług, OBSCURA nigdy nie uzyskuje dostępu do twoich nagrań. Twoje nagrania pozostają na twojej nieruchomości w lokalnym przechowywaniu. Władze mogą tylko prosić o nagrania przez odpowiednie kanały prawne - nie mamy dostępu do ich automatycznego udostępniania.',
    'faq.question7': 'Czy możecie pomóc z bezpieczeństwem mieszkania/condo w Chicago?',
    'faq.answer7': 'Tak, specjalizujemy się w bezpieczeństwie mieszkań i condo w Chicago. Będziemy współpracować z zarządem twojego budynku i pomożemy ci poruszać się po zasadach HOA. Wielu chicagowskich najemców i właścicieli condo używa naszej usługi do kamer dzwonkowych, kamer balkonowych i monitorowania wewnętrznego.',
    'faq.question9': 'Co jeśli moja nieruchomość wymaga więcej niż standardowa instalacja?',
    'faq.answer9': 'Wtedy wyceniamy to z góry podczas konsultacji. Cena $375 obejmuje standardową instalację każdego pakietu; dodatkowe kamery, drugi budynek, trudne trasy kablowe lub dodatkowa wizyta są wyceniane pisemnie i zatwierdzane przez Ciebie przed dniem instalacji. Jeśli w trakcie pracy pojawi się niespodzianka — martwe okablowanie, problem konstrukcyjny — prace wstrzymujemy, a Ty zatwierdzasz pisemne zlecenie zmiany, zanim cokolwiek ruszy dalej. Bez rozliczeń godzinowych i ukrytych opłat.',
    'faq.question8': 'A jeśli nie jestem biegły w technologii? Czy będę mógł używać systemu?',
    'faq.answer8': 'Absolutnie. Zapewniamy instrukcje konfiguracji krok po kroku podczas wsparcia instalacji i nasze wsparcie email jest dostępne dla wszelkich pytań. Systemy, które polecamy, mają proste aplikacje mobilne, które nawet użytkownicy nie-techniczni uznają za intuicyjne. Jesteśmy tutaj, aby pomóc.',
    'faq.serviceArea': 'Obszar Obsługi',

    // Cookie Consent
    'cookie.message': 'Używamy niezbędnych ciasteczek do funkcjonalności i anonimowych analiz w celu poprawy doświadczenia. Korzystając z tej strony, akceptujesz ciasteczka.',
    'cookie.accept': 'Akceptuj',
    'cookie.decline': 'Odrzuć',
    'cookie.learnMore': 'Dowiedz się więcej'
  }
}

export const LanguageProvider = ({ children, locale = 'en' }: { children: ReactNode; locale?: Lang }) => {
  const [lang, setLangState] = useState<Lang>(locale)

  // Language is driven by the URL locale (/, /es, /pl) so each locale route
  // server-renders its own language — required for correct indexing/hreflang.
  useEffect(() => {
    setLangState(locale)
  }, [locale])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
    const r = NextRouter.router
    if (r && r.locale !== l) {
      r.push(r.pathname, r.asPath, { locale: l })
    }
  }

  const t = (key: string) => {
    return translations[lang][key] || key
  }

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export const useLanguage = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLanguage must be used within LanguageProvider')
  return v
}