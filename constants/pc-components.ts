export type ComponentCategory = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'Cooling' | 'PSU' | 'Cabinet';

export interface PCComponent {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    specs: Record<string, string>;
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
        }
    ]
};
