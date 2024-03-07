'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { signInWithPassword, signUpWithPassword } from '@/lib/auth/actions';
import { signInWithProvider } from '@/lib/auth/providers';
import { cn } from '@/lib/utils';
import { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function AuthPage() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const query = useSearchParams().get('query');

	const signin = query === 'signin';

	const handleSignIn = (formData: FormData) => {
		startTransition(() => {
			signInWithPassword(formData).then((error) => {
				if (error) {
					setError(error.message);
				}
			});
		});
	};
	const handleSignup = (formData: FormData) => {
		startTransition(() => {
			signUpWithPassword(formData).then((error) => {
				if (error) {
					setError(error.message);
				}
			});
		});
	};

	const handleSubmit = (formData: FormData) => {
		signin ? handleSignIn(formData) : handleSignup(formData);
	};

	const handleSignInWithProvider = (provider: Provider) => {
		signInWithProvider(provider);
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
			{signin && (
				<Link
					className="hover:underline"
					href={'/auth/send-magic-link'}>
					Connexion avec Magic Link
				</Link>
			)}
			<Separator className="w-full md:w-2/3 lg:w-1/2" />
			<Button
				className="flex gap-2"
				onClick={() => handleSignInWithProvider('github')}>
				Connexion avec Github <FaGithub />
			</Button>
			<Button
				className="flex gap-2"
				onClick={() => handleSignInWithProvider('google')}>
				Connexion avec Google <FcGoogle />
			</Button>
		</div>
	);
}
