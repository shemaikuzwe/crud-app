import { z } from 'zod';
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(4, { message: 'Please Enter a long password' }),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
