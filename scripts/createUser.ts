import { PrismaClient, Ruolo } from '@prisma/client';
import { genSaltSync, hashSync } from "bcrypt-ts";
import readline from 'readline';


const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
  return new Promise(resolve => rl.question(query, resolve));
};

const firstUserData = await (async () => {
  const nome = await askQuestion('Enter first name: ');
  const cognome = await askQuestion('Enter last name: ');
  const email = await askQuestion('Enter email: ');
  const codice_fiscale = await askQuestion('Enter codice fiscale: ');
  const ruoloInput = await askQuestion('Enter role (ADMIN/USER): ');
  const ruolo = ruoloInput.toUpperCase() === 'ADMIN' ? Ruolo.ADMIN : Ruolo.USER;
  rl.close();
  return {
    nome,
    cognome,
    email,
    codice_fiscale,
    passwordHash: '',
    ruolo,
    totpSecret: '',
  };
})();

async function createFirstUser() {
  try {
    // Check if the first user already exists
    const existingUser = await prisma.utente.findUnique({
      where: { email: firstUserData.email },
    });

    if (existingUser) {
      console.log('First user already exists. Skipping user creation.');
      return;
    }

    // Generate a random password
    const generateRandomPassword = (length: number): string => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
      let password = '';
      for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
      }
      return password;
    };

    const randomPassword = generateRandomPassword(12);
    console.log('Generated random password:', randomPassword);

    // Hash the password using bcryptjs (don't store plain-text passwords)
    const salt = genSaltSync(10);
    const hash = hashSync(randomPassword, salt);
    const userData = { ...firstUserData, passwordHash: hash };

    // Create the first user
    const user = await prisma.utente.create({
      data: userData,
    });

    console.log('First user created successfully:', user);
  } catch (error) {
    console.error('Error creating the first user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createFirstUser();
