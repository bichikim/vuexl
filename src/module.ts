import {isArray, isFunction, isString, trimEnd} from 'lodash'
import {TActionGetter, TGetterGetter, TMutationGetter, TStateGetter} from './type'
import {getChannelName, getLocalStoreName} from './util'

export const getModuleByNameSpace = (store: any, namespace, separator = '/') => {
  const myNameSpace = trimEnd(namespace, separator) + separator
  const module = store._modulesNamespaceMap[myNameSpace]
  if(!module){
    throw new Error(`[Vuexl getModuleByNameSpace] cannot fine in ${namespace}`)
  }
  return module
}

export const getNameSpace = (vm: any, namespace: string | string[], isLocal: boolean = false) => {
  let myNameSpace
  if(isLocal){
    const localStoreName: string | undefined = getLocalStoreName(vm)
    if(!localStoreName){return}
    const localStoreChannelName: string = getChannelName(vm)
    myNameSpace = localStoreChannelName ?
      `${localStoreChannelName}/${localStoreName}` : localStoreName
  }else if(isArray(namespace)){
    myNameSpace = namespace.join('/')
  }else{
    myNameSpace = namespace
  }
  return myNameSpace
}

export const getStateGetter = (
  getter?: TStateGetter,
  namespace?: string | string[],
  isLocal: boolean = false,
) => {
  return function() {
    const {$store, $isServer} = this
    if(!$store || $isServer || !getter){return}
    const module = getModuleByNameSpace($store, getNameSpace(this, namespace, isLocal))
    const {state, getters} = module.context
    if(!state){return}
    if(isFunction(getter)){
      return getter.call(this, state, getters)
    }
    if(isString(getter)){
      return state[getter]
    }
  }
}

export const getLocalStateGetter = (getter?: TStateGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return getStateGetter(getter, null, true)
}

export const getMutationGetter = (
  getter?: TMutationGetter,
  namespace?: string | string[],
  isLocal: boolean = false,
) => {
  return function(...args: any[]) {
    const {$store, $isServer} = this
    if(!$store || $isServer || !getter){return}
    const module = getModuleByNameSpace($store, getNameSpace(this, namespace, isLocal))
    const {commit} = module.context
    if(isFunction(getter)){
      return getter.apply(this, [commit, ...args])
    }
    return commit.apply($store, [getter, ...args])
  }
}

export const getLocalMutationGetter = (getter?: TMutationGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return getMutationGetter(getter, null, true)
}

export const getGetterGetter = (
  getter?: TGetterGetter,
  namespace?: string | string[],
  isLocal: boolean = false,
) => {
  return function() {
    const {$store, $isServer} = this
    if(!$store || $isServer || !getter){return}
    return $store.getters[
      `${getNameSpace(this, namespace, isLocal)}/${getter}`
      ]
  }
}

export const getLocalGetterGetter = (getter?: TGetterGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return getGetterGetter(getter, null, true)
}

export const getActionGetter = (
  getter?: TActionGetter,
  namespace?: string | string[],
  isLocal: boolean = false,
) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(...args: any[]) {
    const {$store, $isServer} = this
    if(!$store || $isServer || !getter){return}
    const module = getModuleByNameSpace($store, getNameSpace(this, namespace, isLocal))
    const {dispatch} = module.context
    if(isFunction(getter)){
      return getter.apply(this, [dispatch, ...args])
    }
    return dispatch.apply(this, [getter, ...args])
  }
}

export const getLocalActionGetter = (getter?: TActionGetter) => {
  return getActionGetter(getter, null, true)
}
