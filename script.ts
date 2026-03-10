const inputCep = document.querySelector("#cepInput") as HTMLInputElement;

const btnBuscar = document.querySelector("#buscar") as HTMLButtonElement;

const divResultado = document.querySelector("#resultado") as HTMLDivElement;

const buscarEndereco = async (): Promise<void> => {
  const cep = inputCep.value.trim();

  if (!cep || cep.length !== 8) {
    alert(`Por favor, digite um CEP válido com 8 números`);
    return;
  }

  try {
    if (divResultado) divResultado.innerHTML = `Buscando...`;
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    if (dados.erro) {
      if (divResultado) divResultado.innerHTML = "CEP não encontrado!";
      return;
    }
    if (divResultado) {
      divResultado.innerHTML = `<p><strong>Logradouro:</strong>${dados.Logradouro}</p>
      <p><strong>Bairro:</strong> ${dados.bairro}</p>
      <p><strong>Cidade:</strong> ${dados.localidade} - ${dados.uf}</p>`;
    }
  } catch (erro) {
    console.error("Erro na busca:", erro);
    if (divResultado)
      divResultado.innerHTML = `Erro ao conectar com o servidor`;
  }
  inputCep.value = "";
  inputCep.focus();
};

btnBuscar.addEventListener("click", buscarEndereco);
