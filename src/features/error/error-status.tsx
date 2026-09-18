import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

interface ErrorStatusProps {
  code: 403 | 404 | 500;
}

export function ErrorStatus({ code }: ErrorStatusProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6">
      <p className="text-6xl font-semibold tracking-tight text-muted-foreground">{code}</p>
      <h1 className="inline text-2xl font-semibold tracking-tight lg:text-4xl">{t(`error.${code}.title`)}</h1>
      <p className="my-2 block w-full max-w-full text-center text-base text-muted-foreground sm:text-lg md:w-1/2 lg:text-xl">
        {t(`error.${code}.description`)}
      </p>
      <Button onClick={() => void navigate('/')}>{t('error.backHome')}</Button>
    </div>
  );
}
