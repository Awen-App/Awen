import React ,{useEffect ,useState } from "react";
import axios from "axios";
import LoadingScreen from "./component/LoadingScreen";
const useFetch=(url,dependencies)=>{
    const [isLoading, setIsLoading] = useState(true);
    const[data,setData] =useState([]);
    const [error,setError]=useState(null)
    const fetch = async() => {
        const response=await axios.get(url).catch(error => {
            console.log(error)
            setError(error)});
            setData(response.data)
            setIsLoading(false)
            
      };
      useEffect(()=>{
        fetch();
      },[url,...dependencies])
      return {data,error}
}
export default useFetch;