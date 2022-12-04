import { Token } from './Token.d'
import { BigNumber } from "ethers"

export interface Position {
  collateral: BigNumber
  collateralToken: Token
  debt: BigNumber
  debtToken: Token
  chain: string
  protocol: string
}
