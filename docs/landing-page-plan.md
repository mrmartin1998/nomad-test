# Landing Page Implementation Plan

## Nav Menu Updates

### 1. Update Existing Navbar (`src/components/Navbar.jsx`)
- [x] Replace current menu items with new structure
- [x] Update logo to Visapass logo
- [x] Modify container styling to match design

### 2. Navigation Items to Add
- [x] Implement "Obtener mi visa" dropdown with:
  - [x] ESTA Estados Unidos
  - [x] Visa Costa Rica
  - [x] Visa de turista de India
  - [x] Visa para Cuba
  - [x] Visa Reino Unido
  - [x] Visa Tailandia
  - [x] Visa Egipto

- [x] Add language selector (ES)
- [x] Add currency selector (€ EUR)
- [x] Add "Iniciar sesión" button

### 3. Note
- "Viaje con seguridad" section postponed until blog is more advanced

### 4. Implementation Steps
1. Logo Implementation:
   - [x] Add visapass logo SVG to public/assets
   - [x] Update logo component with proper sizing and link

2. Container Structure:
   - [x] Update navbar container to full width
   - [x] Add max-width container inside
   - [x] Implement flex layout for items

3. Navigation Items:
   - [x] Create "Obtener mi visa" dropdown component
   - [x] Style dropdown menu with proper spacing
   - [x] Add hover effects and transitions
   - [x] Implement "Viaje con seguridad" link (disabled for now)

4. Right Side Elements:
   - [x] Add language selector with ES option
   - [x] Add currency selector with EUR option
   - [x] Style selectors consistently
   - [x] Add login button with proper styling

5. Mobile Responsiveness:
   - [x] Create mobile menu trigger
   - [x] Style mobile dropdown
   - [x] Ensure proper stacking of items
   - [x] Test all breakpoints

6. Accessibility:
   - [x] Add proper ARIA labels
   - [ ] Ensure keyboard navigation
   - [ ] Test focus states
   - [ ] Verify screen reader compatibility

## Header Section Updates (`src/app/page.jsx`)

### 1. Update Hero Section
- [x] Modify existing hero section layout:
  ```jsx
  <div className="min-h-screen bg-base-100 relative overflow-hidden">
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-4xl mx-auto text-center">
  ```

### 2. Update Title and Subtitle
- [x] Update main heading text and styling:
  ```
  Consigue tu visado
  sin complicaciones, sin estrés,
  sin papeleos y en 48H
  ```
- [x] Style "sin papeleos y en 48H" in blue (text-primary) and italics
- [x] Update subtitle text and styling:
  ```
  Tramitamos visados de turismo, nómadas digitales, estudiantes y más.
  Servicio rápido, online y con asesoría personalizada.
  ```

### 3. Add Trust Indicators Grid
- [x] Create statistics grid with:
  - 1000+ clientes atendidos
  - Soporte rápido y personalizado
  - Valoración media: 4.8/5
  - Compromiso total
  - 99% visados aprobados

### 4. Add Expandable Trust Points
- [x] Create collapsible section with:
  - 1000+ clientes atendidos (🔒)
  - Soporte rápido y personalizado (💬)
  - Valoración media: 4.8/5 (⭐)
  - Compromiso total (🤝)
  - 99% de visados aprobados (✅)
- [x] Add supporting text under each point

## Destination Selector Section

### 1. Create Selector Component
- [ ] Add destination selector with:
  ```
  ¿De dónde soy?     ¿A dónde viajo?     [¡Comenzar ahora! →]
  [Australia ↓]      [Viaje a ↓]         [Button]
  ```
- [ ] Style with light blue background and rounded corners
- [ ] Add country flag icons for origin selector
- [ ] Implement dropdown functionality for both selectors

### 2. Styling Requirements
- [ ] Use consistent spacing between elements
- [ ] Add hover states for dropdowns and button
- [ ] Ensure mobile responsiveness
- [ ] Match the turquoise color for the CTA button

## Why Choose Us Section

### 1. Section Layout
- [ ] Add "Por qué elegirnos" heading
- [ ] Add descriptive subtext:
  ```
  Estos son los motivos por los cuales iVisa es la mejor opción
  para ti y por qué deberías probar nuestros servicios.
  ```
- [ ] Add featured image of traveler boarding plane

### 2. Feature Cards
- [ ] Create 4-card grid with:
  1. Sencillez
     - Icon: ⌛
     - Text: "Nuestro proceso es mucho más sencillo y ágil que el del gobierno."
  
  2. Seguro
     - Icon: 🛡️
     - Text: "Your security is our priority."
  
  3. Orientación al éxito
     - Icon: ✅
     - Text: "El 99% de nuestras solicitudes son aprobadas."
  
  4. Compromiso
     - Icon: 💬
     - Text: "Estamos aquí para ayudarte 24/7."

### 3. Card Styling
- [ ] Use light blue background for cards
- [ ] Add subtle hover effects
- [ ] Ensure consistent spacing and alignment
- [ ] Make cards responsive on mobile

## Application Process Section

### 1. Section Header
- [ ] Add main heading "Nuestro proceso de aplicación"
- [ ] Add subtitle: "Te explicamos cómo solicitar los diferentes documentos de viaje con nosotros."

### 2. Process Steps
- [ ] Create numbered steps layout:
  1. Inicia tu solicitud
     - Number: 01
     - Text: "Responde algunas preguntas, realiza el pago y completa los detalles finales."

  2. Nosotros nos encargamos del resto
     - Number: 02
     - Text: "Recibe tu documento por correo electrónico. En caso necesites una cita en la embajada, nos encargaremos de agendarla por ti."

  3. ¡Disfruta de tu viaje!
     - Number: 03
     - Text: "Prepárate para mostrar tu pasaporte y tus documentos cuando llegues a tu destino."

### 3. Visual Elements
- [ ] Add traveler image on boat in turquoise waters
- [ ] Add professional woman with phone image
- [ ] Style step numbers with light background circles
- [ ] Add "Aplica ahora →" button at the bottom

### 4. Layout Requirements
- [ ] Ensure proper spacing between steps
- [ ] Make layout responsive for mobile devices
- [ ] Implement smooth transitions between sections
- [ ] Use consistent typography with other sections

## Testimonials Section

### 1. Section Header
- [ ] Add main heading "Testimonios y casos reales"
- [ ] Add subtitle: "Experiencias de personas que confiaron en nosotros"

### 2. Testimonial Cards
- [ ] Create three testimonial cards with:
  1. Ana Martínez
     - Profile Image: 100x100 circular
     - Quote: "El proceso fue mucho más sencillo de lo que esperaba. En menos de una semana tenía mi visa aprobada."
  
  2. Carlos Ruiz
     - Profile Image: 100x100 circular
     - Quote: "Excelente asesoramiento durante todo el proceso. El equipo siempre estuvo disponible para resolver mis dudas."
  
  3. María González
     - Profile Image: 100x100 circular
     - Quote: "Como nómada digital, necesitaba un proceso rápido y sin complicaciones. ¡Lo conseguí!"

### 3. Card Design
- [ ] Style profile images with:
  - Blue circular border
  - White offset ring
  - Centered placement
- [ ] Format testimonial text in italics
- [ ] Add proper spacing between cards
- [ ] Implement responsive grid layout

### 4. Visual Requirements
- [ ] Ensure consistent card heights
- [ ] Add subtle shadows or elevation
- [ ] Maintain proper text alignment
- [ ] Use consistent font sizes for names and quotes

## Popular Destinations Section

### 1. Section Header
- [ ] Add main heading "Viaja por el mundo con iVisa"
- [ ] Add subtitle: "Descubre qué necesitas para viajar a nuestros destinos más populares."

### 2. Destination Cards
- [ ] Create grid of destination cards:
  1. Australia
     - Background: Sydney Opera House image
     - Stats: "+126,697 Visas procesadas"
     
  2. India
     - Background: Traditional architecture with water reflection
     - Stats: "+148,245 visas procesadas"
     
  3. Colombia
     - Background: Colorful street with umbrellas
     - Stats: "+31,546 visas procesadas"

### 3. Card Design
- [ ] Implement card layout with:
  - Full-width images
  - Dark overlay for text visibility
  - Country name prominently displayed
  - Stats with green icon and white text
- [ ] Add hover effects
- [ ] Ensure proper image sizing and cropping
- [ ] Maintain consistent card dimensions

### 4. Responsive Layout
- [ ] Grid layout adjusts based on screen size
- [ ] Images remain crisp on all devices
- [ ] Text remains readable on all backgrounds
- [ ] Proper spacing between cards

## Newsletter Section

### 1. Design Elements
- [ ] Add heading "¡Más viajes, menos dudas!"
- [ ] Add descriptive text: "Consejos prácticos, novedades y ofertas para que tu próximo viaje sea increíble"
- [ ] Create dark teal background section

### 2. Form Components
- [ ] Add email input field with placeholder
- [ ] Add "Quiero estar informado" button with plus icon
- [ ] Style input field with white background
- [ ] Style button with turquoise color

### 3. Layout Requirements
- [ ] Center content in container
- [ ] Proper spacing between elements
- [ ] Responsive design for mobile
- [ ] Ensure proper form validation

## Additional Elements

### 1. WhatsApp Chat Button
- [ ] Add floating WhatsApp button:
  - Position: Bottom left corner
  - Fixed position while scrolling
  - WhatsApp icon
  - Click to open chat functionality

### 2. Global Color Scheme Update
- [ ] Remove sand/beige color from the design
- [ ] Implement clean color palette:
  - Primary colors: White and Blue only
  - Remove any existing beige/sand tones
  - Ensure consistent color usage across all sections
  - Update any affected components or elements

### 3. Color Implementation Rules
- [ ] Audit all existing color usage
- [ ] Replace any non-white/blue colors
- [ ] Verify contrast ratios for accessibility
- [ ] Update hover states and interactions
- [ ] Ensure consistent shade usage across components
