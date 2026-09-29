// Dados reais retirados da página inicial de elitedigital.pt (nomes, preços e disponibilidade).
export const categories = [
  { id: "computadores", name: "Computadores", subs: ["Desktops", "Notebooks", "Servidores", "Software", "Ponto de Venda"] },
  { id: "mobilidade", name: "Mobilidade", subs: ["Tablets", "Smartphones", "Wearables", "Drones"] },
  { id: "componentes", name: "Componentes", subs: ["Placas Gráficas", "Processadores", "Memória RAM", "Armazenamento", "Motherboards"] },
  { id: "imagem-som", name: "Imagem & Som", subs: ["Monitores", "Televisores", "Projectores", "Vídeo Vigilância"] },
  { id: "gaming", name: "Gaming & Modding", subs: ["Consolas", "Cadeiras Gaming", "Realidade Virtual", "Modding"] },
  { id: "perifericos", name: "Periféricos", subs: ["Teclados", "Ratos", "Impressoras", "UPS", "Cabos"] },
  { id: "redes", name: "Redes & Comunicações", subs: ["Routers | Modems", "Switches", "Telefones VoIP", "GPS"] },
  { id: "casa", name: "Casa & Escritório", subs: ["Escritório", "Grandes Domésticos", "Iluminação", "Domótica"] },
];

export const products = [
  { id: 1, cat: "Desktops Gaming", name: "Computador Gaming INSYS PbA, i7-12700F, RTX3060, 16GB RAM, SSD 512GB, W11", brand: "INSYS", ref: "2-PBA#I7RTX3060-536", price: 1312.52, stock: false },
  { id: 2, cat: "Desktops Gaming", name: "Computador Gaming INSYS PbA i5-12400F, RTX3060, 16GB RAM, 512GB SSD, Windows 11", brand: "INSYS", ref: "2-PBA#I5RTX3060-135", price: 598.99, old: 1181.52, stock: false },
  { id: 3, cat: "Desktops Gaming", name: "PC Gaming INSYS Pwrd by ASUS i5 GTX1660S 16GB 512GB SSD Linux", brand: "INSYS", ref: "2-PBA#I5GTX1660S-518", price: 549.0, old: 881.52, stock: true },
  { id: 4, cat: "Desktops Gaming", name: "Desktop INSYS PowerPlay R7-8700G 16GB 1TB SSD - Gaming PC", brand: "INSYS", ref: "2-PPLAY#024", price: 704.03, old: 999.0, stock: true },
  { id: 5, cat: "Placas Gráficas Internas", name: "Placa Gráfica Asus GeForce RTX 5060 8GB Dual OC, 2565MHz, GDDR7", brand: "Asus", ref: "8-90YV0N12-M0NA00", price: 548.69, stock: true },
  { id: 6, cat: "Placas Gráficas Internas", name: "Placa Gráfica MSI RTX 3050 Ventus 2X XS 8G OC - 8GB GDDR6 com Ray Tracing", brand: "MSI", ref: "49-912-V809-4287", price: 189.0, old: 269.0, stock: false },
  { id: 7, cat: "Placas Gráficas Internas", name: "Placa Gráfica MSI RTX 5090 Ventus 3X 32GB GDDR7, PCI-e 5.0, DLSS 4", brand: "MSI", ref: "49-912-V530-061", price: 2800.0, stock: false },
  { id: 8, cat: "Placas Gráficas Internas", name: "Placa Gráfica Asus Dual RTX 3070 8GB GDDR6, 2x Ventoinhas, 4K, PCI-e 4.0", brand: "Asus", ref: "8-90YV0H60-M0NB00", price: 654.36, stock: true },
  { id: 9, cat: "Refrigeração Desktops", name: "Water Cooler CPU Arctic Liquid Freezer III Pro 360 A-RGB", brand: "Arctic", ref: "224-ACFRE00184A", price: 89.9, old: 141.99, stock: true },
  { id: 10, cat: "Teclados", name: "Teclado USB INSYS MT8-K815 - HUB USB, Silencioso, Teclas Laser, PT", brand: "INSYS", ref: "2-MT8-K815", price: 8.9, old: 9.9, stock: true },
  { id: 11, cat: "UPS Diversas", name: "UPS Phasak Ottima 660VA, 380W, 2 Schuko, Interactiva e Proteção", brand: "Phasak", ref: "371-PH7266", price: 41.91, old: 46.9, stock: true },
  { id: 12, cat: "Caixas de Computador", name: "Caixa Gamemax Forge AB ATX, 2xUSB, 1xType-C, s/PSU", brand: "Gamemax", ref: "559-12380100001", price: 36.9, old: 38.9, stock: true },
];
