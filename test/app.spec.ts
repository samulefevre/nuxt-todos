import { describe, expect, test } from 'vitest';
import { UNotifications } from '#components';

import { shallowMount } from '@vue/test-utils';
import App from '@/app.vue';

describe('test app.vue', () => {
    test('app.vue should contain UNotifications', () => {
        const wrapper = shallowMount(App);
        expect(wrapper.findComponent(UNotifications).exists()).toBe(true); // got error : defineComponent is not a function
    })
});
