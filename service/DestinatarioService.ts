import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Destinatario, {IDestinatario} from '../models/Destinatario';

class DestinatarioService {
    async trovaTutti(): Promise<IDestinatario[]> {
        await dbConnect();
        return await Destinatario.find();
    }

    async trovaPerId(id: string): Promise<IDestinatario | null> {
        await dbConnect();
        return await Destinatario.findById(id);
    }

    async crea(destinatarioData: IDestinatario): Promise<IDestinatario> {
        await dbConnect();
        const destinatario = new Destinatario(destinatarioData);
        return await destinatario.save();
    }

    async aggiorna(id: string, destinatarioData: Partial<IDestinatario>): Promise<IDestinatario | null> {
        await dbConnect();
        return await Destinatario.findByIdAndUpdate(id, destinatarioData, { new: true });
    }

    async elimina(id: string): Promise<IDestinatario | null> {
        await dbConnect();
        return await Destinatario.findByIdAndDelete(id);
    }

    async trovaPerUtente(utenteId: mongoose.Types.ObjectId): Promise<IDestinatario[]> {
        await dbConnect();
        return await Destinatario.find({utente: utenteId}).exec();
    }
}

export default new DestinatarioService();