import React, { useState } from 'react';
import { Container, Form, Button, Dropdown, Message, Segment } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { handleLogError } from '../misc/Helpers';
import QRCode from 'qrcode.react';

const QRRequest = () => {
    const { getUser } = useAuth();
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [qrValue, setQrValue] = useState('');

    const handleGenerateQR = () => {
        try {
            const user = getUser();
            const qrData = {
                toUsername: user.data.username,
                amount,
                currency,
                transactionType: 'QR_TRANSFER'
            };
            setQrValue(JSON.stringify(qrData));
            setError(null);
        } catch (error) {
            handleLogError(error);
            setError(error.message);
        }
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
            <Form onSubmit={handleGenerateQR} style={{ maxWidth: '400px', margin: '0 auto', marginTop: '30px'}}>
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
                <Button type='submit' color='violet' fluid>Generate QR</Button>
                {error && <Message negative>{error}</Message>}
            </Form>
            {qrValue && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', marginTop: '10px' }}>
                    <div style={{ border: '2px solid #7F00FF', padding: '25px', borderRadius: '15px' }}>
                        <QRCode value={qrValue} size={256} />
                    </div>
                </div>
            )}
        </Container>
    );
};

export default QRRequest;
