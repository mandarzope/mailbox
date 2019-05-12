declare interface NodeModule {
    hot: any
}
declare interface Window {
    __REDUX_STATE__: any,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}
declare var clientUrl;