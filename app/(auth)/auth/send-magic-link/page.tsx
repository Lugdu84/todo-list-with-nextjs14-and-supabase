'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendMagicLink } from '@/lib/auth/actions';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function SendMagicLink() {
	const [isPending, startTransition] = useTransition();

	const handleSendMagicLink = (formData: FormData) => {
		const email = formData.get('email') as string;
		startTransition(() => {
			sendMagicLink(email).then((error) => {
				if (error) {
					toast.error(error.message);
				} else {
					toast.success(
						'Un lien de connexion a été envoyé à votre adresse mail'
					);
				}
			});
		});
	};
	return (
		<div className="p-4">
			<h1 className="text-2xl">Connexion avec Magic Link</h1>
			<form action={handleSendMagicLink}>
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
