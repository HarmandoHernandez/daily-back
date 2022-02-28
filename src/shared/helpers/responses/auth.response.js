// @ts-check

// eslint-disable-next-line no-unused-vars
import AuthFormat from './auth.format'
import GeneralFormat from './general.format'
import STATUS from '../../enums/status.enum'

/**
 * Build Auth response
 * @param {AuthFormat} authData Auth data
 * @param {string} status Custom status of response
 * @returns {GeneralFormat} Auth response
 */
export default function getAuthResponse (authData, status = STATUS.SUCCESS) {
  return new GeneralFormat(status, authData)
}
