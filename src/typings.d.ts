/* SystemJS module definition */
declare var module: NodeModule;
declare module 'exceljs/dist/exceljs.min.js'

interface NodeModule {
  id: string;
}
interface JQuery {
  slickgrid: (options: any) => any;
  tooltip: (options: any) => any;
}
