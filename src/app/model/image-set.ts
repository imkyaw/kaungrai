class ImgSet {
    status: number
    message: string
    payload: ImgSetList[]
}

class ImgSetList {
    images: string[]
    url: string[]
    _id: string
    title: string
    lang: string
    created_at: string
    __v: number
}
export { ImgSet, ImgSetList }