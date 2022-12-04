import { useEffect, useState } from "react";
import { useAccount, useContract } from "wagmi";
import { BigNumber } from "ethers";
import { PROVIDER_ABI, TELEPORTER_ABI } from "../globals/abis";
import { aave, compound, teleporter } from "../globals/addresses";
import { tokensRinkeby, tokensKovan } from "../globals/tokens";
import { providerRinkeby, providerKovan } from "../globals/providers";
import styles from "./teleport.module.css";
import TeleportForm from "../components/TeleportForm";
import { Position } from "../types/Position.d";
import PositionItem from "../components/PositionItem";
import { Box } from "reflexbox";
import Image from "next/image";

const COLL = "WBTC";
const DEBT = "USDC";

export default function Teleport() {
  const [{ data }] = useAccount({});
  const [positions, setPositions] = useState<Position[]>([]);
  const [aavePosition, setAavePosition] = useState<Position>();
  const [compoundPosition, setCompoundPosition] = useState<Position>();
  const [positionToTeleport, setPositionToTeleport] = useState<Position>();

  const providerAave = useContract({
    addressOrName: aave.RINKEBY,
    contractInterface: PROVIDER_ABI,
    signerOrProvider: providerRinkeby,
  });

  const providerCompound = useContract({
    addressOrName: compound.KOVAN,
    contractInterface: PROVIDER_ABI,
    signerOrProvider: providerKovan,
  });

  const teleporterR = useContract({
    addressOrName: teleporter.RINKEBY,
    contractInterface: TELEPORTER_ABI,
    signerOrProvider: providerRinkeby,
  });

  const teleportPosition = async () => {
    // origin, dest, origin provider addr, dest provider addr, coll addr, coll amount, debt addr, debt amount
    const tx = await teleporterR.initiateLoanTransfer(
      BigNumber.from(1111),
      BigNumber.from(2221),
      aave.RINKEBY,
      compound.KOVAN,
      tokensRinkeby[COLL].address,
      aavePosition?.collateral,
      tokensRinkeby[DEBT].address,
      aavePosition?.debt
    );

    const receipt = await tx.wait();
    console.log(receipt);
  };

  useEffect(() => {
    async function fetch() {
      console.count("fetch");
      const balancesAave = await providerAave.getPairBalances(
        tokensRinkeby[COLL].address,
        tokensRinkeby[DEBT].address,
        data?.address
      );
      const positionAave = {
        collateral: balancesAave.collateral,
        collateralToken: tokensRinkeby[COLL],
        debt: balancesAave.debt,
        debtToken: tokensRinkeby[DEBT],
        chain: "Rinkeby",
        protocol: "Aave",
      };
      const balancesCompound = await providerCompound.getPairBalances(
        tokensKovan[COLL].address,
        tokensKovan[DEBT].address,
        data?.address
      );
      const positionCompound = {
        collateral: balancesCompound.collateral,
        collateralToken: tokensKovan[COLL],
        debt: balancesCompound.debt,
        debtToken: tokensKovan[DEBT],
        chain: "Kovan",
        protocol: "Compound",
      };
      setAavePosition(positionAave);
      setCompoundPosition(positionCompound);
      setPositions([positionAave, positionCompound]);
    }
    if (data?.address) fetch();
  }, [data?.address]);

  if (positionToTeleport) {
    return (
      <>
        {/* <button onClick={() => setPositionToTeleport(undefined)}>
          &lt; Back
        </button> */}
        <TeleportForm
          position={positionToTeleport}
          afterTeleportation={() => setPositionToTeleport(undefined)}
        />
      </>
    );
  }

  return (
    <Box maxWidth="800px" margin="2rem auto">
      <h1 className={styles.title}>
        Select a position to <br />
        teleport in minutes.
        <img
          src="/fancy1.png"
          width="300px"
          height="140px"
          className={styles.titleImg}
        />
      </h1>
      <Box mb="4">
        Save gas fees by transporting your positions across EVM compatible
        chains.
      </Box>

      {positions.map((p) => (
        <PositionItem
          key={JSON.stringify(p)}
          onClick={() => setPositionToTeleport(p)}
          position={p}
        />
      ))}
    </Box>
  );
}
