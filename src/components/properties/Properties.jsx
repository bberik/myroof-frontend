import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, styled, Typography, Container } from "@mui/material";
import { request } from '../../utils/fetchAPI'
import PropertyCard from './PropertyCard';


const Properties = () => {

    const [allProperties, setAllProperties] = useState([])
    // const query = (useLocation().search).slice(1)
    // let arrQuery = null
    // if (query.length > 0) { arrQuery = query.split('&') }

    const [filteredProperties, setFilteredProperties] = useState([])
    const [state, setState] = useState(null)
    const navigate = useNavigate()
    const location = useLocation();
    const [query, setQuery] = useState((location.search).slice(1))


    useEffect(() => {
        const fetchAllProperties = async () => {
            const [data, status] = await request(`api/`, 'GET')
            setAllProperties(data)
            console.log(data)
        }
        fetchAllProperties()
    }, [])

    useEffect(() => {
        let arrQuery = null
        if (query.length > 0) { arrQuery = query.split('&') }

        if (arrQuery && allProperties?.length > 0 && state === null) {
            let formattedQuery = {}
            arrQuery.forEach((option, idx) => {
                const key = option.split("=")[0]
                const value = option.split("=")[1]

                formattedQuery = { ...formattedQuery, [key]: value }

                if (idx === arrQuery.length - 1) {
                    setState(prev => formattedQuery)
                    handleSearch(formattedQuery)
                }
            })
        }
    }, [allProperties, location.search])

    useEffect(() => {
        setQuery((location.search).slice(1));
    }, [location.search]);


    const handleSearch = (param = state) => {
        let options
        if (param?.nativeEvent) {
            options = state
        } else {
            options = param
        }
        const filteredProperties = allProperties.filter((property) => {

            const minPrice = Number(options.price.split(',')[0])
            const maxPrice = Number(options.price.split(',')[1])
            const propertyTypes = options.propertyType.split(',')

            const getIntArray = (strArray, replaceValue) => {
                const index = strArray.indexOf(replaceValue);
                if (index !== -1) {
                    strArray[index] = replaceValue.replace('+', '');
                }
                return strArray.map(num => parseInt(num));
            };

            const roomsInt = getIntArray(options.rooms.split(','), '4+');
            const bathroomsInt = getIntArray(options.bathrooms.split(','), '4+');

            console.log(minPrice, maxPrice)
            if (
                (options.propertyType ? propertyTypes.includes(property.property_type) : true) &&
                property.price >= minPrice && property.price <= maxPrice &&
                (options.bathrooms ? bathroomsInt.includes(property.bathrooms) : true) &&
                (options.rooms ? roomsInt.includes(property.rooms) : true) &&
                (options.city ? property.building.address.city === options.city : true)
            ) {
                return property
            }
        })
        navigate(`/?propertyType=${options.propertyType}&city=${options.city}&price=${options.price}&rooms=${options.rooms}&bathrooms=${options.bathrooms}`, { replace: true })
        setFilteredProperties(prev => filteredProperties)
    }


    const parseAddress = (address) => {
        return (`${address.building_number}, ${address.street}, ${address.city}`)
    }


    const PropertiesBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexWrap: 'wrap',
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
        <Box sx={{ mt: 1, backgroundColor: "#F5FAFE", py: 10 }}>
            <Container>
                <PropertiesTextBox>
                    {state === null ?
                        <>
                            <Typography
                                sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
                            >
                                Featured Properties
                            </Typography>
                            <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
                                Everything you need to know when looking for a new home!
                            </Typography>
                        </> :
                        <Typography
                            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
                        >
                            {filteredProperties?.length > 0 ? `${filteredProperties.length} ${filteredProperties.length === 1 ? 'property' : 'properties'} found` : 'No properties were found'}
                        </Typography>
                    }
                </PropertiesTextBox>

                <PropertiesBox>
                    {state === null ?

                        allProperties?.slice(0, 10).map((property) => (
                            <PropertyCard
                                key={property.id}
                                id={property.id}
                                name={property.name}
                                img={property.images?.split(' ')[0]}
                                price={property.price}
                                address={parseAddress(property.building.address)}
                                bedrooms={property.rooms}
                                bathrooms={property.bathrooms}
                                space={property.area}
                            />
                        ))
                        :

                        filteredProperties?.map((property) => (
                            <PropertyCard
                                key={property.id}
                                name={property.name}
                                id={property.id}
                                img={property.images?.split(' ')[0]}
                                price={property.price}
                                address={parseAddress(property.building.address)}
                                bedrooms={property.rooms}
                                bathrooms={property.bathrooms}
                                space={property.area}
                            />
                        ))

                    }
                </PropertiesBox>
            </Container>
        </Box>
    );
}

export default Properties