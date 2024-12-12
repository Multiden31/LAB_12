import { useForm } from 'react-hook-form';
import {
    FormControl,
    Input,
    Button,
    Text,
    Box,
    Flex,
    Heading,
    Stack,
    FormErrorMessage
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../util.js';
import { useUser } from '../../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const { updateUser } = useUser();

    const navigate = useNavigate();

    const doSubmit = async values => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success('Регистрация прошла успешно. Вы вошли в систему');
                updateUser(data);
                navigate('/profile');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Что-то пошло не так');
        }
    };


    return (
        <Box p='3' maxW='lg' mx='auto'>
            <Heading
                as='h1'
                textAlign='center'
                fontSize='3xl'
                fontWeight='semibold'
                my='7'
            >
                Создайте аккаунт
            </Heading>
            <form onSubmit={handleSubmit(doSubmit)}>
                <Stack gap='4'>
                    <FormControl isInvalid={errors.username}>
                        <Input
                            id='username'
                            type='text'
                            placeholder='имя пользователя'
                            {...register('username', { required: 'Имя пользователя обязательно, ВВЁЛ БЫСТРО!' })}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email}>
                        <Input
                            id='email'
                            type='email'
                            placeholder='email'
                            {...register('email', { required: 'Email обязателен, ВВЁЛ БЫСТРО!' })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <Input
                            id='password'
                            type='password'
                            placeholder='password'
                            {...register('password', { required: 'Пароль обязателен, ВВЁЛ БЫСТРО!' })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        type='submit'
                        isLoading={isSubmitting}
                        colorScheme='teal'
                        textTransform='uppercase'
                    >
                        Зарегистрироваться
                    </Button>

                </Stack>
            </form>
            <Flex gap='2' mt='5'>
                <Text>Уже бывал у нас?</Text>
                <Link to={'/signin'}>
                    <Text as='span' color='blue.400'>
                        Войти
                    </Text>
                </Link>
            </Flex>
        </Box>
    );
}
