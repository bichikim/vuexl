import {cloneDeep, isNil} from 'lodash'
import {sConnectedLocalStoreName, sLocalStore, sLocalStoreChannelName} from './index'

const nameCounter = {}

export const getName = function(key, isKeyName, isNumbering) {
  const {$options: {name = 'unknown'} = {}} = this
  let myName = isKeyName && key ? key : name
  if(isNumbering){
    let nameNumber = nameCounter[myName]
    if(isNil(nameNumber)){
      nameCounter[myName] = 0
      nameNumber = 0
    }else{
      nameCounter[myName] += 1
    }
    myName = `${myName}-${nameNumber}`
  }
  return myName
}

export const setModule = function(store, key, options) {
  const $store = this.$store
  if(!$store || this.$isServer){return}
  const {isKeyName = true, share = false} = options
  const name = getName.call(this, key, isKeyName, !share)
  const channelName = this[sLocalStoreChannelName]
  if(channelName && !$store.state[channelName]){
    $store.registerModule(channelName, {
      namespaced: true,
    })
  }
  this[sLocalStore] = name
  const {state} = $store
  const localState = channelName ? state[channelName][name] : state[name]
  if(localState){return}
  $store.registerModule(channelName ? [channelName, name]: name, {
    ...cloneDeep(store),
    namespaced: true,
  })
}

export const findLocalStoreName = (vue: any): string => {
  if(!vue){return}
  const connectedLocalStoreName = vue[sConnectedLocalStoreName]
  if(connectedLocalStoreName){
    return connectedLocalStoreName
  }
  let currentVue = vue
  while(currentVue){
    const {$parent} = currentVue
    const localStoreName = currentVue[sLocalStore]
    if(localStoreName){
      vue[sConnectedLocalStoreName] = localStoreName
      return localStoreName
    }
    if($parent){
      currentVue = $parent
    }else{
      throw new Error('[Vuexl findLocalStoreName] cannot find a local store name')
    }
  }
}
