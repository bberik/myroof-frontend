import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Stack, ImageList, ImageListItem, styled, Divider, Chip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { request } from '../../utils/fetchAPI'
import AuthContext from '../../context/AuthContext';
import { Button } from '@mui/material';




const PhotoGallery = ({ images }) => {

    const ImgContainer = styled(Box)(({ theme }) => ({
        width: "100%",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <Box sx={{ backgroundColor: '#F5FAFE', m: 1 }}>
            <ImgContainer><img src={selectedImage} alt="house" style={{ minWidth: '100%', width: '100%', maxWidth: "100%", objectFit: 'contain' }} /></ImgContainer>
            <ImageList sx={{ width: '100%' }} cols={5} >
                {images.map((image, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={image}
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleThumbnailClick(image)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}


const PropertyDetails = () => {

    const [property, setProperty] = useState(null)
    const { id } = useParams()
    let { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            const [data, status] = await request(`api/property/${id}`, 'GET')
            setProperty(data)
        }
        fetchPropertyDetails()
    }, [])


    const details = [
        { title: 'City', value: property?.building.address.city },
        { title: 'Complex', value: property?.building.complex.name },
        { title: 'Year built', value: property?.building.complex.date_built },
        { title: 'Floor', value: `${property?.floor} out of ${property?.building.floors}` },
        { title: 'Area', value: `${property?.area} square meters` },
        { title: 'Rooms', value: property?.rooms },
        { title: 'Bathrooms', value: property?.bathrooms },
    ];

    const owner = [
        { title: 'Name', value: property?.owner.first_name + ' ' + property?.owner.last_name },
        { title: 'Email', value: property?.owner.email },
        { title: 'Mobile', value: property?.owner.mobile },
    ];

    const propertyImages = property?.images.split(' ')

    return (
        <Box sx={{ width: '100%', backgroundColor: '#F5FAFE' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', py: 4, px: 5 }}>
                <Typography variant='h4'>
                    {property?.name}
                </Typography>
                {
                    user?.username === property?.owner.username ? <Button href={`/editproperty/${property?.id}`} variant="contained" color='secondary'>Edit My Property</Button> : null
                }
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap'
            }}>
                <Box sx={{ m: 5, maxWidth: '30%' }}>
                    <Box>
                        <Typography variant='h5'>
                            {Number(property?.price)}$/month
                        </Typography>
                    </Box>

                    <Box sx={{ m: 1 }}>
                        {details.map((detail, index) => (
                            <>
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ m: 1 }}>{detail.title}</Typography>
                                    {detail.title === 'Complex' ? <Link to='/'><Typography sx={{ m: 1 }}>{detail.value}</Typography></Link> : <Typography sx={{ m: 1 }}>{detail.value}</Typography>}
                                </Box>
                                <Divider />
                            </>
                        ))}
                    </Box>
                    <Box marginTop={5}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Owner Contacts</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {owner.map((info, index) => (
                                    <>
                                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ m: 1 }}>{info.title}</Typography>
                                            <Typography sx={{ m: 1 }}>{info.value}</Typography>
                                        </Box>
                                        <Divider />
                                    </>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>
                <Box maxWidth='60%'>
                    {propertyImages ?
                        <PhotoGallery images={propertyImages}></PhotoGallery> : null
                    }
                    <Divider />
                    <Box sx={{ mx: 1, my: 2, maxWidth: '100%' }}>
                        <Typography marginBottom={2} variant='h5'>Amenities</Typography>
                        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                            {property?.amenities.map((info, index) => (
                                <>
                                    <Chip mx='10px' variant='outlined' label={info.name} />
                                </>
                            ))}
                        </Stack>
                    </Box>
                    <Divider />
                    <Box sx={{ mx: 1, my: 2 }}>
                        <Typography marginBottom={2} variant='h5'>Description</Typography>
                        <Typography marginX={5} variant='body1'>{property?.description}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PropertyDetails