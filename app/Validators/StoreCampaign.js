'use strict'

class StoreCampaign {
  get rules () {
    return {
      // validation rules
      title: 'required|string|unique:campaigns,title',
      description: 'required|string',
      conversion_goal: 'required|string',
      categories: 'required|array',
      url: "required|string",
      countries: 'required|array',
      devices: 'required|array',
      commision: 'required',
      cap: 'required'
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return {
      'title.required': 'You must provide a title.',
      'title.string': 'Title must be string.',
      'title.unique': 'This title is already taken.',
      'description.required': 'You must provide a description.',
      'description.string': 'Description must be text.',
      'conversion_goal.required': 'You must provide a conversion goal.',
      'conversion_goal.string': 'Conversion goal must be string.',
      'categories.required': 'You must provide some categories.',
      'categories.array': 'Categories must be a array.',
      'url.required': 'You must provide a url.',
      'url.string': 'URL must be string.',
      'countries.required': 'You must provide some countries.',
      'countries.array': 'Countries must be a array.',
      'devices.required': 'You must provide some devices.',
      'devices.array': 'Select some devices.',
      'commision.required': 'You must provide a commision.',
      'cap.required': 'You must provide a cap.',
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = StoreCampaign
