"use client"
import { handleError, handleSuccess } from "@/app/utils"
import { useDelContactMutation, useGetContactQuery } from "@/store/api/contact"
import { useUserQuery } from "@/store/api/user"



export default function Contact() {
    const message = useGetContactQuery(
        undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    }
    )
    const user = useUserQuery()
    const [deleteMessage, { isLoading, isSuccess }] = useDelContactMutation(
        undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    }
    )

    if (!user?.data) {
        return (
            <div>Loading...</div>
        )
    }

    if (user?.data?.user?.role !== 'Admin') {
        return (
            <div>Access Denied!</div>
        )
    }
    const handleDelete = async (id) => {
        try {
            const res = await deleteMessage({ id }).unwrap()
            handleSuccess(res.message)
        } catch (err) {
            handleError(err?.data?.message)
            console.log(err)
        }
    }

    return (
        <main className="bg-white shadow-md m-4 rounded-xl p-6 sm:p-8 flex flex-col gap-6">

  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <h1 className="text-2xl sm:text-3xl font-bold">Contacts</h1>

    <a
      href="/dashboard/contact/add"
      className="bg-[#309689] text-white px-4 py-2 rounded-xl text-center"
    >
      + Add a message
    </a>
  </div>

  <p className="text-lg font-medium">Messages Received:</p>

  {/* Responsive Table Wrapper */}
  <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 text-left whitespace-nowrap">First Name</th>
          <th className="p-2 text-left whitespace-nowrap">Last Name</th>
          <th className="p-2 text-left whitespace-nowrap">Email</th>
          <th className="p-2 text-left whitespace-nowrap">Message</th>
          <th className="p-2 text-left whitespace-nowrap">Action</th>
        </tr>
      </thead>

      <tbody>
        {message.data == null ? (
          <tr>
            <td
              colSpan={5}
              className="text-center text-xl p-4"
            >
              Loading...
            </td>
          </tr>
        ) : (
          message.data.data
            .filter((u) => u.sentTo === null)
            .map((msg, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 whitespace-nowrap">{msg.firstName}</td>
                <td className="p-2 whitespace-nowrap">{msg.lastName}</td>
                <td className="p-2 whitespace-nowrap">{msg.email}</td>
                <td className="p-2 min-w-[250px]">{msg.message}</td>
                <td className="p-2">
                  <button
                    disabled={isLoading || isSuccess}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                    onClick={() => handleDelete(msg._id)}
                  >
                    {isLoading ? "Loading..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  </div>
</main>

    )
}