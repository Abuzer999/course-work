export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-typed-router",
    "@prisma/nuxt",
    "@vee-validate/nuxt",
    "@nuxt/icon",
    "nuxt-auth-utils",
    'nuxt-file-storage',
  ],
  runtimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    NUXT_READ_WRITE_TOKEN: process.env.NUXT_READ_WRITE_TOKEN,
    public: {
      blobUrl: 'https://grqasdzxb2wnxxa9.public.blob.vercel-storage.com',
    },
  },
  image: {
    domains: [
      'avatars0.githubusercontent.com'
    ]
  },
  ssr: false,
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  prisma: {
    autoSetupPrisma: true,
  },
  experimental: {
    componentIslands: true,
  },
  fileStorage: {
    mount: process.env.MOUNT_PATH,
  },
  fonts: {
    families: [
      { name: "dm-sans", provider: "google" },
      { name: "monserrat", provider: "google" },
    ],
  },
  icon: {
    serverBundle: {
      collections: ["material-symbols"],
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
});
