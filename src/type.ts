import Vue from 'vue'
import {Commit, Store} from 'vuex'

export interface ISetModuleNameOptions {
  isUsingName?: boolean
  isUsingSameStore?: boolean
  numberingSeparator?: string
}

export interface ISetLocalStoreOptions extends ISetModuleNameOptions{
  name?: string
}

export interface ILocalStoreOptions extends ISetLocalStoreOptions{
  localName?: string,
  localConnectedName?: string,
}

export interface IStoreVue<S> extends Vue {
  $store: Store<S>
}

export interface INameCounter {
  [name: string]: number
}

export type TStateGetter = (state: any) => any | string

export type TMutationGetter = (commit: Commit, ...args: any[]) => any | string

export type TActionGetter = string

export type TGetterGetter = string

export interface IPluginOptions {
  name?: string
  isNuxt?: boolean
}

export interface ISetStateResult {
  store: Store<any>
  name?: string
  options?: ISetModuleNameOptions
}

export type TDecoratorFactoryRunner = (target: any, key: string, ...args: any[]) => void
