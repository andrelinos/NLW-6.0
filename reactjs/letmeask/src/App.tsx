import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from './contexts/AuthContext';

import { theme } from './styles/theme';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { AdminRooms } from './pages/AdminRooms';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" exact component={AdminRoom} />
            <Route path="/admin/rooms" exact component={AdminRooms} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
