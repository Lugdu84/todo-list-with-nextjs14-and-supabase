'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendResetMail } from '@/lib/auth/actions';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

export default function SendResetMailPage() {
	const [isPending, startTransition] = useTransition();

	const handleSendResetMail = (formData: FormData) => {
		const email = formData.get('email') as string;
		startTransition(() => {
			sendResetMail(email)
				.catch(() => {
					toast.error(
						"Une erreur est survenue lors de l'envoi du mail de réinitialisation"
					);
				})
				.then(() => {
					toast.success('Un mail de réinitialisation vous a été envoyé');
				});
		});
	};
	return (
		<div className="p-4">
			<h1 className="text-2xl">Réinitialisation du mot de passe</h1>
			<form action={handleSendResetMail}>
				<fieldset
					className="flex flex-col gap-4 mt-4"
					disabled={isPending}>
					<Input
						placeholder="votre adresse mail"
						type="email"
						name="email"
						required
					/>
					<Button>Envoyer</Button>
				</fieldset>
			</form>
		</div>
	);
}
