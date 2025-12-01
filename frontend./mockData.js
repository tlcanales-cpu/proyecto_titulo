// services/mockData.js

export const MOCK_MEDICAMENTOS = [
  { 
    _id: '1', 
    nombre: 'Paracetamol 500mg', 
    descripcion: 'Alivio efectivo para dolor y fiebre. Fácil de tragar.', 
    categoria: 'Analgésico', 
    precio: 1500, 
    farmacia: 'Cruz Verde',
    imagen: 'https://www.cruzverde.cl/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw65975510/images/large/265215-paracetamol-500-mg-16-comprimidos-mintlab.jpg?sw=1000&sh=1000' 
  },
  { 
    _id: '2', 
    nombre: 'Ibuprofeno 400mg', 
    descripcion: 'Antiinflamatorio para dolores musculares.', 
    categoria: 'Antiinflamatorio', 
    precio: 2800, 
    farmacia: 'Ahumada',
    imagen: 'https://www.cruzverde.cl/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw1554581f/images/large/265243-ibuprofeno-400-mg-20-grageas-mintlab.jpg?sw=1000&sh=1000' 
  },
  { 
    _id: '3', 
    nombre: 'Losartán 50mg', 
    descripcion: 'Tratamiento para la presión arterial alta.', 
    categoria: 'Crónicos', 
    precio: 3500, 
    farmacia: 'Salcobrand',
    imagen: 'https://www.cruzverde.cl/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw06963214/images/large/265212-losartan-potasico-50-mg-30-comprimidos-recubiertos-mintlab.jpg?sw=1000&sh=1000' 
  },
  { 
    _id: '4', 
    nombre: 'Amoxicilina 500mg', 
    descripcion: 'Antibiótico de amplio espectro.', 
    categoria: 'Antibiótico', 
    precio: 4200, 
    farmacia: 'Doctor Simi',
    imagen: 'https://www.cruzverde.cl/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw3d606560/images/large/265228-amoxicilina-500-mg-21-capsulas-mintlab.jpg?sw=1000&sh=1000' 
  },
  { 
    _id: '5', 
    nombre: 'Vitamina C', 
    descripcion: 'Refuerza tu sistema inmune diariamente.', 
    categoria: 'Vitaminas', 
    precio: 1000, 
    farmacia: 'Cruz Verde',
    imagen: 'https://www.cruzverde.cl/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_Chile/default/dwa3948e9a/images/large/286950-vitamin-c-1000-mg-60-tabletas-sundown.jpg?sw=1000&sh=1000' 
  },
  { 
    _id: '6', 
    nombre: 'Omeprazol 20mg', 
    descripcion: 'Protector gástrico para la acidez.', 
    categoria: 'Estomacal', 
    precio: 2100, 
    farmacia: 'Ahumada',
    imagen: 'https://www.cruzverde.cl/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw769a6537/images/large/270422-omeprazol-20-mg-30-capsulas-mintlab.jpg?sw=1000&sh=1000' 
  },
];

export const MOCK_CENTROS = [
  { _id: '1', nombre: 'Farmacia Centro', direccion: 'Av. Libertador 123', comuna: 'Santiago', telefono: '22334455', lat: -33.4372, lng: -70.6506 },
  { _id: '2', nombre: 'Farmacia Norte', direccion: 'Calle Independencia 456', comuna: 'Independencia', telefono: '22556677', lat: -33.4200, lng: -70.6500 },
];

export const MOCK_RECORDATORIOS = [
  { id: '1', medicamento: 'Losartán', hora: '08:00 AM', dosis: '1 pastilla' },
  { id: '2', medicamento: 'Paracetamol', hora: '02:00 PM', dosis: 'Media pastilla' },
];