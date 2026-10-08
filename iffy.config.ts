import { z } from 'zod'
import { env } from './lib/env'

export const baseModelSchema = z.object({
    overrideApiKey: z.string().optional(),
    overrideBaseURL: z.string().url().optional(),
})

export const iffyConfigSchema = z.object({
    moderationModel: baseModelSchema,
    judgeModel: baseModelSchema,
})

export type BaseModel = z.infer<typeof baseModelSchema>
export type IffyConfig = z.infer<typeof iffyConfigSchema>


const rawConfig = {
    moderationModel: {
        overrideApiKey: env.OPENAI_API_KEY,
        overrideBaseURL: undefined,
    },
    judgeModel: {
        overrideApiKey: undefined,
        overrideBaseURL: undefined,
    },
}

export const config = iffyConfigSchema.parse(rawConfig)