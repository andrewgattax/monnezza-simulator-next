import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Utente, {IUtente} from '../models/Utente';

class UtenteService {
    // Trova tutti gli utenti
    async trovaTutti(): Promise<IUtente[]> {
      await dbConnect();
      return await Utente.find();
    }
  
    // Trova un utente per ID
    async trovaPerId(id: string): Promise<IUtente | null> {
      await dbConnect();
      return await Utente.findById(id);
    }

    // Trova un utente per email e ritorna l'hashed password
    async trovaPerEmail(email: string): Promise<string | null> {
        await dbConnect();
        const utente = await Utente.findOne({ email });
        return utente ? utente.passwordHash : null;
    }
  
    // Crea un nuovo utente
    async crea(dati: Partial<IUtente>): Promise<IUtente> {
      await dbConnect();
      const nuovoUtente = new Utente(dati);
      return await nuovoUtente.save();
    }
  
    // Aggiorna un utente
    async aggiorna(id: string, dati: Partial<IUtente>): Promise<IUtente | null> {
      await dbConnect();
      return await Utente.findByIdAndUpdate(id, dati, { new: true });
    }
  
    // Elimina un utente
    async elimina(id: string): Promise<void> {
      await dbConnect();
      await Utente.findByIdAndDelete(id);
    }
  }

export default new UtenteService();