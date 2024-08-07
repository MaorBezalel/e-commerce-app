import { useFormContext } from 'react-hook-form';

export function InputFieldRememberMe() {
    const { register } = useFormContext();

    const registerRememberMe = () => register('rememberMe');

    return (
        <section
            className="flex flex-row items-center gap-4 
            tablet-sm:gap-3
            mobile-lg:pr-0"
        >
            <input
                type="checkbox"
                className="mt-0.5 size-3.5"
                {...registerRememberMe()}
            />
            <label
                htmlFor="rememberMe"
                className="text-xl 
                tablet-sm:text-lg
                mobile-lg:text-base"
            >
                Remember me
            </label>
        </section>
    );
}
