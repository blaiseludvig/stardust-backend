function getDatabasePath() {
  let path = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      path = 'prod_db.sqlite';
      break;

    case 'development':
      path = 'dev_db.sqlite';
      break;

    case 'test':
      path = 'test_db.sqlite';
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
