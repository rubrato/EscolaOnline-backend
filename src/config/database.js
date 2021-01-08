module.exports = {
    dialect: 'postgres',
    host: 'rubrato.ddns.net',
    username: 'postgres',
    password: 'docker',
    database: 'meetzinho',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}