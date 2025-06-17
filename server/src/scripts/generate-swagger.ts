import fs from 'fs';
import path from 'path';
import { swaggerSpec } from '../infrastructure/swagger/swagger.config';

const outputPath = path.join(__dirname, '../../swagger.json');

// Generate Swagger JSON
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`Swagger documentation has been generated at: ${outputPath}`);
