import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export const ValidationErrors = {
  IsEmail: 'Некорректный email',
  IsNotEmpty: 'Поле не должно быть пустым',
  MinLength: 'Минимальная длина поля',
  IsString: 'Должно быть строкой',
} as const;

export const IsEmailRu = () => IsEmail({}, { message: ValidationErrors.IsEmail });

export const IsNotEmptyRu = () => IsNotEmpty({ message: ValidationErrors.IsNotEmpty });

export const MinLengthRu = (num: number) => MinLength(num, { message: `${ValidationErrors.MinLength} ${num} символа` });

export const IsStringRu = () => IsString({ message: ValidationErrors.IsString });

export const IsInRu = (array: readonly string[]) =>
  IsIn(array, {
    message: `Допустимые значения: ${array.join(', ')}`,
  });
