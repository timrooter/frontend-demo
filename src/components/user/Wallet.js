import React, { useEffect, useState } from 'react';
import { Container, Grid, Segment, Header, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { backApi } from '../misc/BackApi';
import { useAuth } from '../context/AuthContext';
import { handleLogError } from '../misc/Helpers';
import Footer from "../misc/Footer";

const Wallet = () => {
    const { getUser } = useAuth();
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [exchangeError, setExchangeError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = getUser();
                setUser(user);

                const response = await backApi.getWalletById(user);
                setWallet(response.data);
            } catch (error) {
                handleLogError(error);
            }
        };

        fetchData();
    }, [getUser]);

    const handleExchange = async () => {
        try {
            await backApi.transferCurrency(user, fromCurrency, toCurrency, amount);
            const response = await backApi.getWalletById(user);
            setWallet(response.data);
            setExchangeError(null);
        } catch (error) {
            handleLogError(error);
            setExchangeError(error.message);
        }
    };

    if (!user || !wallet) {
        return <Message>Loading...</Message>;
    }

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
            <Segment>
                <Header as="h2">Wallet</Header>
                <p><strong>Email:</strong> {user.data.email}</p>
                <p><strong>Username:</strong> {user.data.username}</p>
            </Segment>

            <Segment>
                <Header as="h3">Balance</Header>
                <p><strong>USD:</strong> {wallet.usd}</p>
                <p><strong>Bitcoin:</strong> {wallet.bitcoin}</p>
                <p><strong>Ethereum:</strong> {wallet.ethereum}</p>
                <p><strong>BinanceCoin:</strong> {wallet.binancecoin}</p>
                <p><strong>Solana:</strong> {wallet.solana}</p>
                <p><strong>Ripple:</strong> {wallet.ripple}</p>
                <p><strong>Tether:</strong> {wallet.tether}</p>
                <p><strong>KZT:</strong> {wallet.kzt}</p>
            </Segment>

            <Segment>
                <Header as="h3">Exchange Currency</Header>
                <Form onSubmit={handleExchange}>
                    <Form.Field>
                        <label>From Currency</label>
                        <Dropdown
                            placeholder="Select Currency"
                            fluid
                            selection
                            options={currencyOptions}
                            value={fromCurrency}
                            onChange={(e, { value }) => setFromCurrency(value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>To Currency</label>
                        <Dropdown
                            placeholder="Select Currency"
                            fluid
                            selection
                            options={currencyOptions}
                            value={toCurrency}
                            onChange={(e, { value }) => setToCurrency(value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <input
                            placeholder="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Form.Field>
                    <Button type="submit" color="violet">Exchange</Button>
                </Form>
                {exchangeError && <Message negative>{exchangeError}</Message>}
            </Segment>
            <Footer />
        </Container>
    );
};

export default Wallet;
