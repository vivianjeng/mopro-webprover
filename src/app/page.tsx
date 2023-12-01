"use client";
import Prove from "./prove";

export default function Home() {
    return (
        <main className="min-h-screen flex-col items-center justify-between p-10 break-words dark:text-white">
            <h1 className="text-4xl font-bold mb-8">
                MoPro Website Prover Tests
            </h1>

            <Prove circuit="multiplier2"></Prove>
            <Prove circuit="keccak256"></Prove>
            <Prove circuit="RSA"></Prove>
        </main>
    );
}
