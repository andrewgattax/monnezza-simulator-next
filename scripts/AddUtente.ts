import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import Utente, { Ruolo } from "../src/models/Utente";



const addUser = async () => {
    try {
      await dbConnect();
  
      const nuovoUtente = new Utente({
        nome: "Mario",
        cognome: "Rossi",
        email: "mario.rossi@example.com",
        codice_fiscale: "RSSMRA85M01H501Z",
        passwordHash: "hashed_password", // Sostituisci con una password hash reale
        ruolo: Ruolo.CLIENTE,
      });
  
      const utenteSalvato = await nuovoUtente.save();
      console.log("Utente creato con successo:", utenteSalvato);
    } catch (error) {
      console.error("Errore durante la creazione dell'utente:", error);
    } finally {
      mongoose.connection.close();
    }
  };

  addUser();