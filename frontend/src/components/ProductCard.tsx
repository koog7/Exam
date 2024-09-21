import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

const ProductCard = () => {
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/150"
                    alt="image title"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Title
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is the description text for the card. It gives a brief overview of the content.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;