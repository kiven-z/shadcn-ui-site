import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { APP_CONFIG } from '@/config/app-config';

type MessageTree = Record<string, unknown>;

/**
 * 扫描 locales 下各语言目录的 yaml，按 locale 合并文案树
 */
function loadMessages(): Record<string, MessageTree> {
  const modules = import.meta.glob('../../../locales/**/*.yaml', {
    eager: true,
    import: 'default',
  }) as Record<string, MessageTree>;

  const cache: Record<string, MessageTree> = Object.fromEntries(
    APP_CONFIG.locales.map(({ locale }) => [locale, {} as MessageTree])
  );

  for (const [filePath, messages] of Object.entries(modules)) {
    const lang = /locales\/([A-Za-z0-9_-]+)\//.exec(filePath)?.[1];

    if (!lang || !(lang in cache)) {
      continue;
    }

    Object.assign(cache[lang], messages);
  }

  return cache;
}

const messages = loadMessages();

void i18n.use(initReactI18next).init({
  resources: Object.fromEntries(
    APP_CONFIG.locales.map(({ locale }) => [locale, { translation: messages[locale] ?? {} }])
  ),
  lng: APP_CONFIG.locales[0].locale,
  fallbackLng: APP_CONFIG.locales[0].locale,
  interpolation: { escapeValue: false },
});

export { i18n };
