import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port: number = 8080;

const router = new Router();

const colors = [];

router.get("/", ({ response }: { response: any }) => {
    response.body = colors
});

router.post("/", async (ctx) => {
    const {value} = ctx.request.body({type: "json"})
    const {color} = await value

    colors.push(color);

    ctx.response.body = {"status" : "OK"}
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('running on port ', port);
await app.listen({ port });