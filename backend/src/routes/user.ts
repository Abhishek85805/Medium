import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }, 
  Variables: {
    userId: string,
    prisma: object
  }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = c.get("prisma") as PrismaClient;

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    });
    
    const payload = {id: user.id};
    const secret = c.env.JWT_SECRET

    const jwt = await sign(payload, secret);
    return c.json({jwt});
  } catch (error) {
    return c.status(403);
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = c.get("prisma") as PrismaClient;
  
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  });

  if(!user){
    c.status(403);
    return c.json({error: "User not found"});
  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({jwt});
});

export default userRouter;
