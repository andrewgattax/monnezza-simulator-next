
import mongoose, {Document, Model, model, Schema} from "mongoose";
import { TipoAttivita } from "./TipoAttivita";

export enum AttivitaENUM {
    PRODUZIONE = 'produzione',
    RECUPERO = 'recupero',
    SMALTIMENTO = 'smaltimento',
    TRASPORTO = 'trasporto',
    CENTRO_DI_RACCOLTA = 'centro_di_raccolta',
    INTERMEDIAZIONE = 'intermediazione',
  }

export interface IUnitaLocale extends Document {
    comune: string,
    indirizzo: string,
    n_civico: string,
    nome: string,
    provincia: string,
    proprietario: mongoose.Types.ObjectId
    utenti_delegati: [mongoose.Types.ObjectId]
    tipoAttivita: [AttivitaENUM]
}

const UnitaLocaleSchema: Schema = new Schema<IUnitaLocale>({
    comune: { type: String, required: true },
    indirizzo: { type: String, required: true },
    n_civico: { type: String, required: true },
    nome: { type: String, required: true },
    provincia: { type: String, required: true },
    proprietario: { type: Schema.Types.ObjectId, ref: 'Utente', required: true },
    utenti_delegati: [{ type: Schema.Types.ObjectId, ref: 'Utente' }],
    tipoAttivita: [{ type: String, enum: Object.values(AttivitaENUM), required: true }]
});

UnitaLocaleSchema.index({nome: 1}, { unique: true })

const UnitaLocale: Model<IUnitaLocale> = mongoose.models.UnitaLocale || model<IUnitaLocale>("UnitaLocale", UnitaLocaleSchema);

(async () => {
    await UnitaLocale.syncIndexes(); // Sincronizza gli indici nel database
  })();

export default UnitaLocale;