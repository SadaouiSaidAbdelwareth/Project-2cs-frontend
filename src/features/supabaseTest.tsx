import React, {  useEffect, useState } from 'react'
import { supabase } from '../supabase-client'

export const SupabaseTest = () => {
    const [users,setUsers] = useState<any[]|null>([]) 
    const [err,setErr] = useState('') 
    const [msg,setMsg] = useState('')
    const [product,setProduct] = useState<{product_name:string,price:number}>()    

    const feetchUsers = async () => {
            let {data,error}  = await supabase.from('users').select('*') 
            if (error) setErr(String(error)) 
            else setUsers(data)             

        }

    const addProduct = async (e: React.FormEvent<HTMLFormElement>)=> { 
        e.preventDefault()
        const {data,error} = await supabase.from('products').insert([{product_name:product?.product_name,price:product?.price}])
        if (error) setErr(error.message)
        else setMsg('product added succesufely ')
     }    
    useEffect(()=> { 
        feetchUsers() 
        setErr('')
        setMsg('')  


    }, [ ] 
    ) 

  return ( 
    <div>
        <p>list des users</p>
    <div className=' flex flex-col space-y-5 '>
        
        <div className=' flex space-x-5 '>
            <p>name </p>
            <p>age </p>
            <p>email </p>
        </div>
        {users?.map( (user) => 
        <div className=' flex space-x-5 '>
            <p>{user.name} </p>
            <p>{user.age} </p>
            <p>{user.email} </p>

        </div>

        )}
    </div>

    <p> ajouter un produit</p>
    <div>

    <form onSubmit={addProduct}>  

        <input type="text" 
                value={product?.product_name}
                onChange={e=>setProduct(p=> ({...p,
                product_name:e.target.value,
                price: p?.price ?? 0  })   )}
                placeholder='product name'
              />   
      
        <input
            type="number"
            value={product?.price || 0}
            placeholder='product price'
            onChange={e =>
            setProduct(p => ({
                ...p,
                price: Number(e.target.value),
                product_name: p?.product_name ?? ''
            }))
            }
           /> 
        

         <button type='submit'>Add product</button>  
    </form>
    {err!=='' &&<p>Message d erreur: {err}</p>  }
    {msg!=='' && <p>{msg}</p> } 

    </div>

</div>
    

  )
}

 