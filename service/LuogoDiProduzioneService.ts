import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import LuogoDiProduzione, {ILuogoDiProduzione} from '../models/LuogoDiProduzione';

class LuogoDiProduzioneService {
    async trovaTutti(): Promise<ILuogoDiProduzione[]> {
        await dbConnect();
        return await LuogoDiProduzione.find();
    }

    async crea(data: ILuogoDiProduzione): Promise<ILuogoDiProduzione> {
        await dbConnect();
        const nuovoLuogo = new LuogoDiProduzione(data);
        return await nuovoLuogo.save();
    }

    async aggiorna(id: string, data: Partial<ILuogoDiProduzione>): Promise<ILuogoDiProduzione | null> {
        await dbConnect();
        return await LuogoDiProduzione.findByIdAndUpdate(id, data, { new: true });
    }

    async elimina(id: string): Promise<ILuogoDiProduzione | null> {
        await dbConnect();
        return await LuogoDiProduzione.findByIdAndDelete(id);
    }
    
    async trovaPerUtente(utenteId: mongoose.Types.ObjectId): Promise<ILuogoDiProduzione[]> {
        await dbConnect();
        return await LuogoDiProduzione.find({utente: utenteId}).exec();
    }
}

export default new LuogoDiProduzioneService();