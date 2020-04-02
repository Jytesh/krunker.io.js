const Messages = {
    '404_NOT_FOUND': struct => struct + ' not found.',
    'NO_ARGUMENT': arg => 'No ' + arg + ' given.',
    'INVALID_ARGUMENT': arg => 'Invalid ' + arg + ' given.',
    'SOMETHING_WENT_WRONG': () => 'Something went wrong.',
    'CANNOT_RESOLVE': (arg, struct) => 'Cannot resolve ' + arg + ' to a ' + struct + '.',
};

const makeError = BaseError => class KrunkerError extends BaseError {
    constructor(type, ...keys) {
        super(Messages[type](...keys));
    }
};

module.exports = {
    KrunkerAPIError: makeError(Error),
    ArgumentError: makeError(TypeError),
};