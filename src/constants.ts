import { Weekday, MealType, MenuItem, UserChoosePackage } from './types';

export const WEEKDAYS: Weekday[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export const MEAL_TYPES: MealType[] = ['Sáng', 'Trưa', 'Chiều'];

export const TIMEFRAMES = [
  { id: 'week', label: '1 Tuần', weeks: 1, description: 'Thích hợp ăn thử, trải nghiệm' },
  { id: 'month', label: '1 Tháng', weeks: 4, description: 'Lựa chọn dài hạn, tiết kiệm hơn' },
];

export const DURATIONS = [
  { id: '5-days', label: '5 Ngày/Tuần', days: 5, description: 'Thứ 2 đến Thứ 6' },
  { id: '6-days', label: '6 Ngày/Tuần', days: 6, description: 'Thứ 2 đến Thứ 7' },
];

export const MEAL_COUNTS = [
  { id: '1-meal', label: '1 Bữa/ngày', count: 1, description: 'Hỗ trợ một bữa ăn healthy' },
  { id: '2-meals', label: '2 Bữa/ngày', count: 2, description: 'Chế độ dinh dưỡng tối ưu' },
  { id: '3-meals', label: '3 Bữa/ngày', count: 3, description: 'Dinh dưỡng chuyên nghiệp toàn diện' },
];

export const USER_CHOOSE_PACKAGE: UserChoosePackage[] = [
  { idWeek: "week", idDay: "5-days", idMeal: "1-meal", price: 280000},
  { idWeek: "week", idDay: "5-days", idMeal: "2-meals", price: 510000},
  { idWeek: "week", idDay: "5-days", idMeal: "3-meals", price: 790000},

  { idWeek: "week", idDay: "6-days", idMeal: "1-meal", price: 300000},
  { idWeek: "week", idDay: "6-days", idMeal: "2-meals", price: 550000},
  { idWeek: "week", idDay: "6-days", idMeal: "3-meals", price: 840000},

  { idWeek: "month", idDay: "5-days", idMeal: "1-meal", price: 1050000},
  { idWeek: "month", idDay: "5-days", idMeal: "2-meals", price: 1900000},
  { idWeek: "month", idDay: "5-days", idMeal: "3-meals", price: 3100000},

  { idWeek: "month", idDay: "6-days", idMeal: "1-meal", price: 1150000},
  { idWeek: "month", idDay: "6-days", idMeal: "2-meals", price: 2100000},
  { idWeek: "month", idDay: "6-days", idMeal: "3-meals", price: 3300000},
]

export const AVG_MEAL_PRICE = 50000;

export const COLORS = ['#4f772d', '#90a955', '#ecf39e', '#e07a5f', '#f2cc8f'];

export const MENU_COORDINATES = [
  // THỨ 2 (T2)
  { day: 'T2', meal: 'Sáng', top: '22%', left: '10.8%', width: '28%', height: '10.4%' },
  { day: 'T2', meal: 'Trưa', top: '22%', left: '39%', width: '28%', height: '10.4%' },
  { day: 'T2', meal: 'Chiều', top: '22%', left: '68.0%', width: '28%', height: '10.4%' },

  // THỨ 3 (T3)
  { day: 'T3', meal: 'Sáng', top: '32.8%', left: '10.8%', width: '28%', height: '10.4%' },
  { day: 'T3', meal: 'Trưa', top: '32.8%', left: '39%', width: '28%', height: '10.4%' },
  { day: 'T3', meal: 'Chiều', top: '32.8%', left: '68.0%', width: '29%', height: '10.4%' },

  // THỨ 4 (T4)
  { day: 'T4', meal: 'Sáng', top: '43.6%', left: '10.8%', width: '28%', height: '10.4%' },
  { day: 'T4', meal: 'Trưa', top: '43.6%', left: '39%', width: '28%', height: '10.4%' },
  { day: 'T4', meal: 'Chiều', top: '43.6%', left: '68.0%', width: '28%', height: '10.4%' },

  // THỨ 5 (T5)
  { day: 'T5', meal: 'Sáng', top: '54.3%', left: '10.8%', width: '28%', height: '10.4%' },
  { day: 'T5', meal: 'Trưa', top: '54.3%', left: '39%', width: '28%', height: '10.4%' },
  { day: 'T5', meal: 'Chiều', top: '54.3%', left: '68.0%', width: '28%', height: '10.4%' },

  // THỨ 6 (T6)
  { day: 'T6', meal: 'Sáng', top: '65.5%', left: '10.8%', width: '28%', height: '10.4%' },
  { day: 'T6', meal: 'Trưa', top: '65.5%', left: '39%', width: '28%', height: '10.4%' },
  { day: 'T6', meal: 'Chiều', top: '65.5%', left: '68.0%', width: '28%', height: '10.4%' },

  // THỨ 7 (T7)
  { day: 'T7', meal: 'Sáng', top: '76.4%', left: '10.8%', width: '28%', height: '10.4%' },
  { day: 'T7', meal: 'Trưa', top: '76.4%', left: '39%', width: '28%', height: '10.4%' },
  { day: 'T7', meal: 'Chiều', top: '76.4%', left: '68.0%', width: '28%', height: '10.4%' },
];

export const DISTRICT_FEES = [
  { id: "Quận 1", name: "Quận 1" },
  { id: "Quận 2", name: "Quận 2" },
  { id: "Quận 3", name: "Quận 3" },
  { id: "Quận 4", name: "Quận 4" },
  { id: "Quận 5", name: "Quận 5" },
  { id: "Quận 6", name: "Quận 6" },
  { id: "Quận 7", name: "Quận 7" },
  { id: "Quận 8", name: "Quận 8" },
  { id: "Quận 10", name: "Quận 10" },
  { id: "Quận 11", name: "Quận 11" },
  { id: "Quận 12", name: "Quận 12" },

  { id: "Q.Tân Bình", name: "Q.Tân Bình" },
  { id: "Q.Tân Phú", name: "Q.Tân Phú" },
  { id: "Q.Bình Thạnh", name: "Q.Bình Thạnh" },
  { id: "Q.Phú Nhuận", name: "Q.Phú Nhuận" },
  { id: "Q.Gò Vấp", name: "Q.Gò Vấp" },
  { id: "Q.Bình Tân", name: "Q.Bình Tân" },

  { id: "TP Thủ Đức", name: "TP Thủ Đức" },

  { id: "H.Bình Chánh", name: "H.Bình Chánh" },
  { id: "H.Củ Chi", name: "H.Củ Chi" },
  { id: "H.Hóc Môn", name: "H.Hóc Môn" },
  { id: "H.Nhà Bè", name: "H.Nhà Bè" },
  { id: "H.Cần Giờ", name: "H.Cần Giờ" },
];

export const MOCK_MEAL_DATA: MenuItem[] = [
      { id: 1, weekday: "T2", mealType: "Sáng", dishName: "Salad ức gà", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784495/saladucga_nyoryq.png", price: 100000 },
      { id: 2, weekday: "T2", mealType: "Trưa", dishName: "Cơm gạo lứt ức gà, nấm", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1783350221/comgaolutucgasotnam_ahxwj9.png", price: 100000 },
      { id: 3, weekday: "T2", mealType: "Chiều", dishName: "Ức gà áp chảo rau củ", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1780851010/ucgaapchaobongcai_qribdw.png", price: 100000 },

      { id: 4, weekday: "T3", mealType: "Sáng", dishName: "Protein luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784844/PROTEINLUOC_dvzojp.png", price: 100000 },
      { id: 5, weekday: "T3", mealType: "Trưa", dishName: "Cơm gạo lứt tôm bông cải", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1783350221/comgaoluttombongcai_egb19n.png", price: 100000 },
      { id: 6, weekday: "T3", mealType: "Chiều", dishName: "Salad tôm trứng", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779785646/saladtomtrung_ogzeul.png", price: 100000 },

      { id: 7, weekday: "T4", mealType: "Sáng", dishName: "Salad cá ngừ", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779787498/saladcangu_gfnhbr.png", price: 100000 },
      { id: 8, weekday: "T4", mealType: "Trưa", dishName: "Cơm gạo lứt cá basa", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1783350221/comgaolutcabasa_okbgf5.png", price: 100000 },
      { id: 9, weekday: "T4", mealType: "Chiều", dishName: "Cá basa áp chảo", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779788184/caapchaoraucu_en3fdn.png", price: 100000 },

      { id: 10, weekday: "T5", mealType: "Sáng", dishName: "Protein luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784844/PROTEINLUOC_dvzojp.png", price: 100000 },
      { id: 11, weekday: "T5", mealType: "Trưa", dishName: "Bún gạo lứt nước tương bò khô", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1783350221/bungaolutnuoctuongbokho_ifkkzo.png", price: 100000 },
      { id: 12, weekday: "T5", mealType: "Chiều", dishName: "Bò áp chảo bí đỏ", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1781522310/boapchaobido_j985nb.png", price: 100000 },

      { id: 13, weekday: "T6", mealType: "Sáng", dishName: "Chả ức gà áp chảo", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1783351063/chaucgaapchao_gam5uc.png", price: 100000 },
      { id: 14, weekday: "T6", mealType: "Trưa", dishName: "Cơm gạo lứt chả ức gà sốt tiêu", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1783350993/comgaolutchaucgasottieu_nkvugy.png", price: 100000 },
      { id: 15, weekday: "T6", mealType: "Chiều", dishName: "Salad ức gà", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784495/saladucga_nyoryq.png", price: 100000 },
      
      { id: 16, weekday: "T7", mealType: "Sáng", dishName: "Protein luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784844/PROTEINLUOC_dvzojp.png", price: 100000 },
      { id: 17, weekday: "T7", mealType: "Trưa", dishName: "Bún gạo lứt chả cá khô", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1781522309/bungaolutchaca_nb38s8.png", price: 100000 },
      { id: 18, weekday: "T7", mealType: "Chiều", dishName: "Chả cá áp chảo", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1780851010/chacaapchao_qqnmdc.png", price: 100000 },
    ];

export const TIME_DELIVERY = [
  { id:"7:00", name: '7:00' },
  { id:"7:30", name: '7:30' },
  { id:"8:00", name: '8:00' },
  { id:"8:30", name: '8:30' },
  { id:"9:00", name: '9:00' },
  { id:"9:30", name: '9:30' },
  { id:"10:00", name: '10:00' },
  { id:"10:30", name: '10:30' },
  { id:"11:00", name: '11:00' },
  { id:"11:30", name: '11:30' },
  { id:"12:00", name: '12:00' },
  { id:"12:30", name: '12:30' },
  { id:"13:00", name: '13:00' },
  { id:"13:30", name: '13:30' },
  { id:"14:00", name: '14:00' },
];