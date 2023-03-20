export async function tryCatch(isLoading, error, func) {
  isLoading.value = true;
  error.value = null;
  try {
    return await func();
  } catch (err) {
    console.log(err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
