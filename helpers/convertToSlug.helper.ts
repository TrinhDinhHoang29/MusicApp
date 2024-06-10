import unidecode from "unidecode";
export default (text:string):string=>{
    return unidecode(text).trim().replace(/\s+/g,"-");
}