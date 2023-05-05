import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, Matches } from 'class-validator';
import ValidationRules from 'src/types/ValidationRules';

// password requirements
const pw: ValidationRules = {
  minLength: {
    regex: /^.{8,}$/g,
    message: "The password can't be shorter than 8 characters.",
  },
  noWhitespace: {
    regex: /^(?!.*\s).*$/g,
    message: "The password mustn't contain any whitespace characters.",
  },
  minUppercase: {
    regex: /^(?=.*[A-Z]).*$/g,
    message: 'The password must contain at least 1 uppercase letter.',
  },
  minLowercase: {
    regex: /^(?=.*[a-z]).*$/g,
    message: 'The password must contain at least 1 lowercase letter.',
  },
  minDigits: {
    regex: /^(?=.*\d).*$/g,
    message: 'The password must contain at least 1 digit',
  },
  minSpecialChars: {
    regex: /^(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/g,
    message:
      'The password must contain at least 1 special character. (!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~)',
  },
} as const;

export default class CreateUserDto {
  @IsEmail()
  @IsDefined()
  @ApiProperty({
    description: "The user's email address",
    example: 'example@gmail.com',
  })
  email!: string;

  @Matches(pw.minSpecialChars.regex, {
    message: pw.minSpecialChars.message,
  })
  @Matches(pw.minDigits.regex, {
    message: pw.minDigits.message,
  })
  @Matches(pw.minUppercase.regex, {
    message: pw.minUppercase.message,
  })
  @Matches(pw.minLowercase.regex, {
    message: pw.minLowercase.message,
  })
  @Matches(pw.noWhitespace.regex, {
    message: pw.noWhitespace.message,
  })
  @Matches(pw.minLength.regex, {
    message: pw.minLength.message,
  })
  @IsDefined()
  @ApiProperty({
    description: "The user's email password",
    example: 'my_strong_and_secure_password',
  })
  password!: string;
}
