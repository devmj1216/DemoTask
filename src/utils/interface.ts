import { ImageStyle } from "react-native";

export interface ICONSTYLE  {
    size:number,
    color:string,
    name:string,
    onPress:()=>void,
    iconStyle:ImageStyle,
}