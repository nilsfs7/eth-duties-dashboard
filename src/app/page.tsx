'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [syncs, setSyncs] = useState<any[]>([]);
  const [attestations, setAttestations] = useState<any[]>([]);

  async function fetchDuties() {
    const res = await fetch(`/api`);
    const duties = await res.json();

    const attestations = duties.attestations;
    const syncs = duties.syncs;
    const blocks = duties.blocks;

    attestations.sort((a: any, b: any) => {
      return a.seconds_to_duty - b.seconds_to_duty;
    });
    syncs.sort((a: any, b: any) => {
      return a.seconds_to_duty - b.seconds_to_duty;
    });
    blocks.sort((a: any, b: any) => {
      return a.seconds_to_duty - b.seconds_to_duty;
    });

    setAttestations(attestations);
    setSyncs(syncs);
    setBlocks(blocks);
  }

  useEffect(() => {
    fetchDuties();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDuties();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="absolute inset-0 flex flex-col">
      <div className="rounded-lg h-full flex w-full justify-center overflow-y-hidden max-h-full px-2 pt-2">
        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-t-lg bg-[#36304a] text-white p-2 gap-2">
            <div>Validator</div>
            <div>Duty</div>
            <div>Slot</div>
            <div>Time left</div>
          </div>

          <div className="no-scrollbar overflow-y-auto rounded-b-lg">
            {blocks.map((duty, index) => {
              return (
                <div key={`row-blocks-${index}`} className={`grid grid-cols-4 p-2 gap-2 bg-white ${index === attestations.length - 1 && 'rounded-b-lg'} `}>
                  <div>
                    <a href={`https://${process.env.NEXT_PUBLIC_NETWORK}.beaconcha.in/validator/${duty.validator_index}`} target="_blank" rel="noopener noreferrer">
                      {duty.validator_index}
                    </a>
                  </div>
                  <div className="text-critical">{`Block`}</div>
                  <div>{duty.slot}</div>
                  <div className={`text-end ${duty.seconds_to_duty < 60 && 'text-warning'}`}>{duty.seconds_to_duty}</div>
                </div>
              );
            })}

            {syncs.map((duty, index) => {
              return (
                <div key={`row-syncs-${index}`} className={`grid grid-cols-4 p-2 gap-2 bg-white ${index === attestations.length - 1 && 'rounded-b-lg'} `}>
                  <div>
                    <a href={`https://${process.env.NEXT_PUBLIC_NETWORK}.beaconcha.in/validator/${duty.validator_index}`} target="_blank" rel="noopener noreferrer">
                      {duty.validator_index}
                    </a>
                  </div>
                  <div className="text-warning">{`Sync`}</div>
                  <div>{duty.slot}</div>
                  <div className={`text-end ${duty.seconds_to_duty < 60 && 'text-warning'}`}>{duty.seconds_to_duty}</div>
                </div>
              );
            })}

            {attestations.map((duty, index) => {
              return (
                <div key={`row-attestations-${index}`} className={`grid grid-cols-4 p-2 gap-2 bg-white ${index === attestations.length - 1 && 'rounded-b-lg'} `}>
                  <div>
                    <a href={`https://${process.env.NEXT_PUBLIC_NETWORK}.beaconcha.in/validator/${duty.validator_index}`} target="_blank" rel="noopener noreferrer">
                      {duty.validator_index}
                    </a>
                  </div>
                  <div>{`Att.`}</div>
                  <div>{duty.slot}</div>
                  <div className={`text-end ${duty.seconds_to_duty < 60 && 'text-warning'}`}>{duty.seconds_to_duty}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-auto p-2">
        <a href={'https://github.com/nilsfs7/eth-duties-dashboard'} target="_blank" rel="noopener noreferrer">
          <div className="flex flex-col h-full w-full items-center gap-1 text-sm">
            <Image src={'github_icon.svg'} width={0} height={0} sizes="100vw" className={`h-8 w-full`} alt={''} />
            <div>{`nilsfs7`}</div>
          </div>
        </a>
      </div>
    </main>
  );
}
