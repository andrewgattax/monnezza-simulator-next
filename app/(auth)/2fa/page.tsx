import InputWithIcon from "../../../components/InputWithIcon";

export default function Login() {
  return (
    <form>
      <InputWithIcon type="text" name="code" placeholder="Codice di conferma" iconName="phone" required />
      <div className="row g-2">
        <div className="col-6">
          <button type="button" className="btn btn-outline-secondary w-100">Annulla</button>
        </div>
        <div className="col-6">
          <button type="submit" className="btn btn-primary btn-overcolor w-100">Conferma Accesso</button>
        </div>
      </div>
    </form>
  );
}
