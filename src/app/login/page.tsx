// "use client";

// import { authenticate } from "~/app/lib/actions";
// import { useFormState, useFormStatus } from "react-dom";

// export default function Page() {
//   const [errorMessage, dispatch] = useFormState(authenticate, undefined);

//   return (
//     <figure style={{ display: "flex", justifyContent: "center" }}>
//       <form action={dispatch}>
//         <input type="email" name="email" placeholder="Email" required />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//         />
//         <div>{errorMessage && <p>{errorMessage}</p>}</div>
//         <LoginButton />
//       </form>
//     </figure>
//   );
// }

// function LoginButton() {
//   const { pending } = useFormStatus();

//   const handleClick = (event: { preventDefault: () => void }) => {
//     if (pending) {
//       event.preventDefault();
//     }
//   };

//   return (
//     <button aria-disabled={pending} type="submit" onClick={handleClick}>
//       Login
//     </button>
//   );
// }

"use client";

import { authenticate } from "~/app/lib/actions";
import { useState } from "react";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const error = await authenticate(undefined, formData);

    // If there's an error, display it
    if (error) {
      setErrorMessage(error);
    } else {
      // If no error, redirect to the dashboard
      window.location.href = "/dashboard";
    }
  }

  return (
    <figure style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <LoginButton />
      </form>
    </figure>
  );
}

function LoginButton() {
  const [pending, setPending] = useState(false);

  const handleClick = (event: { preventDefault: () => void }) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  );
}
