/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true,
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
