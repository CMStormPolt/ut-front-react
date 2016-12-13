export const defaultErrorMessage = 'Invalid';

export const validationTypes = {
    text: 'text',
    array: 'array',
    arrayWithTextElements: 'arrayWithTextElements', // keyArray, keyText
    arrayWithTextElementsOptional: 'arrayWithTextElementsOptional', // keyArray, keyText, shouldValidateProp
    arrayWithDropdownElements: 'arrayWithDropdownElements', // keyArray, keyText
    arrayWithArrayElements: 'arrayWithArrayElements', // keyArray, keyText
    dropdown: 'dropdown',
    defaultRole: 'defaultRole', // ?? this should not be here, ut-front-react should not know about specific details in ut-user
    custom: 'custom'
};

export const textValidations = {
    isRequired: 'isRequired',
    email: 'email',
    numberOnly: 'numberOnly',
    uniqueValue: 'uniqueValue',
    length: 'length', // minVal, maxVal
    regex: 'regex'  // value
};

export const arrayValidations = {
    isRequired: 'isRequired',
    uniqueValue: 'uniqueValue',
    email: 'email',
    numberOnly: 'numberOnly'
};

export const dropdownValidations = {
    isRequired: 'isRequired',
    isRequiredOnCondition: 'isRequiredOnCondition'
};

export const defaultRoleValidations = {
    isRequired: 'isRequired'
};
