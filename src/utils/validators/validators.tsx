import React from 'react';

export type  FieldValidatorType = (value: number) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'Field is required'
}


export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined
}