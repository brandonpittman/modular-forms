import { $, type QRL } from '@builder.io/qwik';

type Value = string | null | undefined;

/**
 * Creates a validation functions that validates the range of a string.
 *
 * @param requirement The maximum string range.
 * @param error The error message.
 *
 * @returns A validation function.
 */
export function maxRange(
  requirement: string,
  error: string
): QRL<(value: Value) => string> {
  return $((value: Value) => (value && value > requirement ? error : ''));
}
