/**
 * @type {import('next').NextConfig}
 */
const config = {
  output: 'export',
  // Only for local env testing, Not Suppoted at export mode
  // Config nginx to implement this
  // redirects: async () => {
  //   return [{
  //     source: '/',
  //     destination: '/en',
  //     permanent: true
  //   }];
  // },
}

export default config