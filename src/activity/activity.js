class ActivityC {
  /**
     * Model of Activity
     * @param {string} id
     * @param {string} icon
     * @param {string} title
     * @param {string} startTime
     * @param {number} durationTime
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

module.exports = ActivityC
