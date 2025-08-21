import * as React from 'react';
import QRCode from 'react-qr-code';
import { Copy } from 'lucide-react';

import {
  type MFAType,
  type EnrollMfaResponse,
  getComponentStyles,
} from '@auth0-web-ui-components/core';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { CONFIRM, QR_PHASE_ENTER_OTP, QR_PHASE_SCAN, ENROLL } from '@/lib/mfa-constants';

import { useTheme, useTranslator } from '@/hooks';
import { useOtpEnrollment } from '@/hooks/mfa';

import { OTPVerificationForm } from './otp-verification-form';
import { cn } from '@/lib/theme-utils';
import { Styling } from '@/types';

type QRCodeEnrollmentFormProps = {
  factorType: MFAType;
  enrollMfa: (factor: MFAType, options: Record<string, string>) => Promise<EnrollMfaResponse>;
  confirmEnrollment: (
    factor: MFAType,
    options: { oobCode?: string; userOtpCode?: string },
  ) => Promise<unknown | null>;
  onError: (error: Error, stage: typeof ENROLL | typeof CONFIRM) => void;
  onSuccess: () => void;
  onClose: () => void;
  styling?: Styling;
};

const PHASES = {
  SCAN: QR_PHASE_SCAN,
  ENTER_OTP: QR_PHASE_ENTER_OTP,
} as const;

type Phase = (typeof PHASES)[keyof typeof PHASES];

export function QRCodeEnrollmentForm({
  factorType,
  enrollMfa,
  confirmEnrollment,
  onError,
  onSuccess,
  onClose,
  styling = {
    variables: {
      common: {},
      light: {},
      dark: {},
    },
    classNames: {},
  },
}: QRCodeEnrollmentFormProps) {
  const [phase, setPhase] = React.useState<Phase>(QR_PHASE_SCAN);
  const { t } = useTranslator('mfa');
  const { isDarkMode } = useTheme();
  const currentStyles = getComponentStyles(styling, isDarkMode);

  const { fetchOtpEnrollment, otpData, resetOtpData, loading } = useOtpEnrollment({
    factorType,
    enrollMfa,
    onError,
    onClose,
  });

  React.useEffect(() => {
    fetchOtpEnrollment();
  }, [phase]);

  const handleContinue = React.useCallback(() => {
    setPhase(QR_PHASE_ENTER_OTP);
  }, []);

  const handleBack = React.useCallback(() => {
    setPhase(QR_PHASE_SCAN);
    resetOtpData();
  }, []);

  const handleCopySecret = React.useCallback(async () => {
    await navigator.clipboard.writeText(otpData?.secret || '');
  }, [otpData.secret]);

  const renderQrScreen = () => {
    return (
      <div
        style={currentStyles.variables}
        className={cn('w-full', currentStyles.classNames?.formContainer)}
      >
        {loading ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <Spinner aria-label={t('loading')} />
          </div>
        ) : (
          <div className="w-full max-w-sm mx-auto text-center">
            <div className="mb-6">
              <div
                className={cn(
                  'flex justify-center items-center mb-6',
                  currentStyles.classNames?.qrCodeContainer,
                )}
              >
                <QRCode
                  size={150}
                  value={otpData.barcodeUri || ''}
                  aria-label={t('enrollment_form.show_otp.qr_code_description')}
                />
              </div>
              <p
                id="qr-description"
                className={cn(
                  'font-normal block text-sm text-center text-(length:--font-size-paragraph)',
                  currentStyles.classNames?.formDescription,
                )}
              >
                {t('enrollment_form.show_otp.title')}
              </p>
            </div>
            <div
              className={cn(
                'flex flex-col gap-3 justify-center',
                currentStyles.classNames?.formButtonGroup,
              )}
              aria-describedby="qr-description"
            >
              <Button
                type="button"
                className={cn('text-sm', currentStyles.classNames?.formSubmitButton)}
                variant="outline"
                size="lg"
                onClick={handleCopySecret}
                aria-label={t('enrollment_form.show_otp.copy_as_code')}
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {t('enrollment_form.show_otp.copy_as_code')}
              </Button>
              <div className="mt-3" />
              <Button
                type="button"
                className={cn('text-sm', currentStyles.classNames?.formCancelButton)}
                size="lg"
                onClick={handleContinue}
                aria-label={t('continue')}
              >
                {t('continue')}
              </Button>
              <Button
                type="button"
                className="text-sm"
                variant="ghost"
                size="lg"
                onClick={onClose}
                aria-label={t('cancel')}
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOtpScreen = () => (
    <OTPVerificationForm
      factorType={factorType}
      confirmEnrollment={confirmEnrollment}
      onError={onError}
      onSuccess={onSuccess}
      onClose={onClose}
      oobCode={otpData?.oobCode || ''}
      onBack={handleBack}
      styling={styling}
    />
  );

  return phase === QR_PHASE_SCAN ? renderQrScreen() : renderOtpScreen();
}
