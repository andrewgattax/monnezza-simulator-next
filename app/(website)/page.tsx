import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Home ma del sito presentazione</h1>
      <Link href="/dashboard">vai alla dashboard</Link> <br />
      <br />
    </div>
);
}
  