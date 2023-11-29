"use client";
import Image from "next/image";
import { useState } from "react";
import { CircuitSignals, Groth16Proof, PublicSignals } from "snarkjs";

const url = "https://mopro.vivianjeng.xyz";

async function getKeys(circuit: string) {
    const wasmUrl = new URL(`${circuit}.wasm`, url).toString();
    const zkeyUrl = new URL(`${circuit}_final.zkey`, url).toString();
    const wasm = await fetch(wasmUrl).then((r) => r.arrayBuffer());
    const zkey = await fetch(zkeyUrl).then((r) => r.arrayBuffer());
    return { wasm, zkey };
}

async function fullProve(circuit: string, inputs: CircuitSignals) {
    const _snarkjs = import("snarkjs");
    const snarkjs = await _snarkjs;
    const { wasm, zkey } = await getKeys(circuit);
    const start = +Date.now();
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        inputs,
        new Uint8Array(wasm),
        new Uint8Array(zkey)
    );
    const end = +Date.now();
    return { proof, publicSignals, provingTime: end - start };
}

// async function verifyProof(
//     circuit: string,
//     proof: Groth16Proof,
//     publicSignals: PublicSignals
// ) {
//     const _snarkjs = import("snarkjs");
//     const vkeyUrl = new URL(`${circuit}.vkey.json`, url).toString();
//     const vkeyBuffer = await fetch(vkeyUrl).then((r) => r.arrayBuffer());
//     const vkeyString = String.fromCharCode.apply(
//         null,
//         new Uint8Array(vkeyBuffer) as any
//     );
//     const vkey = JSON.parse(vkeyString);
//     const snarkjs = await _snarkjs;
//     const start = +Date.now();
//     const valid = await snarkjs.groth16.verify(vkey, publicSignals, proof);
//     const end = +Date.now();
//     return { valid: valid, verifyingTime: end - start };
// }

export default function Home() {
    const [multiplier2ProvingTime, setMultiplier2ProvingTime] =
        useState<string>("");
    const [multiplier2Proof, setMultiplier2Proof] = useState<string>();
    const [multiplier2PublicSignals, setMultiplier2PublicSignals] =
        useState<string>("");
    const [keccak256ProvingTime, setKeccak256ProvingTime] =
        useState<string>("");
    const [keccak256Proof, setKeccak256Proof] = useState<string>("");
    const [keccak256PublicSignals, setKeccak256PublicSignals] =
        useState<string>("");
    const [RSAProvingTime, setRSAProvingTime] = useState<string>("");
    const [RSAProof, setRSAProof] = useState<string>();
    const [RSAPublicSignals, setRSAPublicSignals] = useState<string>("");

    async function multiplier() {
        setMultiplier2ProvingTime("Calculating...");
        const { proof, publicSignals, provingTime } = await fullProve(
            "multiplier2",
            { a: 3, b: 5 }
        );
        setMultiplier2ProvingTime(`${provingTime / 1000} s`);
        setMultiplier2Proof(JSON.stringify(proof));
        setMultiplier2PublicSignals(JSON.stringify(publicSignals));
    }

    async function keccak256() {
        setKeccak256ProvingTime("Calculating...");
        const { proof, publicSignals, provingTime } = await fullProve(
            "keccak256_256_test",
            {
                in: [
                    0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0,
                    1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
            }
        );
        setKeccak256ProvingTime(`${provingTime / 1000} s`);
        setKeccak256Proof(JSON.stringify(proof));
        setKeccak256PublicSignals(JSON.stringify(publicSignals));
    }

    async function RSA() {
        setRSAProvingTime("Calculating...");
        const { proof, publicSignals, provingTime } = await fullProve("main", {
            modulus: [
                "13792647154200341559",
                "12773492180790982043",
                "13046321649363433702",
                "10174370803876824128",
                "7282572246071034406",
                "1524365412687682781",
                "4900829043004737418",
                "6195884386932410966",
                "13554217876979843574",
                "17902692039595931737",
                "12433028734895890975",
                "15971442058448435996",
                "4591894758077129763",
                "11258250015882429548",
                "16399550288873254981",
                "8246389845141771315",
                "14040203746442788850",
                "7283856864330834987",
                "12297563098718697441",
                "13560928146585163504",
                "7380926829734048483",
                "14591299561622291080",
                "8439722381984777599",
                "17375431987296514829",
                "16727607878674407272",
                "3233954801381564296",
                "17255435698225160983",
                "15093748890170255670",
                "15810389980847260072",
                "11120056430439037392",
                "5866130971823719482",
                "13327552690270163501",
            ],
            signature: [
                "3582320600048169363",
                "7163546589759624213",
                "18262551396327275695",
                "4479772254206047016",
                "1970274621151677644",
                "6547632513799968987",
                "921117808165172908",
                "7155116889028933260",
                "16769940396381196125",
                "17141182191056257954",
                "4376997046052607007",
                "17471823348423771450",
                "16282311012391954891",
                "70286524413490741",
                "1588836847166444745",
                "15693430141227594668",
                "13832254169115286697",
                "15936550641925323613",
                "323842208142565220",
                "6558662646882345749",
                "15268061661646212265",
                "14962976685717212593",
                "15773505053543368901",
                "9586594741348111792",
                "1455720481014374292",
                "13945813312010515080",
                "6352059456732816887",
                "17556873002865047035",
                "2412591065060484384",
                "11512123092407778330",
                "8499281165724578877",
                "12768005853882726493",
            ],
            base_message: [
                "18114495772705111902",
                "2254271930739856077",
                "2068851770",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
            ],
        });
        setRSAProvingTime(`${provingTime / 1000} s`);
        setRSAProof(JSON.stringify(proof));
        setRSAPublicSignals(JSON.stringify(publicSignals));
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 break-all">
            <h1 className="text-4xl font-bold mb-8">
                MoPro Website Prover Tests
            </h1>
            <div className="mb-8">
                <h2 className="fix text-2xl font-bold mb-4">Multiplier2</h2>
                <button className="btn mr-4" onClick={multiplier}>
                    Prove
                </button>
                {/* <button className="btn">Verify</button> */}
                <p className="mt-2">{multiplier2ProvingTime}</p>
            </div>
            <div className="bg-sky-200">
                {multiplier2Proof && <h3>proof</h3>}
                <p className="mt-2 break-all ">{multiplier2Proof}</p>
                {multiplier2PublicSignals && <h3>public signals</h3>}
                <p className="mt-2 break-all ">{multiplier2PublicSignals}</p>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Keccak256</h2>
                <button className="btn mr-4" onClick={keccak256}>
                    Prove
                </button>
                {/* <button className="btn">Verify</button> */}
                <p className="mt-2">{keccak256ProvingTime}</p>
            </div>
            <div className="bg-sky-200 max-w-4xl">
                {keccak256Proof && <h3>proof</h3>}
                <p className="mt-2 break-all">{keccak256Proof}</p>
                {keccak256PublicSignals && <h3>public signals</h3>}
                <p className="mt-2 break-all">{keccak256PublicSignals}</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">RSA</h2>
                <button className="btn mr-4" onClick={RSA}>
                    Prove
                </button>
                {/* <button className="btn">Verify</button> */}
                <p className="mt-2">{RSAProvingTime}</p>
            </div>
            <div className="bg-sky-200">
                {RSAProof && <h3>proof</h3>}
                <p className="mt-2 break-all">{RSAProof}</p>
                {RSAPublicSignals && <h3>public signals</h3>}
                <p className="mt-2 break-all">{RSAPublicSignals}</p>
            </div>
        </main>
    );
}
