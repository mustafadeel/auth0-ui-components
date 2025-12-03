import { z } from 'zod';

import { type InvitationCreateSchemas } from './invitation-create-schema-types';

/**
 * Helper to merge schema field config with defaults
 */
const mergeFieldConfig = <T extends keyof InvitationCreateSchemas>(
  schema: InvitationCreateSchemas | undefined,
  field: T,
  defaultError: string,
) => {
  const fieldConfig = schema?.[field];
  return fieldConfig
    ? {
        ...fieldConfig,
        errorMessage: fieldConfig.errorMessage || defaultError,
      }
    : {
        errorMessage: defaultError,
      };
};

/**
 * Creates a schema for invitation create form validation
 * @param options - Schema configuration options
 * @param defaultEmailErrorMessage - Default error message for email validation failures
 */
export const createInvitationCreateSchema = (
  options: InvitationCreateSchemas = {},
  defaultEmailErrorMessage = 'Please enter a valid email address',
) => {
  const emailConfig = mergeFieldConfig(options, 'email', defaultEmailErrorMessage);

  return z.object({
    invitee_email: z.string().email(emailConfig.errorMessage).min(1, emailConfig.errorMessage),
    roles: z.array(z.string()).optional(),
    send_invitation_email: z.boolean().optional().default(true),
  });
};

/**
 * Default schema for invitation create form validation
 */
export const invitationCreateSchema = createInvitationCreateSchema();

/**
 * Type for invitation create form data
 */
export type InternalInvitationCreateFormValues = z.infer<typeof invitationCreateSchema>;
