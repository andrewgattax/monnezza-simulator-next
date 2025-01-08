import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Produttore, {IProduttore} from '../models/Produttore';

class ProduttoreService {
    async trovaTutti(): Promise<IProduttore[]> {
        await dbConnect();
        return await Produttore.find();
    }

    async trovaPerId(id: string): Promise<IProduttore | null> {
        await dbConnect();
        return await Produttore.findById(id);
    }

    async crea(produttoreData: IProduttore): Promise<IProduttore> {
        await dbConnect();
        const produttore = new Produttore(produttoreData);
        return await produttore.save();
    }

    async aggiorna(id: string, produttoreData: Partial<IProduttore>): Promise<IProduttore | null> {
        await dbConnect();
        return await Produttore.findByIdAndUpdate(id, produttoreData, { new: true });
    }

    async elimina(id: string): Promise<IProduttore | null> {
        await dbConnect();
        return await Produttore.findByIdAndDelete(id);
    }

    async trovaPerUtente(utenteId: string): Promise<IProduttore[]> {
        await dbConnect();
        return await Produttore.find({utente: utenteId}).exec();
    }
    
}

export default new ProduttoreService();