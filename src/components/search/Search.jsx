import React from 'react'
import Box from '@mui/material/Box';
import { maxWidth } from '@mui/system';
import Image from '../../assets/searchbanner.webp'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system';
import { Input } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const cities = [
    'Seoul',
    'Daejeon',
    'Busan',
    'Daegu',
    'Incheon',
]
const propertytypes = [
    'Apartment',
    'Office',
    'House',
];

const rooms = [
    '1',
    '2',
    '3',
    '4+',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function valuetext(value) {
    return `${value}°C`;
}

const StyledSelect = styled(Select)(({ theme }) => ({
    height: '40px', mx: 1, minWidth: '160px', maxWidth: '200px', border: 'none', outline: 'none', padding: '0.25 rem 0.75 rem', borderRadius: '12px', fontSize: '18px', cursor: 'pointer'

}));


const Search = () => {


    const [price, setPrice] = React.useState([2000, 3700]);
    const [propertyType, setPropertyType] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [room, setRoom] = React.useState([]);
    const [bathroom, setBathRoom] = React.useState([]);


    const minDistance = 1;
    const theme = useTheme();

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "propertyType":
                setPropertyType(typeof value === 'string' ? value.split(',') : value);
                break;
            case "city":
                setCity(value);
                break;
            case "room":
                setRoom(value);
                break;
            case "bathroom":
                setBathRoom(value);
                break;
            // and so on for all other filters
            default:
                break;
        }
    };

    const handlePriceChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }
    };

    const navigate = useNavigate()

    const handleSearch = () => {
        // navigating to properties
        navigate(`/?propertyType=${propertyType}&city=${city}&price=${price}&rooms=${room}&bathrooms=${bathroom}`)
        window.location.reload()
    }


    return (
        <Box sx={{ backgroundColor: '#F5FAFE', justifyContent: 'center' }}>
            <Box
                sx={{
                    width: maxWidth,
                    height: 500,
                    borderRadius: 2,
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: false,
                    backgroundPositionY: -150,
                    my: 1,
                    mx: 1,
                    boxShadow: 5,
                    zIndex: 0,
                }}
            >
                <Box sx={{ maxWidth: 1180, height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                    <Typography component="h2" fontSize={46} color="#ffcdd2" noWrap>Find Your Dream House</Typography>
                    <Typography component="h5" variant='h5' fontSize={36} color="#ffffff">Search for best real estate options available in South Korea</Typography>
                    <Box component='form' sx={{ width: '70%', backgroundColor: "#ffffff", px: '1.25rem', py: '1.5rem', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

                        <FormControl>
                            <InputLabel>City</InputLabel>
                            <StyledSelect
                                name="city"
                                variant='standard'
                                onChange={handleFilterChange}
                            >

                                {cities.map((name) => <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>)}
                            </StyledSelect>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Property Type</InputLabel>
                            <Select sx={{ height: '40px', mx: 1, minWidth: '160px', maxWidth: '300px', border: 'none', outline: 'none', padding: '0.25 rem 0.75 rem', borderRadius: '12px', fontSize: '18px', cursor: 'pointer' }}
                                multiple
                                value={propertyType}
                                name="propertyType"
                                label='Property Type'
                                onChange={handleFilterChange}
                                input={<Input id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {propertytypes.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, propertyType, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Bedrooms</InputLabel>
                            <Select sx={{ height: '40px', mx: 1, minWidth: '160px', maxWidth: '300px', border: 'none', outline: 'none', padding: '0.25 rem 0.75 rem', borderRadius: '12px', fontSize: '18px', cursor: 'pointer' }}
                                multiple
                                value={room}
                                name="room"
                                onChange={handleFilterChange}
                                input={<Input id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {rooms.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, room, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Bathrooms</InputLabel>
                            <Select sx={{ height: '40px', mx: 1, minWidth: '160px', maxWidth: '300px', border: 'none', outline: 'none', padding: '0.25 rem 0.75 rem', borderRadius: '12px', fontSize: '18px', cursor: 'pointer' }}
                                multiple
                                value={bathroom}
                                name="bathroom"
                                onChange={handleFilterChange}
                                input={<Input id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {rooms.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, bathroom, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ maxWidth: 300, m: 1.5, }}>
                            <Slider sx={{ minWidth: 300 }}
                                value={price}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                color="secondary"
                                min={500}
                                max={5000}
                            />
                            <InputLabel>Price Range ($)</InputLabel>
                        </Box>
                        <Button variant="contained" onClick={handleSearch} color='secondary' sx={{ m: 1.5 }} size="small">
                            <SearchOutlinedIcon></SearchOutlinedIcon>
                            Search
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default Search