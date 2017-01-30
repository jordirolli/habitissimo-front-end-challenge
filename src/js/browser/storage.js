/* export class definition */
export default class Storage {

    static store(key, value) {
        if (('localStorage' in window) && window['localStorage'] !== null) {
            localStorage.setItem(key, value);
        }
    }

    static retrieve(key) {
        if (('localStorage' in window) && window['localStorage'] !== null) {
            return localStorage.getItem(key);
        }
        return null;
    }
}
