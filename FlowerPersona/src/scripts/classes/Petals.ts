import {
  flowerPetal,
  domain,
  activityDatatype,
  bookDatatype,
  bookListDatatype,
} from './types'

export class Petals {
  petalNums: number
  firstAngle: number
  secondAngle: number
  numF: number
  numS: number
  domain: number[]
  colorD: string[]
  experience: number
  domainNameArray: string[]

  bud: string =
    'M0,0 C15,-10  15,-40 10,-50 C5,-70 -5,-70 -10,-50 C-15,-40 -15,-10, 0,0  '

  petalB: string =
    'M0,0 C30,-20 15,-80 5,-90 C2,-95 -2,-95 -5,-90 C-15,-80 -30,-20 0,0'

  petalS: string =
    'M0,0 C30,-20 15,-50 5,-70 C2,-75 -2,-75 -5,-70 C-15,-50 -30,-20 0,0'

  Activity: activityDatatype[]
  books: bookDatatype[]
  id: number
  linesize: number[] = [1, 1, 1, 2, 1]
  linepatt: any = []
  Fline: string = 'M0,0 C10, -10 10, -20 0, -40  C -10, -60 -20, -100 0, -120'
  NFline: string = 'M 0, 0 C-10, -10 -10, -20 0, -40 C 10, -60 20, -100 0,-120'

  constructor(
    experince: number,
    domainN: number[],
    activities: activityDatatype[],
    books: bookDatatype[],
    id: number,
  ) {
    // this.petalNums = experince;
    this.firstAngle = 0
    this.secondAngle = 0
    this.petalNums = 0
    this.linepatt = ['1,0', '3,2', '1,2', '2,4', '4,5']
    if (experince < 3) {
      this.petalNums = 1
    } else if (experince >= 4 && experince <= 6) {
      this.petalNums = 2
    } else if (experince >= 7 && experince <= 10) {
      this.petalNums = 3
    } else if (experince >= 11 && experince <= 20) {
      this.petalNums = 4
    } else if (experince > 20) {
      this.petalNums = 5
    }
    this.experience = experince
    this.numF = this.petalNums <= 3 ? this.petalNums : this.petalNums - 2
    this.numS = this.petalNums - this.numF < 0 ? 0 : this.petalNums - this.numF
    this.domain = domainN
    this.colorD = ['#8AC0DE', '#F0C5D5', '#F5C9B2', '#EAB159', '#9E6B55']
    this.books = books
    this.id = id
    this.Activity = activities
    this.domainNameArray = [
      'AIML',
      'Marketing and Communication strategies',
      'Design',
      'Data Analytics',
      'Medicine',
    ]
    // this.Outdoor = outdoor;

    switch (this.petalNums) {
      case 5:
        this.firstAngle = 35
        // this.numF = 3;
        this.secondAngle = 60
        // this.numS = 2;
        break
      case 4:
        this.firstAngle = 20

        this.secondAngle = 40

        break
      case 3:
        this.firstAngle = 35
        break
      case 2:
        this.firstAngle = 20
        break
    }
    // console.log(`${this.numF}, ${this.numS}`);
  }

  flower() {
    // let size = 1;
    const twoPet = this.numS > 0 ? 2 : 1
    const firstPets: flowerPetal[] = []
    //  let secondPets = [];
    let angleF = this.firstAngle
    if (this.petalNums === 1) {
      const pets = {
        angle: 0,
        pathP: this.bud,
      }
      firstPets.push(pets as flowerPetal)
      return firstPets
    }
    for (let i = 0; i < this.numF; i++) {
      const pets = {
        angle: angleF < 0 ? 360 + angleF : angleF,
        pathP: this.petalB,
      }
      angleF -= this.numF % 2 === 0 ? 2 * this.firstAngle : this.firstAngle

      firstPets.push(pets as flowerPetal)
      // console.log(angleF);
    }

    if (twoPet === 2) {
      angleF = this.secondAngle
      for (let i = 0; i < this.numS; i++, angleF -= 2 * this.secondAngle) {
        const pets = {
          angle: angleF < 0 ? 360 + angleF : angleF,
          pathP: this.petalS,
        }
        firstPets.push(pets as flowerPetal)
        // console.log(angleF);
      }
    }

    return firstPets
  }

  domainSet() {
    const sumA = this.domain.reduce((a, b) => a + b, 0)
    console.log(sumA)

    const colorsetD: domain[] = []
    const angleS = 270 / sumA
    const delta = (angleS * (sumA - 1)) / 2

    let ang = 0
    for (let i = 0; i < this.domain.length; i++) {
      let cols: string
      let domainNameTemp: string
      if (this.domain[i] === 1) {
        cols = this.colorD[i] as string

        domainNameTemp = `${this.domainNameArray[i]}`
      } else {
        continue
      }

      const domainB: domain = {
        col: cols as string,
        path: this.petalS as string,
        angle: (ang - delta) as number,
        domainName: domainNameTemp,
      }
      ang += angleS
      colorsetD.push(domainB)
    }

    return colorsetD
  }

  getBookGenre() {
    const totals = this.books.length
    const deltaA = 30 / totals
    let angleF = 0
    // let angleN = 0
    const bookgenre: bookListDatatype[] = []
    let booknum: number

    // console.log(this.linepatt)
    // console.log(this.linesize)

    for (let i = 0; i < totals; i++) {
      booknum = parseInt(('' + this.books[i].detail).substring(9, 10))

      angleF += deltaA

      const bookG = {
        angle: angleF + 45,
        path: this.books[i].genre === 'fiction' ? this.Fline : this.NFline,
        pattern: this.linepatt[booknum - 1],
        size: this.linesize[booknum - 1],
        bookDetails: {
          genre: this.books[i].genre,
          detail: this.books[i].detail,
          name: this.books[i].name,
        },
      }
      // angleD += deltaA;
      bookgenre.push(bookG)
    }
    return bookgenre
  }

  getInformation() {
    const experienceOfPerson = this.experience
    const domainsOfExpertise: string[] = []

    for (let i = 0; i < this.domain.length; i++) {
      if (this.domain[i] === 1) {
        domainsOfExpertise[i] = this.domainNameArray[i]
      }
    }

    return { exp: experienceOfPerson, domainName: domainsOfExpertise }
  }
}
