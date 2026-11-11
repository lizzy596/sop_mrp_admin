import React from 'react';
import { Routes, Route } from 'react-router';
import RequireAuth from './shared/routing/RequireAuth';
import publicRoutes from './shared/routing/public.routes';
import protectedRoutes from './shared/routing/protected.routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.element />
              </route.layout>
            }
          />
        ))}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RequireAuth roles={route.roles}>
                <route.layout>
                  <route.element />
                </route.layout>
              </RequireAuth>
            }
          />
        ))}
      </Routes>
    </QueryClientProvider>
  );
};

export default App
