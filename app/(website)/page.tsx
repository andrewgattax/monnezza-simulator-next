import { signIn } from "../../auth";
import Link from "next/link";
import WorkInProgress from "../../components/WorkInProgress";

export default async function Home() {
  return (
    <div className="w-100 row justify-content-center align-items-center">
      <div className="card" style={{ width: "30rem", marginTop: "10rem" }}>
        <div className="card-body">
          <WorkInProgress />
          <div className="mb-3"></div>
        </div>
      </div>
    </div>
);
}
  