import express from "express";

const configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

//để share giữa các file với nhau thì phải export trong java
export default configViewEngine;