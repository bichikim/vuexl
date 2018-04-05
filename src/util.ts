import {cloneDeep, isFunction, isNil, isString} from 'lodash'
import {Module, Store} from 'vuex'
import {
  INameCounter,
  ISetModuleNameOptions,
  IStoreVue,
  TActionGetter,
  TMutationGetter,
  TStateGetter,
} from './type'
export const sLocalStoreName =  Symbol('localStoreName')
export const sLocalStoreChannelName = Symbol('localStoreChannel')
export const sConnectedLocalStoreName = Symbol('connectedLocalStoreName')
const INIT_NUMBER = 0, MAP_STATE = 'mapState', MAP_MUTATIONS = 'mapMutations'
const MAP_ACTIONS = 'mapActions'
const nameCounter: INameCounter = {}

export const getChannelName = (vm: IStoreVue<any>): string | undefined => {
  return vm[sLocalStoreChannelName]
}

export const getNameNumber = (name): number => {
  let myNumber: number = nameCounter[name]
  if(isNil(myNumber)){
    nameCounter[name] = INIT_NUMBER
    return INIT_NUMBER
  }
  myNumber += 1
  nameCounter[name] = myNumber
  return myNumber
}

export const getName = (
  vm: IStoreVue<any>,
  localStoreName?: string,
  options: ISetModuleNameOptions = {},
): string => {
  const {$options: {name = 'unknown'} = {}} = vm
  const {
    isUsingName = true,
    isUsingSameStore = false,
    numberingSeparator = '-',
  } = options
  const myLocalStoreName = localStoreName &&
  isUsingName ? localStoreName : name
  if(isUsingSameStore){
    return myLocalStoreName
  }
  return `${myLocalStoreName}${numberingSeparator}${getNameNumber(myLocalStoreName)}`
}

const confirmChannel = (vm: IStoreVue<any>, name?: string): void => {
  const {$store} = vm
  if(name && !$store.state[name]){
    $store.registerModule(name, {
      namespaced: true,
    })
  }
}

const isLocalStore = (store: Store<any>, localName: string, channelName?: string): boolean => {
  const {state} = store
  return Boolean(channelName ? state[channelName][name] : state[name])

}

export const setModule = (
  vm: IStoreVue<any>,
  store: Module<any, any>,
  localStoreName: string,
  options: ISetModuleNameOptions,
): void => {
  // $isServer is for Nuxt
  const {$store = null, $isServer = false} = vm
  if(!$store || $isServer){return}
  const localChannelName: string | undefined = getChannelName(vm)
  const localName: string = getName(vm, localStoreName, options)
  // k
  confirmChannel(vm, localChannelName)
  vm[sLocalStoreName] = localName
  if(isLocalStore($store, localName, localChannelName)){return}
  $store.registerModule(
    localChannelName ? [localChannelName, localName]: [localName],
    {
    ...cloneDeep(store),
    namespaced: true,
  })
}

export const findLocalStoreName = (vm: IStoreVue<any>): string => {
  if(!vm){return}
  const connectedLocalStoreName = getChannelName(vm)
  if(connectedLocalStoreName){
    return connectedLocalStoreName
  }
  let currentVm = vm
  let localStoreName
  while(currentVm){
    localStoreName = currentVm[sLocalStoreName]
    if(localStoreName){
      vm[sConnectedLocalStoreName] = localStoreName
      return localStoreName
    }
    currentVm = currentVm.$parent
  }
  throw new Error('[Vuexl findLocalStoreName] cannot find a local store name')
}

export const getModuleByNameSpace = (store: any, type, namespace) => {
  const module = store._modulesNamespaceMap[type]
  if(module){
    throw new Error(`[Vuexl getModuleByNameSpace] cannot fine in ${type}(): ${namespace}`)
  }
  return module
}

export const getNameSpace = (localStoreName: string, localStoreChannelName?: string) => {
  return localStoreChannelName ?
    `${localStoreChannelName}/${localStoreName}` : localStoreName
}

export const getLocalStateGetter = (vm: IStoreVue<any>, getter?: TStateGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function() {
    const {$isServer, $store} = vm
    if(!$store || !$isServer || !getter){return}
    const localStoreName: string = findLocalStoreName(vm)
    const localStoreChannelName: string = getChannelName(vm)
    const module = getModuleByNameSpace(
      $store,
      MAP_STATE,
      getNameSpace(localStoreName, localStoreChannelName),
      )
    const {state, getters} = module.context
    if(isFunction(getter)){
      return getter.call(vm, state, getters)
    }
    if(isString(getter)){
      return state[getter]
    }
    return null
  }
}

export const getLocalMutationGetter = (vm: IStoreVue<any>, getter?: TMutationGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(...args: any[]) {
    const {$isServer, $store} = vm
    if(!$store || !$isServer || !getter){return}
    const localStoreName: string = findLocalStoreName(vm)
    const localStoreChannelName: string = getChannelName(vm)
    const module = getModuleByNameSpace(
      $store,
      MAP_MUTATIONS,
      getNameSpace(localStoreName, localStoreChannelName),
    )
    const {commit} = module.context
    if(isFunction(getter)){
      return getter.apply(vm, [commit, ...args])
    }
    return commit.apply($store, [getter, ...args])
  }
}

export const getLocalGetterGetter = (vm: IStoreVue<any>, getter?: TActionGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function() {
    const {$isServer, $store} = vm
    if(!$store || $isServer || !getter){return}
    const localStoreName: string = findLocalStoreName(vm)
    const localStoreChannelName: string = getChannelName(vm)
    const {getters} = $store
    const name = `${getNameSpace(localStoreName, localStoreChannelName)}/${getter}`
    return getters[name]
  }
}

export const getLocalActionGetter = (vm: IStoreVue<any>, getter?: TActionGetter) => {
  // tslint:disable-next-line: only-arrow-functions
  return function(...args: any[]) {
    const {$isServer, $store} = vm
    if(!$store || $isServer || !getter){return}
    const localStoreName: string = findLocalStoreName(vm)
    const localStoreChannelName: string = getChannelName(vm)
    const module = getModuleByNameSpace(
      $store,
      MAP_ACTIONS,
      getNameSpace(localStoreName, localStoreChannelName),
    )
    const {dispatch} = module.context
    if(isFunction(getter)){
      return getter.apply(vm, [dispatch, ...args])
    }
    return dispatch.apply(vm, [getter, ...args])
  }
}
