'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInWithPassword } from '@/lib/auth/actions';
import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AuthPage() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const handleSignIn = (formData: FormData) => {
		startTransition(() => {
			signInWithPassword(formData).catch(() => {
				setError('Mot de passe ou email incorrect');
			});
		});
	};
	return (
		<div className=" h-screen flex flex-col justify-center items-center">
			<h2>Connexion</h2>
			<fieldset
				className="w-full md:w-2/3 lg:w-1/2"
				disabled={isPending}>
				<form
					action={handleSignIn}
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
						Connexion
						<AiOutlineLoading3Quarters
							className={cn('animate-spin', { hidden: !isPending })}
						/>
					</Button>
				</form>
			</fieldset>
		</div>
	);
}
