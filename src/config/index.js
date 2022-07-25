const dev = process.env.NODE_ENV !== "production"

export const server = dev
  ? "https://nest-nextjs.vercel.app"
  : "https://nest-nextjs.vercel.app"
