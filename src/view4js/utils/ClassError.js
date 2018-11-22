class ClassError extends Error {
    constructor(_type = 'Class', ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ClassError);
        }

        // Custom debugging information
        this.type = _type;
        this.date = new Date();
    }
}

export default ClassError;