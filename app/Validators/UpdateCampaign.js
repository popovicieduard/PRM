'use strict'

class UpdateCampaign {
  get rules () {

    const campaignId = this.ctx.params.campaignId

    return {
      // validation rules
      'form.title': `required|string|unique:campaigns,title,id,${campaignId}`,
      'form.description': 'required|string',
      'form.conversion_goal': 'required|string',
      'form.categories': 'required|array',
      'form.url': "required|string",
      'form.countries': 'required|array',
      'form.devices': 'required|array',
      'form.commision': 'required',
      'form.cap': 'required'
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return {
      'form.title.required': 'You must provide a title.',
      'form.title.string': 'Title must be string.',
      'form.title.unique': 'This title is already taken.',
      'form.description.required': 'You must provide a description.',
      'form.description.string': 'Description must be text.',
      'form.conversion_goal.required': 'You must provide a conversion goal.',
      'form.conversion_goal.string': 'Conversion goal must be string.',
      'form.categories.required': 'You must provide some categories.',
      'form.categories.array': 'Categories must be a array.',
      'form.url.required': 'You must provide a url.',
      'form.url.string': 'URL must be string.',
      'form.countries.required': 'You must provide some countries.',
      'form.countries.array': 'Countries must be a array.',
      'form.devices.required': 'You must provide some devices.',
      'form.devices.array': 'Select some devices.',
      'form.commision.required': 'You must provide a commision.',
      'form.cap.required': 'You must provide a cap.',
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = UpdateCampaign
