import React from 'react';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, ZodTypeAny } from 'zod';
import {
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Box,
  Group,
} from '@mantine/core';

interface FormProps {
  schema: ZodSchema;
  onSubmit: SubmitHandler<FieldValues>;
}

const FormGenerator: React.FC<FormProps> = ({ schema, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const renderInput = (name: string, field: ZodTypeAny) => {
    const fieldType = field._def.typeName;

    switch (fieldType) {
      case 'ZodString':
        if (field._def.checks.some((check: any) => check.kind === 'email')) {
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <TextInput
                  label={name}
                  placeholder={name}
                  {...field}
                  error={errors[name]?.message as string}
                />
              )}
            />
          );
        } else {
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <TextInput
                  label={name}
                  placeholder={name}
                  {...field}
                  error={errors[name]?.message as string}
                />
              )}
            />
          );
        }
      case 'ZodNumber':
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <NumberInput
                label={name}
                placeholder={name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                error={errors[name]?.message as string}
              />
            )}
          />
        );
      case 'ZodBoolean':
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox
                label={name}
                checked={field.value}
                onChange={(event) => field.onChange(event.currentTarget.checked)}
                error={errors[name]?.message as string}
              />
            )}
          />
        );
      case 'ZodEnum':
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                label={name}
                value={value}
                onChange={onChange}
                error={errors[name]?.message as any}
              >
                {field._def.values.map((option: string) => (
                  <Radio key={option} value={option} label={option} my={8} />
                ))}
              </RadioGroup>
            )}
          />
        );
      case 'ZodObject':
        if (field._def.shape().options) {
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  label={name}
                  placeholder={name}
                  data={field._def.shape().options}
                  value={value}
                  onChange={onChange}
                  error={errors[name]?.message as string}
                />
              )}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          //@ts-expect-error
          Object.keys(schema.shape).map((fieldName) =>
            //@ts-expect-error
            renderInput(fieldName, schema.shape[fieldName])
          )
        }
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default FormGenerator;
