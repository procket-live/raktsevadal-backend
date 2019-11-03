module.exports = {
    'O+': {
        donate: ['O+', 'A+', 'B+', 'AB+'],
        receive: ['O+', 'O-']
    },
    'A+': {
        donate: ['A+', 'AB+'],
        receive: ['A+', 'A-', 'O+', 'O-']
    },
    'B+': {
        donate: ['B+', 'AB+'],
        receive: ['B+', 'B-', 'O+', 'O-']
    },
    'AB+': {
        donate: ['AB+'],
        receive: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    'O-': {
        donate: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        receive: ['O-']
    },
    'A-': {
        donate: ['A-', 'A+', 'AB-', 'AB+'],
        receive: ['A-', 'O-']
    },
    'B-': {
        donate: ['B-', 'B+', 'AB-', 'AB+'],
        receive: ['B-', 'O-']
    },
    'AB-': {
        donate: ['AB-', 'AB+'],
        receive: ['AB-', 'A-', 'B-', 'O-']
    }
} 