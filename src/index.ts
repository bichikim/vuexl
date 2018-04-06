import {isFunction} from 'lodash'
import Vue, {ComponentOptions} from 'vue'
import vueComponent from 'vue-class-component'
import {Module} from 'vuex'
import {LocalAction, LocalGetter, LocalMutation, LocalState, LocalStore} from './decorators'
import {
  mapLocalActions, mapLocalGetters, mapLocalMutations, mapLocalState, setLocalStore,
} from './map-helper'
import {
  getLocalActionGetter,
  getLocalGetterGetter,
  getLocalMutationGetter,
  getLocalStateGetter,
  getModuleByNameSpace,
  getNameSpace,
} from './module'
import {registerLocal, unregisterLocal} from './register'
import {
  sLocalStoreChannelName,
  sLocalStoreCounter,
  sLocalStoreStatus,
} from './symbols'
import {
  INameCounter,
  IPluginOptions,
  ISetLocalStoreOptions,
  ISetModuleNameOptions,
  ISetStateResult,
  IStoreVue,
  TActionGetter,
  TGetterGetter,
  TMutationGetter,
  TStateGetter,
} from './type'
export {
  sLocalStoreStatus,
  sLocalStoreChannelName,
  sLocalStoreCounter,
}
export {
  INameCounter,
  IPluginOptions,
  ISetLocalStoreOptions,
  ISetModuleNameOptions,
  IStoreVue,
  TActionGetter,
  TGetterGetter,
  TMutationGetter,
  TStateGetter,
}
export {
  getNameSpace,
  getLocalMutationGetter,
  getLocalActionGetter,
  getLocalGetterGetter,
  getModuleByNameSpace,
  getLocalStateGetter,
}
export {
  LocalState,
  LocalMutation,
  LocalAction,
  LocalStore,
  LocalGetter,
}
export {
  mapLocalState,
  mapLocalMutations,
  mapLocalGetters,
  mapLocalActions,
  setLocalStore,
}

// let _Vue: Vue
// noinspection JSUnusedGlobalSymbols
export default {
  install(vue, options: IPluginOptions = {}) {
    const {name} = options
    // if(_Vue){
    //   throw new Error('[Vuexl install] already installed')
    // }
    // _Vue = vue
    vue.prototype[sLocalStoreChannelName] = name
    vue.prototype[sLocalStoreCounter] = {}
    vue.mixin({
      created() {
        const {$options: {localStore}, $localStore} = this
        const myLocalStore = localStore || $localStore
        if(!isFunction(myLocalStore)){return}
        const data: ISetStateResult = myLocalStore.call(this)
        registerLocal(this, data.store, data.name, data.options)
      },
      beforeDestroy() {
        unregisterLocal(this)
      },
    })
  },
}
interface IVuexlComponentOptions extends ComponentOptions<Vue>{
  localStore: () => {
    store: Module<any, any>,
    name?: string,
    options?: ISetLocalStoreOptions,
  }
}

// eslint-disable-next-line func-style
export function Component(options: IVuexlComponentOptions) {
  return vueComponent(options as ComponentOptions<Vue>)
}
