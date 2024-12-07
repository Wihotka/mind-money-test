'use client'

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  IconButton,
  SvgIcon
} from '@mui/material';
import { z, ZodIssue } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import FormInput from '../formInput/FormInput';
import codes from '@/referralCodes/codes.json';

const formSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Wrong type of e-mail' }),
    password: z
      .string({ required_error: 'Enter password' })
      .min(8, { message: 'too_small' })
      .regex(/^(?=.*[\d\W]).+$/, { message: 'no_number' })
      .regex(/^(?=.*[A-Z]).+$/, { message: 'no_uppercase' }),
    phone: z
      .string({ required_error: 'Enter phone number' })
      .min(6, 'The phone number is too short'),
    referral: z
      .string({ required_error: 'Enter phone number' })
      .optional(),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'Accept the terms of use' }),
    }),
  })
  .refine((data) => !data.referral?.length || (data.referral?.length && codes.data.includes(data.referral)), {
    path: ['referral'],
    message: 'There is no such promo code',
  });

type FormSchema = z.infer<typeof formSchema>

const Form = () => {
  const [formType, setFormType] = useState<'login'|'signIn'>('signIn');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [issues, setIssues] = useState<ZodIssue[]>([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    reset({
      email: '',
      password: '',
      phone: '',
      referral: '',
    });
  }

  useEffect(() => {
    try {
      formSchema.parse({
        email: getValues('email'),
        password: getValues('password'),
        phone: getValues('phone'),
        referral: getValues('referral'),
        terms: getValues('terms'),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setIssues(err.issues.filter(err => err.path.includes('password')));
      }
    }
  }, [password]);

  useEffect(() => {
    console.log(issues);
  }, [issues]);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '48px',
        width: '516px',
        py: '48px',
        px: '40px',
        border: '1px solid #DCDEE0',
        borderRadius: '16px',
      }}
    >
      <ButtonGroup
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          width: '100%',
          padding: '4px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#F4F4F4',
        }}
      >
        <Button
          onClick={() => setFormType('signIn')}
          disabled={formType === 'signIn'}
          sx={{
            border: 'none',
            borderRadius: '8px',
            color: '#A6ABB0',
            backgroundColor: 'transparent',
            '&.Mui-disabled': {
              border: 'none',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#101112'
            }
          }}
        >
          Sign in
        </Button>
        <Button
          onClick={() => setFormType('login')}
          disabled={formType === 'login'}
          sx={{
            border: 'none',
            borderRadius: '8px',
            color: '#A6ABB0',
            backgroundColor: 'transparent',
            '&.Mui-disabled': {
              border: 'none',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#101112'
            }
          }}
        >
          Login
        </Button>
      </ButtonGroup>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
        }}
      >
        <Box
          width='100%'
        >
          <Controller
            name='email'
            key='email'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormInput
                type='email'
                id='email'
                label='E-mail'
                variant='outlined'
                error={Boolean(errors.email)}
                inputRef={ref}
                {...field}
              />
            )}
          />
          {errors.email && (
            <Typography
              color='#EF4E57'
              fontWeight={400}
              fontSize='12px'
              lineHeight='16px'
            >
              {errors.email?.message}
            </Typography>
          )}
        </Box>
        {formType === 'signIn' && <Box
          width='100%'
        >
          <Controller
            name='phone'
            key='phone'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormInput
                type='phone'
                id='phone'
                label='Phone number'
                variant='outlined'
                error={Boolean(errors.phone)}
                inputRef={ref}
                {...field}
              />
            )}
          />
          {errors.phone && (
            <Typography
              color='#EF4E57'
              fontWeight={400}
              fontSize='12px'
              lineHeight='16px'
            >
              {errors.phone?.message}
            </Typography>
          )}
        </Box>}
        <Box
          width='100%'
        >
          <Controller
            name='password'
            key='password'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <FormInput
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  label='Password'
                  variant='outlined'
                  error={Boolean(errors.password)}
                  inputRef={ref}
                  {...register('password', {
                    onChange: (e) => setPassword(e.target.value)
                  })}
                  {...field}
                />
                {field.value && <IconButton onClick={() => { setShowPassword(!showPassword) }} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
                  {<SvgIcon viewBox='0 0 24 24' sx={{ width: '24px', fill: 'none' }}>
                    <path d='M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113' stroke='#A6ABB0' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>}
                </IconButton>}
              </Box>
            )}
          />
          {formType === 'signIn' && <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              color: '#A6ABB0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '4px',
              }}
            >
              <Typography fontSize='12px'>Password strenght:</Typography>
              {!!password.length && <Typography
                color={errors.password ? '#EF4E57' : '#51D85E'}
                fontSize='12px'
              >
                {errors.password ? 'Weak :(' : 'Strong'}
              </Typography>}
            </Box>
            <Typography
              fontSize='12px'
              color={issues.find(err => err.message === 'too_small') ? '#EF4E57' : !!password.length ? '#51D85E' : '#A6ABB0'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {issues.find(err => err.message === 'too_small')
                ? <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                  <path d='M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12' stroke='#EF4E57' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                </SvgIcon>
                : !!password.length
                  ? <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                    <path d='M4 8.00008L6.82843 10.8285L12.4847 5.17163' stroke='#51D85E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>
                  : <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                    <path d='M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12' stroke='#A6ABB0' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>
              }
              <span>At least 8 characters</span>
            </Typography>
            <Typography
              fontSize='12px'
              color={issues.find(err => err.message === 'no_number') ? '#EF4E57' : !!password.length ? '#51D85E' : '#A6ABB0'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {issues.find(err => err.message === 'too_small')
                ? <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                  <path d='M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12' stroke='#EF4E57' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                </SvgIcon>
                : !!password.length
                  ? <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                    <path d='M4 8.00008L6.82843 10.8285L12.4847 5.17163' stroke='#51D85E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>
                  : <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                    <path d='M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12' stroke='#A6ABB0' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>
              }
              <span>Contains a number or (and) symbol</span>
            </Typography>
            <Typography
              fontSize='12px'
              color={issues.find(err => err.message === 'no_uppercase') ? '#EF4E57' : !!password.length ? '#51D85E' : '#A6ABB0'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {issues.find(err => err.message === 'too_small')
                ? <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                  <path d='M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12' stroke='#EF4E57' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                </SvgIcon>
                : !!password.length
                  ? <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                    <path d='M4 8.00008L6.82843 10.8285L12.4847 5.17163' stroke='#51D85E' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>
                  : <SvgIcon viewBox='0 0 16 16' sx={{ width: '16px', fill: 'none' }}>
                    <path d='M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12' stroke='#A6ABB0' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                  </SvgIcon>
              }
              <span>One or more capitalized letter</span>
            </Typography>
          </Box>}
        </Box>
        {formType === 'signIn' && <Box
          width='100%'
        >
          <Controller
            name='referral'
            key='referral'
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormInput
                type='referral'
                id='referral'
                label='Referral code'
                variant='outlined'
                error={Boolean(errors.referral)}
                inputRef={ref}
                {...field}
              />
            )}
          />
          {errors.referral && (
            <Typography
              color='#EF4E57'
              fontWeight={400}
              fontSize='12px'
              lineHeight='16px'
            >
              {errors.referral?.message}
            </Typography>
          )}
        </Box>}
        {formType === 'signIn' && <Box
          width='100%'
        >
          <FormControlLabel
            control={
              <Checkbox
                {...register('terms')}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fill: '#DCDEE0',
                    fontSize: 24,
                  },
                  '&.Mui-checked .MuiSvgIcon-root': {
                    fill: '#526ED3',
                  },
                }}
              />
            }
            label={
              <Typography color='#A6ABB0' fontSize='14px'>
                <span>I accept the </span>
                <Link href='/therms' color='secondary' component={NextLink}>
                  Therms of Use
                </Link>
                <span> and have read </span>
                <Link href='/privacy' color='secondary' component={NextLink}>
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
          {errors.terms && (
            <Typography
              color='#EF4E57'
              fontWeight={400}
              fontSize='12px'
              lineHeight='16px'
            >
              {errors.terms?.message}
            </Typography>
          )}
        </Box>}
      </Box>
      <Button
        variant='contained'
        color='secondary'
        type='submit'
        disabled={!isDirty || isSubmitting}
        sx={{
          width: '100%',
          height: '48px',
          fontWeight: 600,
          textTransform: 'none'
        }}
      >
        {formType === 'signIn' ? 'Sign up' : 'Login'}
      </Button>
    </Box>
  );
}

export default Form;
