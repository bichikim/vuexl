/* eslint-disable new-cap,no-magic-numbers,max-lines */
import {createLocalVue, mount, shallow} from '@vue/test-utils'
import {expect} from 'chai'
import {Component, Vue} from 'vue-property-decorator'
import Vuex from 'vuex'

import Vuexl, {
  Component as LComponent, LocalAction, LocalGetter, LocalMutation,
  LocalState, LocalStore, mapLocalActions, mapLocalGetters,
  mapLocalMutations, mapLocalState, setLocalStore,
  sLocalStoreStatus,
} from './index'

describe('vuexl', () => {
  let store
  let wrapper
  describe('vuexl: object way', () => {
    const makeComponent = (
      options: {name?, optionsName?, isUsingName?, isUsingSameStore?, localName?} = {},
    ) => {
      const localVue = createLocalVue()
      localVue.use(Vuex)
      localVue.use(Vuexl)
      const {name, optionsName, isUsingName, isUsingSameStore, localName} = options
      localVue.use(Vuexl, {localName})
      return shallow(setLocalStore(
        {
          name,
          store,
          template: '<div>~</div>',
          computed: {
            ...mapLocalState({
              value: (state) => (state.value),
            }),
            ...mapLocalGetters({
              opposite: 'opposite',
            }),
          },
          methods: {
            ...mapLocalMutations({
              increase: 'increase',
            }),
            ...mapLocalActions({
              increaseA: 'increase',
            }),
          },
        },
        {
          state: {
            value: 1,
          },
          mutations: {
            increase(state) {
              state.value += 1
            },
          },
          actions: {
            increase({commit}) {
              commit('increase')
            },
          },
          getters: {
            opposite(state) {
              return state.value * -1
            },
          },
        },
        {
          name: optionsName,
          isUsingName,
          isUsingSameStore,
        },
      ), {localVue})
    }
    beforeEach(() => {
      store = new Vuex.Store({
        state: {noValue: 2},
      })
    })
    it('can set LocalStore', () => {
      wrapper = makeComponent()
      expect(store.state['unknown-0']).to.be.an('object')
    })
    it('can set LocalStore: has component name', () => {
      wrapper = makeComponent({name: 'name'})
      expect(store.state['name-0']).to.be.an('object')
    })
    it('can set LocalStore: has name options', () => {
      wrapper = makeComponent({
        name: 'name',
        optionsName: 'option',
      })
      expect(store.state['option-0']).to.be.an('object')
    })
    it('can set LocalStore: force use component name', () => {
      wrapper = makeComponent({
        name: 'name',
        optionsName: 'option',
        isUsingName: false,
      })
      expect(store.state['name-0']).to.be.an('object')
    })
    it('can set LocalStore: use share localStore (no-numbering)', () => {
      wrapper = makeComponent({
        name: 'name',
        optionsName: 'option',
        isUsingName: false,
        isUsingSameStore: true,
      })
      expect(store.state.name).to.be.an('object')
    })
    it('can set LocalStore: localName option', () => {
      wrapper = makeComponent({
        name: 'name',
        optionsName: 'option',
        isUsingName: false,
        isUsingSameStore: true,
        localName: 'local',
      })
      expect(store.state.name).to.be.an('object')
    })
    it('can set State', () => {
      wrapper = makeComponent()
      expect(wrapper.vm.value).to.equal(1)
    })
    it('can set Mutation', () => {
      wrapper = makeComponent()
      wrapper.vm.increase()
      expect(wrapper.vm.value).to.equal(2)
    })

    it('can set Getter', () => {
      wrapper = makeComponent()
      expect(wrapper.vm.opposite).to.equal(-1)
    })

    it('can set Action', () => {
      wrapper = makeComponent()
      wrapper.vm.increaseA()
      expect(wrapper.vm.value).to.equal(2)
    })

    it('can destroy', () => {
      wrapper = makeComponent()
      expect(store.state['unknown-0']).to.be.a('object')
      wrapper.destroy()
      expect(store.state['unknown-0']).to.be.an('undefined')
    })
  })

  describe('vuexl: class way', () => {
    let store
    let localVue
    let wrapper, wrapper2, noDecWrapper
    beforeEach(() => {
      localVue = createLocalVue()
      localVue.use(Vuex)
      localVue.use(Vuexl)
      store = new Vuex.Store({
        state: {noValue: 1},
      })
    })
    const getWrapper = (options = {}) => {
      // tslint:disable-next-line: max-classes-per-file
      @Component({
        render(h) {
          return h('div')
        },
      })
        // eslint-disable-next-line no-unused-vars
      class ChildComponent extends Vue {
        @LocalState((state) => (state.value)) foo: number

        created() {
          this.$store = store
        }
      }
      // tslint:disable-next-line: max-classes-per-file
      @Component({
        render(h) {
          return h('div')
        },
      })
      class VueComponent extends Vue {
        @LocalState('value') foo: number

        @LocalMutation increase: () => void

        @LocalAction('increase') actionIncrease: () => void

        @LocalStore({
          state: {
            value: 1,
          },
          actions: {
            increase({commit}) {
              commit('increase')
            },
          },
          mutations: {
            increase(state) {
              state.value += 1
            },
          },
          getters: {
            opposite: (state) => {
              return state.value * -1
            },
          },
        }, options) vuexlTest: any
      }

      // tslint:disable-next-line: max-classes-per-file
      @LComponent({
        render(h) {
          return h('div')
        },
        localStore() {
          return {
            store: {
              state: {
                value: 1,
              },
            },
            name: 'vuexlTest',
          }
        },
      })
      class VueNoDecComponent extends Vue {
        @LocalState('value') foo: number
      }

      wrapper = shallow(VueComponent, {store, localVue})
      wrapper2 = shallow(VueComponent, {store, localVue})
      noDecWrapper = shallow(VueNoDecComponent, {store, localVue})
    }

    it('can set LocalStore', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(1)
      expect(wrapper.vm[sLocalStoreStatus].localName).to.equal('vuexlTest-0')
    })

    it('can set LocalStore: without decoration', () => {
      // tslint:disable-next-line: max-classes-per-file
      @LComponent({
        render(h) {
          return h('div')
        },
        localStore() {
          return {
            store: {
              state: {
                value: 1,
              },
            },
            name: 'vuexlTest',
          }
        },
      })
      class Vue2Component extends Vue {
        @LocalState('value') foo: number
      }

      const wrapper = shallow(Vue2Component, {store, localVue})

      expect(wrapper.vm.foo).to.equal(1)
      expect(wrapper.vm[sLocalStoreStatus].localName).to.equal('vuexlTest-0')
    })

    it('can set LocalStore: no use key name', () => {
      getWrapper({isUsingName: false})

      expect(wrapper.vm.foo).to.equal(1)
      expect(wrapper.vm[sLocalStoreStatus].localName).to.equal('VuexlComponent-0')
    })

    it('can set LocalStore: instances from same class use same Store', () => {
      getWrapper({isUsingSameStore: true})

      expect(wrapper.vm.foo).to.equal(3)
      expect(wrapper2.vm.foo).to.equal(3)
      expect(wrapper.vm[sLocalStoreStatus].localName).to.equal('vuexlTest')
    })

    it('can set LocalStore: instances from same class do not use same Store', () => {
      getWrapper({isUsingSameStore: false})

      expect(wrapper.vm.foo).to.equal(2)
      expect(wrapper2.vm.foo).to.equal(2)
      expect(wrapper.vm[sLocalStoreStatus].localName).to.equal('vuexlTest-0')
      expect(wrapper2.vm[sLocalStoreStatus].localName).to.equal('vuexlTest-1')
    })

    it('can decorate LocalState: key', () => {
      getWrapper()

      expect(wrapper.vm.value).to.equal(1)
    })

    it('can decorate LocalState: string', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(1)
    })

    it('can decorate LocalState: function', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(1)
    })

    it('can decorate LocalAction: key', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(2)
    })

    it('can decorate LocalAction: string', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(2)
    })

    it('can decorate LocalMutation: key', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(2)
    })

    it('can decorate LocalMutation: string', () => {
      getWrapper()

      expect(wrapper.vm.foo).to.equal(2)
    })

    it('can decorate LocalGetter: string', () => {
      getWrapper()

      expect(wrapper.vm.bar).to.equal(-1)
    })

    it('can decorate LocalGetter: key', () => {
      getWrapper()

      expect(wrapper.vm.ma).to.equal(-1)
    })
    it('can destroy', () => {
      // tslint:disable-next-line: max-classes-per-file
      @Component({
        render(h) {
          return h('div')
        },
      })
      class VuexlComponent extends Vue {
        @LocalState((state) => (state.value)) foo: number

        @LocalGetter ma: number

        @LocalStore({
          state: {
            value: 1,
          },
          getters: {
            ma: (state) => {
              return state.value * -1
            },
          },
        }) vuexlTest: string
      }

      const component = shallow(VuexlComponent, {store, localVue})
      const component2 = shallow(VuexlComponent, {store, localVue})
      expect(store.state['vuexlTest-0'].value).to.equal(1)
      expect(store.state['vuexlTest-1'].value).to.equal(1)
      component.destroy()
      expect(store.state['vuexlTest-0']).to.be.an('undefined')
      expect(store.state['vuexlTest-1'].value).to.equal(1)
      component2.destroy()
      expect(store.state['vuexlTest-1']).to.be.an('undefined')
    })

    it('can use parent store', () => {
      let child

      // tslint:disable-next-line: max-classes-per-file
      @Component({
        render(h) {
          return h('div')
        },
      })
        // eslint-disable-next-line no-unused-vars
      class ChildComponent extends Vue {
        @LocalState((state) => (state.value)) foo: number

        created() {
          this.$store = store
          // eslint-disable-next-line consistent-this
          child = this
        }
      }

      // tslint:disable-next-line: max-classes-per-file
      @Component({
        render(h) {
          return h(ChildComponent)
        },
      })
      class VuexlComponent extends Vue {
        @LocalState((state) => (state.value)) foo: number

        @LocalMutation increase: () => void

        @LocalStore({
          state: {
            value: 1,
          },
          getters: {
            ma: (state) => {
              return state.value * -1
            },
          },
          mutations: {
            increase(state) {
              state.value += 1
            },
          },
        }) vuexlTest: string
      }

      const component = mount(VuexlComponent, {store, localVue})
      component.vm.increase()
      // this test is not working need to find some solution
      expect(component.vm.foo).to.equal(2)
      expect(child.foo).to.equal(2)
    })
  })

  describe('vuexl with options: localName', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuexl, {name: 'local'})
    it('can set LocalStore', () => {
      // tslint:disable-next-line: max-classes-per-file
      @Component({
        render(h) {
          return h('div')
        },
      })
      class VuexlComponent extends Vue {
        @LocalState('value') foo: number

        @LocalStore({
          state: {
            value: 1,
          },
        }) vuexlLocalNameTest: string
      }

      const wrapper = shallow(VuexlComponent, {store, localVue})

      expect(wrapper.vm.foo).to.equal(1)
      expect(wrapper.vm.$store.state.local['vuexlLocalNameTest-0'].value).to.equal(1)
    })
  })
})
