'use strict'

const Hash = use('Hash')

const PartnerHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} partnerInstance
 *
 * @return {void}
 */
PartnerHook.hashPassword = async (partnerInstance) => {
  if (partnerInstance.password) {
    partnerInstance.password = await Hash.make(partnerInstance.password)
  }
}
