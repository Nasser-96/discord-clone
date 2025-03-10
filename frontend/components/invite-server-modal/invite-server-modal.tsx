import { ServerByIdRequestType } from "@/core/types&enums/types";
import Button from "../shared/button";
import Modal from "../shared/modal";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useTranslation } from "react-i18next";
import InputField from "../shared/InputField";
import { FiCopy } from "@react-icons/all-files/fi/FiCopy";
import { FiRefreshCw } from "@react-icons/all-files/fi/FiRefreshCw";
import { FaCheck } from "@react-icons/all-files/fa6/FaCheck";
import { ButtonSizeEnum, ButtonVariantsEnum } from "@/core/types&enums/enums";
import { useOrigin } from "@/core/hooks/use-origin";
import { appRoutesObj } from "@/app-paths";
import { useState } from "react";
import { getTransitionClass } from "@/core/helpers/helpers";

interface InviteServerModalProps {
  server: ServerByIdRequestType;
  closeInviteModal: () => void;
}

export default function InviteServerModal({
  server,
  closeInviteModal,
}: InviteServerModalProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const origin = useOrigin();

  const inviteUrl = `${
    origin + appRoutesObj.shared.getInviteByIdPath(server?.invite_code)
  }`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewInviteLink = async () => {
    try {
      setIsLoading(true);
      // await generateNewInviteLinkService(server.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Modal>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <h1 className="font-bold w-full text-2xl text-center">
            {t("components.InviteServerModal.title")}
          </h1>
          <Button onClick={closeInviteModal} className="border-none">
            <IoClose size={25} />
          </Button>
        </div>
        <div className="p-6">
          <label className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-200">
            {t("components.InviteServerModal.inviteLabel")}
          </label>
          <div className="flex items-center mt-2 gap-x-2">
            <InputField
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              readOnly
              value={inviteUrl}
            />
            <Button onClick={onCopy}>
              <FaCheck
                className={`absolute text-green-600 ${
                  copied ? "opacity-100" : "opacity-0"
                } ${getTransitionClass}`}
                size={16}
              />
              <FiCopy
                className={`absolute ${
                  copied ? "opacity-0" : "opacity-100"
                } ${getTransitionClass}`}
                size={16}
              />
            </Button>
          </div>
          <Button
            className="text-xs mt-4"
            size={ButtonSizeEnum.SM}
            variant={ButtonVariantsEnum.LINK}
            onClick={generateNewInviteLink}
            isLoading={isLoading}
          >
            <div className="flex items-center">
              {t("components.InviteServerModal.generate")}
              <FiRefreshCw size={16} className="ms-2" />
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
