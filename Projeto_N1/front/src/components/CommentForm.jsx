function CommentForm({ user, text, setUser, setText, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h3>Adicionar comentário</h3>
      <input
        type="text"
        placeholder="Seu nome"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <textarea
        placeholder="Seu comentário"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default CommentForm;
