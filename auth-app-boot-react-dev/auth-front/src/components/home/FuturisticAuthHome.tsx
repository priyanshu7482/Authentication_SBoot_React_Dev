import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Lock, Sparkles, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router";

export default function FuturisticAuthHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white transition-colors overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-28 px-6 text-center flex flex-col items-center justify-center">
        {/* subtle red glow backdrop */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(225,29,42,0.18),transparent_60%)]" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          Secure.{" "}
          <span className="text-red-600">Fast.</span> Futuristic.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-zinc-400"
        >
          The next‑generation authentication platform built for modern apps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <Button
            size="lg"
            className="rounded-2xl text-lg px-6 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl text-lg px-6 border-zinc-700 text-white hover:bg-zinc-900 hover:border-red-600"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Biometric Login",
              desc: "Next‑level security with fingerprint and facial recognition.",
              icon: <Fingerprint className="w-10 h-10" />,
            },
            {
              title: "Multi‑Layer Encryption",
              desc: "Industry‑grade encrypted authentication for complete safety.",
              icon: <Lock className="w-10 h-10" />,
            },
            {
              title: "Smart Access Control",
              desc: "AI‑powered access system that adapts to real‑time threats.",
              icon: <Shield className="w-10 h-10" />,
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-lg hover:border-red-600/60 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6 text-red-600">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{f.title}</h3>
                  <p className="text-zinc-400">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 text-center bg-zinc-950 border-t border-zinc-800">
        <h2 className="text-4xl font-bold text-white">Start Securing Your App Today</h2>
        <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-lg">
          Join thousands of developers already building with our authentication
          system.
        </p>
        <Button
          size="lg"
          className="mt-8 px-8 text-lg rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </section>

      {/* Extra Section — Why Choose Us */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Why Choose Our Auth Platform?
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-zinc-400">
          <div>
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-white">
              <Sparkles className="w-6 h-6 text-red-600" /> AI‑Driven Security
            </h3>
            <p>
              Real‑time monitoring detects suspicious activities and prevents
              unauthorized access.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-white">
              <Sparkles className="w-6 h-6 text-red-600" /> Lightning‑Fast Performance
            </h3>
            <p>
              Built for scale with instant response times for authentication flows.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-white">
              <Sparkles className="w-6 h-6 text-red-600" /> Developer‑Friendly API
            </h3>
            <p>
              Integrate in minutes with clean, powerful, well‑structured APIs.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-white">
              <Sparkles className="w-6 h-6 text-red-600" /> Highly Customizable
            </h3>
            <p>
              Theme, workflow, and control options designed to match your app perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-500 border-t border-zinc-800">
        © {new Date().getFullYear()} Futuristic Auth. All rights reserved.
      </footer>
    </div>
  );
}
