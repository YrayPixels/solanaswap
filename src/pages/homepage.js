import React, { useEffect, useState } from 'react'
import { Cancel, Power, RemoveRedEye, Search, Timer, Wallet } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Nav from '../component/nav';
import TimerCount from '../component/timer';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import Swap from '../component/swap';



export default function HomePage() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [hideBalance, setHideBalance] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [pub_address, setPubAddress] = useState('');
    const [updater, setUpdater] = useState(0);
    const [alert, setAlert] = useState('THis is alert')

    useEffect(() => {
        if (publicKey == null) {
            setPubAddress('')
            setWalletBalance(0);
        } else {
            setPubAddress(publicKey.toBase58())

            async function getAccountBalance() {
                try {
                    const balance = await connection.getBalance(publicKey);
                    fetch("https://price.jup.ag/v4/price?ids=SOL")
                        .then((response) => response.json())
                        .then((result) => {
                            let perusdt = result.data.SOL.price
                            setWalletBalance(balance / 1000000000 * perusdt);

                        })
                        .catch((error) => console.error(error));
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }

            getAccountBalance();
        }

    }, [publicKey, walletBalance, setUpdater])

    // useEffect(() => {
    //     let intervalId;

    //     const fetchAccountBalance = async (key) => {
    //         try {
    //             const balance = await connection.getBalance(key);
    //             fetch("https://price.jup.ag/v4/price?ids=SOL")
    //                 .then((response) => response.json())
    //                 .then((result) => {
    //                     let perusdt = result.data.SOL.price;
    //                     setWalletBalance(balance / 1000000000 * perusdt);
    //                 })
    //                 .catch((error) => console.error(error));
    //         } catch (error) {
    //             console.error('Error fetching account balance:', error);
    //         }
    //     };

    //     if (publicKey) {
    //         setPubAddress(publicKey?.toBase58());
    //         fetchAccountBalance(publicKey);

    //         // Fetch account balance every 2 seconds
    //         intervalId = setInterval(fetchAccountBalance, 2000);
    //     } else {
    //         setPubAddress('');
    //         setWalletBalance(0);
    //     }

    //     // Clear interval on component unmount
    //     return () => {
    //         clearInterval(intervalId);
    //     };

    // }, [publicKey]);



    return (

        <>
            <div className='text-white mainPagebg' >
                <Nav />
                <div className='py-lg-5 px-3 text-center'>
                    <h2 className='display-5 text-center'><span className='fw-bold' style={{ color: '#2238ca' }}>Solana</span><span style={{ fontStyle: 'italic', fontWeight: 400, }}>Swap</span></h2>
                    <p className='col-lg-5 m-auto'>
                        SolanaSwap is a decentralized application that facilitates the swapping of tokens on Solana blockchain.
                    </p>

                    <div className='row justify-content-center py-3 col-lg-8 m-auto align-items-center mt-3 '>

                        <div className='col-lg-5'><img className='img-fluid' src="/purchase.png" alt='presale countdown' /></div>
                        <TimerCount />
                    </div>

                    <div className='d-flex flex-wrap py-md-5 pb-md-4 justify-content-center align-items-stretch mt-3 m-auto'>
                        <div style={{
                            background: '#00023350',
                            border: '1px solid #515151',
                        }} className='rounded-5 col-lg-4 col-12 me-lg-4 mb-3 mb-lg-0  text-start p-4' >
                            <div className='mb-3'><p className='d-flex align-items-center'>Wallet Balance <span className='ms-2'><RemoveRedEye onClick={() => { setHideBalance(!hideBalance) }} /></span></p></div>
                            <div className='mb-3'><h5 className='display-6'>${hideBalance ? '*******' : Number(walletBalance).toLocaleString()}</h5></div>
                            <div className='mb-3'><span className='rounded-5 py-1 ps-2 border border-1'>+3.499 <span className='rounded-5 p-1 border'>+12 %</span></span></div>

                            <div className='mb-3'>
                                <span style={{ visibility: 'hidden', position: 'absolute' }}>
                                    <WalletMultiButton
                                        sx={{ width: '100%', visbility: 'hidden' }}
                                        className='rounded-5 multibuttton shadow w-100 text-white'
                                    />
                                </span>
                                {!publicKey ?
                                    <>
                                        <button onClick={() => {
                                            let button = document.getElementsByClassName('wallet-adapter-button-trigger')[0].click();
                                            /*setShowConnect(true)*/
                                        }} className='rounded-5  inputMain shadow w-100 text-white'> <Power /> Connect Wallet</button>
                                    </>

                                    :
                                    <>
                                        <button onClick={() => {
                                            let button = document.getElementsByClassName('wallet-adapter-button-trigger')[0].click();
                                        }} className='rounded-5  inputMain shadow w-100 text-white'><Cancel /> Connected(click to disconnect)
                                            <br />
                                            <span>{`${pub_address.slice(0, 10)}..${pub_address.slice(-3, pub_address.length)}`}</span>
                                        </button>

                                    </>

                                }
                            </div>
                            <p>Connect your wallet to start swapping on SolanaSwap, no hidden fees.</p>
                        </div>
                        <Swap walletBalance={walletBalance} pub_address={pub_address} />
                    </div>
                </div>

            </div >
        </>

    )
}
