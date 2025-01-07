import mongoose, {Document, Schema} from "mongoose";

enum AttivitaENUM {
    PRODUZIONE,
    RECUPERO,
    SMALTIMENTO,
    TRASPORTO,
    CENTRO_DI_RACCOLTA,
    INTERMEDIAZIONE
}

enum CodiciRifiuto {
    R1,
    R3,
    R5,
    R11,
    R13
}

export interface TipoAttivita {
    tipo: AttivitaENUM;
    codiciRifiuto: CodiciRifiuto[];
}

export interface IRegistro extends Document {
    nome: string,
    isAttivo: boolean,
    unitaLocale: mongoose.Types.ObjectId,
    dataApertura: Date,
    tipoAttivita: [TipoAttivita]
}

const RegistroSchema: Schema = new Schema<IRegistro>({
    nome: { type: String, required: true },
    isAttivo: { type: Boolean, required: true , default: true},
    unitaLocale: { type: Schema.Types.ObjectId, ref: 'UnitaLocale', required: true },
    dataApertura: { type: Date, required: true },
    tipoAttivita: [{
        tipo: { type: String, enum: Object.values(AttivitaENUM), required: true },
        codiciRifiuto: [{ type: String, enum: Object.values(CodiciRifiuto), required: true }]
    }]
});

const Registro = mongoose.model<IRegistro>('Registro', RegistroSchema);

export default Registro;