import React, { useState } from 'react';
import { Container, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { backApi } from '../misc/BackApi';
import { handleLogError } from '../misc/Helpers';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
    const { getUser } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);

    const handleTransfer = () => {
        const transactionData = {
            toUsername: username,
            amount,
            currency,
            transactionType: 'DIRECT_TRANSFER_TO_WALLET'
        };
        navigate('/confirm-transaction', { state: { transactionDetails: transactionData } });
    };

    const currencyOptions = [
        { key: 'usd', value: 'usd', text: 'USD' },
        { key: 'bitcoin', value: 'bitcoin', text: 'Bitcoin' },
        { key: 'ethereum', value: 'ethereum', text: 'Ethereum' },
        { key: 'binancecoin', value: 'binancecoin', text: 'BinanceCoin' },
        { key: 'solana', value: 'solana', text: 'Solana' },
        { key: 'ripple', value: 'ripple', text: 'Ripple' },
        { key: 'tether', value: 'tether', text: 'Tether' },
        { key: 'kzt', value: 'kzt', text: 'KZT' },
    ];

    return (
        <Container>
            <Form onSubmit={handleTransfer} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Form.Field>
                    <label>Recipient Username</label>
                    <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Currency</label>
                    <Dropdown
                        placeholder='Select Currency'
                        fluid
                        selection
                        options={currencyOptions}
                        value={currency}
                        onChange={(e, { value }) => setCurrency(value)}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label>Amount</label>
                    <input placeholder='Amount' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </Form.Field>
                <Button type='submit' color='violet' fluid>Send</Button>
                {error && <Message negative>{error}</Message>}
            </Form>
        </Container>
    );
};

export default Transfer;
