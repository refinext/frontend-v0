import { ethers } from "ethers";

const providerKovan = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
);
const providerRinkeby = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
);

export { providerRinkeby, providerKovan };
