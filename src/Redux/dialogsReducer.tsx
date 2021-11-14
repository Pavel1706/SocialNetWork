import React from 'react';



export type ConversationType = {
    id: number
    name: string
    foto: string
}

let initialState= {
    dialogs: [
        {id: 1, name: 'Pavel', foto: 'https://bipbap.ru/wp-content/uploads/2016/03/1529534028_ekau52fsukj.jpg'},
        {id: 2, name: 'Alex', foto: 'https://cdn1.flamp.ru/4f8b0149fac1b70943a874c608108a12.jpeg'},
        {id: 3, name: 'Dasha', foto: 'https://avatarko.ru/img/kartinka/10/zhivotnye_enot_yazyk_9275.jpg'},
        {id: 4, name: 'Yulia', foto: 'https://kot-pes.com/wp-content/uploads/2019/10/post_5da84ea695ff8.jpeg'},
        {id: 5, name: 'Roman', foto: 'https://avatars.mds.yandex.net/get-zen_doc/1925930/pub_5cee22a63f1e7700b0ea7316_5cee24751cd66200af7a3252/scale_1200'
        },
        {id: 6, name: 'Irina', foto: 'https://funik.ru/wp-content/uploads/2018/11/f3965b72a5e12aa933a0.jpg'}
    ]
}
type InitialStateType = {
    dialogs: ConversationType[]
}


export const dialogsReducer = (state:InitialStateType=initialState,action:DialogType)=> {
    switch (action.type){

    }
    return state
}
export const newDialogAC= ()=> {
    return {
        type: 'DIALOG-MESSAGE'
    } as const
}
export type DialogType = ReturnType<typeof newDialogAC >