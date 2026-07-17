const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src', 'modules', 'dynamic-form-v2', 'components');

const dirs = [
  'DynamicForm',
  'fields',
  'components',
  'renderers'
];

dirs.forEach(d => fs.mkdirSync(path.join(basePath, d), { recursive: true }));

const fieldFiles = [
  'TextField', 'TextAreaField', 'NumberField', 'CurrencyField', 
  'PercentageField', 'EmailField', 'PhoneField', 'PasswordField', 
  'DateField', 'MonthField', 'YearField', 'SwitchField', 
  'CheckboxField', 'RadioField', 'SelectField', 'AutocompleteField', 
  'FileField', 'FormField', 'HiddenField'
];

const componentFiles = [
  'VerificationButton', 'OTPInput', 'UploadCard', 'FormToolbar', 
  'SectionCard', 'LoadingSkeleton', 'EmptyState'
];

const rendererFiles = [
  'CardRenderer', 'AccordionRenderer', 'TabsRenderer', 'TableRenderer', 'StepperRenderer'
];

const writeComponent = (dir, name) => {
  const content = `import React from 'react';\n\nexport const ${name} = (props: any) => {\n  return <div>${name}</div>;\n};\n`;
  fs.writeFileSync(path.join(basePath, dir, `${name}.tsx`), content);
};

fieldFiles.forEach(f => writeComponent('fields', f));
componentFiles.forEach(c => writeComponent('components', c));
rendererFiles.forEach(r => writeComponent('renderers', r));

// create index files
const writeIndex = (dir, files) => {
  const content = files.map(f => `export * from './${f}';`).join('\n') + '\n';
  fs.writeFileSync(path.join(basePath, dir, 'index.ts'), content);
};

writeIndex('fields', fieldFiles);
writeIndex('components', componentFiles);
writeIndex('renderers', rendererFiles);

// write root index
fs.writeFileSync(path.join(basePath, 'index.ts'), `export * from './DynamicForm';\nexport * from './fields';\nexport * from './components';\nexport * from './renderers';\n`);

console.log("Components generated");
