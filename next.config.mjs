/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      // /chaises n'a jamais existé comme page : les chaises vivent dans la
      // grille /tarifs. L'URL circulait quand même (ancien lien de pied de
      // page, corrigé le 06/08) et renvoyait un 404 remonté par Search
      // Console. Redirection permanente plutôt qu'attendre que Google
      // oublie l'URL de lui-même.
      // permanent: true => 308, que Google traite comme un 301.
      {
        source: "/chaises",
        destination: "/tarifs#chaises",
        permanent: true,
      },

      // ── Anciennes URL de l'époque v0 ────────────────────────────────
      // Search Console les connaît encore et les recrawle : /services
      // (mars 2026), /nettoyage-canape (mars), /privacy-policy (avril),
      // /contact (avril), /deviscontact (avril). Elles renvoient 404
      // depuis la refonte d'août — un 404 fait perdre le visiteur ET le
      // signal accumulé. Les sœurs évidentes sont incluses : si v0 avait
      // /nettoyage-canape, il avait très probablement les autres, et
      // Seyffe n'a collé qu'un extrait du rapport.
      { source: "/services", destination: "/tarifs", permanent: true },
      { source: "/contact", destination: "/reserver", permanent: true },
      { source: "/deviscontact", destination: "/reserver", permanent: true },
      { source: "/devis", destination: "/reserver", permanent: true },
      { source: "/reservation", destination: "/reserver", permanent: true },
      { source: "/privacy-policy", destination: "/politique-confidentialite", permanent: true },
      { source: "/privacy", destination: "/politique-confidentialite", permanent: true },
      { source: "/mentions", destination: "/mentions-legales", permanent: true },
      { source: "/nettoyage-canape", destination: "/canape", permanent: true },
      { source: "/nettoyage-matelas", destination: "/matelas", permanent: true },
      { source: "/nettoyage-tapis", destination: "/tapis", permanent: true },
      { source: "/nettoyage-moquette", destination: "/moquette", permanent: true },
      { source: "/nettoyage-auto", destination: "/auto", permanent: true },
      { source: "/tarif", destination: "/tarifs", permanent: true },
      { source: "/prix", destination: "/tarifs", permanent: true },
    ]
  },
}

export default nextConfig
