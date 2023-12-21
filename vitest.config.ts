import { defineVitestConfig } from '@nuxt/test-utils/config'



export default defineVitestConfig({
    // any custom vitest config you require
    // got error : TypeError: hasInjectionContext is not a function
    // configFile: 'nuxt.config.ts',
    test: {
        environment: 'nuxt',
        // add env file to test environment


        environmentOptions: {
            nuxt: {
                overrides: {
                    devtools: true,
                    modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxt/test-utils/module'],
                    runtimeConfig: {
                        public: {
                            baseUrl: process.env.BASE_URL || 'http://localhost:3000',
                        },
                    },
                    supabase: {
                        url: 'http://localhost:54321',
                        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
                        redirectOptions: {
                            login: '/login',
                            callback: '/confirm'
                        },

                    },
                },
            },
        },
    }
    /*  deps: {
         optimizer: {
             web: {
                 include: [] //don't know what to put here to fix error : "deps.inline" is deprecated. If you rely on vite-node directly, use "server.deps.inline" instead. Otherwise, consider using "deps.optimizer.web.include"
             }
         }
     } */
})

