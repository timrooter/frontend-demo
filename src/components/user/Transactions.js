import React from 'react';
import {Container, Button, Grid, Header} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Footer from "../misc/Footer";

const Transactions = () => {
    const navigate = useNavigate();

    return (
        <Container className="transactions-buttons-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Grid centered columns={1}>
                <Header style={{ marginTop: '100px' }}>
                    Options
                </Header>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button color='violet' style={{ width: '300px' }} onClick={() => navigate('/transactions/transfer')}>DIRECT TRANSFER TO USER</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button color='violet' style={{ width: '300px' }} onClick={() => navigate('/transactions/qr-request')}>QR-CODE REQUEST</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Button color='violet' style={{ width: '300px' }} onClick={() => navigate('/transactions/scan-qr')}>SCAN QR-CODE REQUEST</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button color='violet' style={{ width: '300px' }} onClick={() => navigate('/transactions/history')}>TRANSACTIONS LIST</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
                            <Button color='violet' style={{ width: '300px' }} onClick={() => navigate('/transactions/card')}>MY BANK CARD</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Footer />
            </Grid>
        </Container>
    );
};

export default Transactions;
