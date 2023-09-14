import { useState } from 'react';
import ShowSelect from './ShowSelect';
import { ShowData, useShowData } from './hooks/useShowData';
import Checkout from './Checkout';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import './App.css'

function App() {

  const [selectedShow, setSelectedShow] = useState<ShowData>({
    date: "",
    fees: { orderProcessingFee: 0, serviceFee: 0 },
    location: "", 
    name: "",
    sellerNotes: "",
    ticketPrice: 0,
    venue: "",
  });
  const [ quantity, setQuantity ] = useState<number>(1);
  const { showData, error } = useShowData();
  const [ checkoutClicked, setCheckoutClicked ] = useState<boolean>(false);
  const [ selectedCreditCard, setSelectedCreditCard ] = useState<CreditCardInfo>({
    name: "",
    cardNumber: 0,
    expirationDate: 0,
    cvc: 0,
  })

  return (
    <>
    <AppBar position="static">
      <Typography variant="h3" sx={{
                marginLeft: '36px',
              }}>Concerts</Typography>
    </AppBar>
    <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            margin: '0 auto'
          }}
        >
      { !checkoutClicked &&
        <ShowSelect
          setCheckoutClicked={setCheckoutClicked}
          error={error}
          quantity={quantity}
          selectedShow={selectedShow}
          showList={showData}
          setQuantity={setQuantity}
          setSelectedShow={setSelectedShow}
        />
      }
      { checkoutClicked &&
        <Checkout
          quantity={quantity}
          selectedCreditCard={selectedCreditCard}
          setSelectedCreditCard={setSelectedCreditCard}
          selectedShow={selectedShow}
          setCheckoutClicked={setCheckoutClicked}
        />
      }
            

    </Box>
    
    </>
  )
}

export default App


// normally in a type definition file
export interface CreditCardInfo {
  name: string;
  cardNumber: number;
  expirationDate: number;
  cvc: number;
}
