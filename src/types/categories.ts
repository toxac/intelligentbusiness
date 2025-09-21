
export type AutomationCategory = Record<string, string[]>;

export const automationCategories: AutomationCategory = {
  'sales-marketing': [
    'lead-management',
    'customer-communication',
    'content-social-media',
    'data-synchronization',
    'post-purchase'
  ],
  'operations-it': [
    'internal-workflow',
    'data-reporting',
    'system-monitoring',
    'document-processing'
  ],
  'customer-service': [
    'ticket-management',
    'customer-feedback',
    'chatbot-ai-support',
    'alerts-notifications'
  ],
  'hr-finance': [
    'hr-processes',
    'financial-processes',
    'payroll'
  ],
  'ai-intelligent': [
    'content-generation',
    'sentiment-analysis',
    'document-classification',
    'data-enrichment'
  ]
};