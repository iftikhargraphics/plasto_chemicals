/*
  PLASTO CHEMICALS — CLIENT CONFIGURATION
  Update this file when the client supplies the missing business information.
  Do not publish placeholder values as verified company facts.
*/
window.PLASTO_CONFIG = {
  companyName: 'Plasto Chemicals',
  email: 'anwarchemist@gmail.com',
  phones: [
    { label: 'Mobile', display: '0345 9075244', href: '+923459075244' },
    { label: 'Office', display: '091 2603255', href: '+92912603255' }
  ],
  whatsapp: '923459075244',
  // Add the verified address and Google Maps embed URL when provided.
  location: {
    address: '',
    mapsEmbedUrl: '',
    directionsUrl: ''
  },
  // Add only official, verified company profile URLs. Empty URLs stay hidden.
  socialLinks: [
    { platform: 'Facebook', url: '', enabled: true },
    { platform: 'Instagram', url: '', enabled: true },
    { platform: 'LinkedIn', url: '', enabled: true },
    { platform: 'YouTube', url: '', enabled: true },
    { platform: 'TikTok', url: '', enabled: true },
    { platform: 'X', url: '', enabled: true }
  ],
  leadership: [
    { name: 'Anwar Ul Haq', role: 'Chief Executive Officer', image: '', visible: true },
    { name: 'Director name to be provided', role: 'Director', image: '', visible: true },
    { name: 'Manager name to be provided', role: 'Manager', image: '', visible: true }
  ],
  // Replace "image" paths with real product photos when supplied.
  // Current URLs are temporary Unsplash placeholders so the image transitions are visible.
  products: [
    {
      name: 'Alton MF 183',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
      description: 'Water-based internal wetting/release agent for melamine, phenolic and urea resins. Improves resin absorption for fully saturated, smooth crease-free papers while preventing press encrustations and extending press life. Low foaming, free from ethoxylated nonylphenols.',
      applications: 'Melamine, phenolic and urea resin systems; décor-paper impregnation.'
    },
    {
      name: 'Alton HM 1010',
      image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80',
      description: 'Latent hardener for melamine-formaldehyde resins, especially suited for CPL and LPL processes. Does not form bubbles on films and maintains resin fluidity during pressing. Ensures uniform curing with controlled clouding time.',
      applications: 'Melamine-formaldehyde resins; CPL and LPL processes.'
    },
    {
      name: 'Alton HM 1448',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      description: 'Latent hardener for urea-formaldehyde resins offering excellent reactivity during polymerization and outstanding impregnation bath stability up to 35–40°C. Ideal for paper impregnation with all types of UF resins.',
      applications: 'Urea-formaldehyde resin systems; paper impregnation.'
    },
    {
      name: 'Alton ES 700',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
      description: 'Surface improver for impregnated paper that delivers a very smooth surface after drying while reducing dust. Added in the coating step to enhance surface quality and minimize dust-related issues.',
      applications: 'Coating step of impregnated decorative papers.'
    },
    {
      name: 'Alton ES 501',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
      description: 'Special additive to enhance the bright effect on melamine-impregnated papers. During lamination, temperature and pressure create a light-reflecting molecular structure for superior gloss and brightness. Dosage adjustable for desired effect.',
      applications: 'Melamine-impregnated decorative papers; LPL and HPL lamination.'
    },
    {
      name: 'Alton AT 837',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      description: 'Water-based antiblocking agent for melamine, phenolic and urea resins. Free from ethoxylated nonylphenols, waxes, fats and paraffins. Prevents sheet blocking from moisture absorption, improves oleo-hydro repellency and reduces resin migration to paper surface.',
      applications: 'Melamine, phenolic and urea resin systems; anti-blocking in impregnation lines.'
    }
  ]
};