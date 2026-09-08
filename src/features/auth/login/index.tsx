import type { SyntheticEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const { t } = useTranslation();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info(t('login.demoOnly'));
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t('login.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input required id="email" name="email" placeholder="name@example.com" type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input required id="password" name="password" type="password" />
            </div>
            <Button className="w-full" type="submit">
              {t('login.submit')}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
