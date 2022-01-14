import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
import * as bodyParser from 'body-parser'
import { log } from 'console';
import sequelize from './data base/context/index';


const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(bodyParser.json({ limit: '100mb' }))

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

//Application Routes 
import adminGroup from './routes/admin/group'
app.use("/api/admin/group", adminGroup)
import account from './routes/client/account'
app.use("/api/account", account)
import profile from './routes/client/profile'
app.use("/api/profile", profile)
import channel from "./routes/client/channel"
app.use("/api/channel", channel)
import group from "./routes/client/group"
app.use("/api/group", group)
import search from './routes/client/search'
app.use("/api/search", search)
import article from "./routes/client/article"
app.use("/api/article", article)

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
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.json({
            status: false,
            code: 500
        })
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.json({
        status: false,
        code: err.status,
        message: err.message
    })
});

//Data Base 
async function assertDataBaseOk() {
    log("Checking Data Base Connection ...");
    try {
        await sequelize.authenticate()
        log("Data Base Connected Successfully!")
    } catch (e) {
        log("Unable To Connect Data Base ")
        log(e.message)
        process.exit(1)
    }
}

app.set('port', 3000);

const server = app.listen(app.get('port'), async () => {
    console.log(`Application Started On ${(server.address() as AddressInfo).port}`)
    await assertDataBaseOk()
});