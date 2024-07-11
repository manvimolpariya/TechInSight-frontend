import { useEffect, useState } from "react"
import {getCrypto} from '../api/external'
import Loader from "./Loader";
const Crypto = () => {
  const [data, setData]=useState([]);
  useEffect(()=>{
    (
      async function cryptoApiCall (){
        const  response = await getCrypto();
         setData(response);
      }
    )();
    setData([]);
  },[]);
  if(data.length === 0){
    return <Loader text={"Cryptocurrencies"}/>
  }
  const positiveNmbr = {
    color : '#0000ff77'
  }
  const negativeNmbr = {
    color : '#ff0000'
  }
  return (
    <section className="max_padd_container pt-28">
     <table className="w-full mx-auto">
      <thead>
        <tr className="bg-slate-500/10 bold-20 sm:bold-22 text-start p-7">
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin)=>(
          <tr key={coin.name} className="border-b border-r-slate-900/50 text-gray-20 p-6 medium-14 text-center">
            <td>{coin.market_cap_rank}</td>
            <td className="flexCenter py-4">
            <div className="sm:w-[30%] flex item-cener text-left mx-auto gap-x-3 text-gray-20">
            <img src={coin.image} alt="image" height={30} width={30}/>{coin.name}
            </div>
            </td>
            <td>{coin.symbol}</td>
            <td>{coin.current_price}</td>
            <td style={(coin.price_change_percentage_24h < 0) ? negativeNmbr : positiveNmbr}>{coin.price_change_percentage_24h}</td>
          </tr>
        ))}
      </tbody>
     </table>
    </section>
  )
}

export default Crypto
