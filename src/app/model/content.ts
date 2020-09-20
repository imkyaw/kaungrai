class Content {
    status: number
    message: string
    payload: ContentList[]
}

class ContentList {
    images: string[]
    _id: string
    body: string
    title: string
    lang: string
    created_at: string
    __v: number
}
export { Content, ContentList }