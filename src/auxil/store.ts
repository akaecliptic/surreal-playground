const store = <T>(key: string, data: T) => {
    if ( typeof Storage === 'undefined' ) return;

    if ( typeof data === 'string' ) {
        localStorage.setItem(key, data);
    } else {
        const parsed: string = JSON.stringify(data);
        localStorage.setItem(key, parsed);
    }
};

const retrieve = <T>(key: string): T | null => {
    if ( typeof Storage === 'undefined' ) return null;

    const item: string | null = localStorage.getItem(key);
    
    return ( item ) ? item as T : null;
}

export { store, retrieve };
