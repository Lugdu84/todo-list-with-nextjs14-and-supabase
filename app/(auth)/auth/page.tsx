'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInWithPassword, signUpWithPassword } from '@/lib/auth/actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AuthPage() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const query = useSearchParams().get('query');

	const signin = query === 'signin';

	const handleSignIn = (formData: FormData) => {
		startTransition(() => {
			signInWithPassword(formData).catch(() => {
				setError('Mot de passe ou email incorrect');
			});
		});
	};
	const handleSignup = (formData: FormData) => {
		startTransition(() => {
			signUpWithPassword(formData).catch(() => {
				setError('Une erreur est survenue. Veuillez réessayer.');
			});
		});
	};

	const handleSubmit = (formData: FormData) => {
		signin ? handleSignIn(formData) : handleSignup(formData);
	};
	return (
		<div className=" h-screen flex flex-col justify-center items-center gap-4">
			<h2 className="text-2xl">{signin ? 'Connexion' : 'Inscription'}</h2>
			<form
				action={handleSubmit}
				className="w-full md:w-2/3 lg:w-1/2">
				<fieldset
					disabled={isPending}
					className="grid grid-cols-1 w-full gap-4">
					<Input
						type="email"
						name="email"
						placeholder="test@test.fr"
						required
					/>
					<Input
						type="password"
						name="password"
						placeholder="password"
						required
					/>
					{error && <p className="text-red-500">{error}</p>}
					<Button className="flex gap-2">
						{signin ? 'Se connecter' : "S'inscrire"}
						<AiOutlineLoading3Quarters
							className={cn('animate-spin', { hidden: !isPending })}
						/>
					</Button>
				</fieldset>
			</form>
			<Link
				className="hover:underline"
				href={'/auth/sent-reset-password'}>
				Mot de passe oublié ?
			</Link>
			<Link
				className="hover:underline"
				href={signin ? '/auth?query=signup' : '/auth?query=signin'}>
				{signin ? 'Pas de compte ?' : 'Déjà un compte ?'}
			</Link>
		</div>
	);
}
