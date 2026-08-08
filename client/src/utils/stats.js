export function calculateTotalCount(info){
    let count = 0
    Object.values(info).forEach(item => {
        if(Array.isArray(item)){
            item.forEach(ele => {
                count += Object.values(ele).filter(val => typeof val === "string" || typeof val === "object").length
            })
        }
        else if(typeof item === "object"){
            count += Object.keys(item).length
        }
    })
    return count
}

export function calculateCount(info){
    let count = 0
    Object.values(info).forEach(item => {
        if(Array.isArray(item)){
            item.forEach(ele => {
                count += Object.values(ele).filter(item => item.length>0).length
            })
        }
        else if(typeof item === "object"){
            count += Object.values(item).filter(item => item.length>0).length
        }
    })
    
    return count

}