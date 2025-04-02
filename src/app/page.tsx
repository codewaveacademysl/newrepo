"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState(null);
  const handle = async (e: any) => {
    try {
      e.preventDefault();
      console.log(name);
      const res = await fetch(
        "https://5gtjoguyu2wgpzcbswijhgfhri0kfkla.lambda-url.us-east-1.on.aws",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handle} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-2 rounded"
          value={name}
          placeholder="Please enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 p-2 rounded text-white">
          Submit
        </button>
      </form>
      {response && (
        <div>
          Response:
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
