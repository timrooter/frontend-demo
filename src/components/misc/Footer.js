import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

const Footer = () => (
    <Segment vertical style={{ padding: '2em 0em', backgroundColor: 'white', textAlign: 'center' }}>
        <Container>
            <Header as='h4' style={{ color: 'grey' }}>
                &copy; {new Date().getFullYear()} Crypto Exchange. All Rights Reserved.
            </Header>
        </Container>
    </Segment>
);

export default Footer;
