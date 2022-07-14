import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { Fragment } from 'react';

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

  console.log(errors);

  // @ts-ignore
  const arr = children?.type === Fragment ? children.props.children : children;
  console.log(children?.props?.children?.type);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(arr, (child: any) => {
        console.log(child);
        return child?.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register,
                control: control,
                key: child.props.name,
                error: errors[child.props.name],
              },
            })
          : child;
      })}
    </form>
  );
};

export default Form;
