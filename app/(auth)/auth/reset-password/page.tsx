'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resetPassword } from '@/lib/auth/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmit = (formData: FormData) => {
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm-password') as string;
		if (password !== confirmPassword) {
			toast.error('Les mots de passe ne correspondent pas');
			return;
		}
		startTransition(() => {
			resetPassword(password)
				.catch(() => {
					toast.error(
						'Une erreur est survenue lors de la modification du mot de passe'
					);
				})
				.then(() => {
					toast.success('Votre mot de passe a été modifié');
					router.replace('/');
				});
		});
	};
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<h1>Modifiez votre mot de passe</h1>
			<form action={handleSubmit}>
				<fieldset
					disabled={isPending}
					className="flex flex-col gap-3">
					<Input
						type="password"
						name="password"
						required
					/>
					<Input
						type="password"
						name="confirm-password"
						required
					/>
					<Button>Validez</Button>
				</fieldset>
			</form>
		</div>
	);
}
