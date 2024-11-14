import { TextField } from '@mui/material'
type Props={
    name:string,
    type:string,
    label:string
}
const CustomizedInput = (props:Props) => {
    
  return (
    <TextField 
    margin='normal'
    slotProps={{
        inputLabel: {
          shrink: true,
          style: { color: "white" },
        },
        input:{
          
            style:{ width:'400px',borderRadius:10,color:'white',fontSize:20}
        }
      }}
     name={props.name} label={props.label} type={props.type}
     ></TextField>
  )
}

export default CustomizedInput