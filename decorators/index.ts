import { registerDecorator, ValidationOptions } from 'class-validator';

export function OneOf(options: Array<string | number>) {
  const validationOptions: ValidationOptions = {
    message: 'custom error',
  };
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'oneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: options,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return options.includes(value);
        },
      },
    });
  };
}
