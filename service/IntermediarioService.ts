import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Intermediario, {IIntermediario} from '../models/Intermediario';

class IntermediarioService {
    async trovaTutti(): Promise<IIntermediario[]> {
        await dbConnect();
        return await Intermediario.find();
    }

    async crea(intermediarioData: IIntermediario): Promise<IIntermediario> {
        await dbConnect();
        const intermediario = new Intermediario(intermediarioData);
        return await intermediario.save();
    }

    async aggiorna(id: string, intermediarioData: Partial<IIntermediario>): Promise<IIntermediario | null> {
        await dbConnect();
        return await Intermediario.findByIdAndUpdate(id, intermediarioData, { new: true });
    }

    async elimina(id: string): Promise<IIntermediario | null> {
        await dbConnect();
        return await Intermediario.findByIdAndDelete(id);
    }

    async trovaPerUtente(utenteId: mongoose.Types.ObjectId): Promise<IIntermediario[]> {
        await dbConnect();
        return await Intermediario.find({utente: utenteId}).exec();
    }
 }

 export default new IntermediarioService();