import { Box } from '@mantine/core';
import FormGenerator from './FormGenerator';
import { z } from 'zod';

// Usage example
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.coerce.number().min(0, 'Age must be a positive number'),
  email: z.string().email('Invalid email address'),
  gender: z.enum(['male', 'female']),
  agreeToTerms: z.boolean(),
  country: z
    .object({
      options: z.enum(['USA', 'Canada', 'Mexico']),
    })
    .refine((data) => data.options, { message: 'Country is required' }),
});
const FormExample = () => {
  return (
    <Box maw={400} mx="auto">
      <h1>Dynamic Form</h1>
      <FormGenerator schema={formSchema} onSubmit={(values) => console.log('VALUES: ', values)} />
    </Box>
  );
};

export default FormExample;
