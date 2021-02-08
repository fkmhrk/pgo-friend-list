declare const page : {
    (): void,
    (path: string): void,
    (path: string, handler: () => void): void,
    redirect: (path: string) => void,
}



