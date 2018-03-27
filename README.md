# Vuexl
* State: 👌 done
> vuex local management module\
> vuex 로컬 관리 모듈
## Feature
### Vuexl helpers
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import {setLocalStore, mapLocalActions} from './'
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
      })
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
    mutations: {
      increase(state) {
        state.value += 1
      }
    }
  } // store
))
```
### Vuexl decorators
```typescript
import {Component, Prop, Vue} from 'vue-property-decorator'
import {LocalAction, LocalStore, LocalState, LocalMutaion, LocalGetter} from './'
@Component
export default class VuexlComponent extends  Vue {
  @LocalState value: number
  @LocalGetter opposite: number
  @LocalMutaion('increase') mutIncrease: () => void
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
- localName
>in case of having localName
```javascript
const store = {
  // ... something
  localName: {
    // ... your local store be here
  }
}
```
> not having localName
```javascript
const store = {
  // ... something
  // ... your local store be here
}
```
> way to use
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import Vuexl from './'
Vue.use(Vuex)
// you don't need ues this if you don't want any options
Vue.use(Vuexl, {localName: 'myLocalName'})
```
