/**
 * CONFIGURAÇÃO DO SITE — Gabriela Martins, Nutricionista
 * ---------------------------------------------------------------
 * Troque os dados AQUI. Tudo que estiver vazio ("") fica escondido
 * ou usa o placeholder bege com o monograma GM.
 * Os textos das seções estão no index.html.
 */
window.SITE_CONFIG = {
  // WhatsApp: só números, com 55 + DDD + número.
  // É o mesmo número do link curto do WhatsApp Business da Gabriela
  // (https://api.whatsapp.com/message/O7PHA347C6RAJ1).
  // A mensagem abaixo já vai escrita quando a pessoa clica em qualquer botão do site.
  // (Os botões da seção "Qual é o seu objetivo?" têm mensagens próprias no index.html.)
  whatsapp: {
    number: "5521969706219",
    message: "Olá, Gabriela! Vim pelo seu site e gostaria de saber mais sobre o acompanhamento nutricional. Podemos conversar? 🌿",
  },

  // Instagram: link completo. Vazio = os links do Instagram somem do site.
  instagram: "https://www.instagram.com/nutrigabifl/",

  // Informações profissionais do rodapé (vazio = não aparece).
  professional: {
    crn: "",      // Ex.: "CRN-0 00000"
    address: "",  // Ex.: "Atendimento presencial em Cidade/UF e online"
    email: "",    // Ex.: "contato@dominio.com.br"
  },

  // Fotos: ficam em assets/fotos/. Para trocar, substitua o arquivo mantendo o nome,
  // ou escreva outro caminho em "src". "position" controla o corte
  // (ex.: "50% 20%" mostra mais a parte de cima). Vazio = placeholder bege com o monograma.
  photos: {
    hero:         { src: "assets/fotos/gabriela-hero.jpg",        alt: "Gabriela Martins, nutricionista, sorrindo sentada em uma poltrona", position: "50% 30%" },
    sobre:        { src: "assets/fotos/gabriela-sobre.jpg",       alt: "Gabriela Martins em seu espaço de atendimento", position: "40% 40%" },
    sobreDetalhe: { src: "assets/fotos/gabriela-sorriso.jpg",     alt: "", position: "50% 25%" },
    frase:        { src: "assets/fotos/gabriela-autocuidado.jpg", alt: "", position: "50% 20%" },
    contato:      { src: "assets/fotos/gabriela-contato.jpg",     alt: "Retrato de Gabriela Martins", position: "50% 30%" },

    // Fotos opcionais das áreas de atendimento (vazio = ilustração em linha fina).
    saude:        { src: "", alt: "Mesa com alimentos naturais e ingredientes frescos", position: "50% 50%" },
    performance:  { src: "", alt: "Refeição equilibrada para uma rotina ativa", position: "50% 50%" },
    estetica:     { src: "", alt: "Composição com frutas, folhas e texturas naturais", position: "50% 50%" },
  },
};
