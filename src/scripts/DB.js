
module.exports = class DB {
    static getConnectionData() {
        const {host, user, password, database} = process.env;
        return {host, user, password, database};
    }
}