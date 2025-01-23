import React, { use } from 'react';
import { Prisma, Registrazione } from '@prisma/client';
import { enumToName, toNiceDate, toNiceDateNoTime } from '../../../../../../../utils';
import { PrismaClient } from '@prisma/client/extension';

interface DetailProps {
    registrazione: Promise<Registrazione>;
    progressivi?: String[]
}



const RegistrazioneDetail: React.FC<DetailProps> = ({ registrazione, progressivi }) => {
    const detail = use(registrazione);

    return (
        <div>
            <section className='px-5 py-3'>
                <center className='section-title'>Riferimenti Registrazione</center>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Progressivo</b>
                            </div>
                            <div className="col">
                                {detail.progressivo}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Creata il</b>
                            </div>
                            <div className="col">
                                {toNiceDate(detail.createdAt)}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Data Registrazione</b>
                            </div>
                            <div className="col">
                                {toNiceDateNoTime(detail.dataOraRegistrazione)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Tipo Attività</b>
                            </div>
                            <div className="col">
                                {detail.tipoAttivita}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Tipo Operazione</b>
                            </div>
                            <div className="col">
                                {detail.tipoOperazione ? detail.tipoOperazione : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Causale Operazione</b>
                            </div>
                            <div className="col">
                                {detail.causaleOperazione ? detail.causaleOperazione : " - "}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Trasmissione</b>
                            </div>
                            <div className="col">
                                <span className={detail.isTrasmessa ? "badge text-bg-success" : "badge text-bg-danger"}>
                                    {detail.isTrasmessa ? "TRASMESSA" : "NON TRASMESSA"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Riferimenti a</b>
                            </div>
                            <div className="col">
                                {
                                    //TODO: PORCATA ASSOLUTA MA FUNZIONA (machecazz?)
                                }
                                {progressivi && progressivi.length > 0 ? (
                                    progressivi.map((p) => {
                                        return (
                                            <span key={`${p}`} className="badge text-bg-secondary mr-1">{p}</span>
                                        )
                                    })
                                ) : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">

                    </div>
                </div>
            </section>
            <hr style={{ width: '90%', margin: '30px auto' }} />
            <section className='px-5 py-3'>
                <center className='section-title'>Dettagli Rifiuto</center>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Codice EER</b>
                            </div>
                            <div className="col">
                                {detail.rifiuto.codiceEER}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Provenienza Rifiuto</b>
                            </div>
                            <div className="col">
                                {detail.rifiuto.provenienzaRifiuto ? enumToName(detail.rifiuto.provenienzaRifiuto!) : "-"}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Caratt. di pericolo H.P.</b>
                            </div>
                            <div className="col">
                                {detail.rifiuto.pericoloRifiuto ? enumToName(detail.rifiuto.pericoloRifiuto!) : "-"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row my-2'>
                    <div className="my-detail">
                        <div className="row">
                            <div className="col-2">
                                <b>Descrizione Rifiuto</b>
                            </div>
                            <div className="col">
                                {detail.rifiuto.descrizione ? detail.rifiuto.descrizione : " - "}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Stato Fisico</b>
                            </div>
                            <div className="col">
                                {enumToName(detail.rifiuto.statoFisicoRifiuto)}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Quantità</b>
                            </div>
                            <div className="col">
                                {enumToName(detail.rifiuto.statoFisicoRifiuto)}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">

                    </div>
                </div>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Destinato a</b>
                            </div>
                            <div className="col">
                                {enumToName(detail.rifiuto.statoFisicoRifiuto)}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Categoria RAEE</b>
                            </div>
                            <div className="col">
                                {detail.rifiuto.categoriaRAAE ? detail.rifiuto.categoriaRAAE.map((c) => c + " ") : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">

                    </div>
                </div>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Veicolo Fuori Uso</b>
                            </div>
                            <div className="col">
                                {detail.isVeicoloFuoriUso ? "Si" : "No"}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Reg. Pubbl. Sicurezza Nr.</b>
                            </div>
                            <div className="col">
                                {detail.numeroRegistrazionePubblicaSicurezza ? detail.numeroRegistrazionePubblicaSicurezza : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Del</b>
                            </div>
                            <div className="col">
                                {detail.dataRegistrazionePubblicaSicurezza ? toNiceDateNoTime(detail.dataRegistrazionePubblicaSicurezza!) : " - "}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr style={{ width: '90%', margin: '30px auto' }} />
            <section className='px-5 py-3'>
                <center className='section-title'>Integrazione FIR</center>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Numero FIR</b>
                            </div>
                            <div className="col">
                                {detail.numeroFIR ? detail.numeroFIR : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Data inizio trasporto</b>
                            </div>
                            <div className="col">
                                {detail.dataInizioTrasporto ? toNiceDateNoTime(detail.dataInizioTrasporto!) : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">

                    </div>
                </div>
                <div className='row'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Trasporto Transfrontaliero</b>
                            </div>
                            <div className="col">
                                {detail.trasportoFrontaliero ? "Si" : "No"}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Tipo Trasporto Transfrontaliero</b>
                            </div>
                            <div className="col">
                                {detail.tipoTrasportoFrontaliero ? enumToName(detail.tipoTrasportoFrontaliero) : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">

                    </div>
                </div>
            </section>
            <hr style={{ width: '90%', margin: '30px auto' }} />
            <section className='px-5 py-3'>
                <center className='section-title'>Esito Conferimento</center>
                <div className='row my-2'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Data Fine Trasporto</b>
                            </div>
                            <div className="col">
                                {detail.dataFineTrasporto ? toNiceDateNoTime(detail.dataFineTrasporto!) : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Peso verificato a destino</b>
                            </div>
                            <div className="col">
                                {detail.pesoADestino ? detail.pesoADestino : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Respinto</b>
                            </div>
                            <div className="col">
                                {detail.isRespinto ? "Si" : "No"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Tipo respingimento</b>
                            </div>
                            <div className="col">
                                {detail.tipologiaRespingimento ? enumToName(detail.tipologiaRespingimento) : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Quantità respingimento</b>
                            </div>
                            <div className="col">
                                {detail.quantitaRespingimento ? detail.quantitaRespingimento : " - "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-detail">
                        <div className="row">
                            <div className="col">
                                <b>Causale respingimento</b>
                            </div>
                            <div className="col">
                                {detail.causaleRespingimento ? enumToName(detail.causaleRespingimento) : " - "}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr style={{ width: '90%', margin: '30px auto' }} />
            <section className='px-5 py-3'>
                <center className='section-title'>Annotazioni Registrazione</center>
                <div className='row my-2'>
                    <div className="my-detail">
                        <div className="row">
                            <div className="col-2">
                                <b>Annotazioni</b>
                            </div>
                            <div className="col">
                                {detail.annotazioni ? detail.annotazioni : " - "}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrazioneDetail;