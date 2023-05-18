import React, { useState, useEffect } from 'react'
import { Box, styled, Typography, Container } from "@mui/material";
import { request } from '../../utils/fetchAPI'



const Complex = ({ img, address, yearbuilt, apartments }) => {
    const PropertyBox = styled(Box)(({ theme }) => ({
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        maxWidth: 350,
        backgroundColor: "#fff",
        margin: theme.spacing(0, 2, 0, 2),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(2, 0, 2, 0),
        },
    }));



    const ImgContainer = styled(Box)(() => ({
        width: "100%",
    }));

    return (
        <PropertyBox>
            <ImgContainer>
                <img src={img} alt="complexPhoto" style={{ maxWidth: "100%" }} />
            </ImgContainer>

            <Box sx={{ padding: "1rem" }}>
                <Typography variant="body2" sx={{ fontWeight: "700" }}>
                    {apartments} apartments available
                </Typography>
                <Typography variant="body2" sx={{ my: 2 }}>
                    {address}
                </Typography>

                <Typography variant="body2" sx={{ my: 2 }}>
                    Year Built: {yearbuilt}
                </Typography>


            </Box>
        </PropertyBox>
    );
}


const Complexes = () => {
    const ComplexesBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginTop: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const ComplexesTextBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    }));

    const [complexes, setComplexes] = useState([])

    const parseAddress = (address) => {
        return (`${address.building_number}, ${address.street}, ${address.city}`)
    }

    useEffect(() => {
        const fetchAllComplexes = async () => {
            const [data, status] = await request(`api/`, 'GET')

            const complexes = data.reduce((acc, property) => {

                const complex = property.building.complex;
                const address = parseAddress(property.building.address);

                // Check if the complex already exists in the accumulator
                const existing = acc.find(c => c.id === complex.id);
                if (existing) {
                    existing.propertyCount++;
                } else {
                    acc.push({
                        id: complex.id,
                        name: complex.name,
                        address: address,
                        propertyCount: 1,
                        image: complex.images?.split(' ')[0],
                        yearbuilt: complex.date_built,
                    });
                }

                return acc;
            }, []);

            console.log(complexes);
            setComplexes(complexes)

        }
        fetchAllComplexes()
    }, [])


    return (
        <Box sx={{ mt: 1, backgroundColor: "#F5FAFE", py: 10 }}>
            <Container>
                <ComplexesTextBox>
                    <Typography
                        sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
                    >
                        Featured Apartment Complexes
                    </Typography>
                    <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
                        Everything you need to know when looking for a new home!
                    </Typography>
                </ComplexesTextBox>

                <ComplexesBox>
                    {complexes.length !== 0 && complexes.map((complex) => (
                        <Complex
                            key={complex.id}
                            img={complex.image}
                            address={complex.address}
                            yearbuilt={complex.yearbuilt}
                            apartments={complex.propertyCount}
                        />
                    ))}
                </ComplexesBox>
            </Container>
        </Box>
    );
}

export default Complexes