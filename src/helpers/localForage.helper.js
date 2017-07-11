import LocalForage from 'localforage';

const storage = {};

storage.set = (key, object) => {
    LocalForage.setItem(key, object);
}

storage.get = (key) => {
    try {
        let result = LocalForage.getItem(key);
        return result;
    } catch (e) {
        if(e) return e;
    }
}

storage.remove = (key) => {
    let result = LocalForage.getItem(key);
    if(result) {
        LocalForage.removeItem(key);
    }
}

export default storage;