import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UploadUserAvatarService from '../services/UploadUserAvatarService';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);

});

usersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    try{
      const uploadAvatar = new UploadUserAvatarService();

      const user = await uploadAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      })

      delete user.password;

      return response.json(user);
    }catch(err){
      return response.status(400).json({ error: err.message });
    }

})

export default usersRouter;
