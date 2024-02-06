import React from 'react';
import FormBase from '../../../shared/ui/form/form-base';
import { joinGameFormValidation } from '../models';
import FormLayout from '../../../shared/ui/layouts/form-layout';
import { FormInput } from '../../../shared/ui/form/controlled-fields/input';
import { useJoinRoom } from '../use-join-room';
import { FormButton } from '../../../shared/ui/form/controlled-fields/button';

const JoinGameForm: React.FC = () => {
    const joinRoom = useJoinRoom();

    return (
        <FormBase
            onSubmit={(values) => joinRoom(values.roomId)}
            validation={joinGameFormValidation}
        >
            <FormLayout>
                <FormInput
                    placeholder="Enter room id"
                    name="roomId"
                />
                <FormButton
                    color="primary"
                    type="submit"
                    variant="bordered"
                    size="lg"
                >
                    Join
                </FormButton>
            </FormLayout>
        </FormBase>
    );
};

export default JoinGameForm;
