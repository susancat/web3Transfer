import { useState, useEffect } from 'react';
import Web3 from 'web3';

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Transfer from '../components/transactionUpdater/Transfer'
export default function Home(props) {
  console.log(props.web3)
  return (
    <div className={styles.container}>
      <Head>
        <title>transfer tokens</title>
        <meta name="description" content="web3 token check and transfer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Transfer />
    </div>
  )
}
