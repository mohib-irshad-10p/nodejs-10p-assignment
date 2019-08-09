import * as controller from '../controllers/users';
import * as Router from 'koa-router';
import config from '../../config';
import * as compose from 'koa-compose';

const router = new Router({
    prefix: `${config.api.baseURL}/users`
})

router.post('/register', controller.save);
router.post('/authenticate', controller.authenticate);

const routes = router.routes();
export default compose([routes]);