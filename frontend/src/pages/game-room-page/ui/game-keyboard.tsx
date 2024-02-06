import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { PlayerChoiseOption } from '../../../shared/api/game-client/models';
import ItemIcon from './item-icon/item-icon';

interface KeyboardButtonProps {
    item: PlayerChoiseOption;
    onPress(item: PlayerChoiseOption): void;
    disabled?: boolean;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
    item,
    disabled,
    onPress,
}) => {
    return (
        <Button
            disabled={disabled}
            size="lg"
            className="w-28 h-28 lg:w-40 lg:h-40 p-6"
            color="primary"
            variant="bordered"
            onPress={() => onPress(item)}
            isIconOnly
        >
            {
                <ItemIcon
                    className="w-full"
                    item={item}
                />
            }
        </Button>
    );
};

interface GameKeyboardProps {
    onSelect(value: PlayerChoiseOption): void;
    disabled?: boolean;
}

export const GameKeyboard: React.FC<GameKeyboardProps> = ({
    onSelect,
    disabled,
}) => {
    return (
        <Card className="w-full mx-auto lg:w-max">
            <CardBody className="flex-row gap-4">
                <KeyboardButton
                    disabled={disabled}
                    item={PlayerChoiseOption.PAPER}
                    onPress={onSelect}
                />
                <KeyboardButton
                    disabled={disabled}
                    item={PlayerChoiseOption.STONE}
                    onPress={onSelect}
                />
                <KeyboardButton
                    disabled={disabled}
                    item={PlayerChoiseOption.SCISSORS}
                    onPress={onSelect}
                />
            </CardBody>
        </Card>
    );
};
