import * as React from 'react';
import { useComponentConfig, useI18n } from '@/hooks';
import { useMfaList, useDeleteMfa, useEnrollMfa, useMfaAccessToken } from '../hooks';
import { Authenticator } from '../hooks/types';
import { MFAType, ManageMfaProps } from './types';
import { Badge } from '@/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { toast } from 'sonner';
import { Button } from '@/ui/button';

export function ManageMfa({
  localization = {},
  showTitleDescription = true,
  showActiveOnly = false,
  disableEnroll = false,
  disableDelete = false,
  readOnly = false,
  onEnroll,
  onDelete,
  onFetch,
  onErrorAction,
  onBeforeAction,
}: ManageMfaProps) {
  const {
    config: { authDetails },
  } = useComponentConfig();
  const { accessToken, error: tokenError, loading: tokenLoading } = useMfaAccessToken();
  const { title, description } = useI18n(localization) ?? {};

  // Fetch MFA factors list
  const {
    loading: factorsLoading,
    error: factorsError,
    factors,
  } = useMfaList(accessToken, showActiveOnly);

  // Delete MFA hook
  const {
    loading: deleting,
    error: deleteError,
    success: deleteSuccess,
    deleteMfa,
  } = useDeleteMfa(accessToken);

  // Enroll MFA hook
  const {
    loading: enrolling,
    error: enrollError,
    response: enrollResponse,
    enrollMfa,
  } = useEnrollMfa(accessToken);

  // Side effect: notify parent of factors fetch
  React.useEffect(() => {
    if (factors && onFetch) {
      onFetch();
    }
  }, [factors, onFetch]);

  // Side effect: notify parent on successful enroll
  React.useEffect(() => {
    if (enrollResponse && onEnroll) {
      onEnroll();
    }
  }, [enrollResponse, onEnroll]);

  // Side effect: notify parent on successful delete
  React.useEffect(() => {
    if (deleteSuccess && onDelete) {
      onDelete();
    }
  }, [deleteSuccess, onDelete]);

  // Side effect: notify parent of errors
  React.useEffect(() => {
    if (onErrorAction) {
      const error = enrollError ?? deleteError;
      if (error) {
        const action = enrollError ? 'enroll' : 'delete';
        onErrorAction(error, action);
      }
    }
  }, [enrollError, deleteError, onErrorAction]);

  // Handlers with onBeforeAction check
  const handleEnroll = async (params: Parameters<typeof enrollMfa>[0], factorType: MFAType) => {
    if (readOnly || disableEnroll) return;

    if (onBeforeAction) {
      const proceed = await onBeforeAction('enroll', factorType);
      if (!proceed) return;
    }

    await enrollMfa(params);
    if (enrollError) {
      toast.error(enrollError.message);
      return;
    }
    if (enrollResponse) {
      toast.success('Enrolled successfully.');
    }
  };

  const handleDelete = async (factorId: string, factorType: MFAType) => {
    if (readOnly || disableDelete) return;

    if (onBeforeAction) {
      const proceed = await onBeforeAction('delete', factorType);
      if (!proceed) return;
    }

    await deleteMfa(factorId);
    if (deleteSuccess) {
      toast.success('Enrollment removed successfully.');
    }
    if (deleteError) {
      toast.error(deleteError.message);
      return;
    }
  };

  // Render loading & error states
  if (tokenLoading || factorsLoading) {
    return <p>Loading...</p>;
  }

  if (tokenError) {
    return <p>Access token error: {tokenError.message}</p>;
  }

  if (factorsError) {
    return <p>Error loading MFA factors: {factorsError.message}</p>;
  }

  return (
    <Card>
      {showTitleDescription && (
        <CardHeader>
          <CardTitle>{title ?? 'MFA Authenticators'}</CardTitle>
          <CardDescription>
            {description ?? 'Manage the MFA enrollments for your account.'}
          </CardDescription>
        </CardHeader>
      )}

      <CardContent className="grid gap-6 p-4 pt-0 md:p-6 md:pt-0">
        {factors.map((factor: Authenticator, idx: number) => (
          <div className="flex flex-col gap-6" key={`${factor.name}-${idx}`}>
            {idx > 0 && <Separator />}
            <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-x-2 md:space-y-0">
              <Label className="flex flex-col space-y-1">
                <span className="leading-6">
                  {factor.title}
                  {factor.active && (
                    <Badge variant="default" className="ml-3">
                      Enrolled
                    </Badge>
                  )}
                </span>
                <p className="max-w-fit font-normal leading-snug text-muted-foreground">
                  {factor.description}
                </p>
              </Label>

              <div className="flex items-center justify-end space-x-24 md:min-w-72">
                {factor.active
                  ? !readOnly &&
                    !disableDelete && (
                      <Button
                        type="submit"
                        onClick={() => handleDelete(factor.id, factor.authenticator_type)}
                        disabled={deleting}
                        aria-label={`Delete authenticator ${factor.title || factor.name}`}
                      >
                        Delete
                      </Button>
                    )
                  : !readOnly &&
                    !disableEnroll && (
                      <Button
                        onClick={() =>
                          // TODO
                          handleEnroll(
                            {
                              client_id: authDetails?.clientId || '',
                              authenticator_types: ['otp'], //TODO make dynamic
                            },
                            'otp',
                          )
                        }
                        disabled={enrolling}
                      >
                        {enrolling ? 'Enrolling...' : 'Enroll'}
                      </Button>
                    )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
