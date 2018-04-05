import {forEach} from 'lodash'
import {ISetLocalStoreOptions} from './type'
import {
  getLocalActionGetter,
  getLocalGetterGetter,
  getLocalMutationGetter,
  getLocalStateGetter,
  setModule,
} from './util'

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
  return mapFactory(maps, getLocalActionGetter)
}

// tslint:disable-next-line: only-arrow-functions
export const mapLocalGetters = function(maps: any) {
  return mapFactory(maps, getLocalGetterGetter)
}

// tslint:disable-next-line: only-arrow-functions
export const mapLocalMutations = function(maps: any) {
  return mapFactory(maps, getLocalMutationGetter)
}

// tslint:disable-next-line: only-arrow-functions
export const mapLocalState = function(maps: any) {
  return mapFactory(maps, getLocalStateGetter)
}

export const setLocalStore = (
  targetVue: any, store: any, options: ISetLocalStoreOptions = {},
): any => {
  return {
    extends: targetVue,
    beforeCreate() {
      const {name} = options
      setModule(this, store, name, options)
    },
  }
}
