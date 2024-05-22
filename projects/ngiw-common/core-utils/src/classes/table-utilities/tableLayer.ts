export class _TableLayerService {

    constructor() {

    }

    static setLayerOnRow = (row:any,layerName:string,layerContent:any,options?: {isLayerDependent?:boolean}) => {
       if (!row._layers) {
          row._layers = {}
          row._lastLayerIndex = 0;
          row._layerOrder = {};
       }
       row._layers[layerName] = layerContent;
       row._lastLayerIndex ++;
       row._layerOrder[row._lastLayerIndex] = {
        layerName:layerName,
        isLayerDependent:options?.isLayerDependent ?? false
     }
    }

    static getLayerOnRow = (row:any,layerName:string) => {
        return row._layers ? row._layers[layerName] : null;
    }

    static refreshLayersOnRow = (row:any) => {
        row._layers = undefined;
    }


}