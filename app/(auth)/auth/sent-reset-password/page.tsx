'use client';

import { useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendResetPasswordMail } from '@/lib/auth/actions';
import { toast } from 'sonner';

export default function SentResetPasswordPage() {

	const [isPending, startTransition] = useTransition();

	const handleSendResetMail = (formData: FormData) => {
		const email = formData.get('email') as string;
		startTransition(() => {
			sendResetPasswordMail(email)
				.catch(() => {
					toast.error('Une erreur est survenue');
				})
				.then(() => {
					toast.success(
						'Un mail de réinitialisation de mot de passe vous a été envoyé'
					);
				});
		});
	};
	return (
		<div className="p-4">
			<h1 className="text-2xl">Réinitialisation du mot de passe</h1>
			<form action={handleSendResetMail}>
				<fieldset
					disabled={isPending}
					className="flex flex-col gap-4 mt-4">
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
