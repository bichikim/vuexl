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
    value: getLocalMutationGetter(getter),
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
    get: getLocalGetterGetter(getter),
  })
})
