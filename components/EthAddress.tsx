interface Props {
  address: string
  suffix?: number
  prefix?: number
}

const EthAddress = ({ address, suffix = 4, prefix = 6 }: Props) => {
  if (!address) {
    return <></>
  }
  return (
    <>
      {address.substr(0, prefix)}...{address.substr(-suffix, suffix)}
    </>
  )
}

export default EthAddress
