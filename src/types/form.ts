// src/types/form.ts

import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

// Type chung cho trạng thái của một form
export interface FormState<T extends FieldValues> {
  values: T;
  errors: FieldErrors<T>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

// Props chung cho các component input
export interface InputProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>; // Sử dụng Path để có gợi ý tên trường chính xác
  label: string;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}