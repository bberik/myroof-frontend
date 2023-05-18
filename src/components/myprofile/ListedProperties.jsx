import { Box, Container, styled, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import PropertyCard from '../properties/PropertyCard'
import AuthContext from '../../context/AuthContext'

const ListedProperties = () => {
    const [listedProperties, setListedProperties] = useState([])
    let { authRequest } = useContext(AuthContext)

    useEffect(() => {
        const fetchListedProperties = async () => {
            const data = await authRequest(`api/my-properties`, 'GET')
            setListedProperties(data)
        }
        fetchListedProperties()
    }, [])


    const parseAddress = (address) => {
        return (`${address.building_number}, ${address.street}, ${address.city}`)
    }

    const PropertiesBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const PropertiesTextBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    }));

    return (
        <Box width={'100%'}>
            <PropertiesTextBox>
                <Typography sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}>
                    {listedProperties?.length > 0 ? `${listedProperties.length} ${listedProperties.length === 1 ? 'property' : 'properties'} listed` : 'No properties are listed by you'}
                </Typography>
            </PropertiesTextBox>
            <PropertiesBox sx={{ justifyContent: 'center' }}>
                {listedProperties?.length > 0 ?
                    listedProperties?.map((property) => (
                        <PropertyCard
                            key={property.id}
                            id={property.id}
                            img={property.images?.split(' ')[0]}
                            price={property.price}
                            address={parseAddress(property.building.address)}
                            bedrooms={property.rooms}
                            bathrooms={property.bathrooms}
                            space={property.area}
                        />
                    )) : <></>
                }
            </PropertiesBox>
        </Box>
    )
}

export default ListedProperties