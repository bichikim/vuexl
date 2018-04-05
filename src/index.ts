import {isFunction} from 'lodash'
import Vue from 'vue'
import {LocalAction, LocalGetter, LocalMutation, LocalState, LocalStore} from './decorators'
import {
  mapLocalActions, mapLocalGetters, mapLocalMutations, mapLocalState, setLocalStore,
} from './map-helper'
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
import {
  findLocalStoreName,
  getChannelName,
  getNameSpace,
  sConnectedLocalStoreName,
  setModule,
  sIsSharedLocalStore,
  sLocalStoreChannelName,
  sLocalStoreName,
} from './util'
export {sLocalStoreName, sLocalStoreChannelName, sConnectedLocalStoreName}
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

let _Vue: Vue
// noinspection JSUnusedGlobalSymbols
export default {
  install(vue, options: IPluginOptions = {}) {
    const {name} = options
    if(_Vue){
      throw new Error('[Vuexl install] already installed')
    }
    _Vue = vue
    vue.prototype[sLocalStoreChannelName] = name
    vue.mixin({
      created() {
        const {$options: {localStore}, $store} = this
        if(!isFunction(localStore) || !$store){return}
        const data: ISetStateResult = localStore.call(this)
        setModule(this, data.store, data.name, data.options)
      },
      beforeDestroy() {
        const {$store} = this
        const localName: string = this[sLocalStoreName]
        const isSharedLocalStore: boolean = this[sIsSharedLocalStore]
        if(!$store || !localName || isSharedLocalStore){return}
        const localStoreName: string = findLocalStoreName(this)
        const localStoreChannelName: string = getChannelName(this)
        $store.unregister(getNameSpace(localStoreName, localStoreChannelName))
      },
    })
  },
}
