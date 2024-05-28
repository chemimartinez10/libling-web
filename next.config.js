/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: false,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'libling-assets.s3.eu-west-2.amazonaws.com',
              port: '',
            },
          ],
    }
}


module.exports = nextConfig
