// @ts-check
export default class AuthFormat {
  /**
     * Auth format by API response
     * @param {string} id User identification
     * @param {string} name User name
     * @param {string} token User token
     */
  constructor (id, name, token) {
    this.id = id
    this.name = name
    this.token = token
  }
}
