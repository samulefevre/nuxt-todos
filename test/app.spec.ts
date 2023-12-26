import { describe, expect, it, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import App from '@/app.vue'

import { UNotifications, NuxtPage } from '#components'

describe('test app.vue', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = shallowMount(App)
    })

    it('should contain NuxtPage', () => {
        expect(wrapper.findComponent(NuxtPage).exists()).toBe(true)
    })

    it('should contain UNotifications', () => {
        expect(wrapper.findComponent(UNotifications).exists()).toBe(true)
    })
})
