export function runGAS(methodName, ...args) {
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            [methodName](...args);
    });
}
