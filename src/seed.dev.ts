import { UserEntity } from './common/entity/User.entity';

export async function seed() {
  try {
    if(!await UserEntity.findOne({email: 'panarama360@gmail.com'})) {
      const user = new UserEntity();
      await user.setPassword('123456');
      user.email = 'panarama360@gmail.com';
      user.username = 'panarama360';
      await user.save();
    }
    // tslint:disable-next-line:no-empty
  } catch (e) {

  }
}
