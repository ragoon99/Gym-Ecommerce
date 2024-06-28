import React from 'react';

import { Grid, Avatar, Container, Typography } from '@mui/material';

function AboutUsView() {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis
                        unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                        et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                        venenatis vestibulum. Sed posuere consectetur est at lobortis.
                    </Typography>
                </Grid>
                <Grid item container xs={12} md={6} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <Avatar
                            alt="Team Avatar"
                            src="https://mui.com/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6" gutterBottom>
                            Our Team
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We are a group of passionate individuals dedicated to...
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AboutUsView;
