'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addUserTeamToUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type CreateTeamFormProps = {
	userId: string;
};

const formSchema = z.object({
	name: z
		.string()
		.nonempty('Team name is required')
		.min(3, 'Team name is too short')
		.max(40, 'Team name is too long'),
});

const CreateTeamForm = ({ userId }: CreateTeamFormProps) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: '' },
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { teams } = await addUserTeamToUser(values.name, userId);
			if (teams[0]) {
				router.push(`/my-teams/${teams[0].id}`);
			} else {
				throw new Error('Team failed to create, please try again later.');
			}
		} catch (error) {
			form.setError('root', {
				message: 'An error occurred, please try again later.',
			});
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				autoComplete="off"
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Team Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							{fieldState.error && (
								<FormMessage>{fieldState.error.message}</FormMessage>
							)}
						</FormItem>
					)}
				/>
				<FormMessage>{form.formState.errors?.root?.message}</FormMessage>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					Create Team
				</Button>
			</form>
		</Form>
	);
};

export default CreateTeamForm;
