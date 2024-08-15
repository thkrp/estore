import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UpdatePublicUser, UserRole } from 'app-shared';
import { ApplyButtonStyled, ButtonStyled, GridContainerStyled, IconWrapper } from './index.styled';
import { getKeyByValue } from '../../../../../common/helpers/object.helper';
import { DropdownList } from '../../../../../components';
import ConfirmationDialog from '../ConfitmationDialog';

enum ActionOptions {
    Actions = 'Actions',
    Activate = 'Activate',
    Deactivate = 'Deactivate',
    ChangeRole = 'Change role'
}

type Props = {
    isDisabled: boolean;
    onDelete: () => void;
    selectedIds: string[];
    onUpdate: (updatedUsers: UpdatePublicUser[]) => void;
};

type ActionOptionsType = keyof typeof ActionOptions;
type UserRoleType = keyof typeof UserRole;

const ActionBar = ({ isDisabled, onDelete, selectedIds, onUpdate }: Props) => {
    const [selectedRole, setSelectedRole] = useState<UserRoleType>(getKeyByValue(UserRole, UserRole.CLIENT));
    const [selectedAction, setSelectedAction] = useState<ActionOptionsType>(
        getKeyByValue(ActionOptions, ActionOptions.Actions)
    );
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [hasUpdates, setHasUpdates] = useState(false);
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    const onSelectRole = ({ key }: { key: UserRoleType }) => {
        setSelectedRole(key);
    };

    const onSelectAction = ({ key }: { key: ActionOptionsType }) => {
        setSelectedAction(key);
    };

    const confirmDeletion = () => {
        onDelete();
        handleCloseDeleteDialog();
    };

    const isActiveOptionSelected = (): boolean | undefined => {
        switch (ActionOptions[selectedAction]) {
            case ActionOptions.Activate:
                return true;
            case ActionOptions.Deactivate:
                return false;
            default:
                return undefined;
        }
    };

    const isRoleOptionSelected = (): UserRole | undefined => {
        if (ActionOptions[selectedAction] !== ActionOptions.ChangeRole) {
            return undefined;
        }
        return UserRole[selectedRole];
    };

    useEffect(() => {
        const isActive = isActiveOptionSelected();
        const role = isRoleOptionSelected();
        setHasUpdates(!(isActive === undefined && !role));
    }, [selectedRole, selectedAction]);

    const confirmUpdating = () => {
        if (!hasUpdates) {
            return false;
        }
        const updatedUsers = selectedIds.reduce((acc, id): UpdatePublicUser[] => {
            acc.push({
                id,
                isActive: isActiveOptionSelected(),
                role: isRoleOptionSelected()
            });
            return acc;
        }, [] as UpdatePublicUser[]);

        onUpdate(updatedUsers);
        return handleCloseUpdateDialog();
    };

    return (
        <>
            <GridContainerStyled>
                <Grid item>
                    <ButtonStyled variant="text" disabled={isDisabled} onClick={() => setOpenDeleteDialog(true)}>
                        <IconWrapper>
                            <DeleteForeverIcon />
                        </IconWrapper>
                        Delete
                    </ButtonStyled>
                </Grid>
                <Grid item>
                    <DropdownList
                        isDisabled={isDisabled}
                        options={ActionOptions}
                        selected={selectedAction}
                        onSelect={onSelectAction}
                    />
                </Grid>
                {ActionOptions.ChangeRole === ActionOptions[selectedAction] && (
                    <Grid item>
                        <DropdownList
                            isDisabled={isDisabled}
                            options={UserRole}
                            selected={selectedRole}
                            onSelect={onSelectRole}
                        />
                    </Grid>
                )}
                <Grid item>
                    <ApplyButtonStyled
                        variant="contained"
                        disabled={!hasUpdates}
                        onClick={() => setOpenUpdateDialog(true)}
                    >
                        Apply
                    </ApplyButtonStyled>
                </Grid>
            </GridContainerStyled>
            <ConfirmationDialog
                open={openDeleteDialog}
                title="Deleting users"
                body={`You are going to delete ${selectedIds.length} ${
                    selectedIds.length === 1 ? 'user' : 'users'
                }. Are you
                    sure?`}
                onClose={handleCloseDeleteDialog}
                onConfirm={confirmDeletion}
            />
            <ConfirmationDialog
                open={openUpdateDialog}
                title="Udate users"
                body={`You are going to update ${selectedIds.length} ${
                    selectedIds.length === 1 ? 'user' : 'users'
                }. Are you
                    sure?`}
                onClose={handleCloseUpdateDialog}
                onConfirm={confirmUpdating}
            />
        </>
    );
};

export default ActionBar;
