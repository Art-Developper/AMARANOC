// ServiceCard.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button, Stack } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

export default function ServiceCard({ service, onBook }) { 
    const getPriceIcon = (price) => {
        if (!price || price === "0 ֏" || price === "Անվճար") {
            return <MoneyOffIcon sx={{ fontSize: '1.2rem' }} />;
        }
        return <AttachMoneyIcon sx={{ fontSize: '1.2rem' }} />;
    };

    return (
        <Card sx={{
            width: 300,
            minHeight: 380,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: 2,
            boxShadow: 3,
            borderRadius: 2,
        }}>
            {service.image && (
                <CardMedia
                    component="img"
                    height="180"
                    image={service.image}
                    alt={service.title}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    '-webkit-line-clamp': 4,
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '80px',
                }}>
                    {service.description}
                </Typography>
            </CardContent>

            <Box sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #eee',
                backgroundColor: '#f9f9f9',
            }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    {getPriceIcon(service.price)}
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        {service.price} {service.priceUnit}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    onClick={() => onBook(service)} 
                    sx={{
                        backgroundColor: 'orange',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'darkorange',
                        },
                        borderRadius: 2,
                        textTransform: 'none',
                        padding: '6px 16px'
                    }}
                >
                    Ամրագրել
                </Button>
            </Box>
        </Card>
    );
}