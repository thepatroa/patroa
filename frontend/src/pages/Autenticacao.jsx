import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { LogIn, UserPlus } from "lucide-react";

const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

const isValidEmail = (email) => {
	const parts = email.split("@");
	if (parts.length !== 2) return false;
	const domain = parts[1].toLowerCase();
	return allowedDomains.includes(domain);
};

const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	// Validação em tempo real
	const emailIsValid = isValidEmail(email);
	const passwordsMatch = password === confirmPassword;

	const handleAuth = async () => {
		setLoading(true);
		setMessage("");

		if (!emailIsValid) {
			setMessage("Use um email válido como gmail, hotmail, outlook ou yahoo.");
			setLoading(false);
			return;
		}

		if (!isLogin && !passwordsMatch) {
			setMessage("As senhas não coincidem.");
			setLoading(false);
			return;
		}

		const { error } = isLogin
			? await supabase.auth.signInWithPassword({ email, password })
			: await supabase.auth.signUp({ email, password });

		if (error) {
			setMessage(error.message);
		} else {
			setMessage(isLogin ? "Login realizado com sucesso!" : "Cadastro feito! Verifique seu email.");
		}

		setLoading(false);
	};

	return (
		<div className="flex-1 overflow-auto relative z-10">
			<Header title={isLogin ? "Login" : "Cadastro"} />

			<main className="max-w-md mx-auto py-12 px-4 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-gray-200 dark:border-zinc-700"
				>
					{/* Email */}
					<div className="mb-6">
						<label className="block text-sm font-medium mb-1">Email</label>
						<input
							type="email"
							className={`w-full px-3 py-2 rounded-md border ${
								email.length > 0 && !emailIsValid
									? "border-red-500"
									: "border-gray-300 dark:border-zinc-700"
							} bg-white dark:bg-zinc-800`}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{email.length > 0 && !emailIsValid && (
							<p className="text-xs text-red-500 mt-1">
								Use um email válido como gmail, hotmail, outlook ou yahoo.
							</p>
						)}
					</div>

					{/* Senha */}
					<div className="mb-6">
						<label className="block text-sm font-medium mb-1">Senha</label>
						<input
							type="password"
							className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{/* Confirmar senha (só no cadastro) */}
					{!isLogin && (
						<div className="mb-6">
							<label className="block text-sm font-medium mb-1">Confirmar senha</label>
							<input
								type="password"
								className={`w-full px-3 py-2 rounded-md border ${
									confirmPassword.length > 0 && !passwordsMatch
										? "border-red-500"
										: "border-gray-300 dark:border-zinc-700"
								} bg-white dark:bg-zinc-800`}
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{confirmPassword.length > 0 && !passwordsMatch && (
								<p className="text-xs text-red-500 mt-1">As senhas não coincidem.</p>
							)}
						</div>
					)}

					{/* Mensagem de erro ou sucesso */}
					{message && <p className="text-sm text-red-500 mb-4">{message}</p>}

					{/* Botão de autenticação */}
					<button
						onClick={handleAuth}
						className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold flex justify-center items-center gap-2"
						disabled={loading}
					>
						{isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
						{loading ? "Enviando..." : isLogin ? "Entrar" : "Cadastrar"}
					</button>

					{/* Troca de modo */}
					<button
						onClick={() => {
							setIsLogin(!isLogin);
							setMessage("");
							setPassword("");
							setConfirmPassword("");
						}}
						className="w-full mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
					>
						{isLogin ? "Criar uma conta" : "Já tem uma conta? Entrar"}
					</button>
				</motion.div>
			</main>
		</div>
	);
};

export default AuthPage;
