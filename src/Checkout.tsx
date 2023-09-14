import Grid from "@mui/material/Grid";
import { ShowData } from "./hooks/useShowData";
import { Button, Divider, Link, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState } from "react";
import CreditCardSelector from "./CreditCardSelector";
import { CreditCardInfo } from "./App";

interface CheckoutProps {
    quantity: number;
    selectedShow: ShowData;
    selectedCreditCard: CreditCardInfo;
    setSelectedCreditCard: (data: CreditCardInfo) => void;
    setCheckoutClicked: (value: boolean) => void;
}

const Checkout = ({ quantity=1, selectedShow, setCheckoutClicked, selectedCreditCard, setSelectedCreditCard}: CheckoutProps) => {
    const { fees } = selectedShow;
    const dateTicketsAvailable = new Date();
    dateTicketsAvailable.setDate(dateTicketsAvailable.getDate() + 2);

    const toPrice = (value: number) => {
        return value.toFixed(2);
    }
    const total = toPrice(quantity * selectedShow.ticketPrice + quantity * fees.orderProcessingFee + quantity * fees.serviceFee);

    const [ showPriceBreakdown, setShowPriceBreakdown ] = useState<boolean>(true);

    return (
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            <Grid item xs={12}>
                
            </Grid>
            <Grid item xs={7} >
                <Grid container 
                    sx={{border: '1px solid grey', borderRadius: '5px', padding: '20px'}}>
                    <div>
                        <Typography variant="h6">
                            Delivery <TaskAltIcon color="success"/>
                        </Typography>
                        
                    </div>
                    <div>
                        <Typography variant="subtitle1">
                            Mobile Entry - Free
                            </Typography>
                            <Typography variant="body2" className='gray-text'>
                            Tickets Available by {dateTicketsAvailable.toDateString()}
                            </Typography>
                            <Typography variant="body2" className='gray-text'>
                            These mobile tickets will be transferred directly to you from a trusted seller. We'll email you
                            instructions on how to accept them ont he original ticket provider's mobile app.
                            </Typography>
                    </div>
                </Grid>
                <Grid container 
                    sx={{border: '1px solid grey', borderRadius: '5px', marginTop: '10px', padding: '20px'}}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Payment <TaskAltIcon color="success"/>
                        </Typography>
                        <Typography variant="subtitle1">
                            Use Credit / Debit Card
                        </Typography>
                        <CreditCardSelector
                            selectedCreditCard={selectedCreditCard}
                            setSelectedCreditCard={setSelectedCreditCard}
                        />
                        <Divider />
                    </Grid>
                    
                    <Grid item xs={12}>
                    <Typography variant="subtitle2">
                        Or Pay With
                    </Typography>
                    <Typography variant="body2">
                        By using a digital wallet and continuing past this page, you have read and are accepting the {
                            <Link href="#">Terms of Use.</Link>
                        }
                    </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid item xs={5} >
                <Grid container sx={{border: '1px solid grey', borderRadius: '5px', padding: '20px'}}>
                    <div className="split">
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">
                            ${total}
                            <span onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}>
                                { showPriceBreakdown ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                            </span>
                        </Typography>
                    </div>
                    
                    { showPriceBreakdown && (
                        <>
                            <Typography variant="body2">
                            Tickets
                            </Typography>
                            <div className="split">
                                <Typography variant="body2" className='gray-text'>
                                    Resale Tickets: ${selectedShow.ticketPrice} x {quantity}
                                </Typography>
                                <Typography variant="body2" className='gray-text'>
                                    ${toPrice(selectedShow.ticketPrice * quantity)}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2">
                                    Notes From Seller
                                </Typography>
                                <Typography variant="body2" className='gray-text'>
                                    {selectedShow.sellerNotes}
                                </Typography>
                            </div>
                            <div className="split">
                                <Typography variant="body2">
                                    Fees
                                </Typography>
                            </div>
                            <div className="split">
                                <Typography variant="body2" className='gray-text'>
                                    Service Fee: ${fees.serviceFee} x {quantity}
                                </Typography>
                                <Typography variant="body2" className='gray-text'>
                                    ${toPrice(fees.serviceFee * quantity)}
                                </Typography>
                            </div>
                            <div className="split">
                                <Typography variant="body2" className='gray-text'>
                                    Order Processing Fee: ${fees.orderProcessingFee} x {quantity}
                                </Typography>
                                <Typography variant="body2" className='gray-text'>
                                    ${toPrice(fees.orderProcessingFee * quantity)}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2">
                                    Delivery
                                </Typography>
                            </div>
                            <div className="split">
                                <Typography variant="body2" className='gray-text'>
                                    Mobile Entry
                                </Typography>
                                <Typography variant="body2" className='gray-text'>
                                    Free
                                </Typography>
                            </div>
                        </>   
                    ) }
                    <div>
                        <Button sx={{ color: 'blue', padding: '0', textTransform: 'capitalize'}} onClick={() => setCheckoutClicked(false)}>Cancel Order</Button>
                    </div>
                     <div className="place-order-btn">
                        <Button variant="outlined" sx={{ backgroundColor: 'green', color: 'white', textTransform: 'capitalize', width: '100%'}}>Place Order</Button>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Checkout;

