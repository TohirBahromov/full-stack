export const newDate = () => {
  let newDate = new Date()
  const getHours = () =>{
    const getHours = newDate.getHours()
    if(getHours < 10){
      return "0" + getHours
    }
    return getHours
  }
  const getMinutes = () =>{
    const getMinutes = newDate.getMinutes()
    if(getMinutes < 10){
      return "0" + getMinutes
    }
    return getMinutes
  }
  const getDay = ()=> {
    const getDate = newDate.getDate()
    if(getDate < 10){
      return "0" + getDate
    }
    return getDate
  }
  const getMonth = ()=> {
    const getMonth = newDate.getMonth() + 1
    if(getMonth < 10){
      return "0" + getMonth
    }
    return getMonth
  }
  const getYear = newDate.getFullYear()

  return {getHours,getMinutes,getDay,getMonth,getYear}
}
console.log(newDate());