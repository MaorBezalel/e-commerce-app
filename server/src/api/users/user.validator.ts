import { Schema } from 'express-validator';
import { Gender } from '@/shared/types/enums/db.types';

export const loginByUsernameSchema: Schema = {
    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username is required!',
        },
        contains: {
            options: /^[a-zA-Z0-9_]*$/,
            negated: true,
            errorMessage: 'Username should only contain letters, numbers and underscores',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
                minLength: 6,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isString: true,
        trim: true,
    },
};

export const loginByEmailSchema: Schema = {
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Invalid email!',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
                minLength: 6,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isString: true,
        trim: true,
    },
};

export const signupSchema: Schema = {
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Invalid email!',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
    },

    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username is required!',
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username should be at least 3 letters',
        },
        isString: true,
        contains: {
            options: /^[a-zA-Z0-9_]*$/,
            negated: true,
            errorMessage: 'Username should only contain letters, numbers and underscores',
        },
        trim: true,
        toLowerCase: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minLength: 6,
                returnScore: false,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isString: true,
        trim: true,
    },

    gender: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Gender is required!',
        },
        toLowerCase: true,
        isIn: {
            options: [Object.values(Gender)],
            errorMessage: 'gender can only be `male`, `female` or `other`',
        },
        customSanitizer: {
            options: (value) => {
                return Gender[(value as string)?.toUpperCase() as keyof typeof Gender];
            },
        },
    },

    name_details: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Name details are required!',
        },
        isObject: {
            errorMessage: 'Name details must be an object!',
        },
    },

    'name_details.first_name': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'First name is required!',
        },
        isString: true,
        trim: true,
    },

    'name_details.middle_name': {
        in: ['body'],
        default: { options: '' },
        isString: true,
        trim: true,
    },

    'name_details.last_name': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Last name is required!',
        },
        isString: true,
        trim: true,
    },

    address: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Address is required!',
        },
        isObject: {
            errorMessage: 'Address must be an object!',
        },
    },

    'address.country': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Country is required!',
        },
        isString: true,
        trim: true,
    },

    'address.city': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'City is required!',
        },
        isString: true,
        trim: true,
    },

    'address.street': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Street is required!',
        },
        isString: true,
        trim: true,
    },
};

export const updateUserSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID',
        },
    },
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Invalid email!',
        },
        isString: true,
        trim: true,
        toLowerCase: true,
        optional: true,
    },

    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username is required!',
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username should be at least 3 letters',
        },
        isString: true,
        contains: {
            options: /^[a-zA-Z0-9_]*$/,
            negated: true,
            errorMessage: 'Username should only contain letters, numbers and underscores',
        },
        trim: true,
        toLowerCase: true,
        optional: true,
    },

    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required!',
        },
        isLength: {
            options: { min: 6, max: 18 },
            errorMessage: 'Password should be between 6 and 18 letters',
        },
        isStrongPassword: {
            options: {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minLength: 6,
                returnScore: false,
            },
            errorMessage:
                'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
        isString: true,
        trim: true,
        optional: true,
    },

    gender: {
        in: ['body'],
        toLowerCase: true,
        isIn: {
            options: [Object.values(Gender)],
            errorMessage: 'gender can only be `male`, `female` or `other`',
        },
        customSanitizer: {
            options: (value) => {
                return Gender[(value as string)?.toUpperCase() as keyof typeof Gender];
            },
        },
        optional: true,
    },

    name_details: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Name details are required!',
        },
        isObject: {
            errorMessage: 'Name details must be an object!',
        },
        optional: true,
    },

    'name_details.first_name': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'First name is required!',
        },
        isString: true,
        trim: true,
        optional: true,
    },

    'name_details.middle_name': {
        in: ['body'],
        default: { options: '' },
        isString: true,
        trim: true,
        optional: true,
    },

    'name_details.last_name': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Last name is required!',
        },
        isString: true,
        trim: true,
        optional: true,
    },

    address: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Address is required!',
        },
        isObject: {
            errorMessage: 'Address must be an object!',
        },
        optional: true,
    },

    'address.country': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Country is required!',
        },
        isString: true,
        trim: true,
        optional: true,
    },

    'address.city': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'City is required!',
        },
        isString: true,
        trim: true,
        optional: true,
    },

    'address.street': {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Street is required!',
        },
        isString: true,
        trim: true,
        optional: true,
    },

    birthday: {
        in: ['body'],
        custom: {
            options: (value) => {
                if (value == null || value === '') return true;
                if (typeof value !== 'string') {
                    throw new Error('Birthday must be a string');
                }
                const date = new Date(value);
                if (isNaN(date.getTime())) {
                    throw new Error('Invalid date');
                }
                return true;
            },
        },
        optional: true,
    },

    avatar: {
        in: ['body'],
        custom: {
            options: (value) => {
                if (value == null || value === '') return true;
                const urlPattern = new RegExp(
                    '^(https?:\\/\\/)?' +
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
                        '((\\d{1,3}\\.){3}\\d{1,3}))' +
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                        '(\\?[;&a-z\\d%_.~+=-]*)?' +
                        '(\\#[-a-z\\d_]*)?$',
                    'i'
                );
                return urlPattern.test(value);
            },
            errorMessage: 'Invalid URL',
        },
        trim: true,
        optional: true,
    },

    phone: {
        in: ['body'],
        custom: {
            options: (value) => value === null || value === '' || value.length === 10,
            errorMessage: 'Phone number should be 10 digits',
        },
        trim: true,
        optional: true,
    },
};

export const deleteUserSchema: Schema = {
    user_id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'User ID is required!',
        },
        custom: {
            options: (value, { req }) => value === req.jwtDecodedPayload?.user_id,
            errorMessage: 'User ID does not match with the logged in user ID',
        },
    },
};
