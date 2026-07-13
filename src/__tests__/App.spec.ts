import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import router from '../router'

describe('App', () => {
  beforeEach(() => {
    router.push('/')
    return router.isReady()
  })

  it('renders the start screen at the root route', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    await router.isReady()
    expect(wrapper.text()).toContain('Take the quiz')
  })
})
