import { Product } from "@/types/product";
import queijoCoalho from "@/assets/queijocoalho.png";
import queijoManteiga from "@/assets/queijo-de-manteiga-caseiro.png";
import queijoErvas from "@/assets/queijo-ervas.jpg";
import mel from "@/assets/mel.png";
import castanha from "@/assets/castanha.png";
import manteigaTerra from "@/assets/manteigadaterra.png";
import doceLeite from "@/assets/doces.png";
import cremeNata from "@/assets/creme-nata.jpg";
import macaxeira from "@/assets/macaxeira.jpg";
import tilapia from "@/assets/tilapia.jpg";
import farofa from "@/assets/farofa.jpg";
import carneiro from "@/assets/carneiro.jpg";
import carneSol from "@/assets/Carne-de-Sol.jpg";
import buchada from "@/assets/buchada.jpg";
import galinhaCaipira from "@/assets/galinhacaipira.jpg";
import queijocomcarne from "@/assets/queijocomcarnedesol.png";
import queijocompimenta from "@/assets/queijocompimenta.png";
import queijooregano from "@/assets/queijocomoregano.png";

export const products: Product[] = [
  // Queijo Coalho 950g-1kg
  {
    id: "q1",
    name: "Queijo coalho tradicional",
    price: 32.99,
    category: "queijo",
    weight: "950g a 1kg",
    image: queijoCoalho,
  },
  {
    id: "q2",
    name: "Queijo com orégano",
    price: 39.99,
    category: "queijo",
    weight: "950g a 1kg",
    image: queijooregano,
  },
  {
    id: "q3",
    name: "Queijo com ervas finas e pimenta calabresa",
    price: 39.99,
    category: "queijo",
    weight: "950g a 1kg",
    image: queijoErvas,
  },
  {
    id: "q4",
    name: "Queijo com chimichurri",
    price: 39.99,
    category: "queijo",
    weight: "950g a 1kg",
    image: queijoCoalho,
  },
  {
    id: "q5",
    name: "Queijo com pimenta biquinho",
    price: 39.99,
    category: "queijo",
    weight: "950g a 1kg",
    image: queijocompimenta,
  },
  {
    id: "q6",
    name: "Queijo com carne de sol",
    price: 39.99,
    category: "queijo",
    weight: "950g a 1kg",
    image: queijocomcarne,
  },
  // Queijo Coalho 500g
  {
    id: "q7",
    name: "Queijo coalho tradicional",
    price: 16.5,
    category: "queijo",
    weight: "500g",
    image: queijoCoalho,
  },
  {
    id: "q8",
    name: "Queijo com orégano",
    price: 19.99,
    category: "queijo",
    weight: "500g",
    image: queijooregano,
  },
  {
    id: "q9",
    name: "Queijo com ervas finas e pimenta calabresa",
    price: 19.99,
    category: "queijo",
    weight: "500g",
    image: queijoErvas,
  },
  {
    id: "q10",
    name: "Queijo com pimenta biquinho",
    price: 19.99,
    category: "queijo",
    weight: "500g",
    image: queijocompimenta,
  },
  {
    id: "q11",
    name: "Queijo com chimichurri",
    price: 19.99,
    category: "queijo",
    weight: "500g",
    image: queijoCoalho,
  },
  {
    id: "q12",
    name: "Queijo com carne de sol",
    price: 19.99,
    category: "queijo",
    weight: "500g",
    image: queijocomcarne,
  },
  // Produtos Variados
  {
    id: "v1",
    name: "Queijo manteiga",
    price: 20.99,
    category: "variados",
    weight: "500g",
    image: queijoManteiga,
  },
  {
    id: "v2",
    name: "Creme de nata",
    price: 11.99,
    category: "variados",
    weight: "pote 500g",
    image: cremeNata,
  },
  {
    id: "v3",
    name: "Macaxeira",
    price: 11.99,
    category: "variados",
    weight: "pacote 1kg",
    image: macaxeira,
  },
  {
    id: "v4",
    name: "Galinha caipira",
    price: 54.99,
    category: "variados",
    weight: "1,3kg a 1,5kg",
    image: galinhaCaipira,
  },
  {
    id: "v5",
    name: "Carne de carneiro",
    price: 28.99,
    category: "variados",
    weight: "a partir de 2kg",
    image: carneiro,
  },
  {
    id: "v6",
    name: "Carne de sol",
    price: 44.99,
    category: "variados",
    weight: "1kg",
    image: carneSol,
  },
  {
    id: "v7",
    name: "Buchada",
    price: 44.99,
    category: "variados",
    weight: "1 unidade",
    image: buchada,
  },
  {
    id: "v8",
    name: "Filé de tilápia",
    price: 31.99,
    category: "variados",
    weight: "1kg",
    image: tilapia,
  },
  {
    id: "v9",
    name: "Farofa da Vovó",
    price: 17.99,
    category: "variados",
    weight: "pote 500g",
    image: farofa,
  },
  {
    id: "v10",
    name: "Farofa da Vovó",
    price: 11.99,
    category: "variados",
    weight: "pote 250g",
    image: farofa,
  },
  {
    id: "v11",
    name: "Castanha caseira torrada",
    price: 15.49,
    category: "variados",
    weight: "250g",
    image: castanha,
  },
  {
    id: "v12",
    name: "Castanha caseira torrada",
    price: 30.99,
    category: "variados",
    weight: "500g",
    image: castanha,
  },
  {
    id: "v13",
    name: "Manteiga da terra",
    price: 17.5,
    category: "variados",
    weight: "500ml",
    image: manteigaTerra,
  },
  {
    id: "v14",
    name: "Manteiga da terra",
    price: 34.99,
    category: "variados",
    weight: "1 litro",
    image: manteigaTerra,
  },
  {
    id: "v15",
    name: "Mel de abelha italiana puro",
    price: 17.5,
    category: "variados",
    weight: "500ml",
    image: mel,
  },
  {
    id: "v16",
    name: "Mel de abelha italiana puro",
    price: 34.99,
    category: "variados",
    weight: "1 litro",
    image: mel,
  },
  // Doces Caseiros
  {
    id: "d1",
    name: "Doce de leite cremoso",
    price: 14.99,
    category: "doces",
    weight: "pote 600g",
    image: doceLeite,
  },
  {
    id: "d2",
    name: "Doce de leite caroçudo",
    price: 14.99,
    category: "doces",
    weight: "pote 600g",
    image: doceLeite,
  },
  {
    id: "d3",
    name: "Doce de leite com goiabada",
    price: 14.99,
    category: "doces",
    weight: "pote 600g",
    image: doceLeite,
  },
  {
    id: "d4",
    name: "Doce de banana",
    price: 14.99,
    category: "doces",
    weight: "pote 600g",
    image: doceLeite,
  },
  {
    id: "d5",
    name: "Doce de mamão com coco",
    price: 14.99,
    category: "doces",
    weight: "pote 600g",
    image: doceLeite,
  },
  {
    id: "d6",
    name: "Doce de goiaba cremoso",
    price: 14.99,
    category: "doces",
    weight: "pote 600g",
    image: doceLeite,
  },
];

export const categoryNames = {
  queijo: "Queijo Coalho",
  variados: "Produtos Variados",
  doces: "Doces Caseiros",
};
