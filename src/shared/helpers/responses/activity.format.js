// @ts-check
export default class ActivityFormat {
  /**
     * Auth Success format by API response
     * @param {string} id User identification
     * @param {string} name User name
     * @param {string} token User token
     */

  /**
   * Activity format by API response
   * @param {*} id Activity identification
   * @param {*} icon Activity icon
   * @param {*} title Activity title
   * @param {*} startTime Activity start time (XX:XX) 24h
   * @param {*} durationTime Activity duration (mins)
   * @param {*} user Owner user identification
   */
  constructor (id, icon, title, startTime, durationTime, user) {
    this.id = id
    this.icon = icon
    this.title = title
    this.startTime = startTime
    this.durationTime = durationTime
    this.user = user
  }
}
