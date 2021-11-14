import React from 'react';

let initialState: InitialStateMessageType = {
    messageData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'What`s going on?'},
        {id: 3, message: 'How`re you things'},
        {id: 4, message: 'How`s life?'},
        {id: 5, message: 'I got it!'},
        {id: 6, message: 'Catch you around!'},
    ] as Array<MessageType>,
    newMessage: ''
}
export type InitialStateMessageType = {
    messageData: Array<MessageType>
    newMessage: string
}
type MessageType = {
    id: number
    message: string

}


export const messageReducer = (state: InitialStateMessageType = initialState, action: NewMessageActionType): InitialStateMessageType => {
    switch (action.type) {
        case "ADD-NEW-MESSAGE":

            let newPost: MessageType = {
                id: new Date().getTime(),
                message: action.title
            }
            return {
                ...state,
                messageData: [...state.messageData, newPost],
            }
        default:
            return state
    }
}

export const addNewMessageAC = (title:string) => {
    return {
        type: 'ADD-NEW-MESSAGE',
        title:title,
    } as const
}

export type NewMessageActionType =  AddNewMessageType
type AddNewMessageType = ReturnType<typeof addNewMessageAC>