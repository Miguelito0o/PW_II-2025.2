function CommentForm({ text, setText, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h3>Adicionar comentário</h3>
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
