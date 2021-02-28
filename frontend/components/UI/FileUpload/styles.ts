import styled from 'styled-components';

export const Wrapper = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    height: 100% !important;
  }
  .avatar-uploader {
    height: 100% !important;
    flex: 0;
    @media (max-width: 900.98px) {
      width: 100% !important;
    }
    > .ant-upload {
      height: 100% !important;
      border-radius: 20px;
      @media (max-width: 900.98px) {
      width: 100% !important;
    }
    }
  }
`;