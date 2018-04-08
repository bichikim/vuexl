# Vuexl
* State: 👌 done
> vuex local management module\
> vuex 로컬 관리 모듈
## Feature
### Vuexl helpers
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import {setLocalStore, mapLocalActions, mapLocalGetters, mapLocalState, mapLocalMutations} from './'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {}
})
const component = new Vue(setLocalStore(
  {
    store,
    methods: {
      ...mapLocalActions({
        increase: 'increase'
      }),
      ...mapLocalMutations({
        mIncrease: 'increase'
      }),
    },
    computed: {
      ...mapLocalGetters({
        oValue: 'oppositeValue'
      }),
      ...mapLocalState({
        value: 'value'
      }),
    }
  }, // vue
  {
    state: {
      value: 1,
    },
    actions: {
      increase({commit}) {
        commit('increase')
      }
    },
    getters: {
      oppositeValue(state){
        return state.value * -1
      }
    },
    mutations: {
      increase(state) {
        state.value += 1
      }
    }
  } // store
))
```
### Vuexl helpers
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import Vuexl, {setLocalStore, mapLocalActions, mapLocalGetters, mapLocalState, mapLocalMutations} from './src'
Vue.use(Vuex)
Vue.use(Vuexl)
const store = new Vuex.Store({
  state: {}
})
const component = new Vue({
  store,
  localStore() {
    return {
      store: {
        state: {
          value: 1,
        },
        actions: {
          increase({commit}) {
            commit('increase')
          }
        },
        getters: {
          oppositeValue(state){
            return state.value * -1
          }
        },
        mutations: {
          increase(state) {
            state.value += 1
          }
        }
      }
    }
  },
  methods: {
    ...mapLocalActions({
      increase: 'increase'
    }),
    ...mapLocalMutations({
      mIncrease: 'increase'
    }),
  },
  computed: {
    ...mapLocalGetters({
      oValue: 'oppositeValue'
    }),
    ...mapLocalState({
      value: 'value'
    }),
  }
})
```
### Vuexl decorators
```typescript
import Vue from 'vue'
import Vuex from 'vuex'
import Vuexl, {LocalAction, LocalStore, LocalState, LocalMutation, LocalGetter} from './src'
import {Component, Prop} from 'vue-property-decorator'
Vue.use(Vuex)
Vue.use(Vuexl)
@Component
export default class VuexlComponent extends Vue {
  @LocalState value: number
  @LocalGetter opposite: number
  @LocalMutation('increase') mutIncrease: () => void
  @LocalAction increase: () => void
  @LocalStore({
     state: {value: 1},
     getters: {
       opposite(state) {
         return state.value * -1
       }
     },
     actions: {
       increase({commit}){
         commit('increase')
       }
     },
     mutations: {
       increase(state){
         state.value += 1
       }
     }
  }) VuexlName: string
}
```
### Options
#### Options.name
>in case of having local root name
> way to use
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import Vuexl from './src'
Vue.use(Vuex)
Vue.use(Vuexl, {name: 'myLocalName'})
```
