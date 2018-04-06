import {isFunction, isString} from 'lodash'
import {
  getLocalActionGetter,
  getLocalGetterGetter,
  getLocalMutationGetter,
  getLocalStateGetter,
} from './module'
import {ISetModuleNameOptions} from './type'

// eslint-disable-next-line func-style
export function LocalStore(
  _store: any,
  options: ISetModuleNameOptions = {},
  ): any {
  // tslint:disable-next-line
  return function(target: any, key: string) {
    if(target.localStore){
      throw new Error('[vuexl] omg')
    }
    Object.defineProperty(target, '$localStore', {
      // tslint:disable-next-line
      value: function() {
        return {
          name: key,
          store: _store,
          options,
        }
      },
    })
  }
}

// eslint-disable-next-line func-style
export function decoratorFactory(runner): any {
  // tslint:disable-next-line
  return function(option: any, _key?) {
    let myOptions
    // tslint:disable-next-line
    const setDecorator = function(target: any, key: string | symbol) {
      return runner.call(this, target, key, myOptions)
    }
    if(!isString(option) && !isFunction(option)){
      return setDecorator(option, _key)
    }
    myOptions = option
    return setDecorator
  }
}

// tslint:disable-next-line
export const LocalState = decoratorFactory(function(target, key, option) {
  const getter: any = option? option: key
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    enumerable: true,
    configurable: true,
    get: getLocalStateGetter(getter),
  })
})

// tslint:disable-next-line
export const LocalMutation = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    value: getLocalMutationGetter(getter)
  })
})

// tslint:disable-next-line
export const LocalAction = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    value: getLocalActionGetter(getter),
  })
})

// tslint:disable-next-line
export const LocalGetter = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    get: getLocalGetterGetter(getter)
  })
})

// eslint-disable-next-line func-style
// export function localStateFactory(key, map) {
//   return function() {
//     if(this.$isServer){return null}
//     const $store = this.$store
//     const localName: string = findLocalStoreName(this)
//     const channelName: string = this[sLocalStoreChannelName]
//     const localState = channelName ?
//       $store.state[channelName][localName] : $store.state[localName]
//     if(isFunction(map)){
//       return map(localState)
//     }else if(isString(map) && isObject(localState)){
//       return localState[map]
//     }else if(isObject(localState)){
//       return localState[key]
//     }
//     return null
//   }
// }

// eslint-disable-next-line func-style
// export function localMutationFactory(key, map) {
//   return function(...args) {
//     if(this.$isServer){return null}
//     const name: string = findLocalStoreName(this)
//     let mutationName: string = map
//     if(!isString(map)){
//       mutationName = key
//     }
//     const localName: string = [name, mutationName].join('/')
//     const channelName = this[sLocalStoreChannelName]
//     const path = channelName ? `${channelName}/${localName}` : localName
//     this.$store.commit(path, ...args)
//   }
// }

// eslint-disable-next-line func-style
// export function localActionFactory(key, map) {
//   return function(...args) {
//     if(this.$isServer){return null}
//     const name: string = findLocalStoreName(this)
//     let actionName: string = map
//     if(!isString(map)){
//       actionName = key
//     }
//     const localName: string = [name, actionName].join('/')
//     const channelName = this[sLocalStoreChannelName]
//     const path = channelName ? `${channelName}/${localName}` : localName
//     return this.$store.dispatch(path, ...args)
//   }
// }

// eslint-disable-next-line func-style
// export function localGetterFactory(key, map) {
//   return function() {
//     if(this.$isServer){return null}
//     const name: string = findLocalStoreName(this)
//     let getterName: string = map
//     if(!isString(map)){
//       getterName = key
//     }
//     const channelName = this[sLocalStoreChannelName]
//     const localName: string = [name, getterName].join('/')
//     const {getters} = this.$store
//     const path = channelName ? `${channelName}/${localName}` : localName
//     return getters[path]
//   }
// }
