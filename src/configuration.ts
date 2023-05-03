function getDatabasePath() {
  let path = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      path = 'db.sql';
      break;

    case 'development':
      path = 'test_db.sql';
      break;

    default:
      throw new Error(
        'The NODE_ENV environmental variable needs to be defined explicitly',
      );
  }
  return path;
}

export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  DB_PATH: getDatabasePath(),
});