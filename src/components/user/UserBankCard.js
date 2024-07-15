import React, { useState, useEffect } from 'react';
import { Container, Segment, Header, Message, Card, Icon } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { backApi } from '../misc/BackApi';
import { handleLogError } from '../misc/Helpers';

const UserBankCard = () => {
    const { getUser } = useAuth();
    const [bankCard, setBankCard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBankCard = async () => {
            try {
                const user = getUser();
                const response = await backApi.getBankCardForCurrentUser(user);
                setBankCard(response.data);
            } catch (error) {
                handleLogError(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBankCard();
    }, [getUser]);

    if (loading) return <Message>Loading...</Message>;
    if (error) return <Message negative>Error: {error}</Message>;

    if (!bankCard) return <Message>No bank card found.</Message>;

    return (
        <Container>
            <Segment>
                <Header as="h3">Your Bank Card</Header>
                <Card centered>
                    <Card.Content>
                        <Icon name='credit card' size='large' />
                        <Card.Header>{bankCard.cardHolderName}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Expires {bankCard.expiryDate}</span>
                        </Card.Meta>
                        <Card.Description>
                            <p><strong>Card Number:</strong> {bankCard.cardNumber}</p>
                            <p><strong>CVV:</strong> {bankCard.cvv}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Segment>
        </Container>
    );
};

export default UserBankCard;
