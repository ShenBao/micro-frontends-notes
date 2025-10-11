// vite-plugin-minimal-html.ts
import { resolve } from 'path';
import type { Plugin, ResolvedConfig } from 'vite';

interface MinimalHtmlPluginOptions {
  include?: string | string[];
  exclude?: string | string[];
  verbose?: boolean;
}

export default function minimalHtmlPlugin(
  options: MinimalHtmlPluginOptions = {}
): Plugin {
  const {  exclude = [], verbose = false } = options;

  let config: ResolvedConfig;

  return {
    name: 'vite-plugin-minimal-html',
    enforce: 'post',
    apply: 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async writeBundle(_, bundle) {
      const outDir = config.build.outDir || 'dist';
      const outDirPath = resolve(config.root || process.cwd(), outDir);

      const { glob } = await import('glob');
      const { promisify } = await import('node:util');
      const globAsync = promisify(glob);

      const excludePatterns = Array.isArray(exclude) ? exclude : [exclude];

      // 获取 bundle 中所有 .html 文件
      const bundleHtmlFiles = Object.keys(bundle).filter(key => 
        key.endsWith('.html')
      );

      let filesToProcess = [...bundleHtmlFiles];

      // 应用 exclude 过滤
      if (excludePatterns.length > 0) {
        const excludedFiles = new Set<string>();
        for (const pattern of excludePatterns) {
          const excludedGlob = await globAsync(pattern, { 
            cwd: outDirPath, 
            absolute: false,
            nodir: true 
          });
        //   @ts-ignore
          excludedGlob.forEach(f => excludedFiles.add(f.replace(/\\/g, '/')));
        }
        filesToProcess = filesToProcess.filter(file => !excludedFiles.has(file));
      }

      // 最终过滤：确保文件存在且为 asset
      filesToProcess = filesToProcess.filter(relativePath => {
        const file = bundle[relativePath];
        return file?.type === 'asset' && typeof file.source === 'string';
      });

      for (const relativePath of filesToProcess) {
        const file = bundle[relativePath] as any;
        let htmlContent = file.source as string;

        if (verbose) {
          console.log(`[vite-plugin-minimal-html] Processing: ${relativePath}`);
        }

        try {
          // --- 改进 <head> 处理 ---
          htmlContent = htmlContent.replace(
            /<head[^>]*>([\s\S]*?)<\/head>/gi,
            // @ts-ignore
            (match, headContent: string) => {
              // 匹配 link[rel="stylesheet"] 且 rel 值恰好是 stylesheet (使用单词边界 \b)
              // 或者匹配任何 script 标签
              const cssJsMatches = headContent.match(
                // 使用 \b 确保 rel 的值是完整的 "stylesheet"
                /<link\b[^>]*\brel\s*=\s*["']stylesheet["'][^>]*>|<script\b[^>]*>[\s\S]*?<\/script>|<script\b[^>][^>]*\/?>/gi
              ) || [];
              
              const newHeadContent = cssJsMatches.length > 0 
                ? '\n  ' + cssJsMatches.join('\n  ') + '\n' 
                : '';
              return `<head>${newHeadContent}</head>`;
            }
          );

          // --- 改进 <body> 处理 ---
          htmlContent = htmlContent.replace(
            /<body([^>]*)>([\s\S]*?)<\/body>/gi,
            // @ts-ignore
            (match, bodyAttrs: string, bodyContent: string) => {
              // 提取 body 内所有的 script 标签
              const scriptMatches = bodyContent.match(
                /<script\b[^>]*>[\s\S]*?<\/script>|<script\b[^>][^>]*\/?>/gi
              ) || [];
              
              // 重建 body 内容：只包含 script 标签
              const newBodyContent = scriptMatches.length > 0 
                ? '\n  ' + scriptMatches.join('\n  ') + '\n' 
                : '';
                
              // 保留原有的 body 属性
              return `<body${bodyAttrs}>${newBodyContent}</body>`;
            }
          );

          // 更新 bundle
          file.source = htmlContent;

          console.log('htmlContent:', htmlContent);
          

          if (verbose) {
            console.log(`[vite-plugin-minimal-html] Processed: ${relativePath}`);
          }

        } catch (error) {
          console.error(`[vite-plugin-minimal-html] Failed to process: ${relativePath}`, error);
        }
      }
    }
  };
}