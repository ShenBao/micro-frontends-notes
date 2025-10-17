declare module 'react' {
  // 扩展 React 里的 JSX.IntrinsicElements
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'micro-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
        url?: string;
        iframe?: boolean;
        data?: any;
        [key: string]: any
      };
    }
  }
}

export {};