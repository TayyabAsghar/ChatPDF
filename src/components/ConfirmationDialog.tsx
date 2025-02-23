import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type BaseProps = {
  title: string;
  trigger: ReactNode;
  description: string;
  cancelText?: string;
  onCancel?: () => void;
};

type ConfirmationDialogProps = BaseProps &
  (
    | { confirmationActionType: "confirm"; onConfirm?: () => void }
    | { confirmationActionType: "custom"; confirmationAction: ReactNode }
  );

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (props.confirmationActionType === "confirm" && props.onConfirm)
      props.onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    if (props.onCancel) props.onCancel();
    setOpen(false);
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <div onClick={() => setOpen(true)}>{props.trigger}</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{props.title}</AlertDialogTitle>

            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {props.cancelText ?? "Cancel"}
            </AlertDialogCancel>

            <>
              {props.confirmationActionType === "confirm" &&
                props.onConfirm && (
                  <AlertDialogAction onClick={handleConfirm}>
                    OK
                  </AlertDialogAction>
                )}

              {props.confirmationActionType === "custom" && (
                <div onClick={() => setOpen(false)}>
                  {props.confirmationAction}
                </div>
              )}
            </>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmationDialog;
