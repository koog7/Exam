import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

interface Props{
    _id:string,
    title:string,
    description:string,
    image:string,
}
const ProductCard:React.FC<Props> = ({_id, title ,image, description}) => {
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8000/images/${image}`}
                    alt="image title"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <NavLink to={`/product/byOne/${_id}`} className={'title-b'}>
                            {title}
                        </NavLink>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;