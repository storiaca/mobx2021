import { useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";

const Home: FC = () => {
  return (
    <main>
      <Form />
      <Transactions />
    </main>
  );
};

const Form: FC = () => {
  const store = useStore();
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        store.addTransaction(message);
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

const Transactions: FC = observer(() => {
  const store = useStore();

  return store.transactions.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className="pending">
        {store.transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>No Transactions</div>
  );
});

export default Home;
