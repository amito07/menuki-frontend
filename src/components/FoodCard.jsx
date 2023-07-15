import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function FoodCard({ item, handleCardClick }) {
    
    
    return (
        <>
            {item.map((el, i) => {
                return (
                    <>
                        <Grid key={i} item xs={6} sm={6} md={3}>
                            <Card sx={{ maxWidth: 345 }} onClick={e=>handleCardClick(el.id)}>
                                <CardMedia component="img" height="194" image={`${process.env.BASE_URL}/storage/${el.cover_pic}`} alt="Paella dish" />
                                {/* <Image
                                    src={`${process.env.BASE_URL}/storage/${el.cover_pic}`}
                                    component="img"
                                    height={194}
                                    width={226}
                                /> */}
                                <CardContent>
                                    <Grid container>
                                        <Grid item>
                                            <Typography variant="h5">{el.name}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                );
            })}
        </>
    );
}
