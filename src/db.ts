import { Pool } from 'pg';

const connectionString = 'postgres://omkjghav:sEWbN-BZJw2cCYBO-UJQyHNCqZ6Sph8k@motty.db.elephantsql.com/omkjghav';

const db = new Pool( {connectionString });

export default db