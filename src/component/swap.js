import { CloseOutlined, KeyboardArrowDown, SyncAltRounded, Wallet } from '@mui/icons-material'
import { Avatar, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { VersionedTransaction } from '@solana/web3.js';

export default function Swap({ pub_address }) {
    const { connection } = useConnection();
    const [loading, setLoading] = useState('');
    const { publicKey, sendTransaction, signTransaction, wallet } = useWallet();
    const [walletBalance, setWalletBalance] = useState('');
    const [token_list, setToken_list] = useState(JSON.parse(localStorage.getItem('tokenList'))) || [];
    const [showToken, setShowToken] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(1)
    const [conversionFee, setConversionFee] = useState(0);
    const [payeeFee, setPayeeFee] = useState(0);

    const [fromToken, setFromToken] = useState('So11111111111111111111111111111111111111112')
    const [toToken, setToToken] = useState('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    const [quotes, setQuotes] = useState('');
    const percentage = 10;
    // const filters = [
    //     {
    //         dataSize: 165,    //size of account (bytes)
    //     },
    //     {
    //         memcmp: {
    //             offset: 32,     //location of our query in the account (bytes)
    //             bytes: pub_address,  //our search criteria, a base58 encoded string
    //         }
    //     }
    // ];

    useEffect(() => {
        let payAm = paymentAmount * 100000000;
        getQuotes(payAm);
    }, [fromToken, toToken,])

    async function getQuotes(amount) {
        const quoteResponse = await (await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${fromToken}&outputMint=${toToken}&amount=${amount}&slippageBps=50&platformFeeBps=${percentage}`)).json();
        setQuotes(quoteResponse);
        setConversionFee((Number(quoteResponse?.outAmount) - Number(quoteResponse.platformFee?.amount)) / 100000)
        setPayeeFee(Number(quoteResponse?.platformFee?.amount));

        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / 1000000000);

    }
    function changeQuotes(value) {
        if (value == '') {
            setConversionFee(0)
        } else {
            let payAm = value * 100000000;
            getQuotes(payAm);
            setPaymentAmount(value);
        }

    }


    async function ConfirmPayment() {

        setLoading(true)

        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // quoteResponse from /quote api
                    "quoteResponse": quotes,
                    // user public key to be used for the swap
                    "userPublicKey": publicKey,
                    // auto wrap and unwrap SOL. default is true
                    "wrapAndUnwrapSol": true,
                    // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
                    "feeAccount": "sjLKJEcuR2xmzffbdSocaRD8HsybFZBJrzkLGaVjRVc"
                })
            })
        ).json();
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

        alert('transaction hash created, awaiting signing')

        // // sign the transaction
        let res = await signTransaction(transaction);
        console.log(res);


        // Execute the transaction
        // // const rawTransaction = transaction.serialize()
        const txid = await sendTransaction(transaction, connection, {
            skipPreflight: true,
            maxRetries: 2
        })
        try {
            const txid = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(txid);
            console.log(`https://solscan.io/tx/${txid}`);
            setLoading(false);
        } catch (error) {
            alert("Error sending transaction:", error);
            setLoading(false);
        }

    }



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
                        <p className='d-flex align-items-center justify-content-start'>You get  <Avatar onClick={() => { setShowToken(!showToken) }} sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=031' alt="Profile Picture" /> <KeyboardArrowDown onClick={() => { setShowToken(!showToken) }} /> </p>
                    }
                </div>
            </div>

            <div className='d-flex align-items-center justify-content-around flex-wrap flex-lg-nowrap'>
                <div className='mb-3 col-12 col-lg-5'><input onChange={(e) => { changeQuotes(e.target.value) }} className='inputStyle rounded-5 ' type='text' placeholder='Enter amount' /></div>
                <div className='col-12 col-lg-2 text-center'>
                    <SyncAltRounded className='mb-3 text-center' sx={{ fontSize: '3em', background: '#0009E8', borderRadius: '50%', marginLeft: 5, marginRight: 5, padding: '5px', }} />
                </div>
                <div className='mb-3 col-12 col-lg-5'><input className='inputStyle rounded-5 ' value={Number(conversionFee).toLocaleString()} type='text' placeholder='0.0000' />
                </div>

            </div>


            <div className='mb-3 align-items-center justify-content-between d-flex'> <span> <Wallet /> Balance: <span className='btn btn-sm rounded-5 text-dark' style={{ background: '#FFFFFF' }}>{Number(walletBalance).toLocaleString()} SOL</span> </span>    <span>Fee: {payeeFee / 100000}</span> </div>


            <hr />
            <div className='d-flex flex-wrap flex-lg-nowrap align-items-center'>
                <div className="col-lg-6 col-12 me-lg-2 mb-3">
                    <input type='text' className='w-100 rounded-5 inputStyleBg' placeholder='Enter/paste Solana address' />
                </div>
                <div className='col-lg-6 col-12  mb-3'>
                    <button onClick={() => { ConfirmPayment() }} className='rounded-5 w-100 btn text-white inputMain shadow btn-lg'>{loading ? <CircularProgress /> : <>
                        <SyncAltRounded sx={{ fontSize: '30px', background: '#0009E8', borderRadius: '50%', padding: '5px', }} /> Approve token swap  </>}</button>
                </div>

            </div>

        </div >
    )
}
