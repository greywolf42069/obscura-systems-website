import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

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
    'hero.title': 'Cinematic Noir Security, Customized for Chicago',
    'hero.subtitle': 'Friendly but stern. A superior, private CCTV solution anyone can afford. $777 one-time service includes in-person consultation and installation support.',
    'hero.ctaBook': 'Book Consultation',
    'hero.ctaExplore': 'Explore Services',
    'hero.feature1': 'Extreme HD CCTV',
    'hero.feature2': 'Infrared Night Vision',
    'hero.feature3': 'Private Solution',
    'hero.feature4': 'Motion Alerts + Recording',

    // Services
    'services.title': 'Services & Pricing',
    'services.subtitle': '$777 one-time fee includes two in-person appointments in Chicago, IL. First meeting covers consultation and coverage map; second is installation support once your Amazon order arrives.',
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
    'about.para1': 'We deliver superior, private security tailored to your property—without the bloat. We\'re two co-founders: your sales agent walks the neighborhood to find folks who want better security, and the closer handles the details and finishes the deal.',
    'about.para2': 'No licenses yet; we operate with a comprehensive contract that protects both parties. In the event of a security breach, we provide long-term email support and optional services like data extraction from recordings, composite images, or audio transcriptions.',
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

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our security solutions in Chicagoland',
    'faq.question1': 'Which Chicago neighborhoods do you serve?',
    'faq.answer1': 'We serve all of Chicagoland including downtown Loop, Lincoln Park, Lakeview, Wicker Park, Logan Square, Hyde Park, Bronzeville, and surrounding suburbs like Evanston, Oak Park, Naperville, Schaumburg, and Arlington Heights. If you\'re within 50 miles of downtown Chicago, we\'ve got you covered.',
    'faq.question2': 'What makes your security system different from Ring or ADT?',
    'faq.answer2': 'Unlike Ring (which shares data with police) or ADT (expensive monthly fees), OBSCURA provides complete privacy - your footage belongs to you alone. We offer a one-time $777 fee with no subscriptions, extreme HD cameras with infrared night vision, and personalized consultation for your specific property layout.',
    'faq.question3': 'How does the $777 service work exactly?',
    'faq.answer3': 'The $777 covers everything: initial in-person consultation at your Chicago property, custom camera placement plan, Amazon shopping list with exact equipment, second visit for installation support, and lifetime email support. No hidden fees, no monthly charges, ever.',
    'faq.question4': 'Do I need permits for security cameras in Chicago?',
    'faq.answer4': 'In Chicago, you generally don\'t need permits for residential security cameras on your own property. However, cameras should not point directly at neighbors\' private areas. We\'ll help position cameras legally and effectively during your consultation.',
    'faq.question5': 'What happens during Chicago winters? Will the cameras still work?',
    'faq.answer5': 'Yes, absolutely. The equipment we recommend is weatherproof and rated for Chicago\'s harsh winters (-40°F to 140°F). We\'ve tested these systems through multiple Chicago winters with snow, ice, and extreme temperature swings.',
    'faq.question6': 'How private is my security footage?',
    'faq.answer6': 'Completely private. Unlike other services, OBSCURA never accesses your footage. Your recordings stay on your property on local storage. Authorities can only request footage through proper legal channels - we don\'t have access to share it automatically.',
    'faq.question7': 'Can you help with apartment/condo security in Chicago?',
    'faq.answer7': 'Yes, we specialize in Chicago apartment and condo security. We\'ll work with your building management and help you navigate HOA rules. Many Chicago renters and condo owners use our service for doorbell cameras, balcony cameras, and interior monitoring.',
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
    'hero.title': 'Seguridad Cinematográfica Noir, Personalizada para Chicago',
    'hero.subtitle': 'Amable pero firme. Una solución CCTV superior y privada que cualquiera puede permitirse. El servicio único de $777 incluye consulta en persona y soporte de instalación.',
    'hero.ctaBook': 'Reservar Consulta',
    'hero.ctaExplore': 'Explorar Servicios',
    'hero.feature1': 'CCTV HD Extremo',
    'hero.feature2': 'Visión Nocturna Infrarroja',
    'hero.feature3': 'Solución Privada',
    'hero.feature4': 'Alertas de Movimiento + Grabación',

    // Services
    'services.title': 'Servicios y Precios',
    'services.subtitle': 'La tarifa única de $777 incluye dos citas en persona en Chicago, IL. La primera reunión cubre consulta y mapa de cobertura; la segunda es soporte de instalación una vez que llegue tu pedido de Amazon.',
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
    'about.para1': 'Entregamos seguridad superior y privada adaptada a tu propiedad, sin hinchazón. Somos dos cofundadores: tu agente de ventas camina por el vecindario para encontrar personas que quieren mejor seguridad, y el cerrador maneja los detalles y finaliza el trato.',
    'about.para2': 'Aún no tenemos licencias; operamos con un contrato integral que protege a ambas partes. En caso de una violación de seguridad, proporcionamos soporte de email a largo plazo y servicios opcionales como extracción de datos de grabaciones, imágenes compuestas o transcripciones de audio.',
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
    'faq.answer2': 'A diferencia de Ring (que comparte datos con la policía) o ADT (tarifas mensuales caras), OBSCURA proporciona privacidad completa: tu grabación te pertenece únicamente a ti. Ofrecemos una tarifa única de $777 sin suscripciones, cámaras HD extremas con visión nocturna infrarroja, y consulta personalizada para el diseño específico de tu propiedad.',
    'faq.question3': '¿Cómo funciona exactamente el servicio de $777?',
    'faq.answer3': 'Los $777 cubren todo: consulta inicial en persona en tu propiedad de Chicago, plan personalizado de ubicación de cámaras, lista de compras de Amazon con equipo exacto, segunda visita para soporte de instalación, y soporte de email de por vida. Sin tarifas ocultas, sin cargos mensuales, nunca.',
    'faq.question4': '¿Necesito permisos para cámaras de seguridad en Chicago?',
    'faq.answer4': 'En Chicago, generalmente no necesitas permisos para cámaras de seguridad residenciales en tu propiedad. Sin embargo, las cámaras no deben apuntar directamente a áreas privadas de vecinos. Te ayudaremos a posicionar las cámaras legal y efectivamente durante tu consulta.',
    'faq.question5': '¿Qué pasa durante los inviernos de Chicago? ¿Funcionarán las cámaras?',
    'faq.answer5': 'Sí, absolutamente. El equipo que recomendamos es resistente al clima y calificado para los inviernos duros de Chicago (-40°F a 140°F). Hemos probado estos sistemas durante múltiples inviernos de Chicago con nieve, hielo y cambios extremos de temperatura.',
    'faq.question6': '¿Qué tan privado es mi grabación de seguridad?',
    'faq.answer6': 'Completamente privado. A diferencia de otros servicios, OBSCURA nunca accede a tu grabación. Tus grabaciones permanecen en tu propiedad en almacenamiento local. Las autoridades solo pueden solicitar grabaciones a través de canales legales apropiados: no tenemos acceso para compartirlas automáticamente.',
    'faq.question7': '¿Pueden ayudar con seguridad de apartamentos/condominios en Chicago?',
    'faq.answer7': 'Sí, nos especializamos en seguridad de apartamentos y condominios en Chicago. Trabajaremos con la administración de tu edificio y te ayudaremos a navegar las reglas de HOA. Muchos inquilinos y propietarios de condominios en Chicago usan nuestro servicio para cámaras de timbre, cámaras de balcón y monitoreo interior.',
    'faq.question8': '¿Y si no soy experto en tecnología? ¿Podré usar el sistema?',
    'faq.answer8': 'Absolutamente. Proporcionamos instrucciones de configuración paso a paso durante el soporte de instalación, y nuestro soporte de email está disponible para cualquier pregunta. Los sistemas que recomendamos tienen aplicaciones móviles simples que incluso usuarios no técnicos encuentran intuitivas. Estamos aquí para ayudar.',
    'faq.serviceArea': 'Área de Servicio',

    // Footer
    'footer.copyright': '© {year} OBSCURA – Soluciones de Seguridad Personalizadas. Chicago, IL.',
    'footer.services': 'Servicios',
    'footer.about': 'Acerca',
    'footer.contact': 'Contacto',
    'footer.legal': 'Legal',

    // Cookie Consent
    'cookie.message': 'Utilizamos cookies esenciales para funcionalidad y análisis anónimos para mejorar la experiencia. Al usar este sitio, aceptas las cookies.',
    'cookie.accept': 'Aceptar',
    'cookie.decline': 'Rechazar',
    'cookie.learnMore': 'Saber más'
  },
  pl: {
    // Hero
    'hero.title': 'Kinowe Bezpieczeństwo Noir, Dostosowane do Chicago',
    'hero.subtitle': 'Przyjazne, ale stanowcze. Doskonałe, prywatne rozwiązanie CCTV, na które każdy może sobie pozwolić. Jednorazowa usługa za $777 obejmuje osobistą konsultację i wsparcie instalacji.',
    'hero.ctaBook': 'Zarezerwuj Konsultację',
    'hero.ctaExplore': 'Poznaj Usługi',
    'hero.feature1': 'Ekstremalnie Wysokiej Rozdzielczości CCTV',
    'hero.feature2': 'Nocne Widzenie Podczerwone',
    'hero.feature3': 'Prywatne Rozwiązanie',
    'hero.feature4': 'Alerty Ruchu + Nagrywanie',

    // Services
    'services.title': 'Usługi i Ceny',
    'services.subtitle': 'Jednorazowa opłata $777 obejmuje dwa osobiste spotkania w Chicago, IL. Pierwsze spotkanie obejmuje konsultację i mapę pokrycia; drugie to wsparcie instalacji po otrzymaniu zamówienia z Amazon.',
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
    'about.para1': 'Dostarczamy doskonałe, prywatne bezpieczeństwo dostosowane do Twojej nieruchomości — bez nadmiaru. Jesteśmy dwoma współzałożycielami: Twój agent sprzedaży chodzi po okolicy, aby znaleźć ludzi, którzy chcą lepszego bezpieczeństwa, a zamykający zajmuje się szczegółami i finalizuje transakcję.',
    'about.para2': 'Jeszcze nie mamy licencji; działamy z kompleksową umową, która chroni obie strony. W przypadku naruszenia bezpieczeństwa, zapewniamy długoterminowe wsparcie email i opcjonalne usługi, takie jak ekstrakcja danych z nagrań, obrazy kompozytowe lub transkrypcje audio.',
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

    // FAQ
    'faq.title': 'Często Zadawane Pytania',
    'faq.subtitle': 'Wszystko, co musisz wiedzieć o naszych rozwiązaniach bezpieczeństwa w Chicagoland',
    'faq.question1': 'Które dzielnice Chicago obsługujecie?',
    'faq.answer1': 'Obsługujemy całe Chicagoland, w tym centrum Loop, Lincoln Park, Lakeview, Wicker Park, Logan Square, Hyde Park, Bronzeville i okoliczne przedmieścia takie jak Evanston, Oak Park, Naperville, Schaumburg i Arlington Heights. Jeśli jesteś w promieniu 50 mil od centrum Chicago, cię obejmujemy.',
    'faq.question2': 'Co wyróżnia wasz system bezpieczeństwa od Ring lub ADT?',
    'faq.answer2': 'W przeciwieństwie do Ring (który dzieli się danymi z policją) lub ADT (droga opłata miesięczna), OBSCURA zapewnia całkowitą prywatność - twoje nagrania należą tylko do ciebie. Oferujemy jednorazową opłatę $777 bez subskrypcji, ekstremalnie HD kamery z podczerwienią nocną i spersonalizowaną konsultację dla konkretnego układu twojej nieruchomości.',
    'faq.question3': 'Jak dokładnie działa usługa za $777?',
    'faq.answer3': '$777 obejmuje wszystko: początkową konsultację osobistą w twojej nieruchomości w Chicago, spersonalizowany plan rozmieszczenia kamer, listę zakupów Amazon z dokładnym sprzętem, drugą wizytę na wsparcie instalacji i dożywotnie wsparcie email. Brak ukrytych opłat, brak miesięcznych opłat, nigdy.',
    'faq.question4': 'Czy potrzebuję pozwoleń na kamery bezpieczeństwa w Chicago?',
    'faq.answer4': 'W Chicago generalnie nie potrzebujesz pozwoleń na kamery bezpieczeństwa w domu na własnej nieruchomości. Jednak kamery nie powinny wskazywać bezpośrednio na prywatne obszary sąsiadów. Pomożemy ci umieścić kamery legalnie i skutecznie podczas konsultacji.',
    'faq.question5': 'Co się dzieje podczas chicagowskich zim? Czy kamery nadal będą działać?',
    'faq.answer5': 'Tak, absolutnie. Sprzęt, który polecamy, jest odporny na warunki atmosferyczne i oceniany na chicagowskie surowe zimy (-40°F do 140°F). Testowaliśmy te systemy przez wiele chicagowskich zim ze śniegiem, lodem i ekstremalnymi zmianami temperatury.',
    'faq.question6': 'Jak prywatne są moje nagrania bezpieczeństwa?',
    'faq.answer6': 'Całkowicie prywatne. W przeciwieństwie do innych usług, OBSCURA nigdy nie uzyskuje dostępu do twoich nagrań. Twoje nagrania pozostają na twojej nieruchomości w lokalnym przechowywaniu. Władze mogą tylko prosić o nagrania przez odpowiednie kanały prawne - nie mamy dostępu do ich automatycznego udostępniania.',
    'faq.question7': 'Czy możecie pomóc z bezpieczeństwem mieszkania/condo w Chicago?',
    'faq.answer7': 'Tak, specjalizujemy się w bezpieczeństwie mieszkań i condo w Chicago. Będziemy współpracować z zarządem twojego budynku i pomożemy ci poruszać się po zasadach HOA. Wielu chicagowskich najemców i właścicieli condo używa naszej usługi do kamer dzwonkowych, kamer balkonowych i monitorowania wewnętrznego.',
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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (saved) setLangState(saved)
    } catch {}
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
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