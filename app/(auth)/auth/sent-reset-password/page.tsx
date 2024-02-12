'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sentResetPassword } from '@/lib/auth/actions';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function SentResetPasswordPage() {
	const [isPending, startTransition] = useTransition();

	const handleSentResetMail = (formData: FormData) => {
		const email = formData.get('email') as string;
		startTransition(() => {
			sentResetPassword(email)
				.catch(() => {
					toast.error('Une erreur est survenue.');
				})
				.then(() => {
					toast.success('Un email de réinitialisation vous a été envoyé.');
				});
		});
	};
	return (
		<div className="p-4">
			<h1 className="text-2xl">Réinitialisation du mot de passe</h1>
			<form action={handleSentResetMail}>
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
