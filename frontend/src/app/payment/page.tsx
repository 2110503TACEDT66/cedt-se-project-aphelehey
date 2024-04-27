import PaymentForm from "@/components/PaymentForm";
import updatePaymentStatus from "@/libs/updatePaymentStatus";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
export default function page() {
  const urlParams = useSearchParams();
  const orderID = urlParams.get("orderID");
  console.log(orderID)
  const { data: session } = useSession();
  const token = session?.user.token;

  if(token && orderID){
    console.log(orderID)
    updatePaymentStatus(orderID,token)
  }

  return (
    <PaymentForm/>
  );
}
