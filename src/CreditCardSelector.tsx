import { CreditCardInfo } from "./App";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Modal from "@mui/material/Modal";
import { useState } from "react";

interface CreditCardSelectorProps {
    selectedCreditCard: CreditCardInfo;
    setSelectedCreditCard: (data: CreditCardInfo) => void;
}

const CreditCardSelector = ({ selectedCreditCard, setSelectedCreditCard }: CreditCardSelectorProps) => {
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    // create radio group of credit card tiles
    // add modal to accept new credit cards
    return (
        <>
            <AddIcon onClick={() => setOpenModal(true)} sx={{color: 'blue'}} /><CreditCardIcon /> Add New Card
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                >
                <Box sx={style}>
                    Credit Card Information
                </Box>
            </Modal>
        </>
    )
}

export default CreditCardSelector;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };