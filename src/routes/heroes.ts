import * as controller from '../controllers/heroes';
import * as Router from 'koa-router';
import config from '../../config';
import * as compose from 'koa-compose';

const router = new Router({
    prefix: `${config.api.baseURL}/heroes`
})

router.get('/', controller.getAll);
router.post('/', controller.save);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

const routes = router.routes();
export default compose([routes]);