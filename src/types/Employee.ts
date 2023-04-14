export default interface IEmployeeData {
  id?: any | null,
  name: string,
  email: string,
  phoneNumber: string,
  homeAddress: IHomeAddress,
  dateOfEmployment: string,
  dateOfBirth: string,
}

interface IHomeAddress{
  city: string,
  ZIPCode: string,
  addressLine1: string,
  addressLine2: string,
}