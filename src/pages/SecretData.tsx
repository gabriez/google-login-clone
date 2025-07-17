import axios from "axios";
import { API_URL } from "../const";

import { useState, useEffect } from "react";

const SecretData = () => {
	const [users, setUsers] = useState<
		{ id: number; email: string; password: string }[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	// Mock API_URL for demo - replace with your actual constant
	const API_URL = "http://localhost:3000";

	const deleteUsers = async () => {
		try {
			setLoading(true);
			await axios.delete(`${API_URL}/delete`);
			setUsers([]);
			alert("All users deleted successfully");
		} catch (error) {
			console.error("Error deleting users:", error);
			setError("Failed to delete users");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				console.log(API_URL);

				const { data } = await axios.get(`${API_URL}`);

				setUsers(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching secret data:", error);
				setError("Failed to fetch user data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
				<button
					onClick={deleteUsers}
					className="mb-1 px-4 py-2 bg-red-500 rounded-xl self-end text-white">
					{" "}
					Delete users{" "}
				</button>
				<div className="bg-white shadow-xl rounded-lg overflow-hidden">
					{/* Header */}
					<div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
						<h1 className="text-2xl font-bold text-white">Secret User Data</h1>
						<p className="text-blue-100 mt-1">Confidential user information</p>
					</div>

					{/* Table Container */}
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										ID
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Password
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{users.map((user, index) => (
									<tr
										key={user.id}
										className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
													<span className="text-sm font-medium text-blue-800">
														{user.id}
													</span>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{user.email || (
													<span className="text-gray-400 italic">
														No email provided
													</span>
												)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
												{user.password}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													user.email
														? "bg-green-100 text-green-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{user.email ? "Complete" : "Incomplete"}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="bg-gray-50 px-6 py-3">
						<div className="flex justify-between items-center">
							<div className="text-sm text-gray-500">
								Showing {users.length} user{users.length !== 1 ? "s" : ""}
							</div>
							<div className="text-sm text-gray-500">
								Last updated: {new Date().toLocaleString()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecretData;
