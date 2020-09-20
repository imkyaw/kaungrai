class Contact {
    status: number
    message: string
    payload: ContactList[]
}

class ContactList {
    _id: string
    title: string
    description: string
    created_at: string
    __v: number
}
export { Contact, ContactList }