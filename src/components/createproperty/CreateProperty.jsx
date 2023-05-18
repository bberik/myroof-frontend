import { Box, Typography, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, Input, List, ListItem, ListItemText, ListItemIcon, InputAdornment, FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import PhotoIcon from '@mui/icons-material/Photo'
import { request } from '../../utils/fetchAPI'
import AuthContext from '../../context/AuthContext'
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
});
const bucketName = process.env.REACT_APP_BUCKET;


const propertyTypes = [
    'Apartment',
    'House',
    'Office',
]

const rooms = [
    '1',
    '2',
    '3',
    '4+',
]

const amenities = [
    "Air conditioning",
    "Balcony",
    "Cable/satellite TV",
    "Dishwasher",
    "High-speed internet",
    "On-site maintenance",
    "Pet-friendly",
    "Security system",
    "Cable/satellite TV",
]

const StyledSelect = styled(Select)(({ theme }) => ({
    height: '40px', mx: 1, minWidth: '160px', maxWidth: '300px', border: 'none', outline: 'none', padding: '0.25 rem 0.75 rem', borderRadius: '12px', fontSize: '18px', cursor: 'pointer'

}));


const CreateProperty = () => {
    const { authRequest } = useContext(AuthContext)
    const [cities, setCities] = useState([])
    const [complexes, setComplexes] = useState([])
    const [buildings, setBuildings] = useState([])
    const [allBuildings, setAllBuildings] = useState([])
    const [state, setState] = useState({})
    const [fileList, setFileList] = useState(null);
    const [amenityList, setAmenityList] = useState(amenities.reduce((acc, amenity) => {
        acc[amenity] = false;
        return acc;
    }, {}))

    console.log(amenityList)

    let files = fileList ? [...fileList] : [];
    const navigate = useNavigate()

    const handleState = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleAmenities = (event) => {
        const amenityName = event.target.name;
        const isChecked = event.target.checked;

        setAmenityList((prevState) => ({
            ...prevState,
            [amenityName]: isChecked,
        }));
    };


    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };


    useEffect(() => {
        const fetchAllBuildings = async () => {
            const [data, status] = await request(`api/buildings`, 'GET')
            setAllBuildings(data)
        }
        fetchAllBuildings()
    }, [])

    useEffect(() => {
        setCities([...new Set(allBuildings?.map(building => building.address.city))])
    }, [allBuildings])

    useEffect(() => {
        setComplexes(allBuildings
            .filter(building => building.address.city === state?.city)
            .map(building => building.complex.name))
    }, [cities, state])

    useEffect(() => {
        setBuildings(allBuildings
            .filter(building => building.address.city === state?.city).filter(building => building.complex.name === state?.complex)
            .map(building => building.name))
    }, [complexes, state])


    const handleUpload = async (event) => {
        event.preventDefault();
        if (!files || files.length === 0) {
            return alert("Please, upload at least 1 image of the property");
        }

        const images = await UploadImages()

        const checkedAmenities = [];
        for (const amenity in amenityList) {
            if (amenityList[amenity]) {
                checkedAmenities.push(amenity);
            }
        }

        const newProperty = {
            'name': state.name,
            'property_type': state.property_type,
            'floor': parseInt(state.floor),
            'area': parseFloat(state.area),
            'rooms': state.rooms,
            'bathrooms': state.bathrooms,
            'availability': true,
            'description': state.description,
            'images': images,
            'amenities': checkedAmenities,
            'price': parseFloat(state.price),
            'building': state.building,
            'city': state.city,
            'complex': state.complex,
        }

        try {

            const headers = {
                "Content-Type": "application/json",
            }

            const data = await authRequest(`api/create`, "POST", headers, newProperty)
            alert("The property is listed. ")
            navigate('/my-profile')
        } catch (error) {
            console.error(error)
            return alert("Something went wrong, try again");
        }
    }



    const UploadImages = async () => {

        let promises = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const params = {
                Bucket: bucketName,
                Key: `images/${uuidv4()}-${file.name}`,
                Body: file,
            };

            const uploadPromise = new Promise((resolve, reject) => {
                s3.upload(params, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(data.Location);
                    }
                });
            });


            promises.push(uploadPromise);

        }

        const image_list = await Promise.all(promises);
        const images = image_list.join(' ')
        return images
    }


    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#F5FAFE', justifyContent: 'center' }}>
            <Box onSubmit={handleUpload} component='form' noValidate={true} sx={{
                display: 'flex',
                width: '75%',
                maxHeight: '60%',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                alignItems: 'c',
                my: '50px',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel>City</InputLabel>
                    <StyledSelect required name='city' onChange={handleState} variant='standard'>
                        {cities.map((name) => <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>)}
                    </StyledSelect>
                </FormControl>

                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <FormControl sx={{ m: 5 }}>
                        <InputLabel>Apartment Complex</InputLabel>
                        <StyledSelect required name='complex' onChange={handleState} variant='standard'>
                            {complexes.map((name) => <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>)}
                        </StyledSelect>
                    </FormControl>
                    <Link to='/createcomplex'>Couldn't find your Apartment Complex?</Link>
                </Box>

                <FormControl sx={{ m: 5 }}>
                    <InputLabel>Building</InputLabel>
                    <StyledSelect required name='building' onChange={handleState} variant='standard'>
                        {buildings.map((name) => <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>)}
                    </StyledSelect>
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel>Property Type</InputLabel>
                    <StyledSelect required name='property_type' onChange={handleState} variant='standard'>
                        {propertyTypes.map((name) => <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>)}
                    </StyledSelect>
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel>Floor</InputLabel>
                    <Input required name='floor' onChange={handleState} type='number'></Input>
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel>Area</InputLabel>
                    <Input required name='area' onChange={handleState} type='number'></Input>
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel>Rooms</InputLabel>
                    <StyledSelect required name='rooms' onChange={handleState} variant='standard'>
                        {rooms.map((name) => <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>)}
                    </StyledSelect>
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel>Bathrooms</InputLabel>
                    <StyledSelect required name='bathrooms' onChange={handleState} variant='standard'>
                        {rooms.map((name) => <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>)}
                    </StyledSelect>
                </FormControl >
                <FormControl fullWidth sx={{ m: 5 }}>
                    <TextField
                        label="Description"
                        multiline
                        required name='description' onChange={handleState}
                        rows={6}
                        variant="standard"
                    />
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Monthly Rent Price</InputLabel>
                    <Input required name='price' type='number' onChange={handleState}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>
                <FormControl sx={{ m: 5 }}>
                    <TextField
                        label="Property Name"
                        required name='name' onChange={handleState}
                        variant="standard"
                    />
                </FormControl>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <Typography variant='h5'>Amenities</Typography>
                    <FormGroup>
                        {amenities.map((amenity) =>

                            <FormControlLabel
                                control={
                                    <Checkbox checked={amenityList[amenity]} onChange={handleAmenities} name={amenity} />
                                }
                                label={amenity}
                            />
                        )
                        }
                    </FormGroup>
                </FormControl>
                <Box sx={{ m: 5 }}>
                    <Button
                        variant="contained"
                        component="label"
                        onChange={handleFileChange}
                    >
                        Upload Images of the Property
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                        />
                    </Button>
                    <List>
                        {files.map((file, i) => (
                            <>
                                <ListItemIcon>
                                    <PhotoIcon />
                                </ListItemIcon>
                                <ListItemText key={i}>
                                    {file.name} - {file.type}
                                </ListItemText>
                            </>
                        ))}
                    </List>
                </Box>

                <Box sx={{ maxWidth: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' type="submit" color='secondary'>List</Button>
                </Box>

            </Box>
        </Box>
    )
}

export default CreateProperty