import { NextPage } from 'next';
import ButtonWithChildren from '../../../components/Button';
import Layout from '../../../components/Layout';
import { HeaderWrapper } from '../../../components/StyledComponents';
import Save from 'image/icon/settings/save.svg';
import styled from 'styled-components';
import SocialMediaForm from '../../../containers/SocialMediaForm';
import { useForm } from 'react-hook-form';
import Typography from '../../../components/Typography';
import FileUploadComponent from '../../../components/FileInput';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import TextFormField from '../../../components/TextFormField';
import TextFormArea from '../../../components/TextFormArea';

const SaveIcon = styled(Save)`
  margin-right: 10px;
`;

const Content = styled.section`
  padding-right: 60%;
`;

const SectionLabel = styled(Typography)`
  &:first-child {
    margin-top: 0;
  }
  margin-top: 25px;
`;

const FileWrapper = styled.div`
  margin: 20px 0;
`;

const FilePreview = styled.div`
  margin-top: 16px;
  border: 1px dashed #c2cedb;
  box-sizing: border-box;
  border-radius: 5px;

  width: 300px;
  height: 80px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PreviewText = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WrapperScetchPicker = styled.div`
  margin: 20px 0;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 50px;
`;

const StyledButtonWithChildren = styled(ButtonWithChildren)`
  margin-right: 15px;
`;

const formDefaultValues = {};

const EmailCustomisation: NextPage = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: formDefaultValues,
    mode: 'onChange',
  });

  const [uploadedHeaderLogo, setUploadedHeaderLogo] = useState<
    File | undefined
  >();

  const [uploadedFooterLogo, setUploadedFooterLogo] = useState<
    File | undefined
  >();
  const [fileErrors, setFileErrors] = useState<any>();
  const [buttonColor, setButtonColor] = useState('#ffffff');
  const [buttonTextColor, setButtonTextColor] = useState('#ffffff');

  const onSubmit = (data: any) => {
    console.log('submitted:', data, uploadedHeaderLogo, uploadedFooterLogo);
  };
  return (
    <Layout menuItems={[]}>
      <HeaderWrapper>
        <Typography variant="subtitle4">Email customisation</Typography>
        <ButtonWithChildren variant="outlined">
          <SaveIcon /> Save
        </ButtonWithChildren>
      </HeaderWrapper>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionLabel variant="subtitle5">Header Logo</SectionLabel>
          <FileWrapper>
            <FileUploadComponent
              image
              setErrors={(err: string) => setFileErrors(err)}
              errors={fileErrors}
              handleFile={(file: File) => {
                setUploadedHeaderLogo(file);
              }}
            />

            <FilePreview>
              {uploadedHeaderLogo ? (
                <img src={URL.createObjectURL(uploadedHeaderLogo)} alt="" />
              ) : (
                <PreviewText>
                  <Typography variant="grayBody">300x80px</Typography>
                  <Typography variant="grayBody">PNG, JPG</Typography>
                </PreviewText>
              )}
            </FilePreview>
          </FileWrapper>

          <SectionLabel variant="subtitle5">Social Media</SectionLabel>

          <SocialMediaForm control={control} />

          <SectionLabel variant="subtitle5">Button Settings</SectionLabel>
          <TextFormField
            name="emailButtonColor"
            defaultValue={buttonColor}
            control={control}
            label="Button color"
          />
          <WrapperScetchPicker>
            <SketchPicker
              color={buttonColor}
              onChange={(color) => {
                setButtonColor(color.hex);
                reset({ emailButtonColor: buttonColor });
              }}
            />
          </WrapperScetchPicker>

          <TextFormField
            name="emailBtnTextColor"
            defaultValue={buttonTextColor}
            control={control}
            label="Button text color"
          />
          <WrapperScetchPicker>
            <SketchPicker
              color={buttonTextColor}
              onChange={(color) => {
                setButtonTextColor(color.hex);
                reset({ emailBtnTextColor: buttonTextColor });
              }}
            />
          </WrapperScetchPicker>
          <SectionLabel variant="subtitle5">Upload footer logo</SectionLabel>
          <FileWrapper>
            <FileUploadComponent
              image
              setErrors={(err: string) => setFileErrors(err)}
              errors={fileErrors}
              handleFile={(file: File) => {
                setUploadedFooterLogo(file);
              }}
            />

            <FilePreview>
              {uploadedFooterLogo ? (
                <img src={URL.createObjectURL(uploadedFooterLogo)} alt="" />
              ) : (
                <PreviewText>
                  <Typography variant="grayBody">300x80px</Typography>
                  <Typography variant="grayBody">PNG, JPG</Typography>
                </PreviewText>
              )}
            </FilePreview>
          </FileWrapper>
          <SectionLabel variant="subtitle5">Footer text</SectionLabel>
          <TextFormArea
            inputProps={{
              rows: '5',
            }}
            name="emailFooterText"
            control={control}
            label="Footer text"
          />
          <TextFormField
            name="emailTo"
            control={control}
            placeholder="example@gmail.com"
            label="Send email test to:"
          />

          <Buttons>
            <StyledButtonWithChildren type="submit" variant="outlined">
              Save
            </StyledButtonWithChildren>
            <ButtonWithChildren variant="contained">
              Send email test
            </ButtonWithChildren>
          </Buttons>
        </form>
      </Content>
    </Layout>
  );
};

export default EmailCustomisation;
