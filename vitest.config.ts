import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
    // any custom vitest config you require
    // got error : TypeError: hasInjectionContext is not a function
    test: {
        environment: 'nuxt',
        /*  deps: {
             optimizer: {
                 web: {
                     include: [] //don't know what to put here to fix error : "deps.inline" is deprecated. If you rely on vite-node directly, use "server.deps.inline" instead. Otherwise, consider using "deps.optimizer.web.include"
                 }
             }
         } */
    }
})
