import {forEach} from 'lodash'
import {
  localActionFactory, localGetterFactory, localMutationFactory, localStateFactory,
} from './decorators'
import {ILocalStoreOptions} from './type'
import {setModule} from './util'

// eslint-disable-next-line func-style
function mapFactory(maps, runner) {
  const result = {}
  forEach(maps, (map, key) => {
    result[key] = runner(key, map)
  })
  return result
}
// tslint:disable-next-line: only-arrow-functions
export const mapLocalActions = function(maps: any) {
  return mapFactory(maps, localActionFactory)
}

// tslint:disable-next-line: only-arrow-functions
export const mapLocalGetters = function(maps: any) {
  return mapFactory(maps, localGetterFactory)
}

// tslint:disable-next-line: only-arrow-functions
export const mapLocalMutations = function(maps: any) {
  return mapFactory(maps, localMutationFactory)
}

// tslint:disable-next-line: only-arrow-functions
export const mapLocalState = function(maps: any) {
  return mapFactory(maps, localStateFactory)
}

export const setLocalStore = (
  targetVue: any, store: any, options: ILocalStoreOptions = {},
): any => {
  return {
    extends: targetVue,
    beforeCreate() {
      const {name} = options
      setModule.call(this, store, name, options)
    },
  }
}
