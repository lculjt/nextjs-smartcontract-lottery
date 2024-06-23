import Head from "next/head";
// import styles from "@/styles/Home.module.css";
// import Header from '@/components/Header.jsx';
import WebHeader from '@/components/WebHeader.jsx';
import LotteryEntrance from '@/components/LotteryEntrance.jsx';
// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log('Home');
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header></Header> */}
      <WebHeader></WebHeader>
      <LotteryEntrance></LotteryEntrance>
    </div>
  );
}
