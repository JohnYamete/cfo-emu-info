export function runGAS(methodName, ...args) {
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            [methodName](...args);
    });
}


export async function fetchDBData(dbTableNames) {
    let res;
    if (needFetchDBData()) {
        res = await runGAS('getAll', dbTableNames);
    } else {
        res = getDBFromLocalStorage();
    }
    updateDBToLocalStorage(res);
    return res;
}

function needFetchDBData() {
    if (!localStorage) return true;

    let current = window.dbLastUpdated;
    let before = localStorage.getItem('dbLastUpdated');
    if (!before || !current) { return true; }

    if (!(current instanceof Date)) current = new Date(current);
    if (!(before instanceof Date)) before = new Date(before);

    return current > before;
}

function updateDBToLocalStorage(data) {
    let current = window.dbLastUpdated;
    if (!current) return;

    if (current instanceof Date) current = current.toString();

    localStorage.setItem('dbAll', JSON.stringify(data));
    localStorage.setItem('dbLastUpdated', current);
}

function getDBFromLocalStorage(data) {
    return JSON.parse(localStorage.getItem('dbAll'));
}