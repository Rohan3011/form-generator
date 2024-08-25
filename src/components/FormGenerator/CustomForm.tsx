import React, { useState } from 'react';
import { FormBuilder, IForm, FieldType } from '@/forms'; // Import the FormBuilder class we created earlier
import { Box, Flex, Grid, GridCol, Switch, TextInput } from '@mantine/core';

// Field components
const TextField = ({ field, onUpdate }: any) => {
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') onUpdate({ ...field, [e.target.name]: e.target.checked });
    else onUpdate({ ...field, [e.target.name]: e.target.value });
  };

  return (
    <Flex direction="column" gap={24}>
      <TextInput
        name="name"
        value={field.name}
        label={field.label}
        placeholder="Input placeholder"
        onChange={handleUpdate}
      />

      <Flex direction="row" gap={16} justify="center" align="center">
        <Switch label="Required" name="required" checked={field.required} onChange={handleUpdate} />
        {field.type === 'text' && (
          <>
            <Switch label="Email" name="isEmail" checked={field.isEmail} onChange={handleUpdate} />

            <Switch label="URL" name="isURL" checked={field.isURL} onChange={handleUpdate} />
          </>
        )}
      </Flex>
    </Flex>
  );
};

const NumberField = ({ field, onUpdate }: any) => (
  <div>
    <label>{field.label}</label>
    <input
      type="text"
      value={field.name}
      onChange={(e) => onUpdate({ ...field, name: e.target.value })}
    />
    <input
      type="checkbox"
      checked={field.required}
      onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
    />{' '}
    Required
    <input
      type="number"
      value={field.min}
      onChange={(e) => onUpdate({ ...field, min: parseInt(e.target.value) })}
      placeholder="Min"
    />
    <input
      type="number"
      value={field.max}
      onChange={(e) => onUpdate({ ...field, max: parseInt(e.target.value) })}
      placeholder="Max"
    />
  </div>
);

// Add similar components for other field types (BooleanField, DateTimeField, etc.)

// Main FormBuilderUI component
const FormBuilderUI: React.FC = () => {
  const [form, setForm] = useState<IForm>({ id: '', name: '', fields: [] });
  const [fieldType, setFieldType] = useState<string>('text');

  const addField = () => {
    const newField: FieldType = {
      id: `field_${Date.now()}`,
      name: '',
      label: '',
      required: false,
      type: fieldType as FieldType['type'],
    };
    setForm((prevForm) => ({
      ...prevForm,
      fields: [...prevForm.fields, newField],
    }));
  };

  const updateField = (index: number, updatedField: FieldType) => {
    setForm((prevForm) => ({
      ...prevForm,
      fields: prevForm.fields.map((field, i) => (i === index ? updatedField : field)),
    }));
  };

  const renderField = (field: FieldType, index: number) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.id}
            field={field}
            onUpdate={(updatedField) => updateField(index, updatedField)}
          />
        );
      case 'number':
        return (
          <NumberField
            key={field.id}
            field={field}
            onUpdate={(updatedField) => updateField(index, updatedField)}
          />
        );
      // Add cases for other field types
      default:
        return null;
    }
  };

  return (
    <Grid>
      <Grid.Col span={'auto'}>
        <h1>Form Builder</h1>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Form Name"
        />
        <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="number">Number</option>
          {/* Add options for other field types */}
        </select>
        <button onClick={addField}>Add Field</button>
        <Box
          style={{
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            padding: '20px',
          }}
        >
          {form.fields.map((field, index) => renderField(field, index))}
        </Box>
      </Grid.Col>
      <GridCol span={4}>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </GridCol>
    </Grid>
  );
};

export default FormBuilderUI;
