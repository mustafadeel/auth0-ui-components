import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { MFAType } from '@auth0-web-ui-components/core';
import { getComponentStyles } from '@auth0-web-ui-components/core';
import { cn } from '@/lib/theme-utils';
import { Styling } from '@/types';
import { useTheme, useTranslator } from '@/hooks';

type DeleteFactorConfirmationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  factorToDelete: {
    id: string;
    type: MFAType;
  } | null;
  isDeletingFactor: boolean;
  onConfirm: (factorId: string) => void;
  onCancel: () => void;
  styling?: Styling;
};

export function DeleteFactorConfirmation({
  open,
  onOpenChange,
  factorToDelete,
  isDeletingFactor,
  onConfirm,
  onCancel,
  styling = {
    variables: {
      common: {},
      light: {},
      dark: {},
    },
    classNames: {},
  },
}: DeleteFactorConfirmationProps) {
  const { t } = useTranslator('mfa');
  const { isDarkMode } = useTheme();
  const currentStyles = getComponentStyles(styling, isDarkMode);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      aria-modal="true"
      aria-labelledby="delete-mfa-title"
      aria-describedby="delete-mfa-description"
    >
      <DialogContent
        style={currentStyles?.variables}
        aria-describedby="delete-mfa-description"
        className={cn(
          'w-[400px] max-h-[90vh] min-h-[548px]',
          currentStyles.classNames?.dialogContent,
        )}
      >
        <DialogHeader className={currentStyles.classNames?.dialogHeader}>
          <DialogTitle
            id="delete-mfa-title"
            className={cn(
              'text-center text-(length:--font-size-title) font-medium',
              currentStyles.classNames?.dialogTitle,
            )}
          >
            {t('delete_mfa_title')}
          </DialogTitle>
          <Separator className={cn('my-2', currentStyles.classNames?.dialogSeparator)} />
        </DialogHeader>

        <div
          className={cn('flex flex-col items-center mt-6', currentStyles.classNames?.dialogBody)}
        >
          <p
            id="delete-mfa-description"
            className={cn(
              'text-center text-(length:--font-size-paragraph) font-normal mb-10',
              currentStyles.classNames?.dialogDescription,
            )}
          >
            {t(`delete_mfa_${factorToDelete?.type}_consent`)}
          </p>

          <div
            className={cn(
              'flex flex-col space-y-3 w-full mt-6',
              currentStyles.classNames?.dialogActions,
            )}
          >
            <Button
              variant="destructive"
              size="lg"
              className={cn('text-sm', currentStyles.classNames?.dialogConfirmButton)}
              onClick={() => factorToDelete && onConfirm(factorToDelete.id)}
              disabled={isDeletingFactor}
              aria-label={t('confirm')}
            >
              {isDeletingFactor ? t('deleting') : t('confirm')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn('text-sm', currentStyles.classNames?.dialogCancelButton)}
              onClick={onCancel}
              disabled={isDeletingFactor}
              aria-label={t('cancel')}
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
