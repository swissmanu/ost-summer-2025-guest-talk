import {Request, Response} from 'express'
import {Todo} from "../services/todo-service";

export interface Settings {
    orderBy: keyof Todo,
    orderDirection: 1 | -1,
    filter: boolean
    theme: boolean
}

export const sessionUserSettings = (req: Request, res: Response, next: (err?: any) => void) => {
    // default Wert oder aktueller Wert von der Session lesen
    const settings = req.session?.settings || {orderBy: 'title', orderDirection: -1, filter: false, theme: true};
    const {orderBy, orderDirection, filter, theme} = req.query;

    if (orderBy) {
        settings.orderBy = orderBy as any;
    }
    if (orderDirection) {
        settings.orderDirection = Number(orderDirection) > 0 ? 1 : -1;
    }
    if (filter) {
        settings.filter = !settings.filter;
    }
    if (theme) {
        settings.theme = !settings.theme;
    }
    req.settings = req.session.settings = settings;

    if (orderBy || orderDirection || filter || theme) { // optional
        res.redirect(req.url.split("?")[0]);
        return;
    }
    next();
};
