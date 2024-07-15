import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { topDonors } from "@/constants/donors";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Loading from "@/components/Loading";

export default function Home() {
  const [input, setInput] = useState<number | undefined>();
  const [firstName, setfirstName] = useState<number | undefined>();
  const [lastName, setlastName] = useState<number | undefined>();
  const [phoneNumber, setphoneNumber] = useState<number | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [transfers, setTransfers] = useState();
  const [donor, setDonor] = useState();
  const [loading, setLoading] = useState(false);
  let object = {}

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/transfers");
        console.log(response.data.transfers.data);
        setTransfers(JSON.parse(response.data.transfers.data));
        setDonor(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  let raised = 80000;
  let goal = 100000;

  // raised * 100% / goal
  const progressnum = (raised * 100) / goal;

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
      amount: input, //Amount should be integer
      currency: "ETB",
      email: "test@gmail.com",
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber, //the phone number must not include +251
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
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // const response = await myChapa.donate({ amount: input, email: 'your_email@example.com' })
      // setDonor(response.donor)
      console.log(input);
    } catch (error) {
      setError("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
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
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setInput(50)}
                  variant="outline"
                  className="px-4  py-2"
                >
                  $50
                </Button>
                <Button
                  onClick={() => setInput(100)}
                  variant="outline"
                  className="px-4 py-2"
                >
                  $100
                </Button>
                <Button
                  onClick={() => setInput(1000)}
                  variant="outline"
                  className="px-4 py-2"
                >
                  $1000
                </Button>
                <Button
                  onClick={() => setInput(1000)}
                  variant="outline"
                  className="px-4 py-2"
                >
                  $2000
                </Button>
                <Button
                  onClick={() => setInput(1000)}
                  variant="outline"
                  className="px-4 py-2"
                >
                  $5000
                </Button>
                <Button
                  onClick={() => setInput(1000)}
                  variant="outline"
                  className="px-4 py-2"
                >
                  $10000
                </Button>
              </div>
              <div className="flex gap-2">
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
              />
              <Input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full"
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={handleChapa} className="w-full bg-accent">
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
