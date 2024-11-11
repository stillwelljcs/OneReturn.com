import React, { useCallback, useEffect, useRef } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js"
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


const BACKEND = process.env.REACT_APP_BACKEND;
console.log(BACKEND);

function App() {

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cup, setCup] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName:'',
    addr1:'',
    addr2:'',
    city:'',
    state:'',
    zipCode:'',
    contactInfo:'',
  });
  const formDataRef = useRef(formData);
  const cupRef = useRef(cup);

  // Update refs whenever formData or cup changes
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    cupRef.current = cup;
  }, [cup]);

  const initialOptions = {
    clientID: 'AQ6xHjBrzohsjCOijUIQB_2EFUSlSPfdUiY5894TSN-N9oPJWrj_vXAoB6xSfaANw45cOQDMpwgw-LPK',
  };

  const styles = {
    shape: 'rect',
    layout: 'vertical',
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value
    }));
}

const handleApprove = async (data, actions) => {
  console.log("Approve data:", data); 
  console.log("Latest formData:", formDataRef.current); 
  console.log("Latest cup:", cupRef.current); 

  try {
    const orderData = await actions.order.capture();
    console.log("Captured Order Data:", orderData); 

    // Post with latest values
    await axios.post(`${BACKEND}/stanleyEndpoint/`, {
      orderID: orderData.id,
      payerID: orderData.payer.payer_id,
      paymentDetails: orderData.purchase_units,
      cup: cupRef.current, 
      ...formDataRef.current,
    });

    console.log("Data sent successfully");

  } catch (error) {
    console.error("Error in handleApprove:", error);
  }
};

  return (
    <PayPalScriptProvider options={initialOptions}>
    <div className="App">
      <div className='container'>
        <div className='main'>
          <h1 className='main-tag'>Stanley Cup Overstock!</h1>
          <h3>Due to a shipping error, we currently have an overstock of The Quencher H2.0 FlowState™ Tumbler | 40 oz cups from Stanley.</h3>
          <div className='cu-promo-banner'>
            <h3>We are taking $10 off these cups, exclusive deal only for CU Boulder students.</h3>
            <h5>(Limited to one per order)</h5>
          </div>
        </div>
        <div className='steps'>

          <div className='step-1'>
            <h2>Step 1:</h2>
            <h3>Submit Student ID photo.</h3>
            <h4>Take either a photo or scan of your Buff OneCard and upload for proof of enrollment.</h4>
            
            <form className='upload-form'>
              <input type='file' id='student-id' name='student-id' accept='.pdf, .png, .jpeg, .jpg, .webp' onChange={handleFileChange}></input>
            </form>
          </div>

          <div className='step-2'>
            <h2>Step 2:</h2>
            <h3>Choose your cup.</h3>
            <h4>Choose between Cream, Lilac or Nectarine</h4>
            <div className='selection-images'>
              <img className={cup==='cream'? 'selected':'not-selected'} src='assets/cream.png' onClick={() => setCup('cream')}></img>
              <img className={cup==='lilac'? 'selected':'not-selected'} src='assets/lilac.png' onClick={() => setCup('lilac')}></img>
              <img className={cup==='nectarine'? 'selected':'not-selected'} src='assets/nectarine.png' onClick={() => setCup('nectarine')}></img>
            </div>
          </div>

          <div className='step-3'> 
            <h2>Step 3:</h2>
            <h3>Fill out shipping information and make payment!</h3>
            <div className='shipping-payment-info'>
              <form className='shipping-info-form'>
                  <label for='fullName'>Full Name</label>
                  <input type='text' id='fullName' name='fullName' onChange={handleInput}></input>
                  <label for='addr1'>Address Line 1</label>
                  <input type='text' id='addr1' name='addr1' onChange={handleInput}></input>
                  <label for='addr2'>Address Line 2</label>
                  <input type='text' id='addr2' name='addr2' onChange={handleInput}></input>
                  <label for='city'>City</label>
                  <input type='text' id='city' name='city' onChange={handleInput}></input>
                  <label for='state'>State</label>
                  <input type='text' id='state' name='state' onChange={handleInput}></input>
                  <label for='zipCode'>Zip Code</label>
                  <input type='text' id='zipCode' name='zipCode' onChange={handleInput}></input>
                  <label for='contactInfo'>Please provide a method of contact, in case there is an issue with your order (email, phone #, etc...)</label>
                  <input type='text' id='contactInfo' name='contactInfo' onChange={handleInput}></input>
              </form>
            </div>
          </div>
          <div className="checkout">
                <h2>Checkout</h2>
                <div className='checkout-item'>
                  <div>
                    <img className='checkout-img' src={`/assets/${cup}.png`} alt="Dynamic Image"/>
                    <h4>1x {cup.charAt(0).toUpperCase() + cup.slice(1)} Quencher H2.0 FlowState™ Tumbler | 40 oz:   $35.00 USD </h4>
                  </div>
                </div>
                <div>
                  <h4>1x Standard Shipping: $5.00 USD</h4>
                </div>
                <div>
                  <h4>Total: $40.00 USD</h4>
                </div>
              </div>
              <div className="payment">
                  <PayPalButtons
                  style={{ shape: 'rect', layout: 'vertical' }}
                  createOrder={(data, actions) => {
                    console.log(formData);
                    return actions.order.create({
                      purchase_units: [{
                        amount: { value: "35.00", currency_code: "USD" },
                      }],
                      shipping: {
                        options: [
                          {
                            id: "STANDARD",
                            label: "Standard Shipping",
                            type: "SHIPPING",
                            selected: true,
                            amount: {
                              value: "5.00",
                              currency_code: "USD",
                            },
                          },
                          {
                            id: "EXPRESS",
                            label: "Express Shipping",
                            type: "SHIPPING",
                            selected: false,
                            amount: {
                              value: "15.00",
                              currency_code: "USD",
                            },
                          },
                        ],
                      },
                    });
                  }}
                  onApprove={handleApprove}
                  />
              </div>
        </div>
      </div>
    </div>
    </PayPalScriptProvider>
  );
}

export default App;