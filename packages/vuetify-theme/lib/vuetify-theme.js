import tokens from '@deltares/design-tokens';

const { light, dark } = tokens

export default {
  light: {
    primary: light.blue100,
    secondary: light.orange,
    accent: dark.blue60,
    error: light.error,
    info: light.informative,
    success: light.success,
    warning: light.warning,
  },
  dark: {
    primary: dark.blue100,
    secondary: dark.orange,
    accent: dark.blue60,
    error: dark.error,
    info: dark.informative,
    success: dark.success,
    warning: dark.warning,
  }
};
