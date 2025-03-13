import z from 'zod';

//Signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
});
export type SignupInput = z.infer<typeof signupInput>

//Signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})
export type SigninInput = z.infer<typeof signinInput>;

//Create Post
export const createPostInput = z.object({
    title: z.string(),
    content: z.string()
})
export type CreatePostInput = z.infer<typeof createPostInput>;

//Update Post
export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional()
})
export type UpdatePostInput = z.infer<typeof updatePostInput>;