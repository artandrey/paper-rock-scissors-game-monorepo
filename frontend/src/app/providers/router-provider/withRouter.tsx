import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Component: React.ComponentType) => () =>
    (
        <BrowserRouter>
            <Suspense fallback="Loading...">{<Component />}</Suspense>
        </BrowserRouter>
    );
