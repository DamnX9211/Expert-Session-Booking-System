export default function pendingApproval(){
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
                <h1 className="text-2xl font-bold mb-4">
                    Account Pending Approval
                </h1>
                <p className="text-gray-700">
                    Your expert account is currently pending approval by our administrators. We will review your application and notify you once it has been approved. Thank you for your patience!
                </p>
            </div>
        </div>
    )
}