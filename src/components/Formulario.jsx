import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from './Error'
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas("Elige tu CriptoMoneda", criptos);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      //En esta parte vamos a hacer el array de la info que utilicemos con map, clg resultado.data da toda la info
      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto; //El poner return hace que aparezca la info en array cripto, sin el sale undefined
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault()
    if([moneda, criptoMoneda].includes('')){
        setError(true)
        return
    }
    setError(false)
    setMonedas({
      moneda,
      criptoMoneda
    })
  }
  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form onSubmit={handleSubmit}>
      <SelectMonedas />
      <SelectCriptoMoneda />

      <InputSubmit type="submit" value="Cotizar" />
    </form>
    </>
  );
};
export default Formulario;
