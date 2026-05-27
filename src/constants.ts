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
  { idWeek: "week", idDay: "5-days", idMeal: "2-meals", price: 450000},
  { idWeek: "week", idDay: "5-days", idMeal: "3-meals", price: 650000},

  { idWeek: "week", idDay: "6-days", idMeal: "1-meal", price: 300000},
  { idWeek: "week", idDay: "6-days", idMeal: "2-meals", price: 480000},
  { idWeek: "week", idDay: "6-days", idMeal: "3-meals", price: 700000},

  { idWeek: "month", idDay: "5-days", idMeal: "1-meal", price: 950000},
  { idWeek: "month", idDay: "5-days", idMeal: "2-meals", price: 1600000},
  { idWeek: "month", idDay: "5-days", idMeal: "3-meals", price: 2300000},

  { idWeek: "month", idDay: "6-days", idMeal: "1-meal", price: 1000000},
  { idWeek: "month", idDay: "6-days", idMeal: "2-meals", price: 1750000},
  { idWeek: "month", idDay: "6-days", idMeal: "3-meals", price: 2500000},
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
  { id: "q_1", name: "Quận 1" },
  { id: "q_2", name: "Quận 2" },
  { id: "q_3", name: "Quận 3" },
  { id: "q_4", name: "Quận 4" },
  { id: "q_5", name: "Quận 5" },
  { id: "q_6", name: "Quận 6" },
  { id: "q_7", name: "Quận 7" },
  { id: "q_8", name: "Quận 8" },
  { id: "q_10", name: "Quận 10" },
  { id: "q_11", name: "Quận 11" },
  { id: "q_12", name: "Quận 12" },

  { id: "q_tb", name: "Quận Tân Bình" },
  { id: "q_tp", name: "Quận Tân Phú" },
  { id: "q_bt", name: "Quận Bình Thạnh" },
  { id: "q_pn", name: "Quận Phú Nhuận" },
  { id: "q_gv", name: "Quận Gò Vấp" },
  { id: "q_btan", name: "Quận Bình Tân" },

  { id: "tp_td", name: "TP Thủ Đức" },

  { id: "h_bc", name: "Huyện Bình Chánh" },
  { id: "h_cc", name: "Huyện Củ Chi" },
  { id: "h_hm", name: "Huyện Hóc Môn" },
  { id: "h_nb", name: "Huyện Nhà Bè" },
  { id: "h_cg", name: "Huyện Cần Giờ" },
];

export const MOCK_MEAL_DATA: MenuItem[] = [
      { id: 1, weekday: "T2", mealType: "Sáng", dishName: "Ức gà áp chảo", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779783864/ucgaapchao_lb4rlb.png", price: 100000 },
      { id: 2, weekday: "T2", mealType: "Trưa", dishName: "Cơm ức gà bầu luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784625/comucgavabauluoc_szw0fx.png", price: 100000 },
      { id: 3, weekday: "T2", mealType: "Chiều", dishName: "Salad ức gà", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784495/saladucga_nyoryq.png", price: 100000 },

      { id: 4, weekday: "T3", mealType: "Sáng", dishName: "Protein luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784844/PROTEINLUOC_dvzojp.png", price: 100000 },
      { id: 5, weekday: "T3", mealType: "Trưa", dishName: "Cơm bò áp chảo cải thìa", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779785031/comboapchaocaithia_arjqzb.png", price: 100000 },
      { id: 6, weekday: "T3", mealType: "Chiều", dishName: "Salad bò trứng", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779785349/saladbotrung_kyyzk0.png", price: 100000 },

      { id: 7, weekday: "T4", mealType: "Sáng", dishName: "Salad tôm trứng", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779785646/saladtomtrung_ogzeul.png", price: 100000 },
      { id: 8, weekday: "T4", mealType: "Trưa", dishName: "Cơm tôm trứng bông cải luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779785812/comtomtrungbongcailuoc_uc3elc.png", price: 100000 },
      { id: 9, weekday: "T4", mealType: "Chiều", dishName: "Tôm áp chảo", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779786286/tomapchao_lalfw4.png", price: 100000 },

      { id: 10, weekday: "T5", mealType: "Sáng", dishName: "Protein luộc + sữa chua", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779787013/proteinluoc_suachua_cpxrr0.png", price: 100000 },
      { id: 11, weekday: "T5", mealType: "Trưa", dishName: "Bún gạo lứt gà khô", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779787172/bungaolutgakho_jbbuec.png", price: 100000 },
      { id: 12, weekday: "T5", mealType: "Chiều", dishName: "Ức gà áp chảo", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779783864/ucgaapchao_lb4rlb.png", price: 100000 },

      { id: 13, weekday: "T6", mealType: "Sáng", dishName: "Salad cá ngừ", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779787498/saladcangu_gfnhbr.png", price: 100000 },
      { id: 14, weekday: "T6", mealType: "Trưa", dishName: "Cơm cá rau luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779787785/comcarauluoc_jzfahd.png", price: 100000 },
      { id: 15, weekday: "T6", mealType: "Chiều", dishName: "Cá áp chảo rau củ", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779788184/caapchaoraucu_en3fdn.png", price: 100000 },

      { id: 16, weekday: "T7", mealType: "Sáng", dishName: "Protein luộc", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779784844/PROTEINLUOC_dvzojp.png", price: 100000 },
      { id: 17, weekday: "T7", mealType: "Trưa", dishName: "Bún gạo lứt tôm trứng", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779788787/bungaoluttomtrungv1_tne8rv.png", price: 100000 },
      { id: 18, weekday: "T7", mealType: "Chiều", dishName: "Tôm áp chảo rau củ", image: "https://res.cloudinary.com/dst8bybiw/image/upload/v1779788970/tomapchaoraucu_fcuplx.png", price: 100000 },
    ];

export const TIME_DELIVERY = [
  { id:"7:00", name: '7:00' },
  { id:"8:00", name: '8:00' },
  { id:"9:00", name: '9:00' },
  { id:"10:00", name: '10:00' },
  { id:"11:00", name: '11:00' },
  { id:"12:00", name: '12:00' },
  { id:"13:00", name: '13:00' },
  { id:"14:00", name: '14:00' },
];