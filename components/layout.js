import Nav from './accountInfo/Nav';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}