import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Mycontext from '../../Mycontext';

function Profile(){
    const sharedvalue=useContext(Mycontext);
    
    const [prodata,setprodata]= useState({
        name:sharedvalue.usr.profile.name,
        email:sharedvalue.usr.profile.email,
        phone:sharedvalue.mobile,
        address:''
    })

    useEffect(()=>{
        setprodata({
            ...sharedvalue.usr.profile,
            name:sharedvalue.usr.profile.name,
            email:sharedvalue.usr.profile.email,
        })
    },[sharedvalue])
    return(
        <>
            <div className='profile-con'>
                <div className="about-path">
                    <p>Home / <span>Profile</span></p>
                </div>
                <div className='profile-whole-edit-card'>
                    <div className='profile-edit-header'>
                        <h1>Edit Your Profile</h1>
                    </div>
                    {/* profile of each dives  */}
                    <div className='profile-two-divs'>
                        {/* profile divs first part */}
                        <div className='profile-edivs1'>
                            <div className='profile-edivs1-each'>
                                <h2>full name</h2>
                                <input type='text' value={prodata.name}/>
                            </div>
                            <div className='profile-edivs1-each'>
                                <h2>Phone</h2>
                                <input type='number' value={prodata.phone}/>
                            </div>
                            <div className='profile-edivs1-each'>
                                <h2>email</h2>
                                <input type='email' value={prodata.email}/>
                            </div>
                            <div className='profile-edivs1-each'>
                                <h2>address</h2>
                                <input type='text' placeholder='Add your Address...' value={prodata.address}/>
                            </div>
                        </div>
                        {/* middle buttons are require here */}
                        <div className='profile-middle-btns'>
                            <button>cancle</button>
                            <button>Save changes</button>
                        </div>

                        {/* last div part paswword changes */}
                        <div className='profile-chg-div'>
                            <div className='profile-chg-div-header'>
                                <h1>change password</h1>
                            </div>
                            <div className='profile-chg-pwd'>
                                <div className='profile-chg-pwd-e'>
                                    <input type='password' placeholder='Current Password'/>
                                </div>
                                <div className='profile-chg-pwd-e'>
                                    <input type='password' placeholder='New Password'/>
                                </div>
                                <div className='profile-chg-pwd-e'>
                                    <input type='password' placeholder='Confirm New Password'/>
                                </div>
                            </div>
                            <div className='profile-middle-btns'>
                                <button>cancle</button>
                                <button>Change password</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;