import {cloneDeep, isNil} from 'lodash'
import {Module, Store} from 'vuex'
import {getNameSpace} from './module'
import {sLocalStoreCounter, sLocalStoreStatus} from './symbols'
import {ILocalStoreOptions, ISetModuleNameOptions, IStoreVue} from './type'
import {getChannelName, getLocalStoreName, getLocalStoreState} from './util'
const INIT_NUMBER = 0
export const getNameNumber = (
  vm: IStoreVue<any>,
  name: string,
  amount: number = 1,
): number => {
  const localStoreCounter = vm[sLocalStoreCounter]
  if(isNil(localStoreCounter[name])){
    localStoreCounter[name] = INIT_NUMBER
    return INIT_NUMBER
  }
  localStoreCounter[name] += amount
  return localStoreCounter[name]
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
    // just counting
    getNameNumber(vm, myLocalStoreName)
    return myLocalStoreName
  }
  return `${myLocalStoreName}${numberingSeparator}${getNameNumber(vm, myLocalStoreName)}`
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

export const registerLocal = (
  vm: IStoreVue<any>,
  store: Module<any, any>,
  localStoreName: string,
  options: ISetModuleNameOptions,
): void => {
  // $isServer is for Nuxt.
  const {$store = null, $isServer = false} = vm
  // isServer checking is for Nuxt
  if(!$store || $isServer){return}
  const localChannelName: string | undefined = getChannelName(vm)
  const localName: string = getName(vm, localStoreName, options)
  // confirm root store has module for localChannelName
  confirmChannel(vm, localChannelName)
  // save local store status to use
  vm[sLocalStoreStatus] = {
    ...options,
    name: localStoreName,
    localName,
    localConnectedName: null,
    localNameCounters: null,
  } as ILocalStoreOptions
  // if already store has module skip creating module
  if(isLocalStore($store, localName, localChannelName)){return}
  // creating module
  $store.registerModule(
    localChannelName ? [localChannelName, localName] : [localName],
    {
      ...cloneDeep(store),
      // force to be namespaced module
      namespaced: true,
    },
  )
}

export const unregisterLocal = (vm: IStoreVue<any>) => {
  const {$store, $isServer} = vm
  const localStoreStatus = getLocalStoreState(vm)
  const {localName, isUsingSameStore, name} = localStoreStatus
  if(!$store || !$isServer || !localName){return}
  const decrease = -1
  const count: number = getNameNumber(vm, name, decrease)
  if(!isUsingSameStore || count < 0){
    const localStoreName: string = getLocalStoreName(vm)
    const localStoreChannelName: string = getChannelName(vm)
    $store.unregisterModule(getNameSpace(localStoreName, localStoreChannelName))
  }
}
