'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTransition, useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { addTodo } from '@/lib/todos/actions';
import { toast } from 'sonner';

export default function AddTodoForm() {
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);

	const resetForm = () => {
		formRef.current?.reset();
	};

	const handleAddTodo = (formData: FormData) => {
		const name = formData.get('todo') as string;
		startTransition(() => {
			addTodo(name).then((error) => {
				if (error) {
					toast.error(error.message);
				}
			});
		});
		resetForm();
	};
	return (
		<form
			action={handleAddTodo}
			className="w-full md:w-2/3 lg:w-1/2"
			ref={formRef}>
			<fieldset
				disabled={isPending}
				className="flex gap-2">
				<Input
					type="text"
					name="todo"
					placeholder="Ajouter un todo"
					required
				/>
				<Button className="flex gap-2">
					Ajouter
					<AiOutlineLoading3Quarters
						className={cn('animate-spin', { hidden: !isPending })}
					/>
				</Button>
			</fieldset>
		</form>
	);
}
