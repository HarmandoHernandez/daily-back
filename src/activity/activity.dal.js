// @ts-check
const Activity = require('./activity.model')

class ActivityDAL {
  async getOneById (id) {
    return await Activity.findById(id)
    /* const query = { estado: true }
      Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite)) */
  }

  async createOne (activityData) {
    const newAvtivity = new Activity(activityData)
    return await newAvtivity.save()
  }

  async updateOne (activityData) {
    return await Activity.findByIdAndUpdate(activityData.id, activityData, { new: true })
  }

  async deleteOne (id) {
    return await Activity.findByIdAndDelete(id)
  }
}

module.exports = ActivityDAL
