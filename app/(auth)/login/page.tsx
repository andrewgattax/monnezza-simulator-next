import { redirect } from "next/navigation"
import { signIn, auth } from "../../../auth"
import InputWithIcon from "../../../components/InputWithIcon";
import ErrorMessageCompact from "../../../components/ErrorMessageCompact";
import ConditionalHider from "../../../components/ConditionalHider";

export default async function SignInPage(props: {
	searchParams: { callbackUrl: string | undefined, error: string | undefined }
}) {
	const sp = await props.searchParams;
	const redirUrl = sp.callbackUrl || "/dashboard";

	// gia autenticato???
	const session = await auth();
	if (session?.user) {
		redirect(redirUrl);
		return null;
	}

	return (
		<form className="form-signin"
			action={async (formData) => { // TODO: potenzialmente esplosivo
				"use server"
				try {
					await signIn("credentials", formData);
				} catch (ignored) {
					redirect(`/login?error=credentials`);
				}
				const session = await auth();
				console.log(session);
				if (!session?.user) redirect(`/login?error=session`); //TODO: ඞ amogus
				redirect(redirUrl);
			}}
		>
			<section>
				<InputWithIcon type="text" name="email" placeholder="Indirizzo email" iconName="envelope" required />
				<InputWithIcon type="password" name="password" placeholder="Password" iconName="key" required />
				<InputWithIcon type="text" name="tfatoken" placeholder="Codice Temporaneo (se richiesto)" iconName="phone" />
				<ConditionalHider hidden={!sp.error}> {/*TODO: specificare per errore?? */}
					<ErrorMessageCompact message="Le credenziali inserite non sono valide"/>
				</ConditionalHider>
				<button type="submit" className="btn btn-primary btn-overcolor w-100">
					Accedi
				</button>
			</section>
		</form>
	)
}