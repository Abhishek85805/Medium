import { PrismaClient } from '@prisma/client/extension';
import { Hono } from 'hono'

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }, 
    Variables: {
      userId: string,
      prisma: object
    }
}>();


blogRouter.post('/', async (c) => {
    try {
        const userId = c.get('userId');
        const prisma = c.get('prisma') as PrismaClient;
    
        const body = await c.req.json();
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
    
        return c.json({
            id: post.id
        })
    } catch (error) {
        return c.json({
            error: "Something went wrong while creating post"
        })
    }
});
  
blogRouter.put('/', async (c) => {
    const prisma = c.get('prisma') as PrismaClient;
    const userId = c.get('userId');

    const body = await c.req.json();
    const updatedPost = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });


    return c.json({
        msg: "Blog updated Successfully",
        updatedPost: updatedPost
    });
});

blogRouter.get('/bulk', async (c) => {
    const prisma = c.get('prisma') as PrismaClient;

    const posts = await prisma.post.findMany();

    return c.json(posts);
});
  
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = c.get('prisma') as PrismaClient;

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });


    return c.json(post);
});

export default blogRouter;