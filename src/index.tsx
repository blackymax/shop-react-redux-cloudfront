import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '~/components/App/App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '~/theme';

const navigate = useNavigate();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      onSuccess(data) {
        if (
          data.response.status === 404 ||
          data.response.status === 403 ||
          data.response.status === 401
        ) {
          navigate('*');
        }
      },
      onError(err) {
        if (
          data.response.status === 404 ||
          data.response.status === 403 ||
          data.response.status === 401
        ) {
          navigate('*');
        }
      },
    },
  },
});

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
