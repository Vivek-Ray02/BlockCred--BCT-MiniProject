import '../CSS/Addorganization.css';
import { useState } from 'react';
import abi from '../abi/BlockCred.json';
import { ethers } from 'ethers';
import { Polybase } from "@polybase/client";


const Addorganization = () => {

    const [NameOfOrganization, setNameOfOrganization] = useState("");
    const [WalletAddress, setWalletAddress] = useState("");

    const db = new Polybase({
        defaultNamespace: "pk/0x88f745e138e0a6a011a9ac5acecba9b815f65d1f861188022ddeae9498fed2b5d26f492c6d09ed1590b1006a88914066ca4c78006e163ef83072f04658a98539/BlockCRED@",
    });

    const collectionReference = db.collection("Organizations");

    const HandleAddOrganization = async (e) => {
        e.preventDefault();
        const Providers = new ethers.providers.Web3Provider(window.ethereum);
        const Signers = Providers.getSigner();
        const ContractAddress = "0x15711b4CD7fc52c5b98905eAa1aADcd21a4A8d33";
        const contractABI = abi.abi;
        const ContractInstance = new ethers.Contract(ContractAddress, contractABI, Signers);
        const min = 1;
        const max = 100;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        try {
            const AddedStatus = await ContractInstance.addOrganization(WalletAddress, NameOfOrganization);

            if (AddedStatus) {
                const Polybasedata = await collectionReference.create([randomNum, NameOfOrganization, WalletAddress])
                alert("Organization Added!!");
            }
        } catch (err) {
            alert(`${err.reason}`)
        }

    }


    return (
        <>

            <div style={{ display: 'block', margin: 'auto' }} className='BgT' >

                <form className="formop">
                    <div className="form-titleop"><span>Create</span></div>
                    <div className="title-2op"><span>Organization</span></div>
                    <div className="input-containerop">
                        <input className="input-mailop" type="text" onChange={(e) => {
                            setWalletAddress(e.target.value);
                        }} placeholder="Enter Address" />
                        <span> </span>
                    </div>

                    <section className="bg-starsop">
                        <span className="starop"></span>
                        <span className="starop"></span>
                        <span className="starop"></span>
                        <span className="starop"></span>
                    </section>

                    <div className="input-containerop">
                        <input className="input-pwdop" type="text" placeholder="Enter Name" onChange={(e) => {
                            setNameOfOrganization(e.target.value);
                        }} />
                    </div>
                    <button type="submit" className="submitop" onClick={HandleAddOrganization}>
                        <span className="sign-textop">Create!!</span>
                    </button>


                </form>
            </div>



        </>
    )
}

export default Addorganization