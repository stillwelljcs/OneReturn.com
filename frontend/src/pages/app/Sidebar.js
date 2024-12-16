import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import './sidebar.css'
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {

    const [sidebarState, dispatch] = useContext(SidebarContext);
    let navigate = useNavigate();
    const [walletDropdown, setWalletDropdown] = useState(false);

    const toggleWalletDropdown = () => {
      setWalletDropdown(!walletDropdown);
    }

    switch(sidebarState.type) {

      case 'SETTINGS_BAR':
        return (
          <div className="menu-container-settings">
            <div className="menu-item" onClick={() => navigate('/settings/user')}>
              <span className="dash-text">Profile</span>
            </div>
            <div className="menu-item" onClick={() => navigate('/settings/receipts')}>
              <span className="dash-text">Receipt Settings</span>
            </div>
            <div className="menu-item" onClick={() => navigate('/settings')}>
              <span className="dash-text">App Settings</span>
            </div>
          </div>
        );
      case 'WALLET_BAR':
        return (
          <div className="menu-container-normal">
            <div className="menu-item" onClick={() => navigate('/wallet')}>
                <img className='sidebar-icons' id='sidebar-dropdown' src="/chevron.svg" onClick={() => toggleWalletDropdown()}></img>
                <span className="dash-text">Wallet</span>
            </div>
            {walletDropdown && (
              <div className="wallet-sub-items">
                <div className="menu-sub-item">
                    <span className="dash-sub-text" onClick={() => navigate('/wallet/archived')}>Archived</span>
                </div>
                <div className="menu-sub-item">
                    <span className="dash-sub-text" onClick={() => navigate('/wallet/trash')}>Trash</span>
                </div>
              </div>
              )
            }
          </div>
        );
    }
}

export default Sidebar;