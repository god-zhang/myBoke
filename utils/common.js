function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();


    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function getIntDate() {
    return parseInt(new Date().getTime() / 1000);
}

module.exports = {
    getDate,
    getIntDate
};