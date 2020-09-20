class Language {
    status: number
    message: string
    payload: LanguageList[]
}

class LanguageList {
    deleted: boolean
    _id: string
    lang: string
    created_at: string
    __v: number
}
export { Language, LanguageList }