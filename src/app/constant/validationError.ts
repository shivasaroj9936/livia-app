export const loginValidation = {
    'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 3 characters long' },
    ],
}
export const signUpValidation = {
    'firstName': [
        { type: 'required', message: 'First Name is required' },
        { type: 'minlength', message: '*Minimum 3 character is required' },
    ],
    'lastName': [
        { type: 'required', message: 'Last Name is required' },
        { type: 'minlength', message: '*Minimum 3 character is required' },
    ],
    'phoneNumber': [
        { type: 'required', message: '*Phone number is required' },
        { type: 'minlength', message: '*Enter 9 digit Number' },
        { type: 'pattern', message: '*Number should start with 79 and 9 digit long.' },
    ],
    'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: '*Enter minimum eight characters, at least one letter, one number and one special character.' },
    ],
}