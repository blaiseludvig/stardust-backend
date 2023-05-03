import { deleteDatabase } from './testUtils';

it('deletes the database successfully', async () => {
  try {
    deleteDatabase();
  } catch (error) {
    expect(error).toBeNull();
  }
});
