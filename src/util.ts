import {IStoreVue} from '@/type'
import {sLocalStoreChannelName, sLocalStoreStatus} from './symbols'
export const getChannelName = (vm: IStoreVue<any>): string | undefined => {
  return vm[sLocalStoreChannelName]
}

export const getLocalStoreState = (vm: IStoreVue<any>) => {
  return vm[sLocalStoreStatus] || {}
}

export const getLocalStoreName = (vm: IStoreVue<any>): string => {
  if(!vm){return}
  // if already it has connected LocalName
  const connectedLocalStoreName = vm[sLocalStoreStatus].localConnectedName
  if(connectedLocalStoreName){
    return connectedLocalStoreName
  }
  console.log('hello?')
  // start upper search til getting localName
  let currentVm = vm
  let localStoreName
  while(currentVm){
    localStoreName = currentVm[sLocalStoreStatus].localName
    if(localStoreName){
      // save connected name for performance to find name again
      vm[sLocalStoreStatus].localConnectedName = localStoreName
      console.log('i will return', localStoreName)
      return localStoreName
    }
    currentVm = currentVm.$parent
  }
  // if cannot find any local Store throw Error because vm won't work without local store
  throw new Error('[Vuexl findLocalStoreName] cannot find a local store name')
}
