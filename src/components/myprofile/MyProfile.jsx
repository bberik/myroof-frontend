import React from 'react'
import { useState } from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ListedProperties from './ListedProperties';
import FavoriteProperties from './FavoriteProperties';
import Contracts from './Contracts';
import Profile from './Profile';


const MyProfile = () => {
    const [section, setSection] = useState(0)
    const { collapseSidebar } = useProSidebar();

    const handleSectionChange = (sect) => {
        if (sect === section) return;
        setSection(sect)
    }





    return (
        <Box id="app" style={({ height: "100vh", }, { display: "flex", flexDirection: 'row', })}>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Dashboard</h2>
                    </MenuItem>

                    <MenuItem onClick={() => handleSectionChange(0)} icon={<NewspaperOutlinedIcon />}>Listed Properties</MenuItem>
                    <MenuItem onClick={() => handleSectionChange(1)} icon={<FavoriteBorderOutlinedIcon />}>Favourite Properties</MenuItem>
                    <MenuItem onClick={() => handleSectionChange(2)} icon={<ReceiptOutlinedIcon />}>Contracts</MenuItem>
                    <MenuItem onClick={() => handleSectionChange(3)} icon={<AccountCircleOutlinedIcon />}>Profile</MenuItem>
                </Menu>
            </Sidebar>
            <Box sx={{ display: 'flex', backgroundColor: "#F5FAFE", width: '100%' }}>
                {(() => {
                    switch (section) {
                        case 0:
                            return <ListedProperties />;
                        case 1:
                            return <FavoriteProperties />;
                        case 2:
                            return <Contracts />;
                        case 3:
                            return <Profile />;
                        default:
                            return null;
                    }
                })()}
            </Box>
        </Box>
    )
}

export default MyProfile