const cheerio = require('cheerio')
const axios = require('axios')

async function getData() {
    const URL = 'https://covid19asi.saglik.gov.tr'
    const response = await axios.get(URL)
    const $ = cheerio.load(response.data)

    const cities = []

    $('g').slice(1).each((index, element) => {
        const city = $(element).attr('data-adi')
        const vaccinated = +$(element).attr('data-toplam').split('.').join('')
        const firstDose = +$(element).attr('data-birinci-doz').split('.').join('')
        const secondDose = +$(element).attr('data-ikinci-doz').split('.').join('')
        cities.push({ city, vaccinated, firstDose, secondDose })
    })

    const totalVaccinated = cities.reduce((total, current) => {
        return total + current.vaccinated
    }, 0)

    const totalFirstDose = cities.reduce((total, current) => {
        return total + current.firstDose
    }, 0)

    const totalSecondDose = cities.reduce((total, current) => {
        return total + current.secondDose
    }, 0)



    return {
        totalVaccinated: {
            totalVaccinated,
            formatted: Math.floor(totalVaccinated / 1000000) + 'M'
        },
        totalFirstDose: {
            totalFirstDose,
            formatted: Math.floor(totalFirstDose / 1000000) + 'M'
        },
        totalSecondDose: {
            totalSecondDose,
            formatted: Math.floor(totalSecondDose / 1000000) + 'M'
        },
        lastUpdate: $('.info_box_left').find('h3').text().trim(),
        cities
    }

}

module.exports = getData