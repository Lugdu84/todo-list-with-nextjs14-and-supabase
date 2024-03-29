'use client';

import { checkTodo, deleteTodo } from '@/lib/todos/actions';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

type TodoRowProps = {
	todo: Todo;
};

export default function TodoRow({ todo }: TodoRowProps) {
	const [isPending, startTransiton] = useTransition();

	const handleDelete = () => {
		startTransiton(() => {
			deleteTodo(todo.id).then((error) => {
				if (error) {
					toast.error(error.message);
				}
			});
		});
	};

	const handleCheck = () => {
		startTransiton(() => {
			checkTodo(todo).then((error) => {
				if (error) {
					toast.error(error.message);
				}
			});
		});
	};
	return (
		<div className="border border-gray-200 p-3 rounded-lg shadow-lg flex justify-between">
			<div className="w-full flex gap-2 items-center">
				<Checkbox
					checked={todo.is_completed}
					onCheckedChange={handleCheck}
				/>
				{todo.name}
			</div>
			{isPending ? (
				<AiOutlineLoading3Quarters
					className={cn('animate-spin', { hidden: !isPending })}
				/>
			) : (
				<Trash2
					color="red"
					onClick={handleDelete}
				/>
			)}
		</div>
	);
}
