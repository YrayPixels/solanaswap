import { Cancel, KeyboardArrowDown, Power, QrCode, RemoveRedEye, Search, SyncAltRounded, Timer, Wallet } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ConnectWallet from './connect-wallet'
import { isConnected } from '../utils/utils'
import { Connection, PublicKey } from '@solana/web3.js'
import Solflare from '@solflare-wallet/sdk'

const wallet = new Solflare();

export default function HomePage() {

    const connection = new Connection('https://api.devnet.solana.com');

    const [hideBalance, setHideBalance] = useState(false);
    const [walletconnected, setConnected] = useState(false)
    const [showConnect, setShowConnect] = useState(false);

    const [walletBalance, setWalletBalance] = useState(0);
    const [pub_address, setPubAddress] = useState('');

    useEffect(() => {
        isConnected().then(response => {
            if (response.status == false) {
                setConnected(false)
            } else {
                const pub_key = response.wallet.address;
                setPubAddress(pub_key);
                const publicKey = new PublicKey(pub_key);
                async function getAccountBalance() {
                    try {
                        const balance = await connection.getBalance(publicKey);
                        setWalletBalance(balance / 1000000000);
                        setConnected(true)
                        console.log(`Account balance: ${balance} SOL`);
                    } catch (error) {
                        console.error('Error fetching account balance:', error);
                    }
                }

                getAccountBalance();

            }

        }).catch(error => {
            console.log(error)
        });
    }, [showConnect])

    const disconnectWallet = async () => {
        await wallet.disconnect().catch((error) => {
            console.log(error)
        })
    }

    const [time, setTimeVar] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    // Function to update countdown timer
    function updateCountdownTimer(targetDate) {
        // Get the current time
        var now = new Date().getTime();

        // Calculate the remaining time
        var distance = targetDate - now;

        // Calculate hours, minutes, and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeVar({
            days: days,
            hours: hours,
            seconds: seconds,
            minutes: minutes,
        })
    }

    // Function to start countdown
    function startCountdown() {
        // Get the launch date string (example format: "March 17, 2024 12:00:00")
        var launchDateString = "May 17, 2024 12:00:00";
        var targetDate = new Date(launchDateString).getTime();

        // Update the countdown timer every second
        var countdownInterval = setInterval(function () {
            updateCountdownTimer(targetDate);
        }, 1000);
    }

    // Start the countdown when the page loads
    startCountdown();
    return (
        <div className='text-white mainPagebg' >
            {showConnect &&
                <ConnectWallet showConnect={showConnect} setShowConnect={setShowConnect} />
            }
            <nav style={{
                background: '#000355',
            }} className='d-flex flex-wrap px-5 py-3 container-fluid align-items-center justify-content-between align-items-center'>

                <div className='text-center'>
                    <img src='/logoSolana.png' alt='logo' />
                </div>
                <div className='d-flex align-items-center justify-lg-content-center g-2'>
                    <span>
                        <Search sx={{ height: 24, marginRight: 5, }} />
                    </span>
                    <span>
                        <QrCode sx={{ height: 24, marginRight: 5, }} />
                    </span>
                    <Avatar sx={{ height: 40, width: 40, border: '1px solid white' }} src='/logo.png' alt="Profile Picture" />
                </div>
            </nav>
            <div className='py-4 px-3 text-center'>
                <h2 className='display-5 text-center'><span className='fw-bold' style={{ color: '#2238ca' }}>Solana</span><span style={{ fontStyle: 'italic', fontWeight: 400, }}>Swap</span></h2>
                <p className='col-lg-5 m-auto'>
                    SolanaSwap is a decentralized application that facilitates the swapping of tokens on Solana blockchain.
                </p>

                <div className='row justify-content-center py-3 col-lg-8 m-auto align-items-center mt-3 '>

                    <div className='col-lg-5'><img className='img-fluid' src="/purchase.png" alt='presale countdown' /></div>
                    <div id="timerDiv" className='d-flex col-lg-6 align-items-center  justify-content-between m-auto timerDiv'>
                        <div className='singleArm'>
                            <p>{time.days}</p>
                            <span>Days</span>
                        </div>
                        <div>
                            <p>{time.hours}</p>
                            <span>Hours</span>
                        </div>
                        <div>
                            <p>{time.minutes}</p>
                            <span>Minutes</span>
                        </div>
                        <div>
                            <p>{time.seconds}</p>
                            <span>Seconds</span>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-wrap justify-content-center align-items-stretch mt-3 m-auto'>
                    <div style={{
                        background: '#00023350',
                        border: '1px solid #515151',
                    }} className='rounded-5 col-lg-4 col-12 me-lg-4 mb-3 mb-lg-0  text-start p-4' >
                        <div className='mb-3'><p className='d-flex align-items-center'>Wallet Balance <span className='ms-2'><RemoveRedEye onClick={() => { setHideBalance(!hideBalance) }} /></span></p></div>
                        <div className='mb-3'><h5 className='display-6'>${hideBalance ? '*******' : Number(walletBalance * 175).toLocaleString()}</h5></div>
                        <div className='mb-3'><span className='rounded-5 py-1 ps-2 border border-1'>+3.499 <span className='rounded-5 p-1 border'>+12 %</span></span></div>

                        <div className='mb-3'>
                            {walletconnected == false ?
                                <button onClick={() => { setShowConnect(true) }} className='rounded-5  inputMain shadow w-100 text-white'><Power /> Connect Wallet</button>
                                :
                                <>
                                    <button onClick={() => { disconnectWallet(true) }} className='rounded-5  inputMain shadow w-100 text-white'><Cancel /> Connected(click to disconnect)
                                        <br />
                                        <span>{`${pub_address.slice(0, 10)}..${pub_address.slice(-3, pub_address.length)}`}</span>
                                    </button>

                                </>

                            }
                        </div>
                        <p>Connect your wallet to start swapping on SolanaSwap, no hidden fees.</p>
                    </div>

                    <div style={{
                        background: '#00023350',
                        border: '1px solid #515151',
                    }} className='rounded-5 col-lg-6 text-start p-4' >
                        <div className='mb-3'><p className='fw-bold'>SWAP TOKENS</p></div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='d-flex align-items-center'>Pay with  <Avatar sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/solana.png' alt="Profile Picture" /> <KeyboardArrowDown /> </p>
                            </div>
                            <div className='d-flex justify-content-start'>
                                <p className='d-flex align-items-center justify-content-start'>You get  <Avatar sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/bitcoin.png' alt="Profile Picture" /> <KeyboardArrowDown /> </p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around flex-wrap flex-lg-nowrap'>
                            <div className='mb-3 col-12 col-lg-5'><input className='inputStyle rounded-5 ' type='text' placeholder='Enter amount' /></div>
                            <div className='col-12 col-lg-2 text-center'>
                                <SyncAltRounded className='mb-3 text-center' sx={{ fontSize: '3em', background: '#0009E8', borderRadius: '50%', marginLeft: 5, marginRight: 5, padding: '5px', }} />
                            </div>
                            <div className='mb-3 col-12 col-lg-5'><input className='inputStyle rounded-5 ' type='text' placeholder='0.0000' /></div>

                        </div>

                        <div className='mb-3 align-items-center'> <Wallet /> <span>Balance:</span> <span className='btn btn-sm rounded-5 text-dark' style={{ background: '#FFFFFF' }}>{walletBalance} SOL</span> </div>

                        <hr />
                        <div className='d-flex flex-wrap flex-lg-nowrap align-items-center'>
                            <div className="col-lg-6 col-12 me-lg-2 mb-3">
                                <input type='text' className='w-100 rounded-5 inputStyleBg' placeholder='Enter/paste Solana address' />
                            </div>
                            <div className='col-lg-6 col-12  mb-3'>
                                <button className='rounded-5 w-100 btn text-white inputMain shadow btn-lg'><SyncAltRounded sx={{ fontSize: '30px', background: '#0009E8', borderRadius: '50%', padding: '5px', }} /> Approve token swap</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}
