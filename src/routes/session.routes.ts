import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try{
    const { email, password } = request.body;

    const sessionUser = new CreateSessionService();

    const { user, token } = await sessionUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }catch(err){
    return response.status(400).json({ error: err.message });
  }

});

export default usersRouter;
