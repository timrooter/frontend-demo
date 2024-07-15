import React from 'react';
import { Container, Header, Icon, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Footer from "../misc/Footer";

const TransactionSuccess = () => {
    return (
        <Container textAlign='center' style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Segment basic>
                <Header as='h2' icon>
                    <Icon name='check circle' color='green' />
                    Transaction Successful
                    <Header.Subheader>Your transaction to User was successful!</Header.Subheader>
                </Header>
                <div style={{ marginTop: '20px' }}>
                    <Button as={Link} to="/" color='violet'>Back to Home</Button>
                </div>
            </Segment>
            <Footer />
        </Container>
    );
}

export default TransactionSuccess;
