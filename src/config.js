// This is written in this way because the build will turn the not used configuration to undefined
// Hiding in practice the configuration of dev to prod and viceversa

const config =
  process.env.REACT_APP_STAGE === 'dev'
    ? {
        // LOCAL
        // url: 'http://localhost:3000/dev/',
        // DEV
        url: 'https://api.github.com/search/users?q=location%3ABANGALORE&followers%3A%3E%3D1000&ref=searchresults&s=followers&type=Users',
      }
    : {
        url: 'http://localhost:3000/dev/',

      }

export default {
  ...config,
}
