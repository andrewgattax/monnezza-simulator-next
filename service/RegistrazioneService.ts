import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Registrazione, {IRegistrazione} from '../models/Registrazione';

class RegistrazioneService {
    async trovaTutte(): Promise<IRegistrazione[]> {
        await dbConnect();
        return await Registrazione.find();
    }

    async trovaPerId(id: string): Promise<IRegistrazione | null> {
        await dbConnect();
        return await Registrazione.findById(id);
    }

    async crea(data: IRegistrazione): Promise<IRegistrazione> {
        await dbConnect();
        const nuovaRegistrazione = new Registrazione(data);
        return await nuovaRegistrazione.save();
    }

    async aggiorna(id: string, data: Partial<IRegistrazione>): Promise<IRegistrazione | null> {
        await dbConnect();
        return await Registrazione.findByIdAndUpdate(id, data, { new: true });
    }

    async elimina(id: string): Promise<IRegistrazione | null> {
        await dbConnect();
        return await Registrazione.findByIdAndDelete(id);
    }

    async trovaPerRegistro(registroId: string): Promise<IRegistrazione[]> {
        await dbConnect();
        return await Registrazione.find({registro: registroId}).exec();
    }
    
}

export default new RegistrazioneService();