// Publications, grouped by type. Each item: authors, year, title, venue,
// an optional `status` (Accepted / Under Review / Submitted), and an optional
// `href` (DOI / preprint). Add a `[DOI]` link later by filling in `href`.

export const AUTHOR = 'Chakraborty, A.'

export const publicationGroups = [
  {
    heading: 'Peer-Reviewed Journal Articles',
    items: [
      {
        authors:
          'Mallik, S., Chakraborty, A., Podder, K., Talukdar, S., Rahman, A., & Mishra, U.',
        year: '2025',
        title:
          'Enhancing Soil Moisture Prediction with Explainable AI: Integrating IoT and Multi-Sensor Remote Sensing Data through Soft Computing',
        venue: 'Applied Soft Computing',
        href: 'https://doi.org/10.1016/j.asoc.2025.113406',
      },
      {
        authors:
          'Mallik, S., Das, S., Chakraborty, A., Mishra, U., Talukdar, S., Bera, S., & Ramana, G. V.',
        year: '2023',
        title:
          'Prediction of non-carcinogenic health risk using Hybrid Monte Carlo–machine learning approach',
        venue: 'Human and Ecological Risk Assessment',
        href: 'https://doi.org/10.1080/10807039.2023.2188417',
      },
      {
        authors: 'Mallik, S., Chakraborty, A., Mishra, U., & Paul, N.',
        year: '2022',
        title:
          'Prediction of irrigation water suitability using geospatial computing approach: a case study of Agartala city, India',
        venue: 'Environmental Science and Pollution Research',
        href: 'https://doi.org/10.1007/s11356-022-21232-8',
      },
    ],
  },
  {
    heading: 'Peer-Reviewed Conference Proceedings',
    items: [
      {
        authors: 'Sarawagi, A.*, Chakraborty, A.*, & Upadhyaya, S. A.',
        year: '2026',
        title:
          'Sharpening Precipitation Nowcasts with Deep Learning: Architecture-Dependent Effects of Loss Functions',
        venue:
          'NeurIPS 2026 · Tackling Climate Change with Machine Learning Workshop',
        status: 'Accepted',
        note: '*Equal contribution (co-first authors)',
        // href: 'https://www.climatechange.ai/events/neurips2026',
      },
      {
        authors: 'Chakraborty, A., Arulraj, M., & Upadhyaya, S.',
        year: '2026',
        title:
          'Performance Assessment of GPM IMERG Products Using a Multi-Triplet Collocation Approach',
        venue: '2026 IEEE International Geoscience and Remote Sensing Symposium (IGARSS)',
        status: 'Accepted',
      },
      {
        authors: 'Chakraborty, A., Pol, U., & Upadhyaya, S.',
        year: '2026',
        title:
          'Observational Evidence of Microphysical and Structural Variability in Monsoon Precipitation Under Contrasting Aerosol Conditions',
        venue: '2026 IEEE India Geoscience and Remote Sensing Symposium (InGARSS)',
        status: 'Accepted',
      },
      {
        authors:
          'Kumar, B., Chakraborty, A., Upase, Y., Khadagaraj, S., Das, S., & Upadhyaya, S.',
        year: '2026',
        title:
          'Can Spatial Context from Satellite Observations Improve Local Rain Gauge Precipitation Nowcasting?',
        venue: '2026 IEEE India Geoscience and Remote Sensing Symposium (InGARSS)',
        status: 'Accepted',
      },
      {
        authors: 'Baghel, A., Jha, U., Upase, Y., Chakraborty, A., & Upadhyaya, S.',
        year: '2025',
        title: 'Flash Drought Forecasting for Central India Using Long Short-Term Memory',
        venue: '2025 IEEE India Geoscience and Remote Sensing Symposium (InGARSS)',
        href: 'https://doi.org/10.1109/InGARSS67683.2025.11583970',
      },
      {
        authors: 'Chakraborty, A., Kumar, B., & Upadhyaya, S.',
        year: '2024',
        title:
          'Predicting and Mapping Flood Susceptibility: Leveraging Explainable AI and GIS Techniques',
        venue: '2024 IEEE India Geoscience and Remote Sensing Symposium (InGARSS)',
        href: 'https://doi.org/10.1109/InGARSS61818.2024.10984094',
      },
      {
        authors: 'Atheeswaran, B., Jain, S., Chakraborty, A., & Upadhyaya, S.',
        year: '2024',
        title: 'Enhancing River Discharge Forecasting With Multivariate LSTM',
        venue: '2024 IEEE India Geoscience and Remote Sensing Symposium (InGARSS)',
        href: 'https://doi.org/10.1109/InGARSS61818.2024.10984172',
      },
    ],
  },
  {
    heading: 'Under Review / Submitted',
    items: [
      {
        authors:
          'Chakraborty, A., Upase, Y., Upadhyaya, S., Arulraj, M., & Emmanuel-Kirstetter, P.',
        year: '2025',
        title:
          'Performance of GSMaP-ISRO Across Indian Climate Zones: A Novel Multi-Triplet Collocation Approach',
        venue: 'Submitted to Journal of Hydrology · Preprint on SSRN (ID: 5917277)',
        status: 'Under Review',
        href: 'https://dx.doi.org/10.2139/ssrn.5917277',
      },
      {
        authors: 'Chakraborty, A., & Upadhyaya, S.',
        year: '2026',
        title:
          'Untangling Aerosol–Precipitation Susceptibility Through Thermodynamic Regimes Over the South Asian Monsoon',
        venue: '2026 AGU Annual Meeting',
        status: 'Submitted',
      },
    ],
  },
]

// Flattened list + a count of published items (no pending status) for the
// Home highlights strip.
export const publications = publicationGroups.flatMap((g) => g.items)
export const publishedCount = publications.filter((p) => !p.status).length
