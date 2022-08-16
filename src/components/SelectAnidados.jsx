import { useEffect, useState } from "react"
import SelectList from "./SelectList"
import Typography from '@mui/material/Typography'
const SelectAnidados=()=>{
    const [state,setState]=useState(null)
    const [town,setTown]=useState(null)
    const [suburb,setSuburb]=useState(null)

    useEffect(()=>{
        console.log(state);
        console.log(town);
        console.log(suburb);
    },[state,town,suburb])

    return <>
     <Typography variant="h4">Seleccionador Anidado API{<br/>} Datos Geográficos de Argentina </Typography>
     <br />
    <SelectList tittle={"provincias"} url="https://apis.datos.gob.ar/georef/api/provincias?" handleChange={(e)=>{setState(e.target.value); setTown(null)}} />
    {state && 
    <SelectList tittle={"departamentos"} url={`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${state}&max=16`} handleChange={(e)=>{setTown(e.target.value)}} />
    }
    {town && 
    <SelectList tittle={"localidades"} url={`https://apis.datos.gob.ar/georef/api/localidades?departamento=${town}&campos=nombre`} handleChange={(e)=>{setSuburb(e.target.value)}} />
    }
    </>

}

export default SelectAnidados