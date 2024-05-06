export enum LogTypes {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}

export enum Colors {
    GRAY = "gray",
    BLUE = "blue",
    YELLOW = "yellow",
    RED = "red",
    CLEAR = "clear"
}

const colorMap = {
    [Colors.GRAY]: "\x1b[1;30;47m",
    [Colors.BLUE]: "\x1b[1;34;47m",
    [Colors.YELLOW]: "\x1b[1;33;47m",
    [Colors.CLEAR]: "\x1b[0m",
}

const colorByType = {
    [LogTypes.DEBUG]: Colors.GRAY,
    [LogTypes.INFO]: Colors.BLUE,
    [LogTypes.WARN]: Colors.YELLOW,
    [LogTypes.ERROR]: Colors.RED,
}

export const colorize = (message: string | number, color: Colors) => {
    return `${colorMap[color]}${message}${colorMap[Colors.CLEAR]}`;
}

export const log = (message: string, type = LogTypes.DEBUG) => {
    console.log(colorize(`[${type}] ${message}`, colorByType[type]));
}