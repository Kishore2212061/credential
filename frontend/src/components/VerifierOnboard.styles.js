import styled from "styled-components";
import { SemesterContainer, SemesterForm, FormGroup, Label, Input, Select, SubmitButton, Loader, Modal, ModalContent } from "./SemesterForm.styles";

// Reuse existing styles from SemesterForm with modern enhancements
export const VerifierContainer = styled(SemesterContainer)`
  max-width: 700px;
`;

export const VerifierForm = styled(SemesterForm)``;

export { FormGroup, Label, Input, Select, SubmitButton, Loader, Modal, ModalContent };