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

function getJwtSecret() {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error(
      'The JWT_SECRET environmental variable needs to be defined. Please define it in the .env file.',
    );
  }

  return JWT_SECRET;
}

export default () => ({
  JWT_SECRET: getJwtSecret(),
  DB_PATH: getDatabasePath(),
});
