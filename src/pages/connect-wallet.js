import { Close } from '@mui/icons-material';
import Solflare from '@solflare-wallet/sdk';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const wallet = new Solflare();

export default function ConnectWallet({ showConnect, setShowConnect }) {
    const [loading, setloading] = useState(false);
    const [walletAddress, setWalletAddress] = useState({
        'address': '',
        'wallet': '',
    })

    useEffect(() => {
        localStorage.setItem('wallet', JSON.stringify(walletAddress));
        if (walletAddress.wallet != '') {
            setShowConnect(false)
        }
    }, [walletAddress.wallet])


    wallet.on('connect', () => {
        setWalletAddress({ address: wallet.publicKey.toString(), wallet: 'solana' });
    });
    wallet.on('disconnect', () => {
        console.log('disconnected');
    });
    const connectSolana = async () => {
        await wallet.connect().catch((error) => {
            console.log(error)
        })
    }
    const availableWallets = [
        {
            id: "phantom",
            logo: "https://docs.phantom.app/~gitbook/image?url=https:%2F%2F187760183-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MVOiF6Zqit57q_hxJYp%252Ficon%252FU7kNZ4ygz4QW1rUwOuTT%252FWhite%2520Ghost_docs_nu.svg%3Falt=media%26token=447b91f6-db6d-4791-902d-35d75c19c3d1&width=32&dpr=4&quality=100&sign=0d01f5accfac710f05b75b2363dae64ab458e7f95ef2f21cd32000ff0f05f5d4",
            wallet_name: "Phantom",
        },
        {
            id: "solana",
            logo: "https://docs.solflare.com/~gitbook/image?url=https:%2F%2F2465042048-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-Mgv3_8586v0mVL4zZax%252Ficon%252FWvDTo0Kodwa4awPEQrsO%252Fflarelogo.png%3Falt=media%26token=b115a1f0-a543-4a49-828a-e3ede684055e&width=32&dpr=1&quality=100&sign=642f769b3569989d1e5222d72a9192f9382bc02c6459a60aee344ec1fc27af58",
            wallet_name: "Solflare Wallet",
        }
    ]
    const connectWallet = (wallet_type) => {
        if (wallet_type == 'solana') {
            connectSolana();

        } else {
            connectPhantom()
        }
    }
    const connectPhantom = async () => {
        if (window.solana) {
            const solana = window.solana
            const res = await solana.connect();
            setWalletAddress({ address: res.publicKey.toString(), wallet: 'phantom' });
        } else {
            alert('Wallet not found! Get a Phantom wallet!')
        }
    }

    return (
        <div className='text-white py-lg-5 px-3 d-flex justify-content-center align-items-center m-auto' style={{ position: 'absolute', width: '100%', zIndex: 1000, overflowY: 'hidden', height: '100vh', background: '#00035590', }}>
            <div className='container-fluid col-lg-5 p-4 rounded-3 ' style={{ background: '#000355' }} >
                <div className='text-start d-flex justify-content-between align-items-center'>
                    <img src='/logoSolana.png' height={40} alt='logo' />
                    <Close onClick={() => { setShowConnect(false) }} sx={{ color: 'white' }} />
                </div>
                <div className='py-4 text-start'>
                    <h2 className='fw-bold '>Get set up in 2 mins</h2>
                    <p className=''>
                        Please connect your wallet
                    </p>

                    {availableWallets.map((item, index) => {
                        let isType = walletAddress.wallet == item.id;

                        return (
                            <div key={index} className='m-auto mb-3'>
                                <div className='d-flex inputMain align-items-center justify-content-between rounded-3 p-3'>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <img src={item.logo} style={{ height: '30px', borderRadius: '50%' }} className='img-fluid me-2' alt='logo' />
                                        <span>{item.wallet_name}</span>
                                    </div>
                                    <span onClick={() => { connectWallet(item.id) }} className={`${isType ? 'btn-success' : 'btn-warning'} btn fw-bold btn-sm rounded-4`}>{isType ? "Connected" : "Connect"}</span>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
