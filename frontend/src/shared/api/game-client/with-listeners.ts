type Listener = (...args: any[]) => unknown;

type ExtractKeys<T> = keyof T;
type ExctractValues<T> = T[keyof T];

export interface IWithListeners<L extends Record<string, Listener>> {
    on<K extends ExtractKeys<L>>(event: K, listener: L[K]): void;
    off<K extends ExtractKeys<L>>(event: K, listener: L[K]): void;
}

export abstract class WithListeners<L extends Record<string, Listener>>
    implements IWithListeners<L>
{
    private readonly listeners: Map<ExtractKeys<L>, ExctractValues<L>[]> =
        new Map();

    public on<K extends ExtractKeys<L>>(event: K, listener: L[K]) {
        const listenersGroup = this.listeners.get(event);
        if (!listenersGroup) {
            this.listeners.set(event, [listener]);
        } else {
            listenersGroup.push(listener);
        }
    }
    off<K extends keyof L>(event: K, listener: L[K]): void {
        const listenersGroup = this.listeners.get(event);
        if (listenersGroup) {
            this.listeners.set(
                event,
                listenersGroup.filter(
                    (listenerCandidate) => listenerCandidate !== listener
                )
            );
        }
    }

    protected invokeListener<K extends ExtractKeys<L>>(
        event: K,
        ...args: Parameters<L[K]>
    ) {
        const listenersGroup = this.listeners.get(event);
        if (!listenersGroup) return;
        listenersGroup.forEach((listener) => listener(...args));
    }
}
