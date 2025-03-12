import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import userRouter from './routes/user'
import blogRouter from './routes/blog'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }, 
  Variables: {
    userId: string,
    prisma: object
  }
}>()

// Middlewares

app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
})

app.use('/api/v1/blog/*', async (c, next) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = jwt.split(' ')[1]; 

    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || !payload.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("userId", payload.id.toString());
    console.log(payload.id);
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
});

// Routes

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app
