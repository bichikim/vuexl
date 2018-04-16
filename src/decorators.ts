import {isFunction, isString} from 'lodash'
import {
  getLocalActionGetter,
  getLocalGetterGetter,
  getLocalMutationGetter,
  getLocalStateGetter,
  getStateGetter,
} from './module'
import {
  ISetModuleNameOptions,
  TDecoratorFactoryRunner,
} from './type'

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
export function decoratorFactory(runner: TDecoratorFactoryRunner): any {
  // tslint:disable-next-line
  return function(option: any, _key?, ...others) {
    let myOptions, myOthers
    // tslint:disable-next-line
    const setDecorator = function(target: any, key: string | symbol) {
      return runner.call(this, target, key, myOptions, ...myOthers)
    }
    if(!isString(option) && !isFunction(option)){
      return setDecorator(option, _key)
    }
    myOptions = option
    myOthers = [_key].concat(others)
    return setDecorator
  }
}

// tslint:disable-next-line
export const LocalState = decoratorFactory(function(target, key, option) {
  const getter: any = option? option: key
  Object.defineProperty(target, key, {
    get: getLocalStateGetter(getter),
  })
})

// tslint:disable-next-line
export const State = decoratorFactory(function(target, key, option, namespace) {
  const getter: any = option? option: key
  Object.defineProperty(target, key, {
    get: getStateGetter(getter, namespace, false),
  })
})

// tslint:disable-next-line
export const LocalMutation = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    value: getLocalMutationGetter(getter),
  })
})

// tslint:disable-next-line
export const LocalAction = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    value: getLocalActionGetter(getter),
  })
})

// tslint:disable-next-line
export const LocalGetter = decoratorFactory(function(target, key, option) {
  const getter: any = option? option : key
  Object.defineProperty(target, key, {
    get: getLocalGetterGetter(getter),
  })
})
