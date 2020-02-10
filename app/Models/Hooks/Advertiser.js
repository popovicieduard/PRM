'use strict'

const Hash = use('Hash')

const AdvertiserHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} advertiserInstance
 *
 * @return {void}
 */
AdvertiserHook.hashPassword = async (advertiserInstance) => {
  if (advertiserInstance.password) {
    advertiserInstance.password = await Hash.make(advertiserInstance.password)
  }
}
