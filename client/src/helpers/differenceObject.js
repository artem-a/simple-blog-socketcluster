import transform from 'lodash.transform'
import isEqual from 'lodash.isequal'
import isObject from 'lodash.isobject'

/**
 *  Deep difference between two object
 *  @param  {Object} object Object compared
 *  @param  {Object} base   Object to compare with
 *  @return {Object}        Return a new object who represent the difference
 */
export default function differenceObject (object, base) {
  const changes = (obj, base) => {
    return transform(obj, (result, val, key) => {
      const baseVal = base[key]

      if (!isEqual(val, baseVal)) {
        result[key] = (isObject(val) && isObject(baseVal))
          ? changes(val, baseVal)
          : val
      }
    })
  }

  return changes(object, base)
}
