import React, { useEffect, useState } from 'react'
import { Cancel, KeyboardArrowDown, Power, RemoveRedEye, Search, SyncAltRounded, Timer, Wallet } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Nav from '../component/nav';
import TimerCount from '../component/timer';



export default function HomePage() {

    const [hideBalance, setHideBalance] = useState(false);
    const [walletconnected, setConnected] = useState(false)
    const [showConnect, setShowConnect] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [pub_address, setPubAddress] = useState('');
    const [publicKey, setPublicKey] = useState(null);
    const [fromToken, setFromToken] = useState(null);
    const [toToken, setToToken] = useState(null);
    const [amount, setAmount] = useState(0);




    return (

        <>
            <div className='text-white mainPagebg' >

                <Nav />
                <div className='py-4 px-3 text-center'>
                    <h2 className='display-5 text-center'><span className='fw-bold' style={{ color: '#2238ca' }}>Solana</span><span style={{ fontStyle: 'italic', fontWeight: 400, }}>Swap</span></h2>
                    <p className='col-lg-5 m-auto'>
                        SolanaSwap is a decentralized application that facilitates the swapping of tokens on Solana blockchain.
                    </p>

                    <div className='row justify-content-center py-3 col-lg-8 m-auto align-items-center mt-3 '>

                        <div className='col-lg-5'><img className='img-fluid' src="/purchase.png" alt='presale countdown' /></div>
                        <TimerCount />
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
                                    <>
                                        <WalletMultiButton
                                            sx={{ width: '100%', visbility: 'hidden' }}
                                            className='rounded-5  inputMain shadow w-100 text-white'
                                        />
                                        <button onClick={() => { /*setShowConnect(true)*/ }} className='rounded-5  inputMain shadow w-100 text-white'> <Power /> Connect Wallet</button>
                                    </>

                                    :
                                    <>
                                        <button onClick={() => { /*disconnectWallet(true)*/ }} className='rounded-5  inputMain shadow w-100 text-white'><Cancel /> Connected(click to disconnect)
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
                                <div className='mb-3 col-12 col-lg-5'><input onChange={(e) => { setAmount(e.target.value) }} className='inputStyle rounded-5 ' type='text' placeholder='Enter amount' /></div>
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
                                    <button onClick={() => { }} className='rounded-5 w-100 btn text-white inputMain shadow btn-lg'><SyncAltRounded sx={{ fontSize: '30px', background: '#0009E8', borderRadius: '50%', padding: '5px', }} /> Approve token swap</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>

    )
}
