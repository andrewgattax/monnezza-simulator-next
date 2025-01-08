import InputWithIcon from "../../../components/InputWithIcon";

export default function Login() {
  return (
    <form>
      <InputWithIcon type="text" name="user" placeholder="Username" iconName="person" required />
      <InputWithIcon type="password" name="pass" placeholder="Password" iconName="key" required />
      <button type="submit" className="btn btn-primary btn-overcolor w-100">Accedi</button> 
    </form>
  );
}
