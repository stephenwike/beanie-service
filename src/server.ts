import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from "@overnightjs/core";
import { Logger } from '@overnightjs/logger';
import * as http from 'http';

class ExampleServer extends Server {
    private readonly SERVER_STARTED = 'Example server started on port: ';
    private httpServer: http.Server;

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupCors();
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    cors = function (req, res, next) {
        var whitelist = [
            'http://localhost:4200',
            'http://localhost:35791',
            'http://fireshellstudio.com:4200',
            'http://fireshellstudio.com:35791',
            'http://fireshellstudio.com:57913',
            'http://fireshellstudio.com:4200',
            'http://fireshellstudio.com',
            'http://fireshellstudio.com:80',
            "http://fireshellstudio.com:2648"
        ];
        var origin = req.headers.origin;
        if (whitelist.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        next();
    };
    
    private setupCors(): void {
        this.app.use(this.cors);
        super.app.use(this.cors);
    }   

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.httpServer = this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default ExampleServer;