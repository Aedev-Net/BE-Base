class TravelService {
    getDefaultTour() {
        return tours[0];
    }

    getDefaultLocation() {
        return locations[0];
    }

    getTour(from, to) {
        from = from && from.trim().toLowerCase();
        to = to && to.trim().toLowerCase();
        const tour = tours.find(t => t.from == from && t.to == to);
        if (tour) return tour;

        return this.getDefaultTour();
    }

    getTourById(id) {
        const tour = tours.find(t => t.id == id);
        if (tour) return tour;

        return this.getDefaultTour();
    }

    getLocation(name) {
        name = name && name.trim().toLowerCase();
        const location = locations.find(l => l.name == name);
        if (location) return location;

        return this.getDefaultLocation();
    }

    getLocationById(id) {
        const location = locations.find(l => l.id == id);
        if (location) return location;

        return this.getDefaultLocation();
    }
}

module.exports = new TravelService();

const tours = [
    {
        id: 0,
        text: `Hiện tại Jury không tìm thấy tour nào như mong muốn của bạn, bạn hãy cho Jury biết một nơi nào khác mà bạn muốn đi du lịch nhé! ;)`,
    },
    {
        id: 1,
        from: 'hà nội',
        to: 'hà giang',
        text: `Tour Hà Nội – Hà Giang 3 ngày 2 đêm\nHành trình đi qua thành phố Hà Giang – Quản Bạ - Yên Minh – Đồng Văn. Chị sẽ có cơ hội đi qua con đường Hạnh Phúc, thăm thung lũng Sủng Là, cổng trời Quản Bạ, thăm nhà của Pao, dinh Vua Mèo cùng nhiều địa điểm và trải nghiệm không thể nào quên.\nNgoài ra, đoàn còn có dịp thưởng thức nhiều món ăn cùng người dân tộc Mông và Dao, giao lưu văn nghệ và trò chuyện thỏa thích. Chị yên tâm, chỗ ăn và ngủ đảm bảo sạch`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 1.980.000 VND/người.'
    },
    {
        id: 2,
        from: 'hà nội',
        to: 'sapa',
        text: `Tour Hà Nội – Sapa 3 ngày 2 đêm\nHành trình đi qua thành phố Sapa – Quản Bạ - Yên Minh – Đồng Văn. Chị sẽ có cơ hội đi qua con đường Hạnh Phúc, thăm thung lũng Sủng Là, cổng trời Quản Bạ, thăm nhà của Pao, dinh Vua Mèo cùng nhiều địa điểm và trải nghiệm không thể nào quên.\nNgoài ra, đoàn còn có dịp thưởng thức nhiều món ăn cùng người dân tộc Mông và Dao, giao lưu văn nghệ và trò chuyện thỏa thích. Chị yên tâm, chỗ ăn và ngủ đảm bảo sạch`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 1.490.000 VND/người.'
    },
    {
        id: 3,
        from: 'hà nội',
        to: 'nha trang',
        text: `Tour Hà Nội – Nha Trang 3 ngày 2 đêm\nDu lịch Nha Trang - Thành phố biển Nha Trang nổi tiếng với những cảnh quan thiên nhiên đẹp “mê hoặc” lòng người, hàng năm thu hút hàng trăm ngàn du khách cả trong và ngoài nước đến thăm quan nghỉ dưỡng. Nếu bạn đang tìm kiếm một chuyến du lịch đúng nghĩa nghỉ dưỡng thì Tour du lịch Nha Trang là sự lựa chọn tuyệt vời dành cho bạn. Đến với Thành phố biển Nha Trang bạn sẽ được thăm quan ngắm cảnh với rất nhiều những danh lam thắng cảnh nổi tiếng, được thử trải nghiệm câu tôm trên thuyền khi mặt trời đã ngả bóng,... Được thưởng thức nhiều món ăn hấp dẫn, cùng khí hậu mát mẻ,... Hứa hẹn đây sẽ là một kỳ nghỉ đầy thú vị và ý nghĩa dành cho bạn.`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 3.490.000 VND/người.'
    },
    {
        id: 4,
        from: 'hà nội',
        to: 'phú quốc',
        text: `Tour Hà Nội – Phú Quốc 3 ngày 2 đêm\nPhú Quốc là quần đảo xinh đẹp nằm sâu trong vùng vịnh Thái Lan, thuộc tỉnh Kiên Giang. Ở vùng biển phía Nam của tổ quốc, đảo Ngọc Phú Quốc – hòn đảo lớn nhất của Việt Nam, cũng là đảo lớn nhất trong quần thể 22 đảo tại đây. Nước biển trong vắt, những dòng suối yên bình cùng nhiều hải sản độc đáo chính là lợi thế tuyệt vời của du lịch Phú Quốc.`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 5.490.000 VND/người.'
    },
    {
        id: 5,
        from: 'hà nội',
        to: 'đà lạt',
        text: `Tour Hà Nội – Đà Lạt 3 ngày 2 đêm\nĐà Lạt là thủ phủ của tỉnh Lâm Đồng. Với độ cao 1.500 m trên mặt nước biển, Đà Lạt tiết trời mát lạnh và là nơi nghỉ dưỡng lý tưởng ở khu vực miền Nam. Từng một thời nổi tiếng với các điểm tham quan như Thung lũng Tình Yêu, Hồ Than Thở, Đồi Thông Hai Mộ, Thác Voi…, Đà Lạt ngày nay không còn giữ được vẻ hoang sơ như xưa. Các điểm tham quan chính hiện nay khi du lịch Đà Lạt gồm có Hồ Xuân Hương, Đỉnh Langbiang, Dinh Bảo Đại, Biệt Điện Trần Lệ Xuân, Thiền Viện Trúc Lâm, Hồ Tuyền Lâm, nhà ga Đà Lạt (Nhà ga Trại Mát)… Chỉ cách Sài Gòn chừng 300km, thành phố Đà Lạt là nơi nghỉ dưỡng tuyệt vời, giúp du khách thoát khỏi cái oi bức nóng nực của vùng đồng bằng Nam Bộ.`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 4.990.000 VND/người.'
    },
    {
        id: 6,
        from: 'đà nẵng',
        to: 'hà giang',
        text: `Tour Đà Nẵng – Hà Giang 3 ngày 2 đêm\nHành trình đi qua thành phố Hà Giang – Quản Bạ - Yên Minh – Đồng Văn. Chị sẽ có cơ hội đi qua con đường Hạnh Phúc, thăm thung lũng Sủng Là, cổng trời Quản Bạ, thăm nhà của Pao, dinh Vua Mèo cùng nhiều địa điểm và trải nghiệm không thể nào quên.\nNgoài ra, đoàn còn có dịp thưởng thức nhiều món ăn cùng người dân tộc Mông và Dao, giao lưu văn nghệ và trò chuyện thỏa thích. Chị yên tâm, chỗ ăn và ngủ đảm bảo sạch`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 1.980.000 VND/người.'
    },
    {
        id: 7,
        from: 'đà nẵng',
        to: 'sapa',
        text: `Tour Đà Nẵng – Sapa 3 ngày 2 đêm\nHành trình đi qua thành phố Sapa – Quản Bạ - Yên Minh – Đồng Văn. Chị sẽ có cơ hội đi qua con đường Hạnh Phúc, thăm thung lũng Sủng Là, cổng trời Quản Bạ, thăm nhà của Pao, dinh Vua Mèo cùng nhiều địa điểm và trải nghiệm không thể nào quên.\nNgoài ra, đoàn còn có dịp thưởng thức nhiều món ăn cùng người dân tộc Mông và Dao, giao lưu văn nghệ và trò chuyện thỏa thích. Chị yên tâm, chỗ ăn và ngủ đảm bảo sạch`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 1.490.000 VND/người.'
    },
    {
        id: 8,
        from: 'đà nẵng',
        to: 'nha trang',
        text: `Tour Đà Nẵng – Nha Trang 3 ngày 2 đêm\nDu lịch Nha Trang - Thành phố biển Nha Trang nổi tiếng với những cảnh quan thiên nhiên đẹp “mê hoặc” lòng người, hàng năm thu hút hàng trăm ngàn du khách cả trong và ngoài nước đến thăm quan nghỉ dưỡng. Nếu bạn đang tìm kiếm một chuyến du lịch đúng nghĩa nghỉ dưỡng thì Tour du lịch Nha Trang là sự lựa chọn tuyệt vời dành cho bạn. Đến với Thành phố biển Nha Trang bạn sẽ được thăm quan ngắm cảnh với rất nhiều những danh lam thắng cảnh nổi tiếng, được thử trải nghiệm câu tôm trên thuyền khi mặt trời đã ngả bóng,... Được thưởng thức nhiều món ăn hấp dẫn, cùng khí hậu mát mẻ,... Hứa hẹn đây sẽ là một kỳ nghỉ đầy thú vị và ý nghĩa dành cho bạn.`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 3.490.000 VND/người.'
    },
    {
        id: 9,
        from: 'đà nẵng',
        to: 'phú quốc',
        text: `Tour Đà Nẵng – Phú Quốc 3 ngày 2 đêm\nPhú Quốc là quần đảo xinh đẹp nằm sâu trong vùng vịnh Thái Lan, thuộc tỉnh Kiên Giang. Ở vùng biển phía Nam của tổ quốc, đảo Ngọc Phú Quốc – hòn đảo lớn nhất của Việt Nam, cũng là đảo lớn nhất trong quần thể 22 đảo tại đây. Nước biển trong vắt, những dòng suối yên bình cùng nhiều hải sản độc đáo chính là lợi thế tuyệt vời của du lịch Phú Quốc.`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 5.490.000 VND/người.'
    },
    {
        id: 10,
        from: 'đà nẵng',
        to: 'đà lạt',
        text: `Tour Đà Nẵng – Đà Lạt 3 ngày 2 đêm\nĐà Lạt là thủ phủ của tỉnh Lâm Đồng. Với độ cao 1.500 m trên mặt nước biển, Đà Lạt tiết trời mát lạnh và là nơi nghỉ dưỡng lý tưởng ở khu vực miền Nam. Từng một thời nổi tiếng với các điểm tham quan như Thung lũng Tình Yêu, Hồ Than Thở, Đồi Thông Hai Mộ, Thác Voi…, Đà Lạt ngày nay không còn giữ được vẻ hoang sơ như xưa. Các điểm tham quan chính hiện nay khi du lịch Đà Lạt gồm có Hồ Xuân Hương, Đỉnh Langbiang, Dinh Bảo Đại, Biệt Điện Trần Lệ Xuân, Thiền Viện Trúc Lâm, Hồ Tuyền Lâm, nhà ga Đà Lạt (Nhà ga Trại Mát)… Chỉ cách Sài Gòn chừng 300km, thành phố Đà Lạt là nơi nghỉ dưỡng tuyệt vời, giúp du khách thoát khỏi cái oi bức nóng nực của vùng đồng bằng Nam Bộ.`,
        promotion: 'Jury đang có chương trình đặc biệt cho khách đi 2 người trở lên, chỉ với giá 4.990.000 VND/người.'
    },
    
];

const locations = [
    {
        id: 0,
        text: `Hiện tại Jury chưa cập nhật dữ liệu về địa điểm này. Bạn hãy cho Jury biết địa điểm khác mà bạn muốn tìm hiểu nhé! ;)`
    },
    {
        id: 1,
        name: 'con đường hạnh phúc',
        text: `Con Đường Hạnh Phúc là một trong những con đường đẹp và thơ mộng nhất Việt Nam, có chiều dài 185 km và đi qua Quản Bạ, Yên Minh, Đồng Văn và Mèo Vạc.`
    },
    {
        id: 2,
        name: 'thung lũng tình yêu',
        text: `Thung lũng Tình yêu là một trong những thắng cảnh thơ mộng nhất tại Đà Lạt, cách trung tâm thành phố khoảng 5 km về phía bắc. Đó là nơi đập Đa Thiện quy tụ những dòng suối nhỏ chảy từ đồi núi cao, thành hồ Đa Thiện trong vắt uốn quanh thung lũng rợp bóng thông xanh.`
    },
]