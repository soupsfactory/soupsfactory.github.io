export type domain = {
  col: string
  path: string
  angle: number
  domainName: string
}

export type flowerPetal = {
  angle: number
  pathP: string
  experience: number
}

export type activityDatatype = {
  name: string
  children: {
    name: string
    value: number
  }[]
}

export type bookDatatype = {
  genre: string
  detail: string
  name: string
}

export type datasetType = {
  team: string
  id: number
  exp: number
  domain: number[]
  books: bookDatatype[]
  activities: activityDatatype[]
}
export type bookListDatatype = {
  angle: number
  path: string
  pattern: any
  size: number
  bookDetails: bookDatatype
}

export type petalDataset = {
  id: number
  exp: number
  domain: domain[]
  flower: flowerPetal[]
  activities: activityDatatype[]
  books: bookListDatatype[]
  information: {
    exp: number
    domainName: string[]
    // books:{
    //   genre:string
    //   name:string
    // }
  }
}

// export { datasetType, petalDataset}
