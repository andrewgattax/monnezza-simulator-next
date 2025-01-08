import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Home ma del sito presentazione</h1>
      <Link href="/dashboard">dashh</Link> <br />
      <Link href="/login">login</Link> <br />
      <Link href="/logout">logout</Link> <br />
      <br />
    </div>
);
}
  