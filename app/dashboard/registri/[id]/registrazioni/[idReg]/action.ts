'use server'
import { redirect } from 'next/navigation'
import { PrismaClient, LuogoProduzione, AttivitaENUM, TipoOperazione, CausaleOperazione, TipologiaRespingimento, UnitaMisura, CausaleRespingimento, Rifiuto, ProvenienzaRifiuto, PericoloRifiuto, StatoFisicoRifiuto, CodiceAttivita, CategoriaRAEE, TipoTrasportoFrontaliero, Prisma, TipoAttivita, Registro, Registrazione } from '@prisma/client'
import { auth } from '../../../../../../auth'


const prisma = new PrismaClient()

export default async function registrazioneServerAction(prevState: any, formData: FormData) {
  // ottieni tutti i campi 
  const session = await auth()
  if (!session) {
    return { message: 'Sessione non valida, riautenticarsi' }
  }

  let objectId, action, registroId, progressivo;
  let tipoAttivita, isStoccaggioInstant, dataOraRegistrazione, tipoOperazione, causaleOperazione, dataCalcoloStoccaggio, riferimentoRegistrazione, codiceEER;
  let provenienzaRifiuto, descrizioneRifiuto, pericoloRifiuto, statoFisico, quantita, unitaDiMisura, destinazioneRifiuto, categoriaRAEE, isVeicoloFuoriUso;
  let numeroRegistrazionePubblicaSicurezza, dataRegistrazionePubblicaSicurezza, isIntegratoFIR, numeroFIR, trasportoFrontaliero, tipoTrasporto, dataInizioTrasporto, dataFineTrasporto, isConferito, pesoADestino, isRespinto;
  let tipologiaRespingimento, quantitaRespingimento, unitaDiMisuraRespingimento, causaleRespingimento, causaleRespingimentoDesc, annotazioni;

  try {
    registroId = formData.get("registroId");
    action = formData.get("action");
    tipoAttivita = formData.get("tipoAttivita");
    isStoccaggioInstant = formData.get("isStoccaggioInstant");
    dataOraRegistrazione = formData.get("dataOraRegistrazione");
    tipoOperazione = formData.get("tipoOperazione");
    causaleOperazione = formData.get("causaleOperazione");
    dataCalcoloStoccaggio = formData.get("dataCalcoloStoccaggio");
    riferimentoRegistrazione = formData.get("riferimentoRegistrazione");
    codiceEER = formData.get("codiceEER");
    provenienzaRifiuto = formData.get("provenienzaRifiuto");
    descrizioneRifiuto = formData.get("descrizioneRifiuto");
    pericoloRifiuto = formData.get("pericoloRifiuto");
    statoFisico = formData.get("statoFisico");
    quantita = formData.get("quantita");
    unitaDiMisura = formData.get("unitaMisura");
    destinazioneRifiuto = formData.get("destinazioneRifiuto");
    categoriaRAEE = formData.get("categoriaRAEE");
    isVeicoloFuoriUso = formData.get("isVeicoloFuoriUso");
    numeroRegistrazionePubblicaSicurezza = formData.get("numeroRegistrazionePubblicaSicurezza");
    dataRegistrazionePubblicaSicurezza = formData.get("dataRegistrazionePubblicaSicurezza");
    isIntegratoFIR = formData.get("isIntegratoFIR");
    numeroFIR = formData.get("numeroFIR");
    trasportoFrontaliero = formData.get("trasportoFrontaliero");
    tipoTrasporto = formData.get("tipoTrasporto");
    dataInizioTrasporto = formData.get("dataInizioTrasporto");
    dataFineTrasporto = formData.get("dataFineTrasporto"),
      isConferito = formData.get("isConferito");
    pesoADestino = formData.get("pesoADestino");
    isRespinto = formData.get("isRespinto");
    tipologiaRespingimento = formData.get("tipologiaRespingimento");
    quantitaRespingimento = formData.get("quantitaRespingimento");
    unitaDiMisuraRespingimento = formData.get("unitaDiMisuraRespingimento");
    causaleRespingimento = formData.get("causaleRespingimento");
    causaleRespingimentoDesc = formData.get("causaleRespingimentoDesc");
    annotazioni = formData.get("annotazioni");
  } catch (error) {
    return { message: "Errore durante il recupero dei dati dal form" }
  }

  //TODO: TOGLI LA BUCCIA DI BANANA DAL CASSETTO




  let registrazioniProgressivi = riferimentoRegistrazione ? riferimentoRegistrazione.toString().split('-') : [];
  let registrazioniId = await Promise.all(
    registrazioniProgressivi.map(async (p) => {
      console.log(p)
      const registrazione = await prisma.registrazione.findFirst({
        where: {
          progressivo: p,
          registroId: registroId?.toString()
        },
        select: {
          id: true
        }
      });
      console.log(registrazione)
      return registrazione ? registrazione.id : ""
    })
  );


  if (action === "update") {
    objectId = formData.get("objectId");
    if (!objectId) {
      return { message: "ID non fornito per l\'aggiornamento" }
    }

    try {

      let rifiuto = {
        codiceEER: codiceEER ? codiceEER.toString() : "",
        provenienzaRifiuto: provenienzaRifiuto ? provenienzaRifiuto as ProvenienzaRifiuto : undefined,
        descrizione: descrizioneRifiuto ? descrizioneRifiuto.toString() : "",
        pericoloRifiuto: pericoloRifiuto ? pericoloRifiuto as PericoloRifiuto : undefined,
        statoFisicoRifiuto: statoFisico as StatoFisicoRifiuto,
        quantita: Number(quantita),
        unitaDiMisura: unitaDiMisura as UnitaMisura,
        categoriaRAAE: categoriaRAEE ? categoriaRAEE as CategoriaRAEE : undefined,
        destinazioneRifiuto: destinazioneRifiuto ? destinazioneRifiuto as CodiceAttivita : undefined
      }

      let updatedRegistrazione = {
        tipoAttivita: tipoAttivita ? tipoAttivita as AttivitaENUM : undefined,
        isStoccaggioInstant: isStoccaggioInstant ? Boolean(isStoccaggioInstant) : undefined,
        dataOraRegistrazione: dataOraRegistrazione ? new Date(dataOraRegistrazione.toString()) : undefined,
        tipoOperazione: tipoOperazione ? tipoOperazione as TipoOperazione : undefined,
        causaleOperazione: causaleOperazione ? causaleOperazione as CausaleOperazione : undefined,
        dataCalcoloStoccaggio: dataCalcoloStoccaggio ? new Date(dataCalcoloStoccaggio.toString()) : undefined,
        rifiuto: rifiuto,
        isVeicoloFuoriUso: isVeicoloFuoriUso ? Boolean(isVeicoloFuoriUso) : undefined,
        numeroRegistrazionePubblicaSicurezza: numeroRegistrazionePubblicaSicurezza ? numeroRegistrazionePubblicaSicurezza.toString() : undefined,
        dataRegistrazionePubblicaSicurezza: dataRegistrazionePubblicaSicurezza ? new Date(dataRegistrazionePubblicaSicurezza.toString()) : undefined,
        isIntegratoFIR: isIntegratoFIR ? Boolean(isIntegratoFIR) : undefined,
        numeroFIR: numeroFIR ? numeroFIR.toString() : undefined,
        trasportoFrontaliero: trasportoFrontaliero ? Boolean(trasportoFrontaliero) : undefined,
        tipoTrasportoFrontaliero: tipoTrasporto ? tipoTrasporto as TipoTrasportoFrontaliero : undefined,
        dataInizioTrasporto: dataInizioTrasporto ? new Date(dataInizioTrasporto.toString()) : undefined,
        dataFineTrasporto: dataFineTrasporto ? new Date(dataFineTrasporto.toString()) : undefined,
        isConferito: isConferito ? Boolean(isConferito) : undefined,
        pesoADestino: pesoADestino ? Number(pesoADestino) : undefined,
        isRespinto: isRespinto ? Boolean(isRespinto) : undefined,
        tipologiaRespingimento: tipologiaRespingimento ? tipologiaRespingimento as TipologiaRespingimento : undefined,
        quantitaRespingimento: quantitaRespingimento ? Number(quantitaRespingimento) : undefined,
        unitaDiMisuraRespingimento: unitaDiMisuraRespingimento ? unitaDiMisuraRespingimento as UnitaMisura : undefined,
        causaleRespingimento: causaleRespingimento ? causaleRespingimento as CausaleRespingimento : undefined,
        causaleRespingimentoDesc: causaleRespingimentoDesc ? causaleRespingimentoDesc.toString() : undefined,
        annotazioni: annotazioni ? annotazioni.toString() : undefined,
        registrazioniFiglie: registrazioniId ? registrazioniId : []
      }

      const cleanedData = Object.fromEntries(
        Object.entries(updatedRegistrazione).filter(([_, value]) => value !== undefined)
      );

      console.log(cleanedData);
      console.log(objectId)
      await prisma.registrazione.update({
        where: { id: objectId?.toString() },
        data: cleanedData
      });
    } catch (error) {
      console.error(error)
      return { message: "Errore del database durante l\'aggiornamento della registrazione" }
    }

    //TODO: Aggiustare questo redirect
    // redirect(`/dashboard/luoghiproduzione?success=1`);
  } else if (action === "create") {

    try {
      const registro = await prisma.registro.findUnique({
        where: { id: registroId!.toString() },
        select: { progressivoCounter: true }
      });
      progressivo = new Date(dataOraRegistrazione!.toString()).getFullYear().toString() + "/" + (registro!.progressivoCounter + 1);
    } catch (error) {
      return { message: "Registro non trovato" };
    }

    let rifiuto: Rifiuto = {
      codiceEER: codiceEER ? codiceEER.toString() : "",
      provenienzaRifiuto: provenienzaRifiuto ? provenienzaRifiuto as ProvenienzaRifiuto : null,
      descrizione: descrizioneRifiuto ? descrizioneRifiuto.toString() : "",
      pericoloRifiuto: pericoloRifiuto ? pericoloRifiuto as PericoloRifiuto : null,
      statoFisicoRifiuto: statoFisico as StatoFisicoRifiuto,
      quantita: Number(quantita),
      unitaDiMisura: unitaDiMisura as UnitaMisura,
      categoriaRAAE: categoriaRAEE ? categoriaRAEE as CategoriaRAEE : null,
      destinazioneRifiuto: destinazioneRifiuto ? destinazioneRifiuto as CodiceAttivita : null
    }

    const nuovaRegistrazione = {
      isTrasmessa: false,
      trasportatoreId: null,
      destinatarioId: null,
      intermediarioId: null,
      luogoDiProduzioneId: null,
      produttoreId: null,
      registroId: registroId!.toString(),
      progressivo: progressivo,
      tipoAttivita: tipoAttivita as AttivitaENUM,
      isStoccaggioInstant: isStoccaggioInstant ? Boolean(isStoccaggioInstant) : false,
      dataOraRegistrazione: dataOraRegistrazione ? new Date(dataOraRegistrazione.toString()) : new Date(),
      tipoOperazione: tipoOperazione ? tipoOperazione as TipoOperazione : null,
      causaleOperazione: causaleOperazione ? causaleOperazione as CausaleOperazione : null,
      dataCalcoloStoccaggio: dataCalcoloStoccaggio ? new Date(dataCalcoloStoccaggio.toString()) : null,
      registrazioniFiglie: registrazioniId ? registrazioniId : [],
      rifiuto: rifiuto,
      isVeicoloFuoriUso: isVeicoloFuoriUso ? Boolean(isVeicoloFuoriUso) : false,
      numeroRegistrazionePubblicaSicurezza: numeroRegistrazionePubblicaSicurezza ? numeroRegistrazionePubblicaSicurezza.toString() : null,
      dataRegistrazionePubblicaSicurezza: dataRegistrazionePubblicaSicurezza ? new Date(dataRegistrazionePubblicaSicurezza.toString()) : null,
      isIntegratoFIR: isIntegratoFIR ? Boolean(isIntegratoFIR) : false,
      numeroFIR: numeroFIR ? numeroFIR.toString() : null,
      trasportoFrontaliero: trasportoFrontaliero ? Boolean(trasportoFrontaliero) : false,
      tipoTrasportoFrontaliero: tipoTrasporto as TipoTrasportoFrontaliero,
      dataInizioTrasporto: dataInizioTrasporto ? new Date(dataInizioTrasporto.toString()) : null,
      dataFineTrasporto: dataFineTrasporto ? new Date(dataFineTrasporto.toString()) : null,
      isConferito: isConferito ? Boolean(isConferito) : false,
      pesoADestino: pesoADestino ? Number(pesoADestino) : null,
      isRespinto: isRespinto ? Boolean(isRespinto) : false,
      tipologiaRespingimento: tipologiaRespingimento ? tipologiaRespingimento as TipologiaRespingimento : null,
      quantitaRespingimento: quantitaRespingimento ? Number(quantitaRespingimento) : null,
      unitaDiMisuraRespingimento: unitaDiMisuraRespingimento ? unitaDiMisuraRespingimento as UnitaMisura : null,
      causaleRespingimento: causaleRespingimento ? causaleRespingimento as CausaleRespingimento : null,
      causaleRespingimentoDesc: causaleRespingimentoDesc ? causaleRespingimentoDesc.toString() : null,
      annotazioni: annotazioni ? annotazioni.toString() : "",
    };

    try {
      console.log(nuovaRegistrazione);
      //TODO: Payload is null ma come ma che cazzo dici dioporco bastardo
      await prisma.registrazione.create({
        data: nuovaRegistrazione
      });
      await prisma.registro.update({
        where: { id: registroId!.toString() },
        data: { progressivoCounter: { increment: 1 } }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("gay")
        console.error('Errore conosciuto di Prisma:', error.message);
      } else {
        console.log(error)
      }
      return { message: "Errore del database nella creazione della registrazione" }
    }

  } else if (action === "remove") {
    objectId = formData.get('objectId')
    if (!objectId) {
      return { message: 'ID non fornito per la rimozione' }
    }

    try {
      await prisma.registrazione.delete({
        where: { id: objectId.toString() }, //TODO: aggiungere filtro per utente
      });
    } catch (error) {
      return { message: 'Errore del database durante la rimozione della registrazione' }
    }

    redirect(formData.get('hrefBack')?.toString() || "/dashboard"); //TODO: cosa super porca
    //TODO: STANDARDIZZARE TUTTI I REDIRECT INDIETRO NELLE ACTION CON l'hrefBack!!!!
  }

  redirect(`/dashboard/registri/${registroId}/registrazioni/?success=1`);
  //TODO: Controllare utente che chiama action.ts

}