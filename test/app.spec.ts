import { describe, expect, test, beforeEach } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import App from '@/app.vue';

import { UNotifications, NuxtPage } from '#components';

describe('test app.vue', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = shallowMount(App);
    })

    test('app.vue should contain NuxtPage', () => {
        expect(wrapper.findComponent(NuxtPage).exists()).toBe(true);
    })

    test('app.vue should contain UNotifications', () => {
        expect(wrapper.findComponent(UNotifications).exists()).toBe(true);
    })
});
