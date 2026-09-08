import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ACCOUNT_MENU_KEYS = ['account', 'workspace', 'setting', 'contact-us', 'sign-out'] as const;

/** 头像菜单：账号示例（无真实鉴权） */
export function LayoutNavbarAvatar() {
  const { t } = useTranslation();

  function handleAction(id: (typeof ACCOUNT_MENU_KEYS)[number]) {
    toast.info(t('nav.demoOnly'), {
      description: t(`nav.accountMenu.${id}`),
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label={t('nav.account')} className="rounded-full outline-none" type="button">
          <Avatar className="size-8 cursor-pointer" size="sm">
            <AvatarFallback className="bg-primary text-primary-foreground">S</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-56">
        {ACCOUNT_MENU_KEYS.map((id) => (
          <DropdownMenuItem key={id} onClick={() => handleAction(id)}>
            {t(`nav.accountMenu.${id}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
