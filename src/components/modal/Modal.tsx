import styled from "@emotion/styled";

export const Modal: any = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.45); /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
`;

const ModalExit = styled.div`
  position: relative;
  bottom: 1rem;
  align-self: flex-start;
  cursor: pointer;
  color: white;
`;
Modal.Exit = ModalExit;
Modal.Wrapper = ModalWrapper;
