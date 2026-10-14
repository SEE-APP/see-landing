'use client';
// client: runs the message Server Action and shows its result

import { useActionState, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { sendContactMessage } from '@/app/actions/contact';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import FormSuccess from '@/components/ui/FormSuccess';
import Honeypot from '@/components/ui/Honeypot';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { fieldLimits } from '@/lib/content/contact';
import { describedBy } from '@/lib/controls';
import type { ContactFormProps, ContactMessageState } from '@/types/contact';

const initialState: ContactMessageState = { status: 'idle' };

export default function ContactForm({ lang, t }: ContactFormProps) {
  const id = useId();
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
  const errors = state.fieldErrors ?? {};
  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const messageId = `${id}-message`;

  if (state.status === 'success') return <FormSuccess title={t.successTitle} body={t.successBody} />;

  return (
    <form action={formAction} className="flex flex-col gap-y-8">
      <input type="hidden" name="lang" value={lang} />
      <Honeypot />

      <Field id={nameId} label={t.nameLabel} error={errors.name && t.errors[errors.name]}>
        <Input
          id={nameId}
          name="name"
          autoComplete="name"
          required
          maxLength={fieldLimits.name}
          defaultValue={state.values?.name}
          invalid={Boolean(errors.name)}
          aria-describedby={describedBy(nameId, false, Boolean(errors.name))}
        />
      </Field>

      <Field id={emailId} label={t.emailLabel} error={errors.email && t.errors[errors.email]}>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={fieldLimits.email}
          defaultValue={state.values?.email}
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy(emailId, false, Boolean(errors.email))}
        />
      </Field>

      <Field id={messageId} label={t.messageLabel} error={errors.message && t.errors[errors.message]}>
        <Textarea
          id={messageId}
          name="message"
          required
          maxLength={fieldLimits.message}
          placeholder={t.messagePlaceholder}
          defaultValue={state.values?.message}
          invalid={Boolean(errors.message)}
          aria-describedby={describedBy(messageId, false, Boolean(errors.message))}
        />
      </Field>

      {state.status === 'error' && !state.fieldErrors && (
        <p role="alert" className="text-14 font-medium text-danger">
          {t.errors.generic}
        </p>
      )}

      <Button
        type="submit"
        label={t.submit}
        rightIcon={<ArrowRight size={16} />}
        isLoading={isPending}
        className="mt-2 self-start"
      />
    </form>
  );
}
