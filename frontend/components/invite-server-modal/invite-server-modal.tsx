import Button from "../shared/button";
import Modal from "../shared/modal";

interface InviteServerModalProps {
  isOpen: boolean;
  closeInviteModal: () => void;
}

export default function InviteServerModal({
  isOpen,
  closeInviteModal,
}: InviteServerModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <Button onClick={closeInviteModal}>Invite</Button>
    </Modal>
  );
}
