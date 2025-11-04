import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


export default function ServiceCard({ service }) {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea>
                {service.image && ( 
                    <CardMedia
                        component="img"
                        height="140"
                        image={service.image}
                        alt={service.title}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {service.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                        {service.price} {service.priceUnit}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}