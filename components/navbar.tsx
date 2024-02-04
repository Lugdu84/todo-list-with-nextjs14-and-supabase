'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth/actions';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function NavBar() {
	const [isPending, startTransition] = useTransition();

	const handleSignOut = () => {
		startTransition(() => {
			signOut();
		});
	};
	return (
		<div className="flex justify-end p-4">
			<form>
				<Button
					className="flex gap-2"
					formAction={handleSignOut}
					disabled={isPending}>
					Déconnexion
					<AiOutlineLoading3Quarters
						className={cn('animate-spin', { hidden: !isPending })}
					/>
				</Button>
			</form>
		</div>
	);
}
