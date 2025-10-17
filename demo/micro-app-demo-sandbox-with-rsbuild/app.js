const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const path = require('path');
const fs = require('fs');

const app = new Koa();
const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, 'dist');

if (!fs.existsSync(staticPath)) {
  console.error(`❌ 构建目录不存在: ${staticPath}`);
  console.error('请先构建你的前端项目（如 npm run build）');
  process.exit(1);
}

app.use(serve(staticPath));

app.use(async (ctx) => {
  if (!ctx.body && !ctx.path.startsWith('/api/') && ctx.accepts('html')) {
    await send(ctx, 'index.html', { root: staticPath });
    return;
  }

  if (!ctx.body) {
    ctx.status = 404;
    ctx.body = 'Not Found';
  }
});

app.listen(PORT, () => {
  console.log(`✅ Koa SPA 服务器已启动: http://localhost:${PORT}`);
  console.log(`📁 静态文件目录: ${staticPath}`);
  console.log(`🎯 所有未匹配路由将 fallback 到 index.html（支持前端路由）`);
});