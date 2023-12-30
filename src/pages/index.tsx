import Head from "next/head";
import { FormEvent, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"none" | "done" | "error">("none");

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.elements[0] as HTMLInputElement;
    const data = { email: email.value };

    fetch("/api/register-email", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then(() => {
        form.reset();
        setStatus("done");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <>
      <Head>
        <title>Svenja & Nils i Sverige</title>
        <meta name="description" content="WIR SIND IN SCHWEDEN AHHH" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center flex-col gap-8">
          <h1 className="font-bold text-6xl">WIR SIND IN SCHWEDEN! 🇸🇪</h1>
          <div className="max-w-xl">
            <p className="text-xl">
              Aber weil wir euch mitnehmen wollen, haben wir gedacht, dass wir
              euch immer mal wieder einen Newsletter zukommen lassen!
              <br />
              Email-Adresse eintragen und gespannt ins Postfach schauen, bald
              gibts dann tolle Emails von uns!
              <br />
              <span className="italic">Har det så bra, vi ses! - Svenja, Nils & Laska</span>
            </p>

            <form
              className="mt-4 flex flex-col gap-2 items-center"
              onSubmit={submitForm}
            >
              <input
                type="email"
                className="input input-bordered"
                placeholder="john@example.com"
                required
              />
              <button
                disabled={status === "done"}
                className="btn btn-primary fit-content max-w-fit"
              >
                {status !== "done" ? "Anmelden" : "Angemeldet!"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <div className="toast toast-top toast-center">
        {status === "done" && (
          <div className="alert alert-success">Erfolgreich angemeldet!</div>
        )}
        {status === "error" && (
          <div className="alert alert-error">Das hat nicht funktioniert 🥲</div>
        )}
      </div>
    </>
  );
}
