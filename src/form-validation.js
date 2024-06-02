export default function formValidation () {

  const validator = {
    isNotEmpty(value) {
        return (value.trim('').length !== 0 );
    }
  }

  return validator;

}