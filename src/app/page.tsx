import { NavBar } from "@/components/common/nav-bar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="text-center">
        <p className="mb-8 text-4xl">
          Prepare for your next frontend coding interview
        </p>

        <Link href="/challenge" className="btn">
          Get started
        </Link>
      </div>
    </>
  );
}
