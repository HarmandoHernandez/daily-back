// @ts-check
export default class ErrorFormat {
  /**
     * Custom Error format by API response
     * @param {string} error Element error type
     * @param {string} param The Element
     */
  constructor (error, param) {
    this.error = error
    this.param = param
  }
}
