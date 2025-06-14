
export const waitFor = async(number:number)=>{
    return new Promise((r)=>{
        setTimeout(r,number)
    })
}