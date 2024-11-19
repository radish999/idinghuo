// __tests__/generator.test.js

const mockFs = require('mock-fs');
const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');

// Mock axios
jest.mock('axios');

// 导入需要测试的函数
const {
  generateInterface,
  getTypeFromValue,
  generateTypes,
  loadConfig,
  saveConfig
} = require('../src/utils/generator');

describe('Type Generator CLI', () => {
  describe('getTypeFromValue', () => {
    it('should return correct primitive types', () => {
      expect(getTypeFromValue('string')).toBe('string');
      expect(getTypeFromValue(123)).toBe('number');
      expect(getTypeFromValue(true)).toBe('boolean');
      expect(getTypeFromValue(null)).toBe('null');
      expect(getTypeFromValue(undefined)).toBe('undefined');
    });

    it('should handle arrays correctly', () => {
      expect(getTypeFromValue([])).toBe('any[]');
      expect(getTypeFromValue(['string'])).toBe('string[]');
      expect(getTypeFromValue([1, 2, 3])).toBe('number[]');
    });

    it('should handle objects correctly', () => {
      expect(getTypeFromValue({})).toBe('Record<string, any>');
      expect(getTypeFromValue({ key: 'value' })).toBe('Record<string, any>');
    });
  });

  describe('generateInterface', () => {
    it('should generate correct interface for simple object', () => {
      const input = {
        id: 1,
        name: 'test',
        active: true
      };
      const expected = `export interface TestInterface {
  id: number;
  name: string;
  active: boolean;
}`;
      expect(generateInterface(input, 'TestInterface').replace(/\s+/g, ' ')).toBe(
        expected.replace(/\s+/g, ' ')
      );
    });

    it('should handle nested objects', () => {
      const input = {
        id: 1,
        user: {
          name: 'test',
          age: 25
        }
      };
      const expected = `export interface TestInterface {
  id: number;
  user: Record<string, any>;
}`;
      expect(generateInterface(input, 'TestInterface').replace(/\s+/g, ' ')).toBe(
        expected.replace(/\s+/g, ' ')
      );
    });

    it('should handle arrays', () => {
      const input = {
        id: 1,
        tags: ['tag1', 'tag2']
      };
      const expected = `export interface TestInterface {
  id: number;
  tags: string[];
}`;
      expect(generateInterface(input, 'TestInterface').replace(/\s+/g, ' ')).toBe(
        expected.replace(/\s+/g, ' ')
      );
    });

    it('should throw error when interface name is not provided', () => {
      const input = { id: 1 };
      expect(() => generateInterface(input)).toThrow('Interface name is required');
    });
  });

  describe('Config Management', () => {
    beforeEach(() => {
      // 设置模拟文件系统
      mockFs({
        'enum-config.json': JSON.stringify({
          apiEndpoints: [
            { url: 'http://api.test/data', typeName: 'TestType' }
          ],
          outputDir: './src/types',
          packageName: 'test-package',
          version: '1.0.0'
        })
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it('should load config correctly', async () => {
      const config = await loadConfig();
      expect(config).toHaveProperty('apiEndpoints');
      expect(config).toHaveProperty('outputDir');
      expect(config.apiEndpoints).toHaveLength(1);
    });

    it('should save config correctly', async () => {
      const newConfig = {
        apiEndpoints: [
          { url: 'http://api.test/newdata', typeName: 'NewType' }
        ],
        outputDir: './src/types',
        packageName: 'test-package',
        version: '1.0.0'
      };

      await saveConfig(newConfig);
      const savedConfig = await loadConfig();
      expect(savedConfig).toEqual(newConfig);
    });
  });

  describe('Type Generation', () => {
    beforeEach(() => {
      // 设置模拟文件系统
      mockFs({
        'src/types': {}
      });

      // 模拟 API 响应
      axios.get.mockResolvedValue({
        data: {
          id: 1,
          name: 'test',
          active: true
        }
      });
    });

    afterEach(() => {
      mockFs.restore();
      jest.clearAllMocks();
    });

    it('should generate type definitions correctly', async () => {
      const config = {
        apiEndpoints: [
          { url: 'http://api.test/data', typeName: 'TestType' }
        ],
        outputDir: './src/types'
      };

      await generateTypes(config);

      // 验证文件是否被创建
      const files = await fs.readdir('./src/types');
      expect(files).toContain('TestType.ts');
      expect(files).toContain('index.ts');

      // 验证文件内容
      const typeContent = await fs.readFile('./src/types/TestType.ts', 'utf-8');
      expect(typeContent).toContain('export interface TestType');
      expect(typeContent).toContain('id: number');
      expect(typeContent).toContain('name: string');
      expect(typeContent).toContain('active: boolean');

      const indexContent = await fs.readFile('./src/types/index.ts', 'utf-8');
      expect(indexContent).toBe("export { TestType } from './TestType';");
    });

    it('should handle API errors gracefully', async () => {
      axios.get.mockRejectedValue(new Error('API Error'));

      const config = {
        apiEndpoints: [
          { url: 'http://api.test/error', typeName: 'ErrorType' }
        ],
        outputDir: './src/types'
      };

      await expect(generateTypes(config)).resolves.not.toThrow();
    });
  });
});