import { ReactNode } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ZodTypeAny, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormBaseProps<T extends ZodTypeAny> {
    onSubmit?: (values: z.infer<T>) => Promise<void> | void;
    values?: z.infer<T>;
    validation: T;
    children: ReactNode;
}

const FormBase = <T extends ZodTypeAny>({
    children,
    validation,
    onSubmit,
    values,
}: FormBaseProps<T>) => {
    const form = useForm({
        values,
        resolver: zodResolver(validation),
    });

    const handleSubmit: SubmitHandler<z.infer<T>> = async (data) => {
        if (onSubmit) {
            try {
                await onSubmit(data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default FormBase;
