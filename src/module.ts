import {isFunction, isString, trimEnd} from 'lodash'
import {TActionGetter, TMutationGetter, TStateGetter} from './type'
import {getChannelName, getLocalStoreName} from './util'

export const getModuleByNameSpace = (store: any, namespace, separator = '/') => {
  const myNameSpace = trimEnd(namespace, separator) + separator
  const module = store._modulesNamespaceMap[myNameSpace]
  if(!module){
    throw new Error(`[Vuexl getModuleByNameSpace] cannot fine in ${namespace}`)
  }
  return module
}

export const getNameSpace = (localStoreName: string, localStoreChannelName?: string) => {
  return localStoreChannelName ?
    `${localStoreChannelName}/${localStoreName}` : localStoreName
}

export const getLocalStateGetter = (getter?: TStateGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function() {
    const {$isServer, $store} = this
    if(!$store || $isServer || !getter){return}
    const localStoreName: string = getLocalStoreName(this)
    const localStoreChannelName: string = getChannelName(this)
    const module = getModuleByNameSpace(
      $store,
      getNameSpace(localStoreName, localStoreChannelName),
    )
    const {state, getters} = module.context
    if(isFunction(getter)){
      return getter.call(this, state, getters)
    }
    if(isString(getter)){
      return state[getter]
    }
    return null
  }
}

export const getLocalMutationGetter = (getter?: TMutationGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(...args: any[]) {
    const {$isServer, $store} = this
    if(!$store || $isServer || !getter){return}
    const localStoreName: string = getLocalStoreName(this)
    const localStoreChannelName: string = getChannelName(this)
    const module = getModuleByNameSpace(
      $store,
      getNameSpace(localStoreName, localStoreChannelName),
    )
    const {commit} = module.context
    if(isFunction(getter)){
      return getter.apply(this, [commit, ...args])
    }
    return commit.apply($store, [getter, ...args])
  }
}

export const getLocalGetterGetter = (getter?: TActionGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function() {
    const {$isServer, $store} = this
    if(!$store || $isServer || !getter){return}
    const localStoreName: string = getLocalStoreName(this)
    const localStoreChannelName: string = getChannelName(this)
    const {getters} = $store
    const name = `${getNameSpace(localStoreName, localStoreChannelName)}/${getter}`
    return getters[name]
  }
}

export const getLocalActionGetter = (getter?: TActionGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(...args: any[]) {
    const {$isServer, $store} = this
    if(!$store || $isServer || !getter){return}
    const localStoreName: string = getLocalStoreName(this)
    const localStoreChannelName: string = getChannelName(this)
    const module = getModuleByNameSpace(
      $store,
      getNameSpace(localStoreName, localStoreChannelName),
    )
    const {dispatch} = module.context
    if(isFunction(getter)){
      return getter.apply(this, [dispatch, ...args])
    }
    return dispatch.apply(this, [getter, ...args])
  }
}
