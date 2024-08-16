import React from 'react';
import { Route, Redirect, Routes, useNavigate, useLocation } from 'react-router-dom';
import MerchantLogin from '../auth/Login.js';
import { MerchantRegister, MerchantRegisterPreVerify } from '../auth/Register.js';

//PAGES
import Receipts from '../app/Receipts.js';
import Customers from '../app/Customers.js';
import Dashboard from '../app/Dashboard.js';
import Export from '../app/Export.js';

import Verify from '../auth/VerifyMerchant.js';
import PrivateRoute from "../../PrivateRoute/index.js"
import { AnimatePresence } from 'framer-motion'

function Router() {

    const location = useLocation();

    return (

        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/signin" element={<MerchantLogin/>}/>
                <Route path="/register" element={<MerchantRegister/>}/>
                <Route path='/preregister' element={<MerchantRegisterPreVerify/>}/>
                <Route path="/verifymerchant" element={<Verify/>}/>
                <Route path="/receipts" element={<PrivateRoute><Receipts/></PrivateRoute>}/>
                <Route path="/customers" element={<PrivateRoute><Customers/></PrivateRoute>}/>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/export" element={<PrivateRoute><Export/></PrivateRoute>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router;