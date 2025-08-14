import Image from "next/image";
import Link from "next/link";
import { Button, buttonBase, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 py-24 text-center">
        <h1 className="text-4xl font-bold sm:text-6xl animate-fade-in-up">Biveki</h1>
        <p className="max-w-2xl text-lg text-blue-200 animate-fade-in-up">
          Subscription-based web app development delivered by a dedicated team.
        </p>
        <div className="mt-4 flex gap-4 animate-fade-in-up">
          <Link
            href="#pricing"
            className={cn(buttonBase, buttonVariants.default)}
          >
            View Plans
          </Link>
          <Link
            href="#contact"
            className={cn(buttonBase, buttonVariants.outline)}
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-12 w-full animate-fade-in-up">
          <Image
            src="https://placehold.co/1200x600/1e3a8a/ffffff?text=Hero+Image"
            alt="Futuristic blue workspace representing collaborative web development"
            width={1200}
            height={600}
            className="w-full rounded-lg shadow-lg"
          />
          {/* Image Prompt: "Futuristic blue-themed office with developers collaborating on holographic interfaces, wide shot, cinematic lighting, 16:9 aspect ratio" */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-6xl py-24">
        <h2 className="mb-12 text-center text-3xl font-semibold">Why Biveki</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <Card className="animate-fade-in-up">
            <Image
              src="https://placehold.co/100x100/1e3a8a/ffffff?text=Loop"
              alt="Infinite iteration illustration"
              width={100}
              height={100}
              className="mb-4"
            />
            {/* Image Prompt: "Abstract blue circular arrows around a web interface, symbolizing unlimited iterations, 1:1 aspect ratio" */}
            <h3 className="mb-2 text-xl font-medium">Unlimited Iterations</h3>
            <p className="text-sm text-blue-200">
              Iterate on your product endlessly with one flat subscription.
            </p>
          </Card>
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Image
              src="https://placehold.co/100x100/1e3a8a/ffffff?text=Speed"
              alt="Fast turnaround illustration"
              width={100}
              height={100}
              className="mb-4"
            />
            {/* Image Prompt: "Blue stopwatch blended with coding elements to represent fast delivery, 1:1 aspect ratio" */}
            <h3 className="mb-2 text-xl font-medium">Fast Turnaround</h3>
            <p className="text-sm text-blue-200">
              Receive updates and features at a rapid pace.
            </p>
          </Card>
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Image
              src="https://placehold.co/100x100/1e3a8a/ffffff?text=Team"
              alt="Dedicated team illustration"
              width={100}
              height={100}
              className="mb-4"
            />
            {/* Image Prompt: "Friendly team of developers in a modern blue-accented office, smiling and coding together, 1:1 aspect ratio" */}
            <h3 className="mb-2 text-xl font-medium">Dedicated Team</h3>
            <p className="text-sm text-blue-200">
              Work with professionals focused solely on your product.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-blue-950/50 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-12 text-3xl font-semibold">Flexible Plans</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <Card className="animate-fade-in-up">
              <h3 className="mb-4 text-xl font-medium">Starter</h3>
              <p className="mb-4 text-4xl font-bold">
                $999<span className="text-lg font-normal">/mo</span>
              </p>
              <ul className="mb-6 space-y-2 text-sm text-blue-200">
                <li>Up to 2 active requests</li>
                <li>Email support</li>
                <li>Basic analytics</li>
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </Card>
            <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="mb-4 text-xl font-medium">Pro</h3>
              <p className="mb-4 text-4xl font-bold">
                $1999<span className="text-lg font-normal">/mo</span>
              </p>
              <ul className="mb-6 space-y-2 text-sm text-blue-200">
                <li>Unlimited requests</li>
                <li>Priority support</li>
                <li>Advanced analytics</li>
              </ul>
              <Button className="w-full" variant="outline">
                Choose Plan
              </Button>
            </Card>
            <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="mb-4 text-xl font-medium">Enterprise</h3>
              <p className="mb-4 text-4xl font-bold">Custom</p>
              <ul className="mb-6 space-y-2 text-sm text-blue-200">
                <li>Dedicated team</li>
                <li>Custom integrations</li>
                <li>24/7 support</li>
              </ul>
              <Button className="w-full">Contact Us</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-3xl py-24 text-center">
        <h2 className="mb-4 text-3xl font-semibold">Ready to build?</h2>
        <p className="mb-8 text-blue-200">
          Tell us about your project and we&apos;ll get in touch.
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-4 animate-fade-in-up">
          <Input type="email" placeholder="Your email" required />
          <Input type="text" placeholder="Project details" required />
          <Button type="submit">Send</Button>
        </form>
      </section>
    </div>
  );
}
