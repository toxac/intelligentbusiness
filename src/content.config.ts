import { defineCollection, z } from "astro:content";

export const automationCategoryEnum = z.enum([
  'sales-marketing',
  'operations-it',
  'customer-service',
  'hr-finance',
  'ai-intelligent',
]);

export const automationTypeEnum = z.enum([
  'lead-management',
  'customer-communication',
  'content-social-media',
  'data-synchronization',
  'internal-workflow',
  'data-reporting',
  'system-monitoring',
  'document-processing',
  'ticket-management',
  'customer-feedback',
  'chatbot-ai-support',
  'alerts-notifications',
  'hr-processes',
  'financial-processes',
  'payroll',
  'content-generation',
  'sentiment-analysis',
  'document-classification',
  'data-enrichment',
  'post-purchase'
]);

const automationsCollection = defineCollection({
  type: 'content', // for MDX files
  schema: z.object({
    name: z.string(),
    category: automationCategoryEnum,
    types: automationTypeEnum.array().min(1),
    workflowFile: z.string().url().or(z.string().startsWith('/')),
    nodes: z.string().array(),
    triggerNode:z.string(),
    featured: z.boolean().default(false),
    createdAt: z.date().optional(),
    integrations: z.string().array().optional(),
  })
});

export const collections = {
  'automations': automationsCollection,
};