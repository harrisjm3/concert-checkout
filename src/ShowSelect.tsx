import Stack from "@mui/material/Stack";
import { ShowData } from "./hooks/useShowData";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type ShowSelectProps = {
    setCheckoutClicked: (value: boolean) => void;
    error: string;
    quantity: number;
    selectedShow: ShowData;
    setQuantity: (quantity: number) => void;
    setSelectedShow: (show: ShowData) => void;
    showList: ShowData[];
}

const ShowSelect = ({ error, quantity, selectedShow, setCheckoutClicked, setQuantity, setSelectedShow, showList }: ShowSelectProps) => {
    
    const handleSelect = (show: ShowData) => {
        setSelectedShow(show);
    }

    const handleQuantityChange = ((event: any) => { // never use any :P
        setQuantity(event.target.value as number);
    })
    
    return (
        <Grid container spacing={2}> 
            <Grid item xs={12}></Grid>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
                    { error ? (
                    <span className="sub-error">There was an error getting the show list.</span>
                    ) : (
                    <span className="sub-title">Select a show from the show list.</span>
                    )
                }
            </Grid>
            <Stack spacing={2} sx={{maxWidth: '80%', margin: '20px auto'}}>
                {
                    showList.map( show => (
                        <Button key={show.name}
                            variant={selectedShow && selectedShow.name === show.name ? "contained" : "outlined"} onClick={() => handleSelect(show)}>
                            <span className="show-details">{show.date}</span>
                            &nbsp;&nbsp;
                            <Divider orientation="vertical" flexItem />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {show.name}
                            &nbsp;&nbsp;&nbsp;
                            <Divider orientation="vertical" flexItem />
                            &nbsp;&nbsp;&nbsp;
                            <span className="show-details">
                                {show.venue}&nbsp;&nbsp;-&nbsp;&nbsp;
                                {show.location}
                            </span>
                            
                        </Button>
                    ))
                }
            </Stack>
            <Grid item xs={6}></Grid>
            <Grid item xs={6} sx={{ margin: '0 auto' }}>
                <Select
                    value={quantity}
                    label="Ticket quantity"
                    sx={{marginRight: '10px'}}
                    onChange={handleQuantityChange}
                >
                    {[...new Array(10)].map( (value, index) => ( // using index as key just because of time limitations and not a big deal here
                        <MenuItem key={index} value={index+1}>{index+1}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" disabled={!selectedShow.name || quantity === 0} onClick={(() => setCheckoutClicked(true))}>Checkout</Button>
            </Grid>
        </Grid>
    )
}

export default ShowSelect;