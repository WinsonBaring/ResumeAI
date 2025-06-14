import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// Give your config array a name
const config = [ // Renamed from eslintConfig
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            '@typescript-eslint/no-explicit-any':"off",
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react/no-unescaped-entities': 'off',
        },
    },
];

// Export the named constant
export default config; // Exporting the named 'config'