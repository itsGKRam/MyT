import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const EmailRef = useRef();
    const [data, setData] = useState({
        email: '',
        pincode: '',
        city: '',
        district: '',
        state: '',
    });
    const [valid, setValid] = useState(true);
    const [myPO, setMyPO] = useState([]);

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (data?.email) {
            if (data?.pincode) {
                if (data?.pincode?.length === 6) {
                    console.log(data);
                } else {
                    alert('Enter Valid Pincode');
                }
            } else {
                alert('Please enter pincode');
            }
        } else {
            alert('Please enter your email');
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (data?.pincode?.length === 6) {
                const res = await axios.get(
                    `https://api.postalpincode.in/pincode/${data.pincode}`,
                );
                const response = res.data;
                setMyPO(response[0]?.PostOffice);

                if (response[0]?.Status === 'Success') {
                    setValid(true);
                    setData({
                        ...data,
                        city: response[0]?.PostOffice[0].Division,
                        district: response[0]?.PostOffice[0].District,
                        state: response[0]?.PostOffice[0].State,
                    });
                } else {
                    setValid(false);
                    setData({
                        ...data,
                        city: '',
                        district: '',
                        state: '',
                    });
                }
            } else {
                return;
            }
        }
        fetchData();
    }, [data.pincode]);

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        margin: '10px',
                    }}
                >
                    <label htmlFor='name'>Email:</label>
                    <input
                        ref={EmailRef}
                        onChange={onChangeHandler}
                        name='email'
                        value={data.name}
                        type={'email'}
                    />
                    <label htmlFor='pincode'>Pincode</label>
                    <input
                        onChange={onChangeHandler}
                        name='pincode'
                        type={'number'}
                        value={data.pincode}
                        maxLength={6}
                    />
                    {!valid && <p>Invalid Pincode</p>}
                    {valid && data?.pincode?.length === 6 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <label htmlFor='city'>City</label>
                            <input
                                onChange={onChangeHandler}
                                name='city'
                                type={'text'}
                                value={data.city}
                            />
                            <label htmlFor='district'>District</label>
                            <input
                                onChange={onChangeHandler}
                                name='district'
                                type={'text'}
                                value={data.district}
                            />
                            <label htmlFor='state'>State</label>
                            <input
                                onChange={onChangeHandler}
                                name='state'
                                type={'text'}
                                value={data.state}
                            />
                        </div>
                    )}
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <h1>My Post Offices</h1>
            {myPO.map((response, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <h3>{response.Name}</h3> &nbsp;&nbsp;|&nbsp;&nbsp;
                        <h3>{response.DeliveryStatus}</h3>
                    </div>
                );
            })}
        </div>
    );
}
