// @ts-check

class ActivityFormat {
  /**
   * Activity format by API response
   * @param {string} icon Activity icon
   * @param {string} title Activity title
   * @param {string} startTime Activity start time (XX:XX) 24h
   * @param {number} durationTime Activity duration (mins)
   * @param {string} user Owner user identification
   * @param {string} id Activity identification
   */
  constructor (icon, title, startTime, durationTime, user = null, id = null) {
    this.icon = icon
    this.title = title
    this.startTime = startTime
    this.durationTime = durationTime
    this.user = user
    this.id = id
  }
}

module.exports = ActivityFormat
