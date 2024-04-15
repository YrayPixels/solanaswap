import { CloseOutlined, KeyboardArrowDown, SyncAltRounded, Wallet } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export default function Swap({ walletBalance, pub_address }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [token_list, setToken_list] = useState(JSON.parse(localStorage.getItem('tokenList'))) || [];
    const [showToken, setShowToken] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(1000)
    const [coversionFee, setConversionFee] = useState(300);
    const [fromToken, setFromToken] = useState('So11111111111111111111111111111111111111112')
    const [toToken, setToToken] = useState('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    const percentage = 10;



    async function getQuotes(amount) {
        const quoteResponse = await (await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${fromToken}&outputMint=${toToken}&amount=${amount}&slippageBps=50&platformFeeBps=${percentage}`)).json();
        console.log(quoteResponse);
    }
    useEffect(() => {
        // getTokenAccounts(pub_address, connection);
        let payAm = paymentAmount * 100000000;
        getQuotes(payAm);



    }, [paymentAmount, fromToken, toToken,])

    return (
        <div style={{
            background: '#00023350',
            border: '1px solid #515151',
        }} className='rounded-5 col-lg-6 text-start p-4' >
            {showToken &&

                <div style={{
                    position: 'fixed',
                    background: '#00023350',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,

                }} className='d-flex  justify-content-center align-items-center m-auto'>



                    <div className='shadow col-12 col-lg-6 container-fluid  rounded-5 bg-dark p-5' style={{ position: 'absolute', }}>
                        <CloseOutlined className='mb-3' onClick={() => { setShowToken(false) }} />
                        <div className='mb-3'>
                            <input className='inputStyleBg' type='text' placeholder="search for token" />
                        </div>
                        <div style={{ height: '400px', overflowY: 'scroll', }}>
                            {token_list.length > 0 && token_list.map((token, index) => {
                                return (
                                    <li style={{ cusor: 'pointer', listStyle: 'none' }} key={index}>{token.symbol}</li>
                                )
                            })}
                        </div>
                    </div>

                </div>
            }


            <div className='mb-3'><p className='fw-bold'>SWAP TOKENS</p></div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>

                    {!showToken && <p className='d-flex align-items-center'>Pay with  <Avatar onClick={() => { setShowToken(!showToken) }} sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/solana.png' alt="Profile Picture" /> <KeyboardArrowDown onClick={() => { setShowToken(!showToken) }} /> </p>
                    }
                </div>
                <div className='d-flex justify-content-start'>
                    {!showToken &&
                        <p className='d-flex align-items-center justify-content-start'>You get  <Avatar onClick={() => { setShowToken(!showToken) }} sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/bitcoin.png' alt="Profile Picture" /> <KeyboardArrowDown onClick={() => { setShowToken(!showToken) }} /> </p>
                    }
                </div>
            </div>

            <div className='d-flex align-items-center justify-content-around flex-wrap flex-lg-nowrap'>
                <div className='mb-3 col-12 col-lg-5'><input onChange={(e) => { setPaymentAmount(e.target.value) }} className='inputStyle rounded-5 ' type='text' placeholder='Enter amount' /></div>
                <div className='col-12 col-lg-2 text-center'>
                    <SyncAltRounded className='mb-3 text-center' sx={{ fontSize: '3em', background: '#0009E8', borderRadius: '50%', marginLeft: 5, marginRight: 5, padding: '5px', }} />
                </div>
                <div className='mb-3 col-12 col-lg-5'><input className='inputStyle rounded-5 ' value={coversionFee} type='text' placeholder='0.0000' /></div>

            </div>

            <div className='mb-3 align-items-center'> <Wallet /> <span>Balance:</span> <span className='btn btn-sm rounded-5 text-dark' style={{ background: '#FFFFFF' }}>{Number(walletBalance).toLocaleString()} SOL</span> </div>

            <hr />
            <div className='d-flex flex-wrap flex-lg-nowrap align-items-center'>
                <div className="col-lg-6 col-12 me-lg-2 mb-3">
                    <input type='text' className='w-100 rounded-5 inputStyleBg' placeholder='Enter/paste Solana address' />
                </div>
                <div className='col-lg-6 col-12  mb-3'>
                    <button onClick={() => { }} className='rounded-5 w-100 btn text-white inputMain shadow btn-lg'><SyncAltRounded sx={{ fontSize: '30px', background: '#0009E8', borderRadius: '50%', padding: '5px', }} /> Approve token swap</button>
                </div>

            </div>

        </div >
    )
}
