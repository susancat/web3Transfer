import Nav from './Nav';

export default function Layout({ children }) {
  const { account, balance } = children.props
  return (
    <>
      <Nav account={account} balance={balance} />
      <main>{children}</main>
    </>
  )
}