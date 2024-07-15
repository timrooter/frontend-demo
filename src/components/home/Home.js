import React, { useEffect, useState } from 'react';
import { Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { backApi } from '../misc/BackApi';
import { handleLogError } from '../misc/Helpers';
import Footer from "../misc/Footer";
// Register necessary components from chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseUsers = await backApi.numberOfUsers();
        const numberOfUsers = responseUsers.data;
        setNumberOfUsers(numberOfUsers);

        const responseBitcoin = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');
        const bitcoinData = await responseBitcoin.json();
        setBitcoinData(Object.entries(bitcoinData.bpi));
      } catch (error) {
        handleLogError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
        <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
          <Dimmer active inverted>
            <Loader inverted size='huge'>Loading</Loader>
          </Dimmer>
        </Segment>
    );
  }

  const data = {
    labels: bitcoinData.map(([date]) => date),
    datasets: [
      {
        label: 'Bitcoin Price',
        data: bitcoinData.map(([, price]) => price),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
      <Container text>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Segment color='violet'>
                <Statistic>
                  <Statistic.Value><Icon name='user' color='grey' />{numberOfUsers}</Statistic.Value>
                  <Statistic.Label>Users</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          {/*<Grid.Row>*/}
          {/*  <Grid.Column>*/}
          {/*    <Segment>*/}
          {/*      <Line data={data} />*/}
          {/*    </Segment>*/}
          {/*  </Grid.Column>*/}
          {/*</Grid.Row>*/}
        </Grid>

        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />

        <Footer />
      </Container>
  );
}

export default Home;
