import React, { useState } from 'react';
import { Container, Button, Segment, Header, Message } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { backApi } from '../misc/BackApi';
import { handleLogError } from '../misc/Helpers';

const ConfirmTransaction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser } = useAuth();
    const [error, setError] = useState(null);

    const transactionDetails = location.state?.transactionDetails;

    const handleConfirmTransaction = async () => {
        try {
            const user = getUser();
            await backApi.createTransaction(transactionDetails, user);
            navigate('/transactions/success'); // Redirect to home or any other page
        } catch (error) {
            handleLogError(error);
            setError(error.message);
        }
    };

    if (!transactionDetails) {
        return <Message negative>No transaction details found.</Message>;
    }

    return (
        <Container>
            <Segment>
                <Header as="h3">Transaction Details</Header>
                <p><strong>To Username:</strong> {transactionDetails.toUsername}</p>
                <p><strong>Amount:</strong> {transactionDetails.amount}</p>
                <p><strong>Currency:</strong> {transactionDetails.currency}</p>
                {error && <Message negative>{error}</Message>}
                <Button color='violet' onClick={handleConfirmTransaction}>Confirm Transaction</Button>
            </Segment>
        </Container>
    );
};

export default ConfirmTransaction;
