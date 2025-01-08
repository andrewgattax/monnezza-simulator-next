import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';
import Registro, {IRegistro} from '../models/Registro';

class RegistroService {
    async trovaTutti(): Promise<IRegistro[]> {
        await dbConnect();
        return await Registro.find();
    }

    async trovaPerId(id: string): Promise<IRegistro | null> {
        await dbConnect();
        return await Registro.findById(id);
    }

    async crea(data: IRegistro): Promise<IRegistro> {
        await dbConnect();
        const nuovoRegistro = new Registro(data);
        return await nuovoRegistro.save();
    }

    async aggiorna(id: string, data: Partial<IRegistro>): Promise<IRegistro | null> {
        await dbConnect();
        return await Registro.findByIdAndUpdate(id, data, { new: true });
    }

    async elimina(id: string): Promise<IRegistro | null> {
        await dbConnect();
        return await Registro.findByIdAndDelete(id);
    }

    async trovaPerUnitaLocale(unitaId: mongoose.Types.ObjectId): Promise<IRegistro[]> {
        await dbConnect();
        return await Registro.find({unitaLocale: unitaId}).exec();
    }


}

export default new RegistroService();