import app from './app';
import {appConfig} from './config/app.config';

app.listen(appConfig.env.port,()=>{
    console.log(`Server started on http://${appConfig.env.host}:${appConfig.env.port}`);
});
