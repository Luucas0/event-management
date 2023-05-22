const dataDays = {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
}

const date = new Date()

const aDate = `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
const bDate = `El evento será el ${date.getDate()} de ${dataDays.months[date.getUTCMonth()]} del año ${date.getFullYear()}`


console.log(aDate)
console.log(bDate)