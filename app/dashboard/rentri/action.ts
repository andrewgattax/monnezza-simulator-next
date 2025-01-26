'use server'
import { redirect } from 'next/navigation'
import { PrismaClient, Utente, Bundle } from '@prisma/client'
import { auth } from "../../../auth"
import fs from "fs";
import forge from "node-forge";

const prisma = new PrismaClient()
const RENTRIRP_URI = process.env.RENTRIRP_URI;

export default async function saveBundleToDB(formData: FormData) {
  const session = await auth()
  if (!session) {
    redirect('/dashboard/rentri?error=unauthorized')
  }

  const bundle = formData.get('bundle') as File
  const password = formData.get('password') as string

  if (!bundle || !password) {
    redirect('/dashboard/rentri?error=incomplete')
  }

  if (bundle.size > 5120) {
    redirect('/dashboard/rentri?error=toolarge')
  }

  // tentativo di controllo della password
  try {
    const arrayBuffer = await bundle.arrayBuffer();
    const byteBuffer = forge.util.createBuffer(arrayBuffer);
    const p12Asn1 = forge.asn1.fromDer(byteBuffer);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
  } catch (e) {
    redirect('/dashboard/rentri?error=invalidpassword')
  }

  try {
    // encode the bundle file to base64
    const base64Bundle = Buffer.from(await bundle.arrayBuffer()).toString('base64');

    // save the bundle to the database
    const newBundle = await prisma.bundle.create({
      data: {
      proprietario: {
        connect: {
        id: session.user.dbId
        }
      },
      encodedBundle: base64Bundle,
      passkey: password
      }
    });

    const idToUnpack = newBundle.id;

    // call the proxy api to unpack the bundle
    const response = await fetch(`${RENTRIRP_URI}/unpacker/${idToUnpack}`)
    if (!response.ok) {
      console.log("Unpacker API returned an error: " + response.status)
      redirect('/dashboard/rentri?error=proxy')
    }

    console.log("Bundle saved to the database and sent to the proxy API", response)
  } catch (error) {
    redirect('/dashboard/rentri?error=database')
  }

  redirect('/dashboard/rentri?success=1')
}