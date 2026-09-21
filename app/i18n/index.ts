import type { Locale, LocaleMessages } from '~/i18n/types'
import { ar } from '~/i18n/locales/ar'
import { bs } from '~/i18n/locales/bs'
import { de } from '~/i18n/locales/de'
import { en } from '~/i18n/locales/en'

export const locales: Record<Locale, LocaleMessages> = { bs, en, de, ar }

export { ar, bs, de, en }
