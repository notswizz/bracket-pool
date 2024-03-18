/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog';
import { handle } from 'frog/vercel';
import fetch from 'node-fetch'; // Ensure node-fetch is installed

// Define the expected response structure from the API
interface TradeStatsResponse {
  result: {
    data: {
      json: {
        poolTotal: number;
        volume24h: number;
        totalUniqueOwners: number;
      }
    }
  }
}

const app = new Frog({
  basePath: '/api',
});

app.frame('/', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #00B4DB, #0083B0)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            display: 'flex',
            fontSize: 60,
            flexDirection: 'column',
            marginTop: 30,
          }}
        >
          bracket.game stats
        </div>
      </div>
    ),
    intents: [
      <Button action="/poolTotal" value="checkPoolTotal">Pool Total</Button>,
      <Button action="/volume24h" value="checkVolume24h">24h Volume</Button>,
      <Button action="/uniqueOwners" value="checkUniqueOwners">Unique Owners</Button>,
    ],
  });
});

app.frame('/poolTotal', async (c) => {
  const response = await fetch('https://api.bracket.game/trpc/trade.getStats');
  const data = await response.json() as TradeStatsResponse;

  const formattedPoolTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.result.data.json.poolTotal);

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            display: 'flex',
            fontSize: 60,
            flexDirection: 'column',
            marginTop: 30,
          }}
        >
          Pool Total: {formattedPoolTotal}
        </div>
      </div>
    ),
    intents: [
      <Button action="/" value="back">Back</Button>,
    ],
  });
});

app.frame('/volume24h', async (c) => {
  const response = await fetch('https://api.bracket.game/trpc/trade.getStats');
  const data = await response.json() as TradeStatsResponse;

  const formattedVolume24h = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.result.data.json.volume24h);

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            display: 'flex',
            fontSize: 60,
            flexDirection: 'column',
            marginTop: 30,
          }}
        >
          24h Volume: {formattedVolume24h}
        </div>
      </div>
    ),
    intents: [
      <Button action="/" value="back">Back</Button>,
    ],
  });
});

app.frame('/uniqueOwners', async (c) => {
  const response = await fetch('https://api.bracket.game/trpc/trade.getStats');
  const data = await response.json() as TradeStatsResponse;

  const totalUniqueOwners = data.result.data.json.totalUniqueOwners;

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            display: 'flex',
            fontSize: 60,
            flexDirection: 'column',
            marginTop: 30,
          }}
        >
          Unique Owners: {totalUniqueOwners}
        </div>
      </div>
    ),
    intents: [
      <Button action="/" value="back">Back</Button>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
