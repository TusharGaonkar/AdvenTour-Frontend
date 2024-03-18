import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

export default function MobileViewModal({
  title,
  children,
  disclosureProps,
}: {
  title: string;
  children: React.ReactNode;
  disclosureProps: { isOpen: boolean; onOpenChange: () => void };
}) {
  const { isOpen, onOpenChange } = disclosureProps;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      className="w-full overflow-scroll"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
