import React, { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const InputButton = styled.button`
  background: #859aaf;
  border-radius: 5px;
  border: none;
  padding: 8px 17px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #7f8fa6;
  }
`;

const FieldLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const InputError = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ef6355;
  padding-top: 5px;
`;

function FileUploadComponent(props: any): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
    props.setErrors('');
  };

  const removeFile = () => {
    if (file) {
      setFile(null);
      props.handleFile(null);
    }
    props.setErrors('');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileUploaded = event.target.files[0];
      setFile(fileUploaded);

      props.handleFile(fileUploaded);
      if (props.image) {
        if (
          fileUploaded.type !== 'image/png' &&
          fileUploaded.type !== 'image/gif' &&
          fileUploaded.type !== 'image/jpg' &&
          fileUploaded.type !== 'image/jpeg' &&
          fileUploaded.type !== 'image/svg+xml'
        ) {
          props.setErrors(
            'Only the following formats are accepted: .png, .gif, .jpg, .jpeg, .svg'
          );
        }
      } else if (
        fileUploaded.type !== 'application/pdf' &&
        fileUploaded.type !== 'application/msword' &&
        fileUploaded.type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        fileUploaded.type !== 'application/vnd.ms-excel' &&
        fileUploaded.type !==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        fileUploaded.type !== 'application/rtf' &&
        fileUploaded.type !== 'text/csv' &&
        fileUploaded.type !== 'text/plain' &&
        fileUploaded.type !== 'image/png' &&
        fileUploaded.type !== 'image/gif' &&
        fileUploaded.type !== 'image/jpg' &&
        fileUploaded.type !== 'image/jpeg'
      ) {
        props.setErrors(
          'Only the following formats are accepted: .pdf, .png, .gif, .jpg, .doc/docx, .xls/xlsx, .csv, .rtf, .txt'
        );
      }
    }
  };

  return (
    <Container>
      {props.label && (
        <FieldLabel>
          {props.label}{' '}
          {props.inputProps?.required && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </FieldLabel>
      )}
      <InputWrapper>
        <InputButton onClick={handleClick}>
          <Typography variant="body3" color="#fff">
            Choose File
          </Typography>
        </InputButton>
        {!file ? (
          <Typography variant="body3">No file chosen</Typography>
        ) : (
          <>
            <Typography variant="body3">
              {file.name.length > 20 // fixing bug when pdf file name goes over modal boundaries
                ? `${file.name.slice(0, 20)}...`
                : file.name}
            </Typography>
            <Typography
              clickable
              variant="body4"
              color="#EF6355"
              onClick={removeFile}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </Typography>
          </>
        )}

        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </InputWrapper>
      {props.errors && <InputError>{props.errors}</InputError>}
    </Container>
  );
}

export default FileUploadComponent;
