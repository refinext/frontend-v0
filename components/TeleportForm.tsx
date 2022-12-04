import { ethers } from "ethers";
import Image from "next/image";
import { Box, Flex } from "reflexbox";
import { Position } from "../types/Position.d";
import styles from "./TeleportForm.module.css";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { MouseEventHandler, useEffect, useState } from "react";
import "animate.css";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieEther from "../assets/lottie-ether.json";
import Link from "next/link";
const { utils } = require("ethers");
import * as PushAPI from "@pushprotocol/restapi";

interface Props {
  position: Position;
  afterTeleportation: MouseEventHandler;
}

const steps = [
  "Select target chain",
  "Wait for queueing",
  "Wait for confirmation",
];

export default function TeleportForm({ position, afterTeleportation }: Props) {
  const { debt, debtToken, collateral, collateralToken } = position;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handler = () =>
      activeStep < steps.length && setActiveStep(activeStep + 1);

    document.addEventListener("keyup", handler);
    return () => document.removeEventListener("keyup", handler);
  });
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const handleApprove = async (activeStep: number) => {
    if (window.ethereum) {
      const transactionRequest = {
        to: "0x721C0E481Ae5763b425aCb1b04ba98baF480D83B",
        value: "1000000000000000",
      };

      const receipt = await signer.sendTransaction(transactionRequest);
    }
    await sendNotification();
    setActiveStep(activeStep + 1);
  };

  const sendNotification = async () => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `X-Refinance executed `,
          body: `Your position has been transferred from goerli to mumbai!!`,
        },
        payload: {
          title: `X-Refinance details`,
          body: `Transfer between chains: goerli and mumbai.
                 Position transferred: 1 WBTC supply and 10000 USDC borrow`,
          cta: "",
          img: "",
        },
        recipients: 'eip155:5:0x15C6b352c1F767Fa2d79625a40Ca4087Fab9a198', // recipient address
        channel: 'eip155:5:0x15C6b352c1F767Fa2d79625a40Ca4087Fab9a198', // your channel address
        env: 'staging'
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <>
      {/* {activeStep > 0 && (
        <button onClick={() => setActiveStep(activeStep - 1)}>Prev</button>
      )} */}
      {/* {activeStep < steps.length && (
        <button onClick={() => setActiveStep(activeStep + 1)}>Next</button>
      )} */}
      <div className={styles.container}>
        <Box width={0.6} margin="auto">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* <Image src="/background_teleport.png" layout="fill" style={{zIndex: 0}}/> */}

        {activeStep === 0 && (
          <>
            <div className={styles.information}>
              <details className={styles.details}>
                <summary>
                  <Flex width={1}>
                    <Flex width={1}>
                      {/* <Box mr="4">
                        <Image
                          src="/flyingLoan.png"
                          width="80px"
                          height="40px"
                        />
                      </Box> */}

                      <Box width={1}>
                        <Flex justifyContent="space-between">
                          <Box width={0.5}>
                            <div>Collateral</div>
                            <div className={styles.numericLabel}>
                              {parseFloat(
                                ethers.utils.formatUnits(
                                  collateral,
                                  collateralToken.decimals
                                )
                              ).toFixed(2)}{" "}
                              {collateralToken.name}
                            </div>
                          </Box>
                          <Box width={0.5}>
                            <div>Debt</div>
                            <div className={styles.numericLabel}>
                              {parseFloat(
                                ethers.utils.formatUnits(
                                  debt,
                                  debtToken.decimals
                                )
                              ).toFixed(2)}{" "}
                              {debtToken.name}
                            </div>
                          </Box>
                        </Flex>
                        <Flex justifyContent="space-between" mt="4">
                          <Box width={0.5}>
                            <div>Fees estimates</div>
                            <div className={styles.numericLabel}>
                              0.04 Ether
                            </div>
                          </Box>
                          {/* <Box width={0.5}>
                            <Flex
                              alignItems="center"
                              className={styles.feeStructure}
                            >
                              View fees composition
                              <Box ml="4">
                                <Image
                                  className={styles.arrowImage}
                                  src="/arrowDown.svg"
                                  width="28px"
                                  height="46px"
                                />
                              </Box>
                            </Flex>
                          </Box> */}
                        </Flex>
                      </Box>
                    </Flex>
                  </Flex>
                </summary>
                {/* <Flex mt="-5" mb="3">
                  <Box width="70px"></Box>
                  <Box>
                    <ul className={styles.feeItems}>
                      <li>
                        <Flex justifyContent="space-between">
                          <Box width={1} marginLeft="20px" marginTop="-25px">
                            <div>Transaction Fee on Ethereum</div>
                            <div className={styles.numericLabel}>
                              0.02 Ether
                            </div>
                          </Box>
                        </Flex>
                      </li>
                      <li>
                        <Flex justifyContent="space-between">
                          <Box width={1} marginLeft="20px" marginTop="-25px">
                            <div>Bridging Fee using Connext</div>
                            <div className={styles.numericLabel}>
                              0.01 Ether
                            </div>
                          </Box>
                        </Flex>
                      </li>
                      <li>
                        <Flex justifyContent="space-between">
                          <Box width={1} marginLeft="20px" marginTop="-25px">
                            <div>Service Fee using Floan</div>
                            <div className={styles.numericLabel}>
                              0.01 Ether
                            </div>
                          </Box>
                        </Flex>
                      </li>
                    </ul>
                  </Box>
                </Flex> */}
              </details>
            </div>

            <Flex>
              <Box width={0.5} p="4">
                <div className={styles.formTitle}>Position to transfer</div>
                <form action="">
                  <label htmlFor="chain" className={styles.label}>
                    Chain
                  </label>
                  <select
                    name="chain"
                    className={styles.select}
                    defaultValue="rinkeby"
                    disabled
                  >
                    <option value="rinkeby">Goerli</option>
                    <option value="kovan">Mumbai</option>
                  </select>

                  <label htmlFor="protocol" className={styles.label}>
                    Protocol
                  </label>
                  <select
                    name="protocol"
                    className={styles.select}
                    defaultValue="aave"
                    disabled
                  >
                    <option value="aave">Aave</option>
                    <option value="makerdao">MakerDao</option>
                  </select>
                </form>
              </Box>

              <Box width={0.5} p="4">
                <div className={styles.formTitle}>Target position</div>
                <form action="">
                  <label htmlFor="chain" className={styles.label}>
                    Chain
                  </label>
                  <select
                    name="chain"
                    className={styles.select}
                    defaultValue="kovan"
                  >
                    <option value="rinkeby">Goerli</option>
                    <option value="kovan">Mumbai</option>
                  </select>

                  <label htmlFor="protocol" className={styles.label}>
                    Protocol
                  </label>
                  <select
                    name="protocol"
                    className={styles.select}
                    defaultValue="compound"
                  >
                    <option value="compound">Compound</option>
                    <option value="aave">Aave</option>
                  </select>
                </form>
              </Box>
            </Flex>

            <Flex justifyContent="center">
              <button
                className={styles.button}
                onClick={() => handleApprove(activeStep)}
              >
                XRefinance
              </button>
            </Flex>
          </>
        )}

        {activeStep === 1 && (
          <Box
            mt="4"
            textAlign="center"
            color="black"
            className={styles.title + " animate__animated animate__fadeIn"}
          >
            Waiting for the transaction to be picked…
            <button
              color="white"
              className={styles.invisible}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              ...
            </button>
            <Player
              autoplay
              loop
              src={lottieEther}
              style={{ height: "300px", width: "300px" }}
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box
            mt="4"
            textAlign="center"
            className="animate__animated animate__fadeIn"
          >
            <div className={styles.title}>Transferring your position..</div>
            {/* TODO: Chain */}
            <p>Waiting for the transaction to be confirmed on mumbai.</p>
            <button
              color="white"
              className={styles.invisible}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              ...
            </button>
            <Player
              autoplay
              loop
              src={lottieEther}
              style={{ height: "300px", width: "300px" }}
            />
            <p>
              Transaction on chain1:{" "}
              <a className={styles.link} href="#">
                0x96…326f3bd81d6f64da8b0fe3d79
              </a>
            </p>
          </Box>
          // {setActiveStep(activeStep + 1)};
        )}

        {activeStep === 3 && (
          <Box
            mt="4"
            textAlign="center"
            className="animate__animated animate__fadeIn"
          >
            <div className={styles.title}>Success !</div>
            {/* TODO: Chain */}
            <p>Your position has successfully been transferred to Mumbai.</p>
            <Box mb="4" mt="4">
              <Image src="/confetti.png" width="200px" height="200px" />
            </Box>
            <p>
              Transaction on chain1:{" "}
              <a className={styles.link} href="#">
                0xa6…c419e6b81f1cd83dba2ed7c70
              </a>
            </p>
            <p>
              Transaction on chain2:{" "}
              <a className={styles.link} href="#">
                0x96…326f3bd81d6f64da8b0fe3d79
              </a>
            </p>
            <Flex justifyContent="center" mt="4">
              <Link href="/refinancer?txState=end">
                <a className={styles.button} onClick={afterTeleportation}>
                  Back to positions
                </a>
              </Link>
            </Flex>
          </Box>
        )}
      </div>
    </>
  );
}
