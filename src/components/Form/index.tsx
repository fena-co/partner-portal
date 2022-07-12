import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';

interface FormProps {
  validationSchema: AnyObjectSchema;
  defaultValues: any;
  onSubmit: (values: any) => void;
}

const Form: React.FunctionComponent<FormProps> = ({
  validationSchema,
  defaultValues,
  children,
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child: any) =>
        child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register,
                control: control,
                key: child.props.name,
                error: errors[child.props.name],
              },
            })
          : child
      )}
    </form>
  );
};

export default Form;
