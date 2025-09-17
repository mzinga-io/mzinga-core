import type { CollectionBeforeChangeHook, CollectionConfig } from 'mzinga/types'

import { APIError } from 'mzinga/errors'
import Stripe from 'stripe'

import type { StripeConfig } from '../types'

import { deepen } from '../utilities/deepen'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeSecretKey || '', { apiVersion: '2022-08-01' })

type HookArgsWithCustomCollection = {
  collection: CollectionConfig
} & Omit<Parameters<CollectionBeforeChangeHook>[0], 'collection'>

export type CollectionBeforeChangeHookWithArgs = (
  args: {
    collection?: CollectionConfig
    stripeConfig?: StripeConfig
  } & HookArgsWithCustomCollection,
) => void

export const syncExistingWithStripe: CollectionBeforeChangeHookWithArgs = async (args) => {
  const { collection, data, operation, originalDoc, req, stripeConfig } = args

  const { logs, sync } = stripeConfig || {}

  const { payload } = req

  const { slug: collectionSlug } = collection || {}

  if (process.env.NODE_ENV !== 'test' && !data.skipSync) {
    const syncConfig = sync?.find((conf) => conf.collection === collectionSlug)

    if (syncConfig) {
      if (operation === 'update') {
        // combine all fields of this object and match their respective values within the document
        let syncedFields = syncConfig.fields.reduce((acc, field) => {
          const { fieldPath, stripeProperty } = field

          acc[stripeProperty] = data[fieldPath]
          return acc
        }, {} as Record<string, any>)

        syncedFields = deepen(syncedFields)

        if (logs)
          payload.logger.info(
            `A '${collectionSlug}' document has changed in Payload with ID: '${originalDoc?._id}', syncing with Stripe...`,
          )

        if (!data.stripeID) {
          // NOTE: the "beforeValidate" hook populates this
          if (logs) payload.logger.error(`- There is no Stripe ID for this document, skipping.`)
        } else {
          if (logs)
            payload.logger.info(`- Syncing to Stripe resource with ID: '${data.stripeID}'...`)

          try {
            const stripeResource = await stripe?.[syncConfig?.stripeResourceType]?.update(
              data.stripeID,
              syncedFields,
            )

            if (logs)
              payload.logger.info(
                `✅ Successfully synced Stripe resource with ID: '${stripeResource.id}'.`,
              )
          } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : error
            throw new APIError(`Failed to sync document with ID: '${data.id}' to Stripe: ${msg}`)
          }
        }
      }
    }
  }

  // Set back to 'false' so that all changes continue to sync to Stripe, see note in './createNewInStripe.ts'
  data.skipSync = false

  return data
}
