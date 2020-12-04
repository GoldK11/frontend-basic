module.exports = function myloader(content) {
    console.log("myloader 듣고있나?");
    return content.replace("console.log(", "alert(");
}