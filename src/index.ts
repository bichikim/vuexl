import {LocalAction, LocalGetter, LocalMutation, LocalState, LocalStore} from './decorators'
import {
  mapLocalActions, mapLocalGetters, mapLocalMutations, mapLocalState, setLocalStore,
} from './map-helper'
import {ILocalStoreOptions} from './type'
export const sLocalStore = Symbol('localStoreName')
export const sConnectedLocalStoreName = Symbol('connectedLocalStoreName')
export const sLocalStoreChannelName = Symbol('localStoreChannel')
export {LocalState, LocalMutation, LocalAction, LocalStore, LocalGetter}
export {mapLocalState, mapLocalMutations, mapLocalGetters, mapLocalActions, setLocalStore}
export {ILocalStoreOptions}

// noinspection JSUnusedGlobalSymbols
export default {
  install(vue, {localName = null} = {}) {
    vue.prototype[sLocalStoreChannelName] = localName
  },
}
