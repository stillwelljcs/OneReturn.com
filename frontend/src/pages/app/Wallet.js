import React, { useEffect, useState, useContext, useParams } from "react";
import {Router, Switch, Route, Link } from 'react-router-dom';
import PopupWindow from "../auth/PopupWindow";
import Portal from "../../Util/Portal";
import Invoice from "./Invoice";
import axios from "axios";
import Cookies from "js-cookie";
import './wallet.css'
import Searchbar from "../app/Searchbar";

const BACKEND = process.env.REACT_APP_BACKEND;

const Wallet = () => {

    const [invoices, setInvoices] = useState([]);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [shareIndex, setShareIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [currInvoice, setCurrInvoice] = useState(null);

    //will be removed soon due to poor security
    let data;
    try {
        data = JSON.parse(Cookies.get('data'));
    } catch (e) {
        console.log("error parsing cookie: ", e);
        data = {};
    }

    const handleSearchResults = (results) => {
        setInvoices(results)
    }

    const toggleDropdown = (index) => {
        if(dropdownIndex === index) {
            setDropdownIndex(null);
        } else {
            setDropdownIndex(index);
        }
    }

    const togglePopupShare = (index) => {
        if(shareIndex === index) {
            setShareIndex(null);
        } else {
            setShareIndex(index);
        }
    }

    const togglePopupDelete = (index) => {
        if(deleteIndex === index) {
            setDeleteIndex(null);
        } else {
            setDeleteIndex(index);
        }
    }

    const editReceipt = (action, invoiceID, recipientID, sharedWith='', itemName='', returner='') => {
        const token = Cookies.get('token');
        console.log(sharedWith);
        axios
        .post(
            BACKEND+'/edit/',
            {
              action: action,
              invoiceID: invoiceID,
              recipientID: recipientID,
              sharedWith: sharedWith,
              itemName: itemName,
              returner: returner
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            fetchData();
            console.log("current version updated")
          })
          .catch((error) => {
            console.error('error: ', error);
          });
      };

    const fetchData = () => {
        const token = Cookies.get('token');
        axios.get(BACKEND+'/get/', {
            headers: {
                'Authorization': "Token " + token
            }
        })
        .then((response) => {
            console.log(response);
            setInvoices(response.data.invoices);
        })
        .catch((error) => {
            console.error('error: ', error);
        });
    }

    useEffect(() => {
        fetchData();
     }, []);

     useEffect(() => {
        if (invoices.length > 0) {
            setCurrInvoice(invoices[0].invoice.invoiceID);
        }
     }, [invoices]);

    const setInvoiceFocus = (invoiceID) => {
        setCurrInvoice(invoiceID);
        console.log("set: " + invoiceID);
    }

    return (
        <>
        <div className="functions-bar">
            <div className="funcbar-top-left">
                <img className='func-bar-icons' id='move' src="/expand-arrows.svg"></img>
                <img className='func-bar-icons' id='delete' src="/delete.svg"></img>
                <img className='func-bar-icons' id='archive' src="/archive.svg"></img>
                <img className='func-bar-icons' id='share' src="/share.svg"></img>
            </div>
            <div className="searchbar-container">
                <Searchbar onSearch={handleSearchResults}/>
            </div>
            <div className="funcbar-top-right">
                <img className='func-bar-icons' id='pin' src="/thumbtacks.svg" onClick={() => editReceipt('PIN', currInvoice, data.uuid)}></img>
                <img className='func-bar-icons' id='flag' src="/flag.svg"></img>
                <img className='func-bar-icons' id='report' src="/danger.svg"></img>
                <img className='func-bar-icons' id='print' src="/printer.svg"></img>
            </div>
        </div>
        <div className="main-container">
            <div className="invoices-nondetailed-list">
                {!invoices || invoices.length === 0 ? (
                    <div className="ndinvoicebox">
                    <p>No receipts found</p>
                    </div>
                ) : (
                    invoices.map((invoice, index) => (
                    <div className='ndinvoicebox' key={index} onClick={() => setInvoiceFocus(invoice.invoice.invoiceID)}>
                        {invoice.invoice.pinned &&
                            <img className='nd-invoice-icon' src='/thumbtacks.svg'></img>
                        }
                        <h5>Invoice ID: {invoice.invoice.invoiceID}</h5>
                        <h5>Merchant Name: {invoice.invoice.merchantName}</h5>
                        <h5>Merchant ID: {invoice.invoice.merchantID}</h5>
                    </div>
                    ))
                )}
            </div>
            <div className="invoice-detailed">
                {currInvoice && <Invoice invoiceID={currInvoice}/> }
            </div>
        </div>
        </>
        );
}


export default Wallet;
