interface IRouter {
    start(): void;
    
    navigate(path: string): void;

    redirect(path: string): void;
}