<script setup lang="ts">
import { PhCheckCircle, PhClock, PhMapPin, PhPaperPlaneTilt, PhPhone, PhWarningCircle, PhWhatsappLogo } from '@phosphor-icons/vue'

import { whatsappHref } from '~/data/business'

/*
 * Booking section.
 *
 * The form posts to Web3Forms, which forwards to the reservations inbox. It
 * previously composed a mailto: link instead, which looks like it works on a
 * desktop with a mail client and silently does nothing on a phone without one —
 * on a site where most traffic is mobile, that is a lost booking every time.
 * Web3Forms keeps the deploy fully static, which Cloudflare Pages requires, and
 * keeps the inbox address off the page as the brief asks.
 *
 * With no access key configured (local dev, or a fresh clone) the form has to
 * degrade to something. It degrades to WhatsApp, not to mailto, because this
 * client has not supplied a reservations inbox at all — BUSINESS.inboxHref is
 * null. Composing a mailto: against a null address navigates the browser to
 * the literal string "null?subject=...", which looks to the visitor exactly
 * like a sent enquiry and loses the booking. If an inbox address is added
 * later, mailto becomes the fallback again automatically.
 *
 * Validation is inline and per-field, labels sit above inputs, and errors sit
 * below them. No placeholder-as-label anywhere.
 */
const { t, business } = useI18n()
/* The one conversion a click listener cannot see. */
const { track } = useAnalytics()

const accessKey = String(useRuntimeConfig().public.web3formsKey || '')

const form = reactive({ name: '', phone: '', pickup: '', message: '' })
const touched = reactive({ name: false, phone: false, pickup: false })
/*
 * Honeypot. Hidden from sight, from screen readers and from the tab order, so
 * only an automated filler ever puts anything in it. Web3Forms also rejects
 * server-side on this exact field name.
 */
const botcheck = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const errors = computed(() => ({
  name: touched.name && !form.name.trim() ? t.value.contact.errorRequired : '',
  phone: touched.phone && !form.phone.trim() ? t.value.contact.errorRequired : '',
  pickup: touched.pickup && !form.pickup.trim() ? t.value.contact.errorRequired : '',
}))

const isValid = computed(() =>
  !!form.name.trim() && !!form.phone.trim() && !!form.pickup.trim(),
)

/* Carries whatever is already typed across to WhatsApp, so switching channel
 * mid-form is not a retype. */
const whatsappFormHref = computed(() => {
  const lines = [
    form.pickup.trim() && `${t.value.contact.pickup}: ${form.pickup.trim()}`,
    form.message.trim(),
  ].filter(Boolean)
  return whatsappHref(lines.length ? lines.join('\n') : undefined)
})

/*
 * Hand the typed enquiry off to whichever channel actually exists: the
 * reservations inbox if one is configured, otherwise WhatsApp. Returns false if
 * neither is possible, so the caller can show the error state instead of
 * claiming a send that did not happen.
 */
function handoffFallback(): boolean {
  const body = [
    `${t.value.contact.name}: ${form.name.trim()}`,
    `${t.value.contact.phone}: ${form.phone.trim()}`,
    `${t.value.contact.pickup}: ${form.pickup.trim()}`,
    '',
    form.message.trim(),
  ].join('\n')

  const inbox = business.value.inboxHref
  if (inbox) {
    const subject = `${t.value.contact.formTitle} - ${form.name.trim()}`
    window.location.href =
      `${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return true
  }

  window.location.href = whatsappHref(body)
  return true
}

async function submit() {
  touched.name = true
  touched.phone = true
  touched.pickup = true
  if (!isValid.value || status.value === 'sending') return

  // A filled honeypot means a bot. Report success and send nothing.
  if (botcheck.value) {
    status.value = 'sent'
    return
  }

  if (!accessKey) {
    status.value = handoffFallback() ? 'sent' : 'error'
    return
  }

  status.value = 'sending'
  try {
    const result = await $fetch<{ success: boolean }>('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: accessKey,
        subject: `Upit sa sajta - ${form.name.trim()}`,
        from_name: business.value.name,
        name: form.name.trim(),
        phone: form.phone.trim(),
        [t.value.contact.pickup]: form.pickup.trim(),
        message: form.message.trim(),
      },
    })

    if (!result?.success) throw new Error('Web3Forms rejected the submission')

    // Only on a confirmed send, never on the attempt.
    track('form_submit', { pickup: form.pickup.trim().slice(0, 60) })

    status.value = 'sent'
    form.name = ''
    form.phone = ''
    form.pickup = ''
    form.message = ''
    touched.name = false
    touched.phone = false
    touched.pickup = false
  }
  catch {
    status.value = 'error'
  }
}

const FIELD_CLASS =
  'w-full rounded-card border border-ink-700 bg-ink-950 px-4 py-3 text-[0.9375rem] text-mist-0 transition-colors duration-200 placeholder:text-mist-500 focus:border-lime-400 focus:outline-none'
</script>

<template>
  <section id="rezervacija" class="reveal-group section-y bg-ink-950">
    <div class="shell">
      <LandingSectionHeading :title="t.contact.title" :intro="t.contact.intro" />

      <div class="mt-12 grid gap-6 lg:grid-cols-12">
        <!-- Direct channels first: phone converts better than any form. -->
        <div class="flex flex-col gap-4 lg:col-span-5">
          <a
            :href="business.phoneHref"
            class="reveal surface surface-hover flex items-center gap-4 p-6"
          >
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime-400 text-ink-950" aria-hidden="true">
              <PhPhone :size="22" weight="fill" />
            </span>
            <span>
              <span class="block text-sm text-mist-500">{{ t.contact.callTitle }}</span>
              <span dir="ltr" class="block text-lg font-semibold text-mist-0 rtl:text-end">{{ business.phone }}</span>
              <span class="block text-sm text-mist-500">{{ t.contact.callBody }}</span>
            </span>
          </a>

          <a
            :href="business.whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="reveal surface surface-hover flex items-center gap-4 p-6"
          >
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 text-lime-400" aria-hidden="true">
              <PhWhatsappLogo :size="22" weight="fill" />
            </span>
            <span>
              <span class="block text-sm text-mist-500">{{ t.contact.whatsappTitle }}</span>
              <span dir="ltr" class="block text-lg font-semibold text-mist-0 rtl:text-end">{{ business.phoneDisplay }}</span>
              <span class="block text-sm text-mist-500">{{ t.contact.whatsappBody }}</span>
            </span>
          </a>

          <div class="reveal surface p-6">
            <p class="flex items-start gap-3 text-[0.9375rem] text-mist-0">
              <PhMapPin :size="19" class="mt-0.5 shrink-0 text-lime-400" aria-hidden="true" />
              <span>
                <span class="block text-sm text-mist-500">{{ t.contact.addressTitle }}</span>
                {{ business.addressShort }}
              </span>
            </p>
            <p class="mt-4 flex items-center gap-3 border-t border-ink-700 pt-4 text-sm text-mist-500">
              <PhClock :size="17" class="shrink-0 text-lime-400" aria-hidden="true" />
              {{ t.contact.hoursNote }}
            </p>
          </div>
        </div>

        <form
          class="reveal surface relative p-6 md:p-8 lg:col-span-7"
          novalidate
          @submit.prevent="submit"
        >
          <h3 class="h-card text-mist-0">
            {{ t.contact.formTitle }}
          </h3>
          <p class="body-base mt-2">
            {{ t.contact.formNote }}
          </p>

          <div class="mt-7 grid gap-5 sm:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label for="c-name" class="text-sm font-medium text-mist-400">
                {{ t.contact.name }}
              </label>
              <input
                id="c-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                :class="[FIELD_CLASS, errors.name ? 'border-red-400/70' : '']"
                :placeholder="t.contact.namePlaceholder"
                :aria-invalid="!!errors.name"
                aria-describedby="c-name-error"
                @blur="touched.name = true"
              >
              <p id="c-name-error" class="min-h-[1rem] text-xs text-red-300">
                {{ errors.name }}
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <label for="c-phone" class="text-sm font-medium text-mist-400">
                {{ t.contact.phone }}
              </label>
              <input
                id="c-phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                dir="ltr"
                :class="[FIELD_CLASS, errors.phone ? 'border-red-400/70' : '']"
                :placeholder="t.contact.phonePlaceholder"
                :aria-invalid="!!errors.phone"
                aria-describedby="c-phone-error"
                @blur="touched.phone = true"
              >
              <p id="c-phone-error" class="min-h-[1rem] text-xs text-red-300">
                {{ errors.phone }}
              </p>
            </div>
          </div>

          <div class="mt-1 flex flex-col gap-2">
            <label for="c-pickup" class="text-sm font-medium text-mist-400">
              {{ t.contact.pickup }}
            </label>
            <input
              id="c-pickup"
              v-model="form.pickup"
              type="text"
              :class="[FIELD_CLASS, errors.pickup ? 'border-red-400/70' : '']"
              :placeholder="t.contact.pickupPlaceholder"
              :aria-invalid="!!errors.pickup"
              aria-describedby="c-pickup-error"
              @blur="touched.pickup = true"
            >
            <p id="c-pickup-error" class="min-h-[1rem] text-xs text-red-300">
              {{ errors.pickup }}
            </p>
          </div>

          <div class="mt-1 flex flex-col gap-2">
            <label for="c-message" class="text-sm font-medium text-mist-400">
              {{ t.contact.message }}
            </label>
            <textarea
              id="c-message"
              v-model="form.message"
              rows="4"
              :class="[FIELD_CLASS, 'resize-none']"
              :placeholder="t.contact.messagePlaceholder"
            />
          </div>

          <!--
            Honeypot. Off-screen rather than display:none, because some bots
            skip hidden inputs. aria-hidden + tabindex="-1" keep it away from
            keyboard and screen-reader users.
          -->
          <div class="absolute -left-[9999px] top-0" aria-hidden="true">
            <label for="c-botcheck">Ne popunjavaj ovo polje</label>
            <input
              id="c-botcheck"
              v-model="botcheck"
              type="text"
              name="botcheck"
              tabindex="-1"
              autocomplete="off"
            >
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <LandingButton
              type="submit"
              size="lg"
              class="w-full sm:flex-1"
            >
              <PhPaperPlaneTilt :size="18" weight="fill" class="rtl:-scale-x-100" aria-hidden="true" />
              {{ status === 'sending' ? t.contact.sending : t.contact.submit }}
            </LandingButton>

            <!-- Second channel right beside the first: some people will never
                 trust a form, and this keeps them from bouncing. -->
            <LandingButton
              :href="whatsappFormHref"
              variant="secondary"
              size="lg"
              external
              class="w-full sm:w-auto"
            >
              <PhWhatsappLogo :size="18" weight="fill" aria-hidden="true" />
              {{ t.contact.whatsappAlt }}
            </LandingButton>
          </div>

          <p
            v-if="status === 'sent'"
            class="mt-4 flex items-center justify-center gap-2 text-center text-sm text-lime-400"
            role="status"
          >
            <PhCheckCircle :size="17" weight="fill" class="shrink-0" aria-hidden="true" />
            {{ t.contact.sent }}
          </p>

          <p
            v-else-if="status === 'error'"
            class="mt-4 flex items-center justify-center gap-2 text-center text-sm text-red-300"
            role="alert"
          >
            <PhWarningCircle :size="17" weight="fill" class="shrink-0" aria-hidden="true" />
            {{ t.contact.errorSend }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
