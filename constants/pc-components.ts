export type ComponentCategory = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'Cooling' | 'PSU' | 'Cabinet';

export interface PCComponent {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    specs: Record<string, string>;
}

export interface PrebuiltConfig {
    id: string;
    name: string;
    description: string;
    image: string;
    category: 'Gaming' | 'Workstation' | 'Budget';
    components: Record<ComponentCategory, string>; // Component IDs
}

export const PC_COMPONENTS: Record<ComponentCategory, PCComponent[]> = {
    CPU: [
        {
            id: 'cpu-1',
            name: 'Intel Core i9-14900K',
            brand: 'Intel',
            price: 52999,
            image: '/images/pc-builder/cpu-i9.jpg',
            specs: { cores: '24', threads: '32', clock: '6.0 GHz' }
        },
        {
            id: 'cpu-2',
            name: 'AMD Ryzen 9 7950X3D',
            brand: 'AMD',
            price: 58500,
            image: '/images/pc-builder/cpu-r9.jpg',
            specs: { cores: '16', threads: '32', cache: '128MB' }
        },
        {
            id: 'cpu-3',
            name: 'Intel Core i7-14700K',
            brand: 'Intel',
            price: 38900,
            image: '/images/pc-builder/cpu-i7.jpg',
            specs: { cores: '20', threads: '28', clock: '5.6 GHz' }
        },
        {
            id: 'cpu-4',
            name: 'Intel Core i5-13400F',
            brand: 'Intel',
            price: 18500,
            image: '/images/pc-builder/cpu-i5.jpg',
            specs: { cores: '10', threads: '16', clock: '4.6 GHz' }
        },
        {
            id: 'cpu-5',
            name: 'AMD Ryzen 5 5600',
            brand: 'AMD',
            price: 12500,
            image: '/images/pc-builder/cpu-r5.jpg',
            specs: { cores: '6', threads: '12', cache: '32MB' }
        }
    ],
    GPU: [
        {
            id: 'gpu-1',
            name: 'NVIDIA GeForce RTX 4090',
            brand: 'NVIDIA',
            price: 168000,
            image: '/images/pc-builder/gpu-4090.jpg',
            specs: { vram: '24GB GDDR6X', raytracing: 'Yes' }
        },
        {
            id: 'gpu-2',
            name: 'NVIDIA GeForce RTX 4080 Super',
            brand: 'NVIDIA',
            price: 105000,
            image: '/images/pc-builder/gpu-4080s.jpg',
            specs: { vram: '16GB GDDR6X', raytracing: 'Yes' }
        },
        {
            id: 'gpu-3',
            name: 'AMD Radeon RX 7900 XTX',
            brand: 'AMD',
            price: 94000,
            image: '/images/pc-builder/gpu-7900xtx.jpg',
            specs: { vram: '24GB GDDR6', raytracing: 'Yes' }
        },
        {
            id: 'gpu-4',
            name: 'NVIDIA GeForce RTX 4060',
            brand: 'NVIDIA',
            price: 28500,
            image: '/images/pc-builder/gpu-4060.jpg',
            specs: { vram: '8GB GDDR6', raytracing: 'Yes' }
        },
        {
            id: 'gpu-5',
            name: 'AMD Radeon RX 6600',
            brand: 'AMD',
            price: 19800,
            image: '/images/pc-builder/gpu-6600.jpg',
            specs: { vram: '8GB GDDR6', raytracing: 'Yes' }
        }
    ],
    RAM: [
        {
            id: 'ram-1',
            name: 'Corsair Vengeance RGB 32GB DDR5',
            brand: 'Corsair',
            price: 11500,
            image: '/images/pc-builder/ram-corsair.jpg',
            specs: { speed: '6000MHz', latency: 'CL30' }
        },
        {
            id: 'ram-2',
            name: 'G.Skill Trident Z5 RGB 32GB DDR5',
            brand: 'G.Skill',
            price: 12800,
            image: '/images/pc-builder/ram-gskill.jpg',
            specs: { speed: '6400MHz', latency: 'CL32' }
        },
        {
            id: 'ram-3',
            name: 'Crucial 16GB DDR4 3200MHz',
            brand: 'Crucial',
            price: 3200,
            image: '/images/pc-builder/ram-crucial.jpg',
            specs: { speed: '3200MHz', capacity: '16GB' }
        }
    ],
    Storage: [
        {
            id: 'ssd-1',
            name: 'Samsung 990 Pro 1TB NVMe Gen4',
            brand: 'Samsung',
            price: 9800,
            image: '/images/pc-builder/ssd-990pro.jpg',
            specs: { read: '7450MB/s', write: '6900MB/s' }
        },
        {
            id: 'ssd-2',
            name: 'WD Black SN850X 1TB NVMe',
            brand: 'WD',
            price: 8500,
            image: '/images/pc-builder/ssd-sn850x.jpg',
            specs: { read: '7300MB/s', write: '6300MB/s' }
        },
        {
            id: 'ssd-3',
            name: 'Crucial P3 500GB NVMe',
            brand: 'Crucial',
            price: 3500,
            image: '/images/pc-builder/ssd-p3.jpg',
            specs: { read: '3500MB/s', write: '3000MB/s' }
        }
    ],
    Motherboard: [
        {
            id: 'mb-1',
            name: 'ASUS ROG Maximus Z790 Hero',
            brand: 'ASUS',
            price: 54000,
            image: '/images/pc-builder/mb-z790.jpg',
            specs: { socket: 'LGA1700', chipset: 'Z790' }
        },
        {
            id: 'mb-2',
            name: 'MSI MPG X670E Carbon WiFi',
            brand: 'MSI',
            price: 42000,
            image: '/images/pc-builder/mb-x670e.jpg',
            specs: { socket: 'AM5', chipset: 'X670E' }
        },
        {
            id: 'mb-3',
            name: 'Gigabyte B760M DS3H',
            brand: 'Gigabyte',
            price: 9500,
            image: '/images/pc-builder/mb-b760.jpg',
            specs: { socket: 'LGA1700', chipset: 'B760' }
        },
        {
            id: 'mb-4',
            name: 'ASRock B450 Steel Legend',
            brand: 'ASRock',
            price: 7800,
            image: '/images/pc-builder/mb-b450.jpg',
            specs: { socket: 'AM4', chipset: 'B450' }
        }
    ],
    Cooling: [
        {
            id: 'cool-1',
            name: 'NZXT Kraken Elite 360 RGB',
            brand: 'NZXT',
            price: 24500,
            image: '/images/pc-builder/cool-kraken.jpg',
            specs: { type: 'AIO 360mm', display: 'LCD' }
        },
        {
            id: 'cool-2',
            name: 'DeepCool AG400 Air Cooler',
            brand: 'DeepCool',
            price: 1900,
            image: '/images/pc-builder/cool-ag400.jpg',
            specs: { type: 'Tower Air', fans: '1x 120mm' }
        }
    ],
    PSU: [
        {
            id: 'psu-1',
            name: 'Corsair RM1000x 1000W Gold',
            brand: 'Corsair',
            price: 16500,
            image: '/images/pc-builder/psu-rm1000x.jpg',
            specs: { wattage: '1000W', rating: '80+ Gold' }
        },
        {
            id: 'psu-2',
            name: 'DeepCool PM750D 750W Gold',
            brand: 'DeepCool',
            price: 5800,
            image: '/images/pc-builder/psu-pm750.jpg',
            specs: { wattage: '750W', rating: '80+ Gold' }
        }
    ],
    Cabinet: [
        {
            id: 'cab-1',
            name: 'Lian Li PC-O11 Dynamic EVO',
            brand: 'Lian Li',
            price: 15800,
            image: '/images/pc-builder/cab-o11.jpg',
            specs: { type: 'Mid Tower', windows: 'Dual Glass' }
        },
        {
            id: 'cab-2',
            name: 'NZXT H9 Flow',
            brand: 'NZXT',
            price: 14500,
            image: '/images/pc-builder/cab-h9.jpg',
            specs: { type: 'Mid Tower', air: 'High Flow' }
        },
        {
            id: 'cab-3',
            name: 'Ant Esports ICE-100',
            brand: 'Ant Esports',
            price: 3200,
            image: '/images/pc-builder/cab-ice100.jpg',
            specs: { type: 'Mid Tower', rgb: 'Yes' }
        }
    ]
};

export const PREBUILT_CONFIGS: PrebuiltConfig[] = [
    {
        id: 'build-ultra',
        name: 'Ultimate Gaming Beast',
        description: '4K Ultra Gaming & Heavy Productivity rig with top-of-the-line components.',
        image: '/images/pc-builds/ultra.jpg',
        category: 'Gaming',
        components: {
            CPU: 'cpu-1',
            Motherboard: 'mb-1',
            RAM: 'ram-2',
            GPU: 'gpu-1',
            Storage: 'ssd-1',
            Cooling: 'cool-1',
            PSU: 'psu-1',
            Cabinet: 'cab-1'
        }
    },
    {
        id: 'build-mid',
        name: 'Pro Streamer Edition',
        description: 'Perfectly balanced for 1440p gaming and smooth high-quality streaming.',
        image: '/images/pc-builds/mid.jpg',
        category: 'Gaming',
        components: {
            CPU: 'cpu-3',
            Motherboard: 'mb-3',
            RAM: 'ram-1',
            GPU: 'gpu-4',
            Storage: 'ssd-2',
            Cooling: 'cool-2',
            PSU: 'psu-2',
            Cabinet: 'cab-2'
        }
    },
    {
        id: 'build-budget',
        name: 'Budget King V2',
        description: 'Best entry-level 1080p gaming performance for the price.',
        image: '/images/pc-builds/budget.jpg',
        category: 'Budget',
        components: {
            CPU: 'cpu-5',
            Motherboard: 'mb-4',
            RAM: 'ram-3',
            GPU: 'gpu-5',
            Storage: 'ssd-3',
            Cooling: 'cool-2',
            PSU: 'psu-2',
            Cabinet: 'cab-3'
        }
    }
];
