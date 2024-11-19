// src/utils/generator.js

const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');

function getTypeFromValue(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'any[]';
    const itemType = getTypeFromValue(value[0]);
    return `${itemType}[]`;
  }
  if (typeof value === 'object') {
    return 'Record<string, any>';
  }
  return typeof value;
}

function generateInterface(data, interfaceName) {
  if (!interfaceName) {
    throw new Error('Interface name is required');
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return `export type ${interfaceName} = any[];`;
    const item = data[0];
    return generateInterface(item, interfaceName);
  }

  const properties = Object.entries(data).map(([key, value]) => {
    const propertyName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
    const type = getTypeFromValue(value);
    const optional = value === null ? '?' : '';
    return `  ${propertyName}${optional}: ${type};`;
  });

  return `export interface ${interfaceName} {
${properties.join('\n')}
}`;
}

async function loadConfig() {
  try {
    const configContent = await fs.readFile('enum-config.json', 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    return {
      apiEndpoints: [],
      outputDir: './src/types',
      packageName: '@your-scope/types',
      version: '1.0.0'
    };
  }
}

async function saveConfig(config) {
  await fs.writeFile('enum-config.json', JSON.stringify(config, null, 2));
}

async function generateTypes(config) {
  const { apiEndpoints, outputDir } = config;
  
  await fs.mkdir(outputDir, { recursive: true });
  
  const indexFileContent = [];
  
  for (const endpoint of apiEndpoints) {
    const { url, typeName } = endpoint;
    console.log(`Processing ${typeName} from ${url}...`);
    
    try {
      const response = await axios.get(url);
      const data = response.data;
      
      const typeContent = generateInterface(data, typeName);
      const fileName = `${typeName}.ts`;
      const filePath = path.join(outputDir, fileName);
      
      await fs.writeFile(filePath, typeContent);
      indexFileContent.push(`export { ${typeName} } from './${typeName}';`);
    } catch (error) {
      console.error(`Error processing ${url}:`, error.message);
    }
  }
  
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexFileContent.join('\n'));
}

module.exports = {
  getTypeFromValue,
  generateInterface,
  loadConfig,
  saveConfig,
  generateTypes
};