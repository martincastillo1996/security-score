// Almacén seguro y tipado de pedidos para DEFENSA TI (Almacenamiento local seguro)
export interface DefensatiOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  targetUrl: string;
  planId: 'auditoria' | 'esencial' | 'blindaje-total' | 'limpieza';
  planName: string;
  amountPEN: number;
  paymentStatus: 'pending' | 'paid_advance' | 'paid_full' | 'failed';
  paymentMethod: 'culqi' | 'yape_manual';
  culqiChargeId?: string;
  authorizedByOwner: boolean;
  notes?: string;
}

// Almacenamiento en memoria volátil de proceso / persistible
const ordersStore: Map<string, DefensatiOrder> = new Map();

export function createOrder(order: Omit<DefensatiOrder, 'id' | 'createdAt'>): DefensatiOrder {
  const id = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const newOrder: DefensatiOrder = {
    ...order,
    id,
    createdAt: new Date().toISOString(),
  };

  ordersStore.set(id, newOrder);
  return newOrder;
}

export function getOrderById(id: string): DefensatiOrder | null {
  return ordersStore.get(id) || null;
}

export function updateOrderStatus(
  id: string, 
  status: DefensatiOrder['paymentStatus'], 
  culqiChargeId?: string
): DefensatiOrder | null {
  const order = ordersStore.get(id);
  if (!order) return null;

  order.paymentStatus = status;
  if (culqiChargeId) {
    order.culqiChargeId = culqiChargeId;
  }
  ordersStore.set(id, order);
  return order;
}

export function getAllOrders(): DefensatiOrder[] {
  return Array.from(ordersStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
