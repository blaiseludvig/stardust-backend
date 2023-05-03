import 'tsconfig-paths/register';
import { deleteDatabase } from './testUtils';

export default async () => {
  try {
    deleteDatabase();
    console.log('✅ The test database was deleted successfully.');
  } catch (error) {
    throw new Error('❌ The test database could not be deleted.');
  }
};
