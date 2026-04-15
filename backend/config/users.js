const bcrypt = require('bcryptjs');
const { getDb } = require('./database');

const UserStore = {
  findByEmail: async (email) => {
    const db = await getDb();
    return db.get(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
      [email]
    );
  },

  findById: async (id) => {
    const db = await getDb();
    return db.get(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
  },

  create: async ({ name, email, password }) => {
    const db = await getDb();

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const createdAt = new Date().toISOString();

    await db.run(
      'INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)',
      [id, name, email.toLowerCase(), hashedPassword, createdAt]
    );

    return {
      id,
      name,
      email: email.toLowerCase(),
      createdAt,
    };
  },

  comparePassword: async (plain, hashed) =>
    bcrypt.compare(plain, hashed),

  sanitize: (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }),
};

module.exports = UserStore;
