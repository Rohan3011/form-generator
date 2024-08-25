// Extend the existing interfaces
export interface IField {
  id: string;
  name: string;
  required: boolean;
  label: string;
}

export interface IFieldText extends IField {
  type: 'text';
  isEmail?: boolean;
  isURL?: boolean;
}

export interface IFieldRichText extends IField {
  type: 'richText';
}

export interface IFieldNumber extends IField {
  type: 'number';
  min?: number;
  max?: number;
}

export interface IFieldBoolean extends IField {
  type: 'boolean';
}

export interface IFieldDateTime extends IField {
  type: 'dateTime';
  format?: string;
}

export interface IFieldSelect extends IField {
  type: 'select';
  options: { label: string; value: string }[];
  multiple?: boolean;
}

export interface IFieldFile extends IField {
  type: 'file';
  acceptedTypes?: string[];
  maxSize?: number;
}

export interface IFieldJSON extends IField {
  type: 'json';
}

// Union type for all field types
export type FieldType =
  | IFieldText
  | IFieldRichText
  | IFieldNumber
  | IFieldBoolean
  | IFieldDateTime
  | IFieldSelect
  | IFieldFile
  | IFieldJSON;

// Form interface
export interface IForm {
  id: string;
  name: string;
  fields: FieldType[];
}

// Form Builder class
export class FormBuilder {
  private form: IForm;

  constructor(id: string, name: string) {
    this.form = {
      id,
      name,
      fields: [],
    };
  }

  addTextField(field: Omit<IFieldText, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'text' });
    return this;
  }

  addRichTextField(field: Omit<IFieldRichText, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'richText' });
    return this;
  }

  addNumberField(field: Omit<IFieldNumber, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'number' });
    return this;
  }

  addBooleanField(field: Omit<IFieldBoolean, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'boolean' });
    return this;
  }

  addDateTimeField(field: Omit<IFieldDateTime, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'dateTime' });
    return this;
  }

  addSelectField(field: Omit<IFieldSelect, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'select' });
    return this;
  }

  addFileField(field: Omit<IFieldFile, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'file' });
    return this;
  }

  addJSONField(field: Omit<IFieldJSON, 'type'>): FormBuilder {
    this.form.fields.push({ ...field, type: 'json' });
    return this;
  }

  getForm(): IForm {
    return this.form;
  }
}

// Usage example
const formBuilder = new FormBuilder('form1', 'My Form');

formBuilder
  .addTextField({
    id: 'name',
    name: 'name',
    label: 'Full Name',
    required: true,
  })
  .addTextField({
    id: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    isEmail: true,
  })
  .addNumberField({
    id: 'age',
    name: 'age',
    label: 'Age',
    required: false,
    min: 0,
    max: 120,
  })
  .addSelectField({
    id: 'country',
    name: 'country',
    label: 'Country',
    required: true,
    options: [
      { label: 'USA', value: 'usa' },
      { label: 'Canada', value: 'canada' },
      { label: 'UK', value: 'uk' },
    ],
  });

const myForm = formBuilder.getForm();
console.log(JSON.stringify(myForm, null, 2));
