import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Property, CustomerInquiry, TrafficSource } from './types';

interface PropertyList {
  id: string;
  name: string;
  properties: Property[];
  createdAt: number;
}

interface PropertyStore {
  properties: Property[];
  lists: PropertyList[];
  inquiries: CustomerInquiry[];
  trafficSources: TrafficSource[];
  createList: (name: string) => void;
  addPropertyToList: (listId: string, property: Property) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'qrCodeScans' | 'linkClicks'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: CustomerInquiry['status']) => void;
  recordTraffic: (source: string) => void;
  incrementPropertyMetric: (id: string, metric: 'views' | 'qrCodeScans' | 'linkClicks') => void;
}

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set) => ({
      properties: [],
      lists: [],
      inquiries: [],
      trafficSources: [],

      createList: (name) =>
        set((state) => ({
          lists: [
            ...state.lists,
            {
              id: nanoid(),
              name,
              properties: [],
              createdAt: Date.now(),
            },
          ],
        })),

      addPropertyToList: (listId, property) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, properties: [...list.properties, property] }
              : list
          ),
        })),

      addProperty: (property) =>
        set((state) => ({
          properties: [
            ...state.properties,
            {
              ...property,
              id: nanoid(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
              views: 0,
              qrCodeScans: 0,
              linkClicks: 0,
            },
          ],
        })),

      updateProperty: (id, updates) =>
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: Date.now() }
              : p
          ),
        })),

      deleteProperty: (id) =>
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
        })),

      addInquiry: (inquiry) =>
        set((state) => ({
          inquiries: [
            ...state.inquiries,
            { ...inquiry, id: nanoid(), createdAt: Date.now() },
          ],
        })),

      updateInquiryStatus: (id, status) =>
        set((state) => ({
          inquiries: state.inquiries.map((i) =>
            i.id === id ? { ...i, status } : i
          ),
        })),

      recordTraffic: (sourceName) =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const existingSource = state.trafficSources.find(
            (s) => s.name === sourceName && s.date === today
          );

          if (existingSource) {
            return {
              trafficSources: state.trafficSources.map((s) =>
                s.id === existingSource.id
                  ? { ...s, visits: s.visits + 1 }
                  : s
              ),
            };
          }

          return {
            trafficSources: [
              ...state.trafficSources,
              {
                id: nanoid(),
                name: sourceName,
                visits: 1,
                date: today,
              },
            ],
          };
        }),

      incrementPropertyMetric: (id, metric) =>
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, [metric]: p[metric] + 1 } : p
          ),
        })),
    }),
    {
      name: 'property-store',
    }
  )
);