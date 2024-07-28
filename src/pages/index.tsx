import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { topDonors } from "@/constants/donors";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Loading from "@/components/Loading";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Switch from "@/components/switch";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [banks, setbanks] = useState([]);
  const [error, setError] = useState<string | undefined>();
  const [transfers, setTransfers] = useState();
  const [donor, setDonor] = useState();
  const [loading, setLoading] = useState(false);
  const [banktransfer, setBankTransfer] = useState<boolean>(false);

  // to get all the donors data that transfered from chapa
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/transfers");
  //       console.log(response.data.transfers.data);
  //       setTransfers(JSON.parse(response.data.transfers.data));
  //       setDonor(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetch();
  // }, []);

  let raised = 80000;
  let goal = 100000;

  // raised * 100% / goal
  const progressnum = (raised * 100) / goal;

  // fetch banks that chapa partered with
  useEffect(() => {
    const fetchbank = async () => {
      try {
        let response = await axios.post("http://localhost:3000/api/banks");
        console.log(response.data.data);
        setbanks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchbank();
  }, []);

  // schema for the transfer forms
  const TransferFormSchema = z.object({
    banks: z.string(),
    amount: z.string(),
    name: z.string(),
    account: z.string(),
  });
  const transferForm = useForm<z.infer<typeof TransferFormSchema>>({
    resolver: zodResolver(TransferFormSchema),
  });

  // schema for the payment forms
  const PaymentFormSchema = z.object({
    fname: z.string(),
    lname: z.string(),
    email: z.string().email(),
    phone: z.string(),
    amount: z.string(),
  });

  const paymentForm = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
  });

  // for bank transfer
  async function onSubmitTransfer(data: z.infer<typeof TransferFormSchema>) {
    console.log("the data is: " + JSON.stringify(data));
    setLoading(true);
    setError("");
    const referenceNumber = uuidv4();
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      amount: data.amount,
      account_name: data.name,
      account_number: data.account,
      currency: "ETB",
      reference: referenceNumber,
      bank_code: data.banks,
      //Amount should be integer
    };
    try {
      let response = await axios.post(
        `http://localhost:3000/api/bankchapa`,
        body,
        header
      );
      console.log(response.data.data.checkout_url);
      // window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.log("Error:", error?.message);
      setError("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  // for accepting payments
  async function onSubmitPayment(data: z.infer<typeof PaymentFormSchema>) {
    console.log("the data is: " + JSON.stringify(data));
    setLoading(true);
    setError("");
    const referenceNumber = uuidv4();
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      amount: data.amount, //Amount should be integer
      currency: "ETB",
      email: data.email,
      first_name: data.fname,
      last_name: data.lname,
      phone_number: data.phone, //the phone number must not include +251
      tx_ref: referenceNumber,
      callback_url: "http://localhost:3000/success",
      return_url:
        "http://localhost:3000/varifyChapa?tnx_ref=" + referenceNumber,
      customization: {
        title: "Item Payment",
        description: "Paying for item in the cart",
      },
    };
    try {
      let response = await axios.post(
        `http://localhost:3000/api/chapa`,
        body,
        header
      );
      console.log(response.data.data.checkout_url);
      window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.log("Error:", error?.message);
      setError("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" flex-1 ">
      {loading && (
        <div className="w-screen h-screen absolute z-20 backdrop-blur-sm">
          <Loading />
        </div>
      )}
      <NavBar />
      <main className="flex-1 flex  lg:items-center lg:justify-center py-12 md:py-24 lg:py-32">
        <div className="container  px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div>
                <img
                  className="w-full object-cover mb-6 rounded h-52"
                  src="/image.jpg"
                />

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Help Us Reach Our Fundraising Goal
                </h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  We're raising $100,000 to support our community programs. Your
                  donation can make a big difference.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Raised
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    ${raised}
                  </span>
                </div>
                <Progress
                  value={progressnum}
                  className="h-3 border border-slate-200 z-0  rounded-full bg-muted"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Goal
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    $100,000
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Top Donors</h2>
                <div className="grid gap-4">
                  <p>{JSON.stringify(transfers)}</p>
                  {topDonors.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src="/avataaars.png"
                            width="32"
                            height="32"
                            alt="Donor 1"
                            className="rounded-full"
                          />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          ${item.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Donate Now</h2>
              <p className="text-muted-foreground">
                Your donation can make a big difference in our community.
              </p>
              <div className="flex w-full ">
                <div className="grid grid-cols-3 gap-2 w-full  ">
                  {[50, 100, 1000, 2000, 5000, 10000].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => {
                        if (banktransfer) {
                          transferForm.setValue("amount", amount.toString());
                        } else {
                          paymentForm.setValue("amount", amount.toString());
                        }
                      }}
                      variant="outline"
                      className="px-4 py-2"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />
              <div className="flex gap-4 items-center">
                <p>if you want, you can do </p>
                <Toggle
                  className="bg-accent text-white"
                  value={banktransfer.toString()}
                  onClick={() => setBankTransfer(!banktransfer)}
                  variant={"outline"}
                >
                  Bank Transfer
                </Toggle>
              </div>

              <Separator className="my-4" />
              {/* <Switch /> */}

              {/* the form */}
              {banktransfer ? (
                <Form {...transferForm}>
                  <form
                    onSubmit={transferForm.handleSubmit(onSubmitTransfer)}
                    className="w-full space-y-6"
                  >
                    <FormField
                      control={transferForm.control}
                      name="banks"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {banks.map((bank, index) => {
                                return (
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={bank.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {bank.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={transferForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter custom amount"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2 w-full">
                      <FormField
                        control={transferForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Account Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your account name"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={transferForm.control}
                        name="account"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Acccount Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your account number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-accent">
                      Donate Now
                    </Button>
                    {/* <Button type="submit">Submit</Button> */}
                  </form>
                </Form>
              ) : (
                <Form {...paymentForm}>
                  <form
                    onSubmit={paymentForm.handleSubmit(onSubmitPayment)}
                    className="w-full space-y-6"
                  >
                    <div className="flex w-full gap-2">
                      <FormField
                        control={paymentForm.control}
                        name="fname"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="first name " {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentForm.control}
                        name="lname"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={paymentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your account number"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your account number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter custom amount"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-accent">
                      Donate Now
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
