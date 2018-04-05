/**
 * @auther Bichi Kim <bichi@live.co.kr>
 */
import {getName} from './util'

describe('getName', () => {
  it('can get name without vmName options, localStoreName', () => {
    const vm = {}
    const myName = getName(vm)
    expect(myName).to.equal('unknown')
  })
  it('can get name with vmName but without options, localStoreName', () => {
    const vm = {
      $options: {
        name: 'myName',
      }
    }
    const myName = getName(vm)
    expect(myName).to.equal('myName-0')
  })
  it('can get name with localStoreName but without options', () => {
    const vm = {}
    const myName = getName(vm, 'myLocalName1')
    expect(myName).to.equal('myLocalName1-0')
  })
  it('can get name with options isUsingKeyName', () => {
    const vm = {
      $options: {
        name: 'myName1',
      }
    }
    const myName = getName(vm, 'myLocalName2', {
      isUsingName: false,
    })
    expect(myName).to.equal('myName1-0')
  })
  it('can get name with options isUsingSameStore', () => {
    const vm = {}
    const myName = getName(vm, 'myLocalName3', {
      isUsingSameStore: true,
    })
    expect(myName).to.equal(vm, 'myLocalName3')
  })
  it('can get name with options numberingSeparator', () => {
    const vm = {}
    const myName = getName(vm, 'myLocalName4', {
      numberingSeparator: '*'
    })
    expect(myName).to.equal(vm, 'myLocalName4*0')

  })
})
