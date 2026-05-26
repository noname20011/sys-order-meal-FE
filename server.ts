import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(bodyParser.json({ limit: '10mb' }));

  // Mock database for the demo
  // In a real app, this would interact with Google Sheets or Firebase
  const mockDb = {
    menu: [
      { id: 1, weekday: "T2", mealType: "Sáng", dishName: "Rau củ luộc", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 2, weekday: "T2", mealType: "Trưa", dishName: "Cơm ức gà bí xanh", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 3, weekday: "T2", mealType: "Chiều", dishName: "Salad ức gà", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },

      { id: 4, weekday: "T3", mealType: "Sáng", dishName: "Protein luộc", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 5, weekday: "T3", mealType: "Trưa", dishName: "Cơm bò áp chảo cải thìa", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 6, weekday: "T3", mealType: "Chiều", dishName: "Salad bò trái cây", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },

      { id: 7, weekday: "T4", mealType: "Sáng", dishName: "Protein luộc", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 8, weekday: "T4", mealType: "Trưa", dishName: "Cơm bò áp chảo cải thìa", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 9, weekday: "T4", mealType: "Chiều", dishName: "Salad bò trái cây", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },

      { id: 10, weekday: "T5", mealType: "Sáng", dishName: "Protein luộc", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 11, weekday: "T5", mealType: "Trưa", dishName: "Cơm bò áp chảo cải thìa", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 12, weekday: "T5", mealType: "Chiều", dishName: "Salad bò trái cây", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },

      { id: 13, weekday: "T6", mealType: "Sáng", dishName: "Protein luộc", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 14, weekday: "T6", mealType: "Trưa", dishName: "Cơm bò áp chảo cải thìa", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 15, weekday: "T6", mealType: "Chiều", dishName: "Salad bò trái cây", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },

      { id: 16, weekday: "T7", mealType: "Sáng", dishName: "Protein luộc", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 17, weekday: "T7", mealType: "Trưa", dishName: "Cơm bò áp chảo cải thìa", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
      { id: 18, weekday: "T7", mealType: "Chiều", dishName: "Salad bò trái cây", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" },
    ],
    districts: [
      { id:"q_1", name: 'Quận 1', fee: 20000 },
      { id:"q_3", name: 'Quận 3', fee: 20000 },
      { id:"q_7", name: 'Quận 7', fee: 35000 },
      { id:"q_tb", name: 'Tân Bình', fee: 15000 },
    ],
    customers: [
      { phone: "0921253335", fullName: "My", address: "Chung Cư 316, 21, Phú Hoà, p8, tân bình", district: "Tân Bình" }
    ],
    orders: [] as any[]
  };

  // API Routes
  app.get("/api/data", (req, res) => {
    res.json({
      menu: mockDb.menu,
      districts: mockDb.districts,
      customers: mockDb.customers
    });
  });

  app.get("/api/orders", (req, res) => {
    res.json(mockDb.orders);
  });

  app.get("/api/analytics", (req, res) => {
    // Generate some mock analytics data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
        revenue: Math.floor(Math.random() * 5000000) + 1000000,
        orders: Math.floor(Math.random() * 50) + 10
      };
    }).reverse();

    const topDishes = [
      { name: "Cơm ức gà bí xanh", sales: 156 },
      { name: "Salad cá hồi", sales: 124 },
      { name: "Pasta tôm xoài", sales: 98 },
      { name: "Bún gạo lứt trộn", sales: 87 },
      { name: "Sandwich bò áp chảo", sales: 76 }
    ];

    res.json({ dayData: last7Days, topDishes });
  });

  app.get("/api/customer/:phone", (req, res) => {
    const customer = mockDb.customers.find(c => c.phone === req.params.phone);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  });

  app.post("/api/order", (req, res) => {
    const order = {
      orderId: `DH${Date.now()}`,
      orderDate: new Date().toISOString(),
      ...req.body,
      status: "Pending"
    };
    mockDb.orders.push(order);
    console.log("New order received:", order.orderId);
    res.json({ success: true, orderId: order.orderId });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
