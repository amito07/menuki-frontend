/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Container, Grid, Tab, Tabs } from '@mui/material';

import FoodSection from '@/components/FoodSection/FoodSection';
import PublicLayout from '@/components/PublicLayout';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

const restaurant = () => {
    const [content, setContent] = useState({});
    const route = useRouter();

    const getRestaurantDetails = async (id) => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/info/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data);
        setContent(data[0]);
    };

    useEffect(() => {
        if (route.isReady) {
            const { id } = route.query;
            getRestaurantDetails(id);
            console.log(id);
        }
    }, [route.isReady]);
    return (
        <PublicLayout type={false}>
            <Container maxWidth="xl">
                <div className="header__wrapper">
                    <div className="amit">
                        {content ? (
                            <img
                                style={{
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '50% 20%',
                                    width: '100%',
                                    backgroundSize: 'cover',
                                    height: '40vh',
                                }}
                                src={`${process.env.BASE_URL}/storage/${content?.cover_pic}`}
                                alt="Anna Smith"
                            />
                        ) : (
                            <CircularProgress />
                        )}
                    </div>
                    <div className="cols__container">
                        <div className="left__col">
                            <div className="img__container">
                                {content && <img src={content?.profile_pic} alt="Anna Smith" />}
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <Grid container style={{ marginTop: '5rem' }}>
                    <Grid xs={12} item>
                        <div className="menulist">
                            <div className="list-div">
                                <ul className="list">
                                    {content?.foodcategory?.map((el, index) => (
                                        <li key={el.id}>
                                            <Link
                                                key={index}
                                                to={el.category_name}
                                                spy={true}
                                                smooth={true}
                                                offset={-80}
                                                duration={500}
                                            >
                                                {el.category_name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Grid>
                    {content?.foodcategory?.map((el, index) => (
                        <Grid item xs={12}>
                            <FoodSection food_info={el} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PublicLayout>
    );
};

export default restaurant;
