import { UseFormRegisterReturn, FormState } from 'react-hook-form';

type InputFieldProps<
    TFieldValues extends Record<string, any>,
    TFieldValueName extends string, //extends Extract<keyof TFieldValues, string>,
> = {
    register: () => UseFormRegisterReturn<TFieldValueName>;
    fieldName: TFieldValueName;
    formState: FormState<TFieldValues>;
    InferError?: () => string;
    Icon: React.JSX.Element;
} & React.HTMLProps<HTMLInputElement>;

const DEFAULT_CLASS_NAME_INPUT =
    'peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-md:text-base pc-sm:px-9 pc-sm:text-base tablet-sm:px-8 tablet-sm:text-sm';

export function InputField<
    TFieldValues extends Record<string, any>,
    TFieldValueName extends string, //extends Extract<keyof TFieldValues, string>,
>({
    register,
    fieldName,
    formState: { errors },
    Icon,
    InferError,
    ...inputProps
}: InputFieldProps<TFieldValues, TFieldValueName>) {
    return (
        <>
            <label
                htmlFor={fieldName}
                className="text-xl
                tablet-sm:text-lg"
            >
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        {...inputProps}
                        {...register()}
                        className={`${inputProps.className || ''} ${DEFAULT_CLASS_NAME_INPUT}`}
                    />
                    {Icon}
                </div>
                <p
                    id={`error-${fieldName}`}
                    className={`text-sm text-red-600`}
                >
                    {(errors[fieldName]?.message as string) || InferError?.() || ''}
                </p>
            </div>
        </>
    );
}
