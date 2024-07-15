import React, { useEffect, useState } from 'react';
import { Container, Header, List, Message, Segment } from 'semantic-ui-react';
import { backApi } from '../misc/BackApi';
import Footer from "../misc/Footer";

const ExchangeRatesPage = () => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await backApi.getCurrentExchangeRates();
                setExchangeRates(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    if (loading) return <Message>Loading...</Message>;
    if (error) return <Message negative>Error: {error}</Message>;

    const filteredExchangeRates = Object.keys(exchangeRates).filter(
        currency => !currency.startsWith('usd') && !currency.startsWith('kzt') && !currency.endsWith('kzt')
    );

    // Add USD to KZT rate
    const usdToKztRate = { 'usd_to_kzt': exchangeRates['usd_to_kzt'] };
    const displayRates = [...filteredExchangeRates.map(key => ({ [key]: exchangeRates[key] })), usdToKztRate];

    return (
        <Container>
            <Segment>
                <Header as="h1">Current Exchange Rates</Header>
                <List divided relaxed>
                    {displayRates.map(rate => {
                        const currency = Object.keys(rate)[0];
                        return (
                            <List.Item key={currency}>
                                <List.Content>
                                    <List.Header>{currency.replace(/_/g, ' ').toUpperCase()}</List.Header>
                                    <List.Description>
                                        <Header as="h2" color="violet">{rate[currency]}</Header>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
            </Segment>
            <Footer />
        </Container>
    );
};

export default ExchangeRatesPage;
