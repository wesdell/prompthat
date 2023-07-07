import { db } from './';
import { User } from '@/models';

interface ICreateUser {
  username?: string
  email?: string
  image?: string
}

export const createUser = async ({ username, email, image }: ICreateUser): Promise<boolean> => {
  try {
    await db.connectToDB();
    const userExists = await User.findOne({ email });
    if (!userExists) {
      await User.create({
        username,
        email,
        image
      });
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

interface ISearchUser {
  email?: string | null
}

export const findUser = async ({ email }: ISearchUser): Promise<string | undefined> => {
  try {
    await db.connectToDB();
    const user = await User.findOne({ email });

    if (!user) {
      return undefined;
    }
    
    return user._id;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
