import { z } from 'zod';

export const SignInSchema = z.object({
  credential: z.string().min(1, 'Username or email address is required!'),
  password: z.string().min(1, 'Password is required!'),
});
export type TSignIn = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email('Email address is not valid.')
      .min(1, 'Email is required.'),
    username: z.string().min(1, 'Username is required!'),
    password: z.string().min(1, 'Password is required!'),
    confirmPassword: z.string().min(1, 'Confirm password is required!'),
  })
  .refine((o) => o.password === o.confirmPassword, {
    message: "Password's doesn't match!",
    path: ['confirmPassword'],
  });
export type TSignUp = z.infer<typeof SignUpSchema>;
export type TAuthResponse = {
  access_token: string;
};
