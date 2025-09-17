import type { CollectionConfig, Field } from 'mzinga/types'

import type { SanitizedStripeConfig } from '../types'

import { LinkToDoc } from '../ui/LinkToDoc'

interface Args {
  collection: CollectionConfig
  stripeConfig: SanitizedStripeConfig
  syncConfig: {
    stripeResourceType: string
  }
}

export const getFields = ({ collection, stripeConfig, syncConfig }: Args): Field[] => {
  const stripeIDField: Field = {
    name: 'stripeID',
    type: 'text',
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    label: 'Stripe ID',
    saveToJWT: true,
  }

  const skipSyncField: Field = {
    name: 'skipSync',
    type: 'checkbox',
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    label: 'Skip Sync',
  }

  const docUrlField: Field = {
    name: 'docUrl',
    type: 'ui',
    admin: {
      components: {
        Field: (args) =>
          LinkToDoc({
            ...args,
            isTestKey: stripeConfig.isTestKey,
            nameOfIDField: 'stripeID',
            stripeResourceType: syncConfig.stripeResourceType,
          }),
      },
      position: 'sidebar',
    },
  }

  const fields = [...collection.fields, stripeIDField, skipSyncField, docUrlField]

  return fields
}
