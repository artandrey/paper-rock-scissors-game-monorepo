import { z } from 'zod';

export const joinGameFormValidation = z.object({
    roomId: z.string().uuid(),
});
