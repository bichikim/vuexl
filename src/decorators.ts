import {isFunction, isString} from 'lodash'
import {ISetModuleNameOptions} from './type'
import {
  getLocalActionGetter,
  getLocalGetterGetter,
  getLocalMutationGetter,
  getLocalStateGetter,
  setModule,
} from './util'

// eslint-disable-next-line func-style
export function LocalStore(
  _store: any,
  options: ISetModuleNameOptions = {},
  ): any {
  // tslint:disable-next-line
  return function(target: any, key: string) {
    const targetBeforeCreate = target.beforeCreate
    Object.defineProperty(target, 'beforeCreate', {
      // tslint:disable-next-line
      value: function() {
        setModule(this, _store, key, options)
        if(isFunction(targetBeforeCreate)){
          targetBeforeCreate.call(target)
        }
      },
    })
  }
}

// eslint-disable-next-line func-style
export function decoratorFactory(runner): any {
  // tslint:disable-next-line
  return function(option: any, _key?) {
    // tslint:disable-next-line
    const setDecorator = function(target: any, key: string | symbol) {
      return runner.call(this, target, key, option)
    }
    if(!isString(option) && !isFunction(option)){
      setDecorator(option, _key)
    }
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
    get: getLocalStateGetter(this, getter),
  })
})

// tslint:disable-next-line
export const LocalMutation = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    value: getLocalMutationGetter(this, getter)
  })
})

// tslint:disable-next-line
export const LocalAction = decoratorFactory(function(target, key, option) {
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    value: getLocalActionGetter(this, option),
  })
})

// tslint:disable-next-line
export const LocalGetter = decoratorFactory(function(target, key, option) {
  Object.defineProperty(target, key, {
    // tslint:disable-next-line
    get: getLocalGetterGetter(this, option)
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
