import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Connection, PublicKey } from '@solana/web3.js'
import { isConnected } from '../utils/utils';
import { AccountBox, Add, AddCircleOutlineTwoTone, CheckCircle, Close, ConnectingAirportsOutlined, FolderCopy, GifBox, QuestionMarkRounded, Wallet } from '@mui/icons-material';


export default function Beneficiaries() {

    // const connection = new Connection('https://api.mainnet-beta.solana.com');
    const connection = new Connection('https://api.devnet.solana.com');

    const [pub_address, setPubAddress] = useState('');
    const [walletBalance, setWalletBalance] = useState('')
    const [editBen, setEditBe] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [benefi, setBenefi] = useState(JSON.parse(localStorage.getItem('beneficiaries')) || [])


    const [beneficiary, setBeneficiary] = useState({
        name: `Beneficiary ${benefi.length + 1}`,
        wallet_address: '',
        res_percent: '',
        email: '',
    })
    const [added, setAdded] = useState(0);
    useEffect(() => {
        isConnected().then(response => {
            if (response.status == false) {
                window.location.href = "/connect-wallet"
            } else {
                const pub_key = response.wallet.address;
                setPubAddress(pub_key);
                const publicKey = new PublicKey(pub_key);
                async function getAccountBalance() {
                    try {
                        const balance = await connection.getBalance(publicKey);
                        setWalletBalance(balance / 1000000000);
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
    }, [])

    useEffect(() => {
        setBenefi(JSON.parse(localStorage.getItem('beneficiaries')) || []);
    }, [added])
    function copyClip() {
        navigator.clipboard.writeText(pub_address);
        alert('address copied!')
    }

    function addBeneficiary(e) {
        e.preventDefault();

        let existingBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
        const existingBeneficiary = existingBeneficiaries.find(b => b.wallet_address === beneficiary.wallet_address);

        const totalAllocatedPercentages = existingBeneficiaries.reduce((walletBalance, ben) => walletBalance + parseFloat(ben.res_percent || 0), 0);

        // Add the percentage of the new beneficiary to check if it exceeds total balance
        const proposedTotalPercentage = totalAllocatedPercentages + parseFloat(beneficiary.res_percent || 0);

        if (proposedTotalPercentage <= 100) {
            if (!existingBeneficiary) {
                const updatedBeneficiaries = [...existingBeneficiaries, beneficiary];
                localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
                setBeneficiary({ ...beneficiary, name: `Beneficiary ${benefi.length + 1}` })


                setAdded(Math.random())
            } else {
                console.log('Beneficiary already exists.');
            }
        } else {
            alert('total allocated percentage greater than wallet balance');
        }
    }

    function deleteBeneficiary(walletAddress) {
        let existingBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
        const updatedBeneficiaries = existingBeneficiaries.filter(b => b.wallet_address !== walletAddress);
        localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
        setBeneficiary({ ...beneficiary, name: `Beneficiary ${benefi.length == 1 ? 1 : benefi.length + 1}` })

        setAdded(Math.random())
    }


    return (
        <div className='text-white py-lg-5 px-3 d-flex justify-content-center align-items-center m-auto' style={{ background: 'black', }}>
            <div className='row justify-content-center align-items-center p-4 rounded-3 '  >
                <div className='col-lg-4 p-lg-4 p-1'>
                    <h6 className='d-flex fw-bold align-items-center'> <span className='me-2'>Connected Wallets</span> <QuestionMarkRounded sx={{ fontSize: '15px', color: 'black', background: 'grey', borderRadius: '50%', }} />
                    </h6>

                    <div className='m-auto mb-3'>

                        <div className='d-flex mb-2 walletList align-items-center justify-content-between rounded-3 p-3'>
                            <span className='align-items-center d-flex'>
                                <CheckCircle color='#FFECCF' />
                                <span>{`${pub_address.slice(0, 10)}..${pub_address.slice(-3, pub_address.length)}`}</span>
                            </span>
                            <span onClick={copyClip} className=''><FolderCopy /></span>
                        </div>
                        <div className='bg-dark p-3 rounded-3 mb-3'>
                            <p style={{ fontSize: '14px' }} className='fw-bold'> <Wallet />Total wallet value
                            </p>
                            <h5>{Number(walletBalance).toFixed(2)} SOL</h5>
                        </div>
                    </div>
                    <p className='fw-bold'>Add wallet address  <Add />
                    </p>
                    <div className='py-4 text-start'>
                        <h6 className='d-flex fw-bold align-items-center'> <span className='me-2'>Assets</span> <QuestionMarkRounded sx={{ fontSize: '15px', color: 'black', background: 'grey', borderRadius: '50%', }} />
                        </h6>


                        {benefi.length > 0 && benefi.map((item, index) => {

                            return (
                                <div className='bg-dark p-3 rounded-3 mb-3' key={index}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p style={{ fontSize: '14px' }} className='fw-bold labelText'> <AccountBox />Total value allocated
                                        </p>
                                        <p onClick={() => { deleteBeneficiary(item.wallet_address) }}> <Close sx={{ fontSize: '12px' }} /></p>
                                    </div>
                                    <h5>{(item.res_percent / 100 * walletBalance).toFixed(2)} SOL</h5>
                                    <p style={{ fontSize: '14px' }} className='fw-bold'> ({item.res_percent}%)
                                    </p>
                                </div>
                            )

                        })
                        }

                    </div>
                </div>
                <div className='col-lg-5 p-lg-4 p-1'>
                    <div style={{ background: '#1A1A1A' }} className='p-4 rounded-3' >
                        <div className='text-start '>
                            <img src='/logo.png' style={{ height: '20px' }} className='img-fluid' alt='logo' />
                        </div>
                        <div className='py-4 text-start'>
                            <h6 className='d-flex fw-bold align-items-center'> <span className='me-2'>Allocate your resources</span> <QuestionMarkRounded sx={{ fontSize: '15px', color: 'black', background: 'grey', borderRadius: '50%', }} />
                            </h6>
                            <p className=''>
                                Set up your beneficiaries/backup and allocate your resources to people who you’d like to inherit your assets
                            </p>

                            <h4 className='mt-4 align-items-center fw-bold d-flex'><span className='me-3'>{beneficiary.name}</span>
                                {!editBen ?
                                    <span onClick={() => { setEditBe(true) }} style={{ fontSize: '10px' }} className='bg-dark rounded-1 p-1'>Rename</span>
                                    :
                                    <span onClick={() => { setEditBe(false) }} style={{ fontSize: '10px' }} className='bg-dark rounded-1 p-1'>Save</span>
                                }
                            </h4>

                            <div className='m-auto mb-3'>
                                <form className='form' onSubmit={addBeneficiary}>
                                    {
                                        editBen &&
                                        <div className='mb-3'>
                                            <label className='labelText'>Beneficiary Name </label>
                                            <input required value={beneficiary.name} onChange={(e) => { setBeneficiary({ ...beneficiary, name: e.target.value }) }} placeholder='enter wallet address' className='form-control inputClass' />
                                        </div>
                                    }

                                    <div className='mb-3'>
                                        <label className='labelText'># Address </label>
                                        <input required onChange={(e) => { setBeneficiary({ ...beneficiary, wallet_address: e.target.value }) }} value={beneficiary.wallet_address} type='text' placeholder='enter wallet address' className='form-control inputClass' />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='labelText'>Allocate Resources </label>
                                        <input max={100} min={1} required value={beneficiary.res_percent} onChange={(e) => { setBeneficiary({ ...beneficiary, res_percent: e.target.value }) }} type='number' placeholder='enter in percentage' className='form-control inputClass' />
                                    </div>
                                    {
                                        addEmail ?
                                            <div className='mb-3'>
                                                <label className='labelText'>Benficiary Email </label>
                                                <input value={beneficiary.email} onChange={(e) => { setBeneficiary({ ...beneficiary, email: e.target.value }) }} type="email" placeholder='enter email address' className='form-control inputClass' />
                                            </div>
                                            :
                                            <p onClick={() => { setAddEmail(true) }} className='d-flex fw-bold align-items-center'> <span className='me-2'>Add contact email</span> <AddCircleOutlineTwoTone sx={{ fontSize: '15px', color: 'black', background: 'grey', borderRadius: '50%', }} />
                                            </p>
                                    }

                                    <div className='text-center mt-4'>
                                        <button className='btn' type='submit'>

                                            <span style={{ color: '#FFECCF', fontSize: '16px' }} className='me-2'>Add another beneficiary</span> <AddCircleOutlineTwoTone sx={{ fontSize: '15px', color: 'black', background: 'grey', borderRadius: '50%', }} />
                                        </button>

                                    </div>

                                </form>
                            </div>

                            <div className='d-flex py-2 justify-content-around align-items-center'>
                                <button style={{ fontSize: '18px' }} className='btn col-5 btn-dark btn-lg'>Skip</button>
                                <button style={{ fontSize: '18px' }} className='btn col-5 btn-primary'>Proceed</button>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
