import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Trasportatore, {ITrasportatore} from '../models/Trasportatore';

class TrasportatoreService {
    async trovaTutti(): Promise<ITrasportatore[]> {
        await dbConnect();
        return await Trasportatore.find();
    }

    async trovaPerId(id: string): Promise<ITrasportatore | null> {
        await dbConnect();
        return await Trasportatore.findById(id);
    }

    async crea(data: ITrasportatore): Promise<ITrasportatore> {
        await dbConnect();
        const trasportatore = new Trasportatore(data);
        return await trasportatore.save();
    }

    async aggiorna(id: string, data: Partial<ITrasportatore>): Promise<ITrasportatore | null> {
        await dbConnect();
        return await Trasportatore.findByIdAndUpdate(id, data, { new: true });
    }

    async elimina(id: string): Promise<ITrasportatore | null> {
        await dbConnect();
        return await Trasportatore.findByIdAndDelete(id);
    }

    async trovaPerUtente(utenteId: mongoose.Types.ObjectId): Promise<ITrasportatore[]> {
        await dbConnect();
        return await Trasportatore.find({utente: utenteId}).exec();
    }
}

export default new TrasportatoreService();