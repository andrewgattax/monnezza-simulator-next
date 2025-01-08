import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import UnitaLocale, {IUnitaLocale} from '../models/UnitaLocale';

class UnitaLocaleService {
    async trovaTutte(): Promise<IUnitaLocale[]> {
        await dbConnect();
        return await UnitaLocale.find();
    }

    async trovaPerId(id: string): Promise<IUnitaLocale | null> {
        await dbConnect();
        return await UnitaLocale.findById(id);
    }

    async crea(data: IUnitaLocale): Promise<IUnitaLocale> {
        await dbConnect();
        const unitaLocale = new UnitaLocale(data);
        return await unitaLocale.save();
    }

    async aggiorna(id: string, data: Partial<IUnitaLocale>): Promise<IUnitaLocale | null> {
        await dbConnect();
        return await UnitaLocale.findByIdAndUpdate(id, data, { new: true });
    }

    async elimina(id: string): Promise<IUnitaLocale | null> {
        await dbConnect();
        return await UnitaLocale.findByIdAndDelete(id);
    }

    async trovaUnitaPerUtenteProprietario(userId: mongoose.Types.ObjectId): Promise<IUnitaLocale[]> {
        await dbConnect(); // Assicura la connessione al database
        return await UnitaLocale.find({ proprietario: userId }).exec();
      }

      async trovaUnitaPerUtenteDelegato(userId: mongoose.Types.ObjectId): Promise<IUnitaLocale[]> {
        await dbConnect(); // Assicura la connessione al database
        return await UnitaLocale.find({ utenti_delegati: { $in: [userId] } }).exec();
      }
}

export default new UnitaLocaleService();