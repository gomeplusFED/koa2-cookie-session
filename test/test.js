import Koa from "koa";
import request from "supertest";
import session from "../dist/index.js";

describe("koa2-cookie-session", () => {
  describe("default",() => {
    it("should be work",done => {
      let app = new Koa();
      app.use(session());
      app.use(ctx => {
        ctx.session.user = 'test';
        ctx.body = ctx.session.user;
      });
      request(app.listen())
      .get("/")
      .expect(200,"test",done);
    });
  });
});
