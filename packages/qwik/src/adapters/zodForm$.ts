import { $, implicit$FirstArg, type QRL } from '@builder.io/qwik';
import type { ZodType } from 'zod';
import type {
  FieldValues,
  MaybeFunction,
  ValidateForm,
  PartialValues,
  FormErrors,
} from '../types';
import { getParsedZodSchema } from '../utils';

/**
 * See {@link zodForm$}
 */
export function zodFormQrl<TFieldValues extends FieldValues>(
  schema: QRL<MaybeFunction<ZodType<any, any, TFieldValues>>>
): QRL<ValidateForm<TFieldValues>> {
  return $(async (values: PartialValues<TFieldValues>) => {
    const result = await getParsedZodSchema(schema, values);
    return result.success
      ? {}
      : (result.error.issues.reduce<any>((errors, error) => {
          const path = error.path.join('.');
          if (!errors[path]) {
            errors[path] = error.message;
          }
          return errors;
        }, {}) as FormErrors<TFieldValues>);
  });
}

/**
 * Creates a validation functions that parses the Zod schema of a form.
 *
 * @param schema A Zod schema.
 *
 * @returns A validation function.
 */
export const zodForm$ = implicit$FirstArg(zodFormQrl);
