import { ethers } from "ethers"
import { Box, Flex } from "reflexbox"
import styles from "./Position.module.css"
import { MouseEventHandler } from "react"
import { Position } from "../types/Position"

interface Props {
  onClick: MouseEventHandler
  position: Position
}

export default function PositionItem({ onClick, position }: Props) {
  const { debt, debtToken, collateral, collateralToken, chain, protocol } = position

  return (
    <div className={styles.container} onClick={onClick}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <div className={styles.chainName}>{chain}</div>
          <Box className={styles.protocol} mt="3">{protocol}</Box>
        </Box>
        <Box>
          <div className={styles.label}>Collateral</div>

          <div className={styles.value}>
            {parseFloat(ethers.utils.formatUnits(collateral, collateralToken.decimals)).toFixed(2)} {collateralToken.name}
          </div>
        </Box>
        <Box>
          <div className={styles.label}>Debt</div>
          <div className={styles.value}>
            {parseFloat(ethers.utils.formatUnits(debt, debtToken.decimals)).toFixed(2)} {debtToken.name}
          </div>
        </Box>
      </Flex>
    </div>
  )
}
