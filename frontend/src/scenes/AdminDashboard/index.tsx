import React, { useState } from 'react';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import styled from 'styled-components';

const BoxStyled = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #fff;
    border: 2px solid #000;
    box-shadow: black;
    padding: 4px;
`;
const AdminDashboard = () => {
    const [isShow, setShow] = useState(true);
    return (
        <>
            <div role="presentation" onClick={() => setShow(true)}>
                ADMIN DASHBOARD
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isShow}
                onClose={() => setShow(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500
                    }
                }}
            >
                <Fade in={isShow}>
                    <BoxStyled>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </BoxStyled>
                </Fade>
            </Modal>
        </>
    );
};

export default AdminDashboard;
