// @ts-check

// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

class ActivityFormat {
  /**
   * Activity format by API response
   * @param {ObjectId} id Activity identification
   * @param {string} icon Activity icon
   * @param {string} title Activity title
   * @param {string} startTime Activity start time (XX:XX) 24h
   * @param {number} durationTime Activity duration (mins)
   * @param {ObjectId} user Owner user identification
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

module.exports = ActivityFormat
