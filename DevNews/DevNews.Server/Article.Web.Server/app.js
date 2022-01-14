"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const console_1 = require("console");
const index_1 = require("./data base/context/index");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
//Application Routes 
const group_1 = require("./routes/admin/group");
app.use("/api/admin/group", group_1.default);
const account_1 = require("./routes/client/account");
app.use("/api/account", account_1.default);
const profile_1 = require("./routes/client/profile");
app.use("/api/profile", profile_1.default);
const channel_1 = require("./routes/client/channel");
app.use("/api/channel", channel_1.default);
const group_2 = require("./routes/client/group");
app.use("/api/group", group_2.default);
const search_1 = require("./routes/client/search");
app.use("/api/search", search_1.default);
const article_1 = require("./routes/client/article");
app.use("/api/article", article_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.json({
            status: false,
            code: 500
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: false,
        code: err.status,
        message: err.message
    });
});
//Data Base 
function assertDataBaseOk() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, console_1.log)("Checking Data Base Connection ...");
        try {
            yield index_1.default.authenticate();
            (0, console_1.log)("Data Base Connected Successfully!");
        }
        catch (e) {
            (0, console_1.log)("Unable To Connect Data Base ");
            (0, console_1.log)(e.message);
            process.exit(1);
        }
    });
}
app.set('port', 3000);
const server = app.listen(app.get('port'), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Application Started On ${server.address().port}`);
    yield assertDataBaseOk();
}));
//# sourceMappingURL=app.js.map