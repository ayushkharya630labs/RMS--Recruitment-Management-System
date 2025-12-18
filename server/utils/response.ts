export const success = (message: string, data?: any) => ({
  success: true,
  message,
  data,
});

export const failure = (message: string) => ({
  success: false,
  message,
});
