import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function Home() {
  redirect(`/${uuid()}`);
}
