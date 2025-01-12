"use client";
import Link from "next/link";
import { useState } from "react";
import { SelettoreComuniData } from "../../../components/SelettoreComuni";
import SelettoreComuniModal from "../../../components/SelettoreComuniModal";

//export const metadata = {
//  title: "Gestione Luoghi di Produzione · Ri.fiuto",
//}

export default function LuoghiProduzioneTable() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<SelettoreComuniData | undefined>(undefined);

  const handleModalSave = (updatedValues: SelettoreComuniData | undefined) => {
    setInputValues(updatedValues);
  };

  return (
    <section>
      <h1>Luoghi di produzione</h1>
      <Link href="/dashboard/luoghiproduzione/507f1f77bcf86cd799439011" >PROVA INESISTENTE</Link> <br />
      <Link href="/dashboard/luoghiproduzione/67841c26785573d2c6b132be" >PROVA ESISTENTE</Link> <br />
      <button onClick={() => setModalOpen(true)}>Apri modal</button> <br />
      <div>
        <p>Valori selezionati: {JSON.stringify(inputValues)}</p>
      </div>
      <SelettoreComuniModal isOpen={isModalOpen} onSave={handleModalSave} onClose={() => setModalOpen(false)} />
    </section>
  );
}
