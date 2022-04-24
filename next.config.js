/** @type {import('next').NextConfig} */

const path=require('path')
const fs=require('fs')

const envData= fs.readFileSync(path.join(__dirname, './env.json'),'utf-8')
console.log(JSON.parse(envData));

const nextConfig = {
  distDir: 'dist',
  publicRuntimeConfig: {
    ROOT:JSON.parse(envData)
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
}

module.exports = nextConfig
