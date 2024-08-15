import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme
} from '@mui/material';

type Props = {
    open: boolean;
    title: string;
    body: React.ReactNode;
    onConfirm?: () => void;
    onClose: () => void;
};
const ConfirmationDialog = ({ open, onClose, title, body, onConfirm }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{body}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {!!onConfirm && <Button onClick={onConfirm}>Continue</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
