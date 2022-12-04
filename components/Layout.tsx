import Popup from "reactjs-popup";
import Link from "next/link";
import Footer from "./Footer";
import { Box, Flex } from "reflexbox";
import { useAccount, useConnect } from "wagmi";
import EthAddress from "./EthAddress";
import styles from "./Layout.module.css";
import "reactjs-popup/dist/index.css";
import Image from "next/image";
import logo from "./../assets/logos.png";
import ConnectButton from "./ConnectButton";

export default function Layout({ children }: any) {
  const [{ data, error, loading }, disconnect] = useAccount({});
  const [{ data: cdata, error: cerror }, connect] = useConnect();

  return (
    <>
      <div className="outer">
        <div className={styles.left}>
          <nav className="navbar">
            <Flex className="outer-inner">
              <Link href="/refinancer">
                <a
                  className={styles.link}
                  style={{ backgroundColor: "#9ABBFF" }}
                >
                  <Box>
                    <Image
                      src="/positions.png"
                      width="17px"
                      height="15px"
                      style={{ margin: "8px" }}
                    />
                  </Box>

                  <Box>Refinance</Box>
                </a>
              </Link>

              <Link href="/pending">
                <a className={styles.link}>
                  <Box>
                    <Image
                      src="/refinancer.png"
                      width="20px"
                      height="18px"
                      style={{ margin: "8px" }}
                    />
                  </Box>
                  <Box>Queued</Box>
                </a>
              </Link>
            </Flex>
            <Flex justifyContent="flex-end" mb="3">
              {data ? (
                <>
                  <Box pr="2">
                    <select className={styles.select} defaultValue="rinkeby">
                      <option value="rinkeby">Goerli</option>
                      <option value="kovan">Mumbai</option>
                    </select>
                  </Box>
                  <div className={styles.select}>
                    <EthAddress address={data.address} />
                  </div>
                </>
              ) : (
                <details>
                  <summary className={styles.select}>Connect</summary>
                  <ul className={styles.dropdown}>
                    {cdata.connectors.map((connector) => (
                      <li key={connector.id}>
                        <button
                          disabled={!connector.ready}
                          key={connector.id}
                          onClick={() => connect(connector)}
                        >
                          {connector.name}
                          {!connector.ready && " (unsupported)"}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {cerror && (
                    <div>{cerror?.message ?? "Failed to connect"}</div>
                  )}
                  {/* <ConnectButton/> */}
                </details>
              )}
            </Flex>
          </nav>
        </div>

        <main className={styles.right}>{children}</main>
      </div>

      <Footer />
    </>
  );
}
