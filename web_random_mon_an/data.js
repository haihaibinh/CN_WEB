// Danh mục món ăn và chi tiết từng món
// Kèm theo hình ảnh Unsplash chất lượng cao và tags gợi ý
const DEFAULT_FOOD_DATA = {
  "com": {
    name: "Cơm",
    icon: "🍚",
    color: "#F59E0B",
    bgGradient: "from-amber-500 to-orange-600",
    description: "Chắc bụng, chuẩn vị bữa cơm Việt ấm cúng",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    tags: ["trua", "toi", "binh_dan"],
    items: [
      {
        name: "Cơm Tấm Sườn Bì Chả",
        desc: "Hạt tấm dẻo bùi, sườn nướng mỡ hành thơm phức kèm chả trứng hấp dẫn.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
        calories: "~650 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Cơm Gà Xối Mỡ",
        desc: "Đùi gà da giòn rụm, cơm rang nghệ vàng ươm ăn kèm dưa leo muối chua.",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
        calories: "~720 kcal",
        meal: ["trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Cơm Rang Dưa Bò",
        desc: "Cơm chiên săn giòn, thịt bò mềm ngọt xào cùng dưa chua đậm đà chuẩn vị phố cổ.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
        calories: "~580 kcal",
        meal: ["trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Cơm Niêu Singapore / Kho Quẹt",
        desc: "Cơm cháy đáy niêu giòn rụm, chấm kho quẹt tóp mỡ đậm đà béo ngậy.",
        image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80",
        calories: "~600 kcal",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Cơm Thố Xá Xíu Bò",
        desc: "Cơm thố nóng hổi giòn rụm đáy thố, thịt xá xíu đậm vị thơm lừng.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        calories: "~630 kcal",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      }
    ]
  },
  "pho": {
    name: "Phở",
    icon: "🍜",
    color: "#EF4444",
    bgGradient: "from-rose-500 to-red-600",
    description: "Quốc hồn quốc túy, nước dùng ngọt thanh từ xương",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
    tags: ["sang", "trua", "toi", "binh_dan"],
    items: [
      {
        name: "Phở Bò Tái Nạm Gầu",
        desc: "Thịt bò tươi mềm, gầu giòn ngậy, nước dùng thanh ngọt hầm nhiều giờ kèm quẩy giòn.",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
        calories: "~550 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Phở Gà Ta Chặt Miếng",
        desc: "Gà ta thả vườn da vàng óng giòn sần sật, lá chanh thái chỉ thơm ngát mũi.",
        image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80",
        calories: "~480 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Phở Bò Sốt Vang",
        desc: "Thịt bắp bò ninh nhừ đậm vị thảo mộc và rượu vang, sốt sền sệt màu đỏ bắt mắt.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        calories: "~600 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Phở Trộn Chua Ngọt",
        desc: "Bánh phở mềm dai quyện cùng sốt chua ngọt, đậu phộng rang giòn và hành phi thơm lừng.",
        image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
        calories: "~520 kcal",
        meal: ["trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Phở Cuốn Hà Nội",
        desc: "Bánh phở trắng mịn cuốn thịt bò xào lăn, rau thơm, chấm mắm chua ngọt thanh tao.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
        calories: "~420 kcal",
        meal: ["trua", "toi", "an_vat"],
        budget: "binh_dan"
      }
    ]
  },
  "my": {
    name: "Mỳ",
    icon: "🍝",
    color: "#EAB308",
    bgGradient: "from-yellow-500 to-amber-600",
    description: "Sợi dai thơm, đủ phong cách từ Á sang Âu",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
    tags: ["sang", "trua", "toi", "binh_dan", "tam_trung"],
    items: [
      {
        name: "Mỳ Vằn Thắn Thập Cẩm",
        desc: "Sủi cảo mềm mọng, xá xíu đỏ au, trứng luộc, sợi mỳ tươi vàng dai trong nước lèo tôm khô.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        calories: "~530 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Mỳ Cay 7 Cấp Độ Hàn Quốc",
        desc: "Nước dùng chua cay bùng nổ, topping tôm mực, bò Mỹ, xúc xích và nấm kim châm giải ngấy.",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        calories: "~620 kcal",
        meal: ["trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Mỳ Ý Sốt Bò Bằm Bolognese",
        desc: "Mỳ Spaghetti dai al-dente quyện sốt cà chua thịt bò bằm đậm đà rắc phô mai parmesan.",
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=600&q=80",
        calories: "~580 kcal",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Mỳ Ramen Nhật Bản",
        desc: "Nước dùng Tonkotsu béo ngậy ninh từ xương heo, thịt xá xíu mềm tan và trứng lòng đào ngâm tương.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        calories: "~680 kcal",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Mỳ Quảng Tôm Thịt",
        desc: "Sợi mỳ dày dặn, tôm thịt kho thấm vị, bánh tráng nướng giòn tan và đậu phộng bùi béo.",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
        calories: "~510 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      }
    ]
  },
  "bun": {
    name: "Bún",
    icon: "🍲",
    color: "#10B981",
    bgGradient: "from-emerald-500 to-teal-600",
    description: "Đa dạng hương vị, thanh mát dễ ăn suốt bốn mùa",
    image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80",
    tags: ["sang", "trua", "toi", "binh_dan"],
    items: [
      {
        name: "Bún Bò Huế Đậm Đà",
        desc: "Nước dùng cay nồng thơm mùi sả mắm ruốc, bắp bò hoa, chả cua giòn ngọt cùng tiết luộc mướt.",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
        calories: "~580 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Bún Đậu Mắm Tôm",
        desc: "Mẹt bún tươi, đậu mơ rán giòn vỏ mềm trong, chả cốm dẻo thơm chấm mắm tôm sủi bọt đánh chanh ớt.",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        calories: "~650 kcal",
        meal: ["trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Bún Chả Hà Nội",
        desc: "Chả viên chả miếng nướng than hoa thơm lừng chấm bát nước mắm chua ngọt đu đủ giòn sần sật.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
        calories: "~600 kcal",
        meal: ["trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Bún Riêu Cua Bắp Bò",
        desc: "Gạch cua đồng béo ngậy, cà chua đỏ mọng, vị chua thanh từ dấm bỗng kèm giò tai giòn sần sật.",
        image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80",
        calories: "~520 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Bún Hải Sản Chua Cay",
        desc: "Tôm tươi, mực giòn, bề bề ngọt thịt chan nước lẩu thái chua cay đã miệng.",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
        calories: "~490 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      }
    ]
  },
  "mien": {
    name: "Miến",
    icon: "🥣",
    color: "#06B6D4",
    bgGradient: "from-cyan-500 to-blue-600",
    description: "Sợi dong trong veo, dẻo dai nhẹ bụng",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    tags: ["sang", "trua", "toi", "binh_dan"],
    items: [
      {
        name: "Miến Lươn Giòn / Xào Miến",
        desc: "Lươn chiên giòn tan ngập trong nước dùng ngọt đậm đà, ăn kèm rau răm thơm nồng ấm bụng.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        calories: "~460 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Miến Ngan Nấu Măng Cay",
        desc: "Thịt ngan luộc ngọt béo chấm muối ớt chanh hạt dổi, măng chua cay nồng đậm đà khó cưỡng.",
        image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80",
        calories: "~510 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Miến Xào Cua Bể",
        desc: "Thịt cua bể tươi gỡ ngọt lịm, xào tơi cùng sợi miến dong ngấm sốt mộc nhĩ nấm hương.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        calories: "~540 kcal",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Miến Gà Ta Lá Chanh",
        desc: "Sợi miến dai mềm thanh mát chan nước gà ngọt dịu, nấm hương thơm lừng cho bữa sáng lành mạnh.",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
        calories: "~430 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      }
    ]
  },
  "lau": {
    name: "Lẩu",
    icon: "🍲",
    color: "#F97316",
    bgGradient: "from-orange-500 to-red-600",
    description: "Nồi nước sôi sùng sục, ấm cúng tụ tập bè bạn",
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80",
    tags: ["trua", "toi", "tam_trung", "sang_chanh"],
    items: [
      {
        name: "Lẩu Thái Tom Yum Chua Cay",
        desc: "Hương vị sả, lá chanh chúc kaffir, cốt dừa béo bùi cùng hải sản tươi sống, bò ba chỉ ngọt lịm.",
        image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80",
        calories: "~750 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Lẩu Riêu Cua Bắp Bò Sườn Sụn",
        desc: "Gạch cua nổi kín mặt nồi, giấm bỗng chua dịu ngọt, sườn sụn ninh mềm giòn sần sật.",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        calories: "~700 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Lẩu Nấm Chim Kê Thanh Đạm",
        desc: "Hàng chục loại nấm quý tươi giòn, nước dùng ninh xương gà thuốc bắc thanh ngọt bổ dưỡng.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        calories: "~580 kcal/người",
        meal: ["trua", "toi"],
        budget: "sang_chanh"
      },
      {
        name: "Lẩu Bò Nhúng Dấm",
        desc: "Bắp bò tươi mềm nhúng trong nước dấm gạo thơm nồng vị dừa tươi, cuốn bánh tráng rau rừng chấm mắm nêm.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
        calories: "~680 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Lẩu Ếch Măng Cay",
        desc: "Thịt đùi ếch xào săn vàng ruộm quyện măng củ cay nồng, nồi nước dùng cay tê kích thích vị giác.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
        calories: "~690 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      }
    ]
  },
  "nuong": {
    name: "Nướng",
    icon: "🥩",
    color: "#DC2626",
    bgGradient: "from-rose-600 to-red-700",
    description: "Xèo xèo bốc khói, thịt mọng nước thơm nức mũi",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    tags: ["trua", "toi", "tam_trung", "sang_chanh"],
    items: [
      {
        name: "Thịt Nướng BBQ Hàn Quốc",
        desc: "Ba chỉ bò hoa, dẻ sườn ướp sốt Galbi nướng than hoa, cuộn xà lách kim chi chấm sốt ssamjang cay ngọt.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
        calories: "~850 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Nầm Bò Nướng Chảo Bơ Gắt Gao",
        desc: "Nầm sữa bò giòn sần sật tẩm ướp ngũ vị, nướng trên chảo bơ thơm lừng chấm sốt me chua ngọt.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
        calories: "~780 kcal/người",
        meal: ["toi"],
        budget: "binh_dan"
      },
      {
        name: "Bò Tảng Nướng Phô Mai Kéo Sợi",
        desc: "Thịt thăn bò mềm nguyên tảng nướng chín tái, phủ lớp phô mai béo ngậy tan chảy sốt tiêu đen.",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80",
        calories: "~820 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Hải Sản Nướng Mỡ Hành Muối Ớt",
        desc: "Hàu nướng mỡ hành đậu phộng béo bùi, tôm hùm nướng mọi, mực trứng nướng muối ớt xanh thơm lừng.",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
        calories: "~620 kcal/người",
        meal: ["toi"],
        budget: "sang_chanh"
      }
    ]
  },
  "do_chay": {
    name: "Đồ Chay",
    icon: "🥗",
    color: "#16A34A",
    bgGradient: "from-green-500 to-emerald-600",
    description: "Thanh tịnh nhẹ nhàng, tốt cho sức khỏe và tâm hồn",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    tags: ["sang", "trua", "toi", "binh_dan", "tam_trung"],
    items: [
      {
        name: "Cơm Chay Thập Cẩm Thanh Đạm",
        desc: "Sườn non chay rim mắm ngọt, nấm đùi gà kho tiêu, đậu hũ non sốt nấm hương và canh rong biển thanh mát.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        calories: "~450 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Phở Nấm Chay Nước Dùng Rau Củ",
        desc: "Nước dùng hầm từ củ cải, lê, bắp ngọt thanh tự nhiên, phối hợp đa dạng nấm tươi giòn dai.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        calories: "~380 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Lẩu Nấm Chay Thực Dưỡng",
        desc: "Nước lẩu táo đỏ kỷ tử thơm ngọt dịu, nhúng thả các loại rau củ đồng nội và đậu phụ tươi mềm mướt.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        calories: "~490 kcal/người",
        meal: ["trua", "toi"],
        budget: "tam_trung"
      },
      {
        name: "Bún Huế Chay Nấm & Chả Đậu Hũ",
        desc: "Nước sả thơm lừng thoang thoảng chút tương hạt điều, bún sợi dai kèm nấm đông cô đậm đà vị chay thuần khiết.",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80",
        calories: "~420 kcal",
        meal: ["sang", "trua", "toi"],
        budget: "binh_dan"
      },
      {
        name: "Salad Rong Nho & Trái Cây Sốt Mè Rang",
        desc: "Rong nho biển tươi giòn nổ lách tách trong miệng quyện sốt mè rang bùi béo và rau xanh giòn rụm.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        calories: "~320 kcal",
        meal: ["trua", "toi", "an_vat"],
        budget: "binh_dan"
      }
    ]
  }
};
