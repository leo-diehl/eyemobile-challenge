import React from 'react';

import { Provider as StoreProvider } from 'react-redux';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';

// Routes
import { references as routeReferences } from './routes';

// Redux
import store from './redux/store';

// Styling
import './assets/fonts/main.css'; // Font importions
import GlobalStyles from './assets/styles/globalStyles';
import theme from './assets/styles/theme';
import styled from 'styled-components';

// External packages
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Body from './components/App/Body';
import Nav from './components/App/Nav';

// -- Component
function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyles />
        <FlexDiv>
          <Nav routes={routeReferences} />
          <Body />
        </FlexDiv>
      </ThemeProvider>
    </StoreProvider>
  );
}

// -- Styles
const FlexDiv = styled.div`
  display: flex;
`;

// -----
export default App;
