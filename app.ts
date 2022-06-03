import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import {indexRoutes} from './routes/indexRoutes';
import {helpers} from './utils/handlebar-util'

declare module 'express-session' {
    interface SessionData {
        settings: Settings;
    }
}

declare module 'express' {
    interface Request {
        settings: Settings;
    }
}

import exphbs from 'express-handlebars';
import {sessionUserSettings, Settings} from "./utils/session-middleware";

export const app = express();

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(express.static(path.resolve('public')));
app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(sessionUserSettings)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", indexRoutes);
