'use strict'


const title = document.getElementsByTagName('h1')[0]
const startBtn = document.getElementsByClassName('handler_btn')[0] 
const resetBtn = document.getElementsByClassName('handler_btn')[1]
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPersent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const inputRange = document.querySelector('.rollback  input')
const inputRangeValue = document.querySelector('.rollback .range-value')

const total =  document.getElementsByClassName('total-input')[0] 
const totalCount =  document.getElementsByClassName('total-input')[1]
const totalCountOther =  document.getElementsByClassName('total-input')[2]
const fullTotalCount =  document.getElementsByClassName('total-input')[3]
const totalCountRollback =  document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appDate = {
        title: "",
        screens: [], //сделали по умолчанию массивом
        screenPrice: 0,
        adaptive: true,
        rollBack: 10,
        servicePricesPercent: 0,
        servicePricesNumber: 0,
        fullPrice: 0,
        servicePercentPrice: 0,
        servicesPercent: {},  //сделали по умолчанию объектом
        servicesNumber: {},

        init: function () {
            appDate.addTitle()
            startBtn.addEventListener('click', appDate.start) //запускаем метод start при клике на кнопку 
            buttonPlus.addEventListener('click', appDate.addScreenBlock )//вешаем на кнопку с плюсом обработчик события
            
        },
        addTitle: function () {
            document.title = title.textContent

        },
        
        start: function () {
            
            appDate.addScreens()
            appDate.addServices() 
            appDate.addPrices()

            // appDate.getServicePercentPrice()
            // appDate.logger()

            console.log(appDate);
            appDate.showResult()
        },
        showResult: function () { //выводим результаты на экран сбоку в инпутах
            total.value = appDate.screenPrice
            totalCountOther.value = appDate.servicePricesPercent + appDate.servicePricesNumber
            fullTotalCount.value = appDate.fullPrice

        },
        addScreens: function () { // добавляем экраны в расчет

            screens = document.querySelectorAll('.screen') //для того чтобы в данную колекцию попали новые элементы нужно переопределить эту колекцию перед каждым расчетом и получаем массив из трех обьектов
            screens.forEach(function (screen, index) { //из каждого обьекта screens достаем input и select 
                
                const select = screen.querySelector('select')
                const input = screen.querySelector('input')
                const selectName = select.options[select.selectedIndex].textContent

                appDate.screens.push({
                    id: index, 
                    name: selectName, 
                    price: +select.value * +input.value

                })
            })

                console.log(appDate.screens);

        },
        addServices: function () { //в этом методе нужно перебрать обе колекции, достать от туда информацию и записать в обьект сервисес
            otherItemsPersent.forEach((item) => {
                const check = item.querySelector('input[type=checkbox]')
                const label = item.querySelector('label')
                const input = item.querySelector('input[type=text]')

                if(check.checked) { //дает значение true если обьект выбран и появляется в свойвствах при "расчитать"
                appDate.servicesPercent[label.textContent] = +input.value
                }
            })
            otherItemsNumber.forEach((item) => {
                const check = item.querySelector('input[type=checkbox]')
                const label = item.querySelector('label')
                const input = item.querySelector('input[type=text]')

                if(check.checked) { //дает значение true если обьект выбран и появляется в свойвствах при "расчитать"
                appDate.servicesNumber[label.textContent] = +input.value
                }
            })
           
        },
        addScreenBlock: function (){ // делаем дополнительный инпут ниже выбора экранов
            const clonScreen = screens[0].cloneNode(true)

            console.log(clonScreen);
            screens[screens.length -1].after(clonScreen) //обратились к самому последнему элементу и вставили наш клон после него

        },
        addPrices: function () {
            for (let screen of appDate.screens) {
                appDate.screenPrice += +screen.price
            }
            for (let key in appDate.servicesNumber) {
                appDate.servicePricesNumber += appDate.servicesNumber[key] //каждую итерацию прибавляем значение из appDate.services
            }
            for (let key in appDate.servicesPercent) {
                appDate.servicePricesPercent += appDate.screenPrice * (appDate.servicesPercent[key] / 100) //каждую итерацию прибавляем значение из appDate.services
            }
            appDate.fullPrice = +appDate.screenPrice + appDate.servicePricesNumber + appDate.servicePricesPercent
        },
        
        getServicePercentPrice: function () {
            appDate.servicePercentPrice =  appDate.fullPrice - (appDate.fullPrice * (appDate.rollBack / 100))
        },
      
        getRollbackMessage: function (price) {
            if (price >= 30000) {
                return "Даем скидку 10%"
            } else if (price >= 15000 && price < 30000) {
                return "Даем скидку 5%"
            } else if (price >= 0 && price < 15000) {
                return "Скидка не предусмотрена"
            } else {
                return "Что-то пошло не так"
            }
        },
        logger: function () {
            console.log(appDate.screens);
            console.log('Цена со всеми сервисами:' + appDate.fullPrice);
            console.log('Сумма с учетом отката: ' + appDate.servicePercentPrice);
            alert('Стоимость верстки экрана: ' + appDate.screenPrice + ' $, ' + 'Стоимомть с дополнительным сервисом: ' +  appDate.fullPrice + ' $')
            
        }
    }
    
    appDate.init()