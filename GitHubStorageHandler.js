/**
 * A typical GitHubStorageHandler attempts to solve the issue of using localStorage within multiple GitHub websites.
 * 
 * Works great with Redux slice.
 */
export default class GitHubStorageHandler {
    path
    basePath

    /**
     * Creates a new GitHubStorageHandler with the GitHub pathname as a prefix to path. 
     * @param {string} path 
     */
    constructor(path){
        if(typeof path !== 'string') throw new Error('The path must be of type string!')
        const storagePrefix = window.location.pathname
        this.path=`${storagePrefix}/${path}`
        this.basePath = path
    }

    /**
     * Sets the item of localStorage at this path to value
     * @param {*} value 
     */
    setItem = value => {
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to the stringified JSON value
     * @param {object} value 
     */
    setObject = value => {
        if(typeof value !== 'object') throw new Error('Expected value must be of type object!')
        localStorage.setItem(this.path, JSON.stringify(value))
    }

    /**
     *  Gets the item stored in localStorage at this path
     * @returns string || null
     */
    getItem = _ => {
        return localStorage.getItem(this.path)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {object} expected 
     * @returns object
     */
    getObject = expected => {
        if(typeof expected !== 'object') throw new Error('Expected value must be of type object!')
        const val = this.getItem()
        return val ? JSON.parse(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {number} expected 
     * @returns number
     */
    getNumber = expected => {
        if(typeof expected !== 'number') throw new Error('Expected value must be of type number!')
        const val = this.getItem()
        return val ? Number(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {boolean} expected 
     * @returns boolean
     */
    getBoolean = expected => {
        if(typeof expected !== 'boolean') throw new Error('Expected value must be of type boolean!')
        const val = this.getItem()
        return val ? val==='true' : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} expected 
     * @returns string
     */
    getString = expected => {
        if(typeof expected !== 'string') throw new Error('Expected value must be of type string!')
        return this.getItem() || expected
    }
}