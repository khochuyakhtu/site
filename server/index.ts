import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import { URL } from 'node:url';
import { loadEarnData, loadLaunchpoolData, loadStakingData } from './loaders.ts';

const PORT = Number(process.env.PORT ?? 4000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*';

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type JsonPayload = JsonValue | { [key: string]: JsonValue };

function sendJson(res: ServerResponse, statusCode: number, payload: JsonPayload): void {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body, 'utf8'),
    'cache-control': 'no-store',
    'access-control-allow-origin': ALLOWED_ORIGIN,
    'access-control-allow-methods': 'GET,OPTIONS',
    'access-control-allow-headers': 'content-type'
  });
  res.end(body);
}

function sendError(res: ServerResponse, statusCode: number, message: string): void {
  sendJson(res, statusCode, {
    error: {
      message,
      statusCode
    }
  });
}

async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-origin': ALLOWED_ORIGIN,
      'access-control-allow-methods': 'GET,OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400'
    });
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    sendError(res, 405, 'Method Not Allowed');
    return;
  }

  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  try {
    if (url.pathname === '/api/earn') {
      const exchange = url.searchParams.get('exchange') ?? undefined;
      const result = await loadEarnData({ exchange });
      sendJson(res, 200, result);
      return;
    }

    if (url.pathname === '/api/launchpool') {
      const exchange = url.searchParams.get('exchange') ?? undefined;
      const result = await loadLaunchpoolData({ exchange });
      sendJson(res, 200, result);
      return;
    }

    if (url.pathname === '/api/staking') {
      const exchange = url.searchParams.get('exchange') ?? undefined;
      const result = await loadStakingData({ exchange });
      sendJson(res, 200, result);
      return;
    }

    sendError(res, 404, 'Not Found');
  } catch (error) {
    console.error('[api:error]', url.pathname, error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    sendError(res, 500, message);
  }
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  handleRequest(req, res).catch((error: unknown) => {
    console.error('[api:fatal]', error);
    if (!res.headersSent) {
      sendError(res, 500, 'Internal Server Error');
    } else {
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
