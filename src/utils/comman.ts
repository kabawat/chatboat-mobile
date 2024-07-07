const { Dimensions } = require("react-native");

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const textSize = windowWidth < 385 ? 8 : 11