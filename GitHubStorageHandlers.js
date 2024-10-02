import GitHubStorageHandler from "./GitHubStorageHandler.js"

/**
 * A typical GitHubStorageHandlers attempts to solve the issue of using localStorage within multiple GitHub websites by handling multiple instances of GitHubStorageHandler.
 * 
 * Works great with React Context/Provider.
 */
export default class GitHubStorageHandlers {
    pathObjects=[]

    /**
     * Creates a new GitHubStorageHandlers with the GitHub pathname as a prefix to each path
     * @param  {...string} paths 
     */
    constructor(...paths){
        paths.forEach(path=>{
            const handler = new GitHubStorageHandler(path)
            this.pathObjects.push({
                handler,
                path,
            })
        })
    }

    /**
     * Gets a current or creates a new GitHubStorageHandler located at the path. 
     * @param {string} path 
     * @returns GitHubStorageHandler
     */
    getHandler = path => {
        let handler = this.pathObjects.find(pathObject => path === pathObject.path)?.handler;

        if(handler) {
            return handler
        }

        handler = new GitHubStorageHandler(path)
        
        this.pathObjects.push({
            handler,
            path
        })

        return handler
    }

    /**
     * Sets the item of localStorage at this path to value
     * @param {string} path 
     * @param {*} value 
     */
    setItem = (path, value) => {
        this.getHandler(path).setItem(value)
    }

    /**
     * Sets the item of localStorage at this path to the stringified JSON value
     * @param {string} path 
     * @param {object} value 
     */
    setObject = (path, value) => {
        this.getHandler(path).setObject(value)
    }

    /**
     * Gets the item stored in localStorage at this path
     * @param {string} path 
     * @returns string || null
     */
    getItem = path => {
        return this.getHandler(path).getItem()
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {object} expected 
     * @returns object
     */
    getObject = (path, expected) => {
        return this.getHandler(path).getObject(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {number} expected 
     * @returns number
     */
    getNumber = (path, expected) => {
        return this.getHandler(path).getNumber(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {boolean} expected 
     * @returns boolean
     */
    getBoolean = (path, expected) => {
        return this.getHandler(path).getBoolean(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {string} expected 
     * @returns string
     */
    getString = (path, expected) => {
        return this.getHandler(path).getString(expected)
    }    
}