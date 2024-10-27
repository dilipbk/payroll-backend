export const generateResponse = (format = "basic", data) => {
  return {
    success() {
      switch (format) {
        case "basic":
          return { success: true, data };
        default:
          return { data };
      }
    },
    create() {
      switch (format) {
        case "basic":
          return { success: true, ...data };
        default:
          return { ...data };
      }
    },
    serverError() {
      switch (format) {
        case "basic":
          return { success: false, message: data };
        default:
          return { message: data };
      }
    },
  };
};
