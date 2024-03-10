/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: false,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'xvnsnvloru2qodmf.public.blob.vercel-storage.com',
              port: '',
            },
          ],
    }
}


module.exports = nextConfig
