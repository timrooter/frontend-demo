import React, { useState, useEffect } from 'react';
import { Container, Segment, Header, Message, List, Icon } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { backApi } from '../misc/BackApi';
import { handleLogError } from '../misc/Helpers';

const TransactionsList = () => {
    const { getUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const user = getUser();
                const response = await backApi.getAllTransactions(user);
                setTransactions(response.data);

                const usernamesMap = {};
                for (const transaction of response.data) {
                    if (!usernamesMap[transaction.fromWalletId]) {
                        const fromUser = await backApi.getUserById(transaction.fromWalletId, user);
                        usernamesMap[transaction.fromWalletId] = fromUser.data.username;
                    }
                    if (!usernamesMap[transaction.toWalletId]) {
                        const toUser = await backApi.getUserById(transaction.toWalletId, user);
                        usernamesMap[transaction.toWalletId] = toUser.data.username;
                    }
                }
                setUsernames(usernamesMap);
            } catch (error) {
                handleLogError(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [getUser]);

    if (loading) return <Message>Loading...</Message>;
    if (error) return <Message negative>Error: {error}</Message>;

    return (
        <Container>
            <Segment>
                <Header as="h3">All Transactions</Header>
                {transactions.length === 0 ? (
                    <Message>No transactions found.</Message>
                ) : (
                    <List divided relaxed>
                        {transactions.map(transaction => (
                            <List.Item key={transaction.id}>
                                <Icon name='exchange' color='red' />
                                <List.Content>
                                    <List.Header>From: {usernames[transaction.fromWalletId]}</List.Header>
                                    <List.Header>To: {usernames[transaction.toWalletId]}</List.Header>
                                    <List.Description>
                                        Amount: {transaction.amount} {transaction.currency}
                                    </List.Description>
                                    <List.Description>
                                        Type: {transaction.transactionType}
                                    </List.Description>
                                    <List.Description>
                                        Date: {new Date(transaction.timestamp).toLocaleString()}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                )}
            </Segment>
        </Container>
    );
};

export default TransactionsList;
