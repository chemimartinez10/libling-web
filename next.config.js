/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true,
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
