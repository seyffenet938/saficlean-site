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
    ]
  },
}

export default nextConfig
