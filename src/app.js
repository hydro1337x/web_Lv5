class Fighter {
    constructor(id, age, name, catInfo, wins, losses, img) {
        this.id = id
        this.age = age
        this.name = name
        this.catInfo = catInfo
        this.wins = wins
        this.losses = losses
        this.img = img
    }
}

class Game {
    constructor() {
        this.isDisabled = false
        this.fighterOne = null
        this.fighterTwo = null
        this.lhsFighters = []
        this.rhsFighters = []
        this.init()
    }

    init() {
        let lhsButtons = document.querySelector('#firstSide').querySelectorAll('.fighter-box')
        Array.from(lhsButtons).forEach(el => {
            let img = el.querySelector('img').getAttribute('src')
            let json = JSON.parse([el.dataset['info']])
            let fighter = new Fighter(json.id, json.age, json.name, json.catInfo, json.record.wins, json.record.loss, img)
            this.lhsFighters.push(fighter)
        })
        lhsButtons.forEach((button) => {
        button.addEventListener('click', this.selectFighterOne.bind(this))
        })

        let rhsButtons = document.querySelector('#secondSide').querySelectorAll('.fighter-box')
        Array.from(rhsButtons).forEach(el => {
            let img = el.querySelector('img').getAttribute('src')
            let json = JSON.parse([el.dataset['info']])
            let fighter = new Fighter(json.id, json.age, json.name, json.catInfo, json.record.wins, json.record.loss, img)
            this.rhsFighters.push(fighter)
        })
        rhsButtons.forEach((button) => {
            button.addEventListener('click', this.selectFighterTwo.bind(this))
        })

        const fightButton = document.querySelector("#generateFight")
        fightButton.addEventListener('click', this.fightButtonClicked.bind(this))

        const randomFightersButton = document.querySelector("#randomFight")
        randomFightersButton.addEventListener("click", this.randomFightersButtonClicked.bind(this))
    }

    selectFighterOne(event) {
        console.log(this.isDisabled)
        if (this.isDisabled !== true) {
            let data = event.path[1]
            let img = event.target.getAttribute('src')
            let dataObj = JSON.parse([data.dataset['info']])
            
            if (this.fighterTwo === null || this.fighterTwo.id !== dataObj.id) {
                this.fighterOne = new Fighter(dataObj.id, dataObj.age, dataObj.name, dataObj.catInfo, dataObj.record.wins, dataObj.record.loss, img)
    
                let fighterOneImg = document.querySelector('#firstFighterImg')
                fighterOneImg.src = this.fighterOne.img
                document.querySelector('#firstSide').querySelector('.name').innerHTML = this.fighterOne.name
                document.querySelector('#firstSide').querySelector('.age').innerHTML = this.fighterOne.age
                document.querySelector('#firstSide').querySelector('.skills').innerHTML = this.fighterOne.catInfo
                document.querySelector('#firstSide').querySelector('.wins').innerHTML = this.fighterOne.wins
                document.querySelector('#firstSide').querySelector('.loss').innerHTML = this.fighterOne.losses
            }
        }
        
    }
    
    selectFighterTwo(event) {
        if (this.isDisabled !== true) {
            let data = event.path[1]
            let img = event.target.getAttribute('src')
            let dataObj = JSON.parse([data.dataset['info']])
            console.log(dataObj)
            if (this.fighterOne === null || this.fighterOne.id !== dataObj.id) {
                this.fighterTwo = new Fighter(dataObj.id, dataObj.age, dataObj.name, dataObj.catInfo, dataObj.record.wins, dataObj.record.loss, img)

                let fighterTwoImg = document.querySelector('#secondFighterImg')
                fighterTwoImg.src = this.fighterTwo.img
                document.querySelector('#secondSide').querySelector('.name').innerHTML = this.fighterTwo.name
                document.querySelector('#secondSide').querySelector('.age').innerHTML = this.fighterTwo.age
                document.querySelector('#secondSide').querySelector('.skills').innerHTML = this.fighterTwo.catInfo
                document.querySelector('#secondSide').querySelector('.wins').innerHTML = this.fighterTwo.wins
                document.querySelector('#secondSide').querySelector('.loss').innerHTML = this.fighterTwo.losses
            }
        }
    }

    fightButtonClicked(event) {
        if (this.isDisabled !== true) {
            if (this.fighterTwo === null || this.fighterOne === null) {
                console.log("Prevent")
                event.preventDefault
            } else {
                console.log("Timer started")
                this.isDisabled = true
                var timer = setTimeout(this.handleTimerCallback.bind(this), 3000);
            }
        }
    }

    handleTimerCallback() {
        console.log("Timer finished!")
        this.isDisabled = false
        clearTimeout(this.timer)
        this.handleFight()
    }

    handleFight() {
        const f1WinRatio = this.fighterOne.wins/(this.fighterOne.wins + this.fighterOne.losses)
        const f2WinRatio = this.fighterTwo.wins/(this.fighterTwo.wins + this.fighterTwo.losses)

        let f1Interval
        let f2Interval

        let difference
        if (f1WinRatio > f2WinRatio) {
            difference = f1WinRatio - f2WinRatio
            if (difference > 10) {
                f1Interval = [0, 69]
                f2Interval = [70,100]
            } else {
                f1Interval = [0,59]
                f2Interval = [60,100]
            }
        } else {
            difference = f2WinRatio - f1WinRatio
            if (difference > 10) {
                f2Interval = [0, 69]
                f1Interval = [70,100]
            } else {
                f2Interval = [0,59]
                f1Interval = [60,100]
            }
        }

       
        let result = Math.floor(Math.random() * 101)
        console.log(result)
        console.log("f1 interval:", f1Interval[0] + " " + f1Interval[1]) 
        console.log("f2 interval:", f2Interval[0] + " " + f2Interval[1]) 
        if (result >= f1Interval[0] && result <= f1Interval[1]) {
            this.updateData(this.fighterOne, this.fighterTwo)
            document.querySelector("#firstFighterImg").setAttribute("style", "border: 1px solid green;")
            document.querySelector("#secondFighterImg").setAttribute("style", "border: 1px solid red;")
            let element = document.querySelector("section")
            let oldh3 = element.querySelector('h3')
            if (oldh3 !== null && oldh3 !== undefined) {
                element.removeChild(oldh3)
            }
            let h3 = document.createElement('h3')
            let textNode = document.createTextNode(`${this.fighterOne.name} wins!`)
            h3.appendChild(textNode)
            element.appendChild(h3)
        } else {
            this.updateData(this.fighterTwo, this.fighterOne)
            document.querySelector("#firstFighterImg").setAttribute("style", "border: 10px solid red;")
            document.querySelector("#secondFighterImg").setAttribute("style", "border: 10px solid green;")
            let element = document.querySelector("section")
            let oldh3 = element.querySelector('h3')
            if (oldh3 !== null && oldh3 !== undefined) {
                element.removeChild(oldh3)
            }
            let h3 = document.createElement('h3')
            let textNode = document.createTextNode(`${this.fighterTwo.name} wins!`)
            h3.appendChild(textNode)
            element.appendChild(h3)
        }
    }

    updateData(winner, loser) {
        this.lhsFighters.forEach(fighter => {
            if (fighter.id === winner.id) {
                fighter.wins += 1
            }
            if (fighter.id === loser.id) {
                fighter.losses += 1
            }
        })

        this.rhsFighters.forEach(fighter => {
            if (fighter.id === winner.id) {
                fighter.wins += 1
            }
            if (fighter.id === loser.id) {
                fighter.losses += 1
            }
        })

        let fighterOneImg = document.querySelector('#firstFighterImg')
        fighterOneImg.src = this.fighterOne.img
        document.querySelector('#firstSide').querySelector('.name').innerHTML = this.fighterOne.name
        document.querySelector('#firstSide').querySelector('.age').innerHTML = this.fighterOne.age
        document.querySelector('#firstSide').querySelector('.skills').innerHTML = this.fighterOne.catInfo
        document.querySelector('#firstSide').querySelector('.wins').innerHTML = this.fighterOne.wins
        document.querySelector('#firstSide').querySelector('.loss').innerHTML = this.fighterOne.losses

        let fighterTwoImg = document.querySelector('#secondFighterImg')
        fighterTwoImg.src = this.fighterTwo.img
        document.querySelector('#secondSide').querySelector('.name').innerHTML = this.fighterTwo.name
        document.querySelector('#secondSide').querySelector('.age').innerHTML = this.fighterTwo.age
        document.querySelector('#secondSide').querySelector('.skills').innerHTML = this.fighterTwo.catInfo
        document.querySelector('#secondSide').querySelector('.wins').innerHTML = this.fighterTwo.wins
        document.querySelector('#secondSide').querySelector('.loss').innerHTML = this.fighterTwo.losses

        this.lhsFighters.forEach(fighter => {
            if (fighter.id === winner.id) {
                let element = document.querySelector('#firstSide').querySelector(`#id${fighter.id}`)
                element.setAttribute("data-info", JSON.stringify({
                    "id": fighter.id,
                                "name": fighter.name ,
                                "age" : fighter.age,
                                "catInfo": fighter.catInfo,
                                "record" : {
                                    "wins":  fighter.wins,
                                    "loss": fighter.losses
                                }
                }))
            } else if (fighter.id === loser.id) {
                let element = document.querySelector('#firstSide').querySelector(`#id${fighter.id}`)
                element.setAttribute("data-info", JSON.stringify({
                    "id": fighter.id,
                                "name": fighter.name ,
                                "age" : fighter.age,
                                "catInfo": fighter.catInfo,
                                "record" : {
                                    "wins":  fighter.wins,
                                    "loss": fighter.losses
                                }
                }))
            }
        })

        this.rhsFighters.forEach(fighter => {
            if (fighter.id === winner.id) {
                let element = document.querySelector('#secondSide').querySelector(`#id${fighter.id}`)
                element.setAttribute("data-info", JSON.stringify({
                    "id": fighter.id,
                                "name": fighter.name ,
                                "age" : fighter.age,
                                "catInfo": fighter.catInfo,
                                "record" : {
                                    "wins":  fighter.wins,
                                    "loss": fighter.losses
                                }
                }))
            } else if (fighter.id === loser.id) {
                let element = document.querySelector('#firstSide').querySelector(`#id${fighter.id}`)
                element.setAttribute("data-info", JSON.stringify({
                    "id": fighter.id,
                                "name": fighter.name ,
                                "age" : fighter.age,
                                "catInfo": fighter.catInfo,
                                "record" : {
                                    "wins":  fighter.wins,
                                    "loss": fighter.losses
                                }
                }))
            }
        })
    }

    randomFightersButtonClicked(event) {
        if (this.isDisabled !== true) {
            let f1RandomInt = Math.floor(Math.random() * 6)
            let f2RandomInt = Math.floor(Math.random() * 6)
            do {
                f2RandomInt = Math.floor(Math.random() * 6)
            } while(f1RandomInt === f2RandomInt)
            console.log(f1RandomInt)
            this.fighterOne = this.lhsFighters[f1RandomInt]
            this.fighterTwo = this.rhsFighters[f2RandomInt]

            document.querySelector('#firstSide').querySelector('.name').innerHTML = this.fighterOne.name
            document.querySelector('#firstSide').querySelector('.age').innerHTML = this.fighterOne.age
            document.querySelector('#firstSide').querySelector('.skills').innerHTML = this.fighterOne.catInfo
            document.querySelector('#firstSide').querySelector('.wins').innerHTML = this.fighterOne.wins
            document.querySelector('#firstSide').querySelector('.loss').innerHTML = this.fighterOne.losses
            document.querySelector('#firstFighterImg').src = this.fighterOne.img

            document.querySelector('#secondSide').querySelector('.name').innerHTML = this.fighterTwo.name
            document.querySelector('#secondSide').querySelector('.age').innerHTML = this.fighterTwo.age
            document.querySelector('#secondSide').querySelector('.skills').innerHTML = this.fighterTwo.catInfo
            document.querySelector('#secondSide').querySelector('.wins').innerHTML = this.fighterTwo.wins
            document.querySelector('#secondSide').querySelector('.loss').innerHTML = this.fighterTwo.losses
            document.querySelector('#secondFighterImg').src = this.fighterTwo.img
        }
    }
}

let game = new Game()




