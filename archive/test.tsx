const [input, setInput] = useState<number | undefined>();
const [firstName, setfirstName] = useState<number | undefined>();
const [lastName, setlastName] = useState<number | undefined>();
const [phoneNumber, setphoneNumber] = useState<number | undefined>();

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // });


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

export function RadioGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}



{
  /* <RadioGroup
                defaultValue="option1"
                aria-labelledby="options"
                className="flex-col items-center gap-4"
              >
                <h3
                  id="options"
                  className="text-lg font-semibold leading-none mb-2"
                >
                  Methods
                </h3>
                <div className="grid grid-cols-4  items-center gap-5">
                  <RadioGroupItem
                    onSelect={(e) => console.log(e.target.value)}
                    value="bank"
                    id="option1"
                    className="peer sr-only"
                  />
                  {banks.map((bank, index) => {
                    return (
                      <Button
                        name="bank"
                        value={bank.id}
                        variant="outline"
                        className="inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] sm:max-w-[250px]"
                      >
                        {bank.name}
                      </Button>
                    );
                  })}
                </div>
              </RadioGroup> */
}

{
  /* <div className="flex gap-2">
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="Enter your first name "
                  className="w-full"
                />
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Enter you first name "
                  className="w-full"
                />
              </div>
              <Input
                type="number"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                placeholder="Enter custom phonenumber"
                className="w-full"
              /> */
}

{
  /* <Input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full"
              />
              {error && <p className="text-red-500">{error}</p>} */
}
{
  /* <Button onClick={handleChapa} className="w-full bg-accent">
                Donate Now
              </Button> */
}

const handleChapa = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  const referenceNumber = uuidv4();
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    amount: input,
    account_name: "Israel Goytom",
    account_number: "32423423",
    currency: "ETB",
    reference: referenceNumber,
    bank_code: "96e41186-29ba-4e30-b013-2ca36d7e7025",
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
};