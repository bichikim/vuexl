import {sLocalStoreChannelName, sLocalStoreStatus} from './symbols'
import {IStoreVue} from './type'
export const getChannelName = (vm: IStoreVue<any>): string | undefined => {
  return vm[sLocalStoreChannelName]
}

export const getLocalStoreState = (vm: IStoreVue<any>) => {
  return vm[sLocalStoreStatus] || {}
}

export const getLocalStoreName = (vm: IStoreVue<any>): string | undefined => {
  if(!vm){return}
  // if already it has connected LocalName
  let localStoreStatus = vm[sLocalStoreStatus]
  if(!localStoreStatus){
    localStoreStatus = {}
    vm[sLocalStoreStatus] = localStoreStatus
  }
  const connectedLocalStoreName = localStoreStatus.localConnectedName
  if(connectedLocalStoreName){
    return connectedLocalStoreName
  }
  // start upper search til getting localName
  let currentVm = vm
  let localStatus
  while(currentVm){
    localStatus = currentVm[sLocalStoreStatus]
    if(!localStatus){
      localStatus = {}
      currentVm[sLocalStoreStatus] = localStatus
    }
    const {localName = null} = localStatus
    if(localName){
      // save connected name for performance to find name again
      vm[sLocalStoreStatus].localConnectedName = localName
      return localName
    }
    currentVm = currentVm.$parent
  }
  // if cannot find any local Store throw Error because vm won't work without local store
}
