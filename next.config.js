/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = nextTranslate({
  webpack: (config) => {
    return config;
  },
});
