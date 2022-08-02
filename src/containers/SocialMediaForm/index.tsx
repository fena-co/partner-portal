import { Control } from 'react-hook-form';
import TextFormField from '../../components/TextFormField';

interface SocialMediaFormProps {
  control: Control;
}

const SocialMediaForm: React.FunctionComponent<SocialMediaFormProps> = ({
  control,
}) => {
  return (
    <>
      <TextFormField name="facebook" control={control} label="Facebook URL" />
      <TextFormField name="instagram" control={control} label="Instagram URL" />
      <TextFormField name="linkedin" control={control} label="Linked URL" />
      <TextFormField name="twitter" control={control} label="Twitter URL" />
    </>
  );
};

export default SocialMediaForm;
