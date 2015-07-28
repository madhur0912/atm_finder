allSites = [];
filteredSite = [];
districts = [];
subDistricts = [];
services = [];
symbols = [];

per_outlet = "outlet_";
per_service = "service_";


	symbols['ABC'] = 'ABC';
	services.push({ Code: 'ABC', Symbol: 'ABC', Name: '自助理財中心', Remark: '' });


	symbols['CHQ'] = 'CHQ';
	services.push({ Code: 'CHQ', Symbol: 'CHQ', Name: '存票快入票機', Remark: '截票時間' });


	symbols['ATM'] = 'ATM';
	services.push({ Code: 'ATM', Symbol: 'ATM', Name: '自動櫃員機', Remark: '*人民幣' });


	symbols['SDB'] = 'SDB';
	services.push({ Code: 'SDB', Symbol: 'SDB', Name: '保管箱服務', Remark: '' });


	symbols['CDM'] = 'CDM';
	services.push({ Code: 'CDM', Symbol: 'CDM', Name: '存款快入數機', Remark: '' });


	symbols['SEC'] = 'SEC';
	services.push({ Code: 'SEC', Symbol: 'SEC', Name: '證券服務', Remark: '' });



			
			var sDistricts = [];

				sDistricts.push({ Code: 'H01', Name: '中西區', Remark: '包括金鐘及半山', hasSite: false });

				sDistricts.push({ Code: 'H02', Name: '灣仔', Remark: '包括銅鑼灣及跑馬地', hasSite: false });

				sDistricts.push({ Code: 'H03', Name: '東區', Remark: '由天后至柴灣', hasSite: false });

				sDistricts.push({ Code: 'H04', Name: '南區', Remark: '包括香港仔及鴨脷洲', hasSite: false });

			districts.push({ Code: 'D01', Name: '香港島', hasSite: false, SubDistricts: sDistricts });
			
			var sDistricts = [];

				sDistricts.push({ Code: 'K01', Name: '油尖旺', Remark: '包括油麻地，尖沙咀，旺角及大角咀', hasSite: false });

				sDistricts.push({ Code: 'K02', Name: '深水埗', Remark: '包括長沙灣及美孚', hasSite: false });

				sDistricts.push({ Code: 'K03', Name: '九龍城', Remark: '包括紅磡，九龍塘，黃埔及土瓜灣', hasSite: false });

			districts.push({ Code: 'D02', Name: '九龍西', hasSite: false, SubDistricts: sDistricts });
			
			var sDistricts = [];

				sDistricts.push({ Code: 'K04', Name: '黃大仙', Remark: '包括樂富，新蒲崗及慈雲山', hasSite: false });

				sDistricts.push({ Code: 'K05', Name: '觀塘', Remark: '包括九龍灣及牛頭角', hasSite: false });

			districts.push({ Code: 'D03', Name: '九龍東', hasSite: false, SubDistricts: sDistricts });
			
			var sDistricts = [];

				sDistricts.push({ Code: 'N01', Name: '荃灣', Remark: '', hasSite: false });

				sDistricts.push({ Code: 'N02', Name: '屯門', Remark: '', hasSite: false });

				sDistricts.push({ Code: 'N03', Name: '元朗', Remark: '包括天水圍', hasSite: false });

				sDistricts.push({ Code: 'N04', Name: '葵青', Remark: '包括葵涌及青衣', hasSite: false });

				sDistricts.push({ Code: 'N05', Name: '離島', Remark: '', hasSite: false });

			districts.push({ Code: 'D04', Name: '新界西', hasSite: false, SubDistricts: sDistricts });
			
			var sDistricts = [];

				sDistricts.push({ Code: 'N06', Name: '北區', Remark: '包括粉嶺及上水', hasSite: false });

				sDistricts.push({ Code: 'N07', Name: '大埔', Remark: '', hasSite: false });

				sDistricts.push({ Code: 'N08', Name: '沙田', Remark: '包括馬鞍山及大圍', hasSite: false });

				sDistricts.push({ Code: 'N09', Name: '西貢', Remark: '包括將軍澳', hasSite: false });

			districts.push({ Code: 'D05', Name: '新界東', hasSite: false, SubDistricts: sDistricts });



		allSites[0] = 
			{ 
				Code: '1',
				Name: "堅尼地城分行",
				SubDistrict: 'H01',
				Address: "卑路乍街77號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[1] = 
			{ 
				Code: '2',
				Name: "士美非路(百佳)",
				SubDistrict: 'H01',
				Address: "香港士美菲路45-51號地下及地庫",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據百佳服務時間"
			};

		allSites[2] = 
			{ 
				Code: '3',
				Name: "港鐵堅尼地城站",
				SubDistrict: 'H01',
				Address: "港鐵堅尼地城站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[3] = 
			{ 
				Code: '4',
				Name: "龍豐閣",
				SubDistrict: 'H01',
				Address: "德輔道西363號地下4號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[4] = 
			{ 
				Code: '5',
				Name: "石塘咀優越及優進理財中心",
				SubDistrict: 'H01',
				Address: "皇后大道西486號",
				Outlet: 'PNP',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: ""
			};

		allSites[5] = 
			{ 
				Code: '6',
				Name: "石塘咀",
				SubDistrict: 'H01',
				Address: "皇后大道西484-496號新安大樓地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[6] = 
			{ 
				Code: '7',
				Name: "港鐵香港大學站",
				SubDistrict: 'H01',
				Address: "港鐵香港大學站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[7] = 
			{ 
				Code: '8',
				Name: "港鐵西營盤站",
				SubDistrict: 'H01',
				Address: "港鐵西營盤站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[8] = 
			{ 
				Code: '9',
				Name: "德輔道西分行",
				SubDistrict: 'H01',
				Address: "德輔道西52號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機及存款快入數機:24小時 /  存票快入票機:09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[9] = 
			{ 
				Code: '10',
				Name: "上環分行",
				SubDistrict: 'H01',
				Address: "德輔道中251號東寧大廈1樓9-10號舖",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小时"
			};

		allSites[10] = 
			{ 
				Code: '11',
				Name: "港鐵上環站(中) (港鐵站辦事處)",
				SubDistrict: 'H01',
				Address: "港島線上環站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[11] = 
			{ 
				Code: '12',
				Name: "港鐵上環站(東) (港鐵站辦事處)",
				SubDistrict: 'H01',
				Address: "港島線上環站",
				Outlet: 'MTR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[12] = 
			{ 
				Code: '13',
				Name: "總行",
				SubDistrict: 'H01',
				Address: "德輔道中83號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機、存票快入票機及自動櫃員機 (人民幣) : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[13] = 
			{ 
				Code: '14',
				Name: "中環優越及優進理財中心",
				SubDistrict: 'H01',
				Address: "皇后大道中50-52號陸佑行地庫",
				Outlet: 'PNP',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: ""
			};

		allSites[14] = 
			{ 
				Code: '15',
				Name: "國際金融中心",
				SubDistrict: 'H01',
				Address: "中環國際金融中心二期地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[15] = 
			{ 
				Code: '16',
				Name: "港鐵香港站",
				SubDistrict: 'H01',
				Address: "港鐵香港站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[16] = 
			{ 
				Code: '17',
				Name: "港鐵中環站(環球大廈)個人理財中心",
				SubDistrict: 'H01',
				Address: "港鐵中環站(環球大廈)大堂",
				Outlet: 'iPoint',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: true,
				CS: false,
				WM: false,
				HourWeekdays: "11:30 - 19:30",
				HourSat: "11:30 - 19:30",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)<br/>了解更多關於iPoint <a target='_blank' href='http://www.hangseng.com/iPoint'>www.hangseng.com/iPoint</a>",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[17] = 
			{ 
				Code: '18',
				Name: "港鐵中環站(昃臣道)",
				SubDistrict: 'H01',
				Address: "港鐵中環站(昃臣道)",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[18] = 
			{ 
				Code: '19',
				Name: "港鐵中環站 (歷山大廈) (港鐵站辦事處)",
				SubDistrict: 'H01',
				Address: "港島線中環站(歷山大廈)大堂",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[19] = 
			{ 
				Code: '20',
				Name: "港鐵金鐘站 (港鐵站辦事處)",
				SubDistrict: 'H01',
				Address: "港島線金鐘站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[20] = 
			{ 
				Code: '21',
				Name: "統一中心分行",
				SubDistrict: 'H01',
				Address: "金鐘道95號統一中心二樓2029號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[21] = 
			{ 
				Code: '22',
				Name: "統一中心優越理財中心",
				SubDistrict: 'H01',
				Address: "金鐘道95號統一中心一樓1026-1028號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[22] = 
			{ 
				Code: '23',
				Name: "统一中心",
				SubDistrict: 'H01',
				Address: "金鐘道95號统一中心一樓1020號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據中心開放時間"
			};

		allSites[23] = 
			{ 
				Code: '24',
				Name: "政府總部",
				SubDistrict: 'H01',
				Address: "政府總部1樓B區",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據政府總部開放時間"
			};

		allSites[24] = 
			{ 
				Code: '25',
				Name: "港鐵灣仔站",
				SubDistrict: 'H02',
				Address: "港鐵灣仔站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[25] = 
			{ 
				Code: '26',
				Name: "莊士敦道分行",
				SubDistrict: 'H02',
				Address: "莊士敦道132號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[26] = 
			{ 
				Code: '27',
				Name: "灣仔分行",
				SubDistrict: 'H02',
				Address: "軒尼詩道200號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[27] = 
			{ 
				Code: '28',
				Name: "軒尼詩道分行",
				SubDistrict: 'H02',
				Address: "軒尼詩道417號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[28] = 
			{ 
				Code: '29',
				Name: "港鐵銅鑼灣(西)站",
				SubDistrict: 'H02',
				Address: "港鐵銅鑼灣(西)站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[29] = 
			{ 
				Code: '30',
				Name: "港鐵銅鑼灣(東)站個人理財中心",
				SubDistrict: 'H02',
				Address: "港鐵銅鑼灣(東)站大堂",
				Outlet: 'iPoint',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: true,
				CS: false,
				WM: false,
				HourWeekdays: "11:30 - 19:30",
				HourSat: "11:30 - 19:30",
				HourSun: "11:30 - 19:30",
				HourRemark: "戶口開立或查詢(個人) <br/> 了解更多關於iPoint <a target='_blank' href='http://www.hangseng.com/iPoint'>www.hangseng.com/iPoint</a>",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[30] = 
			{ 
				Code: '31',
				Name: "恩平道分行",
				SubDistrict: 'H02',
				Address: "恩平道28號利園二期低層地下2-10 & 11-12號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[31] = 
			{ 
				Code: '32',
				Name: "銅鑼灣優越及優進理財中心",
				SubDistrict: 'H02',
				Address: "怡和街28號",
				Outlet: 'PNP',
				Disable: true,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[32] = 
			{ 
				Code: '33',
				Name: "聖保祿醫院",
				SubDistrict: 'H02',
				Address: "聖保祿醫院新翼地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[33] = 
			{ 
				Code: '34',
				Name: "南華體育會",
				SubDistrict: 'H02',
				Address: "加路連山道88號體育中心地下",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[34] = 
			{ 
				Code: '35',
				Name: "跑馬地馬場",
				SubDistrict: 'H02',
				Address: "跑馬地馬場會員席1樓<br/>跑馬地馬場公眾席地下",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據馬場服務時間"
			};

		allSites[35] = 
			{ 
				Code: '36',
				Name: "跑馬地優越及優進理財中心",
				SubDistrict: 'H02',
				Address: "山村道76號",
				Outlet: 'PNP',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[36] = 
			{ 
				Code: '37',
				Name: "港鐵天后站 (港鐵站辦事處)",
				SubDistrict: 'H03',
				Address: "港島線天后站",
				Outlet: 'MTR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[37] = 
			{ 
				Code: '38',
				Name: "港鐵炮台山站",
				SubDistrict: 'H03',
				Address: "港鐵炮台山站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[38] = 
			{ 
				Code: '39',
				Name: "城市花園優越及優進理財中心",
				SubDistrict: 'H03',
				Address: "電氣道233號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[39] = 
			{ 
				Code: '40',
				Name: "北角分行",
				SubDistrict: 'H03',
				Address: "英皇道335號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[40] = 
			{ 
				Code: '41',
				Name: "港鐵北角站",
				SubDistrict: 'H03',
				Address: "港鐵北角站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[41] = 
			{ 
				Code: '42',
				Name: "北角(樂嘉中心)分行",
				SubDistrict: 'H03',
				Address: "英皇道468號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機及存款快入數機 : 24小時"
			};

		allSites[42] = 
			{ 
				Code: '43',
				Name: "港鐵鰂魚涌(西)站",
				SubDistrict: 'H03',
				Address: "港鐵鰂魚涌(西)站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[43] = 
			{ 
				Code: '44',
				Name: "港鐵鰂魚涌(東)站",
				SubDistrict: 'H03',
				Address: "港鐵鰂魚涌(東)站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[44] = 
			{ 
				Code: '45',
				Name: "鰂魚涌分行",
				SubDistrict: 'H03',
				Address: "英皇道989號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[45] = 
			{ 
				Code: '46',
				Name: "港鐵太古站",
				SubDistrict: 'H03',
				Address: "港鐵太古站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[46] = 
			{ 
				Code: '47',
				Name: "太古城優越理財中心",
				SubDistrict: 'H03',
				Address: "太古城道24號夏宮閣地下G408號",
				Outlet: 'PNP',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[47] = 
			{ 
				Code: '48',
				Name: "太古城分行",
				SubDistrict: 'H03',
				Address: "太古城道25號富山閣地下G15號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "24小時"
			};

		allSites[48] = 
			{ 
				Code: '49',
				Name: "鯉景灣",
				SubDistrict: 'H03',
				Address: "鯉景灣太康街55號地下GA18B號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[49] = 
			{ 
				Code: '50',
				Name: "港鐵西灣河站",
				SubDistrict: 'H03',
				Address: "港鐵西灣河站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[50] = 
			{ 
				Code: '51',
				Name: "筲箕灣道",
				SubDistrict: 'H03',
				Address: "筲箕灣道251-261號F01號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[51] = 
			{ 
				Code: '52',
				Name: "筲箕灣分行",
				SubDistrict: 'H03',
				Address: "筲箕灣道295號譽都1樓6號舖",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "自動櫃員機及存款快入數機 : 24小時 <br/> 存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[52] = 
			{ 
				Code: '53',
				Name: "港鐵筲箕灣站",
				SubDistrict: 'H03',
				Address: "港鐵筲箕灣站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[53] = 
			{ 
				Code: '54',
				Name: "港鐵杏花邨站",
				SubDistrict: 'H03',
				Address: "港鐵杏花邨站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[54] = 
			{ 
				Code: '55',
				Name: "港鐵柴灣站",
				SubDistrict: 'H03',
				Address: "港鐵柴灣站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[55] = 
			{ 
				Code: '56',
				Name: "柴灣分行",
				SubDistrict: 'H03',
				Address: "祥利街7號萬峯工業大廈地下",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[56] = 
			{ 
				Code: '57',
				Name: "富怡花園",
				SubDistrict: 'H03',
				Address: "富怡花園商場地下6號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[57] = 
			{ 
				Code: '58',
				Name: "藍灣廣場",
				SubDistrict: 'H03',
				Address: "藍灣廣場高層地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[58] = 
			{ 
				Code: '59',
				Name: "香港仔中心分行",
				SubDistrict: 'H04',
				Address: "南寧街10號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: ""
			};

		allSites[59] = 
			{ 
				Code: '60',
				Name: "香港仔中心",
				SubDistrict: 'H04',
				Address: "香港仔中心2期地下8號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[60] = 
			{ 
				Code: '61',
				Name: "鴨脷洲邨",
				SubDistrict: 'H04',
				Address: "鴨脷洲邨利澤樓41A號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[61] = 
			{ 
				Code: '62',
				Name: "香港大學",
				SubDistrict: 'H04',
				Address: "沙宣道6號學生宿舍第一期LG/F",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[62] = 
			{ 
				Code: '63',
				Name: "深灣遊艇會",
				SubDistrict: 'H04',
				Address: "香港仔深灣道8號",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[63] = 
			{ 
				Code: '64',
				Name: "港鐵尖東站",
				SubDistrict: 'K01',
				Address: "港鐵尖東站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[64] = 
			{ 
				Code: '65',
				Name: "港鐵尖沙咀站",
				SubDistrict: 'K01',
				Address: "港鐵尖沙咀站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[65] = 
			{ 
				Code: '66',
				Name: "漢口道分行",
				SubDistrict: 'K01',
				Address: "漢口道4號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[66] = 
			{ 
				Code: '67',
				Name: "尖沙咀分行",
				SubDistrict: 'K01',
				Address: "加拿芬道18號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[67] = 
			{ 
				Code: '68',
				Name: "柏麗購物大道優越及優進理財中心",
				SubDistrict: 'K01',
				Address: "柏麗購物大道G9號舖",
				Outlet: 'PNP',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[68] = 
			{ 
				Code: '69',
				Name: "港鐵佐敦站 (港鐵站辦事處)",
				SubDistrict: 'K01',
				Address: "荃灣線佐敦站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[69] = 
			{ 
				Code: '70',
				Name: "油麻地分行",
				SubDistrict: 'K01',
				Address: "彌敦道363號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機:24小時"
			};

		allSites[70] = 
			{ 
				Code: '71',
				Name: "港鐵油麻地站",
				SubDistrict: 'K01',
				Address: "港鐵油麻地站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[71] = 
			{ 
				Code: '72',
				Name: "理工大學西九龍校園",
				SubDistrict: 'K01',
				Address: "海庭道9號2樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機:24小時"
			};

		allSites[72] = 
			{ 
				Code: '73',
				Name: "九龍總行",
				SubDistrict: 'K01',
				Address: "彌敦道618號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[73] = 
			{ 
				Code: '74',
				Name: "窩打老道優越及優進理財中心",
				SubDistrict: 'K01',
				Address: "窩打老道86號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[74] = 
			{ 
				Code: '75',
				Name: "港鐵旺角東站",
				SubDistrict: 'K01',
				Address: "港鐵旺角東站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[75] = 
			{ 
				Code: '76',
				Name: "亞皆老街",
				SubDistrict: 'K01',
				Address: "亞皆老街113號地下",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[76] = 
			{ 
				Code: '77',
				Name: "港鐵旺角站",
				SubDistrict: 'K01',
				Address: "港鐵旺角站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[77] = 
			{ 
				Code: '78',
				Name: "旺角優越及優進理財中心",
				SubDistrict: 'K01',
				Address: "彌敦道677號",
				Outlet: 'PNP',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[78] = 
			{ 
				Code: '79',
				Name: "旺角個人理財中心",
				SubDistrict: 'K01',
				Address: "豉油街50號富達大廈地下4號舖",
				Outlet: 'iPoint',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: false,
				WM: false,
				HourWeekdays: "11:30 - 19:30",
				HourSat: "11:30 - 19:30",
				HourSun: "11:30 - 19:30",
				HourRemark: "戶口開立或查詢(個人) <br/> 了解更多關於iPoint <a target='_blank' href='http://www.hangseng.com/iPoint'>www.hangseng.com/iPoint</a>",
				HourAMB: "星期一至日 : 11:30 - 19:30"
			};

		allSites[79] = 
			{ 
				Code: '80',
				Name: "大角咀",
				SubDistrict: 'K01',
				Address: "埃華街1號明泰樓地下",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[80] = 
			{ 
				Code: '81',
				Name: "埃華街",
				SubDistrict: 'K01',
				Address: "埃華街70-86號大成樓地下1號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[81] = 
			{ 
				Code: '82',
				Name: "港鐵太子站",
				SubDistrict: 'K01',
				Address: "港鐵太子站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[82] = 
			{ 
				Code: '83',
				Name: "太子道141號分行",
				SubDistrict: 'K01',
				Address: "太子道141號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[83] = 
			{ 
				Code: '84',
				Name: "港鐵九龍站 (港鐵站辦事處)",
				SubDistrict: 'K01',
				Address: "東涌線九龍站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[84] = 
			{ 
				Code: '85',
				Name: "港鐵奧運站",
				SubDistrict: 'K01',
				Address: "港鐵奧運站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[85] = 
			{ 
				Code: '86',
				Name: "港鐵石硤尾站",
				SubDistrict: 'K02',
				Address: "港鐵石硤尾站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[86] = 
			{ 
				Code: '87',
				Name: "石硤尾邨",
				SubDistrict: 'K02',
				Address: "石硤尾邨服務設施大樓入口",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[87] = 
			{ 
				Code: '88',
				Name: "港鐵深水埗站",
				SubDistrict: 'K02',
				Address: "港鐵深水埗站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[88] = 
			{ 
				Code: '89',
				Name: "北河街分行",
				SubDistrict: 'K02',
				Address: "北河街151號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機及存款快入數機 : 24小時 <br/> 存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[89] = 
			{ 
				Code: '90',
				Name: "青山道分行",
				SubDistrict: 'K02',
				Address: "青山道339號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: true,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: ""
			};

		allSites[90] = 
			{ 
				Code: '91',
				Name: "青山道",
				SubDistrict: 'K02',
				Address: "青山道322號地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[91] = 
			{ 
				Code: '92',
				Name: "長沙灣廣場分行",
				SubDistrict: 'K02',
				Address: "長沙灣廣場M02號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機及存款快入數機 : 24小時 <br/> 存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[92] = 
			{ 
				Code: '93',
				Name: "港鐵長沙灣站",
				SubDistrict: 'K02',
				Address: "港鐵長沙灣站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[93] = 
			{ 
				Code: '94',
				Name: "港鐵荔枝角站 (港鐵站辦事處)",
				SubDistrict: 'K02',
				Address: "荃灣線荔枝角站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[94] = 
			{ 
				Code: '95',
				Name: "饒宗頤文化館",
				SubDistrict: 'K02',
				Address: "九龍荔枝角青山道800號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據文化館服務時間"
			};

		allSites[95] = 
			{ 
				Code: '96',
				Name: "港鐵美孚站",
				SubDistrict: 'K02',
				Address: "港鐵美孚站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[96] = 
			{ 
				Code: '97',
				Name: "美孚新邨(蘭秀道)分行",
				SubDistrict: 'K02',
				Address: "蘭秀道10號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "24小時"
			};

		allSites[97] = 
			{ 
				Code: '98',
				Name: "美孚廣場優越及優進理財中心",
				SubDistrict: 'K02',
				Address: "美孚新邨百老滙街69-119號地下及一樓",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[98] = 
			{ 
				Code: '99',
				Name: "港鐵南昌站",
				SubDistrict: 'K02',
				Address: "港鐵南昌站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[99] = 
			{ 
				Code: '100',
				Name: "港鐵九龍塘站",
				SubDistrict: 'K03',
				Address: "港鐵九龍塘站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[100] = 
			{ 
				Code: '101',
				Name: "城巿大學分行",
				SubDistrict: 'K03',
				Address: "香港城市大學教學大樓3樓",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[101] = 
			{ 
				Code: '102',
				Name: "香港城巿大學",
				SubDistrict: 'K03',
				Address: "香港城巿大學康樂樓4樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[102] = 
			{ 
				Code: '103',
				Name: "浸會大學分行",
				SubDistrict: 'K03',
				Address: "香港浸會大學邵逸夫樓4樓",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[103] = 
			{ 
				Code: '104',
				Name: "香港浸會大學",
				SubDistrict: 'K03',
				Address: "香港浸會大學逸夫行政樓3樓",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[104] = 
			{ 
				Code: '105',
				Name: "香港浸信會醫院",
				SubDistrict: 'K03',
				Address: "香港浸信會醫院3樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[105] = 
			{ 
				Code: '106',
				Name: "醫院管理局大樓",
				SubDistrict: 'K03',
				Address: "亞皆老街147B號醫院管理局大樓地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[106] = 
			{ 
				Code: '107',
				Name: "聖德肋撒醫院",
				SubDistrict: 'K03',
				Address: "太子道327號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[107] = 
			{ 
				Code: '108',
				Name: "九龍城分行",
				SubDistrict: 'K03',
				Address: "太子道360號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[108] = 
			{ 
				Code: '109',
				Name: "譚公道分行",
				SubDistrict: 'K03',
				Address: "譚公道38號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "24小時"
			};

		allSites[109] = 
			{ 
				Code: '110',
				Name: "土瓜灣分行",
				SubDistrict: 'K03',
				Address: "土瓜灣道33號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[110] = 
			{ 
				Code: '111',
				Name: "港鐵紅磡站",
				SubDistrict: 'K03',
				Address: "港鐵紅磡站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[111] = 
			{ 
				Code: '112',
				Name: "理工大學分行",
				SubDistrict: 'K03',
				Address: "香港理工大學VA207室",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 19:00 (星期一至五)"
			};

		allSites[112] = 
			{ 
				Code: '113',
				Name: "德民街",
				SubDistrict: 'K03',
				Address: "德民街36-60號黃埔新邨地下5C舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[113] = 
			{ 
				Code: '114',
				Name: "黃埔新邨優越及優進理財中心",
				SubDistrict: 'K03',
				Address: "德民街46號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: true,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: ""
			};

		allSites[114] = 
			{ 
				Code: '115',
				Name: "紅磡分行",
				SubDistrict: 'K03',
				Address: "馬頭圍道21號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[115] = 
			{ 
				Code: '116',
				Name: "漁人碼頭",
				SubDistrict: 'K03',
				Address: "海逸道8號漁人碼頭高層地下",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[116] = 
			{ 
				Code: '117',
				Name: "港鐵彩虹站 (港鐵站辦事處)",
				SubDistrict: 'K04',
				Address: "觀塘線彩虹站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[117] = 
			{ 
				Code: '118',
				Name: "港鐵鑽石山站",
				SubDistrict: 'K04',
				Address: "港鐵鑽石山站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[118] = 
			{ 
				Code: '119',
				Name: "荷里活廣場",
				SubDistrict: 'K04',
				Address: "荷里活廣場1樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[119] = 
			{ 
				Code: '120',
				Name: "龍蟠苑OK便利店",
				SubDistrict: 'K04',
				Address: "鑽石山龍蟠苑龍蟠苑商場中心101號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[120] = 
			{ 
				Code: '121',
				Name: "新蒲崗分行",
				SubDistrict: 'K04',
				Address: "爵祿街56號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[121] = 
			{ 
				Code: '122',
				Name: "慈雲山分行",
				SubDistrict: 'K04',
				Address: "鳳德道63號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[122] = 
			{ 
				Code: '123',
				Name: "慈雲山中心",
				SubDistrict: 'K04',
				Address: "慈雲山中心539號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[123] = 
			{ 
				Code: '124',
				Name: "港鐵黃大仙站 (港鐵站辦事處)",
				SubDistrict: 'K04',
				Address: "觀塘線黃大仙站",
				Outlet: 'MTR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[124] = 
			{ 
				Code: '125',
				Name: "黃大仙分行",
				SubDistrict: 'K04',
				Address: "黃大仙中心1樓121A號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "24小時"
			};

		allSites[125] = 
			{ 
				Code: '126',
				Name: "港鐵樂富站",
				SubDistrict: 'K04',
				Address: "港鐵樂富站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[126] = 
			{ 
				Code: '127',
				Name: "樂富廣場分行",
				SubDistrict: 'K04',
				Address: "樂富廣場G202號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[127] = 
			{ 
				Code: '128',
				Name: "港鐵九龍灣站",
				SubDistrict: 'K05',
				Address: "港鐵九龍灣站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[128] = 
			{ 
				Code: '129',
				Name: "九龍灣優越及優進理財中心",
				SubDistrict: 'K05',
				Address: "德福花園商場P18號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "24小時"
			};

		allSites[129] = 
			{ 
				Code: '130',
				Name: "德福大廈分行",
				SubDistrict: 'K05',
				Address: "德福大廈1樓3B號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "根據商場服務時間"
			};

		allSites[130] = 
			{ 
				Code: '131',
				Name: "德福商場第二期",
				SubDistrict: 'K05',
				Address: "德福商場第二期2樓大堂",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[131] = 
			{ 
				Code: '132',
				Name: "MegaBox",
				SubDistrict: 'K05',
				Address: "九龍灣宏照道38號企業廣場五期2座2樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[132] = 
			{ 
				Code: '133',
				Name: "港鐵牛頭角站",
				SubDistrict: 'K05',
				Address: "港鐵牛頭角站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[133] = 
			{ 
				Code: '134',
				Name: "牛頭角分行",
				SubDistrict: 'K05',
				Address: "佐敦谷北道5號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[134] = 
			{ 
				Code: '135',
				Name: "港鐵觀塘站 (港鐵站辦事處)",
				SubDistrict: 'K05',
				Address: "觀塘線觀塘站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[135] = 
			{ 
				Code: '136',
				Name: "APM",
				SubDistrict: 'K05',
				Address: "觀塘道418號創紀之城5期大堂<br/>觀塘道418號apm地庫",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[136] = 
			{ 
				Code: '138',
				Name: "觀塘廣場",
				SubDistrict: 'K05',
				Address: "觀塘廣場地下17號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[137] = 
			{ 
				Code: '139',
				Name: "觀塘個人理財中心",
				SubDistrict: 'K05',
				Address: "開源道64號源成中心地下",
				Outlet: 'iPoint',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: false,
				WM: false,
				HourWeekdays: "11:30 - 19:30",
				HourSat: "11:30 - 19:30",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人) <br/> 了解更多關於iPoint <a target='_blank' href='http://www.hangseng.com/iPoint'>www.hangseng.com/iPoint</a>",
				HourAMB: "星期一至六 : 11:30 - 19:30"
			};

		allSites[138] = 
			{ 
				Code: '140',
				Name: "觀塘優越及優進理財中心",
				SubDistrict: 'K05',
				Address: "開源道79號鱷魚恤中心1樓7號舖",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[139] = 
			{ 
				Code: '141',
				Name: "開源道分行",
				SubDistrict: 'K05',
				Address: "開源道55號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: ""
			};

		allSites[140] = 
			{ 
				Code: '142',
				Name: "曉麗商場",
				SubDistrict: 'K05',
				Address: "曉光街21號曉麗苑曉麗商場2樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[141] = 
			{ 
				Code: '143',
				Name: "聯合醫院",
				SubDistrict: 'K05',
				Address: "協和街130號地下大堂",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[142] = 
			{ 
				Code: '144',
				Name: "港鐵藍田站 (港鐵站辦事處)",
				SubDistrict: 'K05',
				Address: "觀塘線藍田站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[143] = 
			{ 
				Code: '145',
				Name: "麗港城商場",
				SubDistrict: 'K05',
				Address: "麗港城商場1樓50A號",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[144] = 
			{ 
				Code: '146',
				Name: "港鐵油塘站",
				SubDistrict: 'K05',
				Address: "港鐵油塘站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[145] = 
			{ 
				Code: '147',
				Name: "港鐵大窩口站",
				SubDistrict: 'N01',
				Address: "港鐵大窩口站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[146] = 
			{ 
				Code: '148',
				Name: "港鐵荃灣站 (港鐵站辦事處)",
				SubDistrict: 'N01',
				Address: "荃灣線荃灣站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[147] = 
			{ 
				Code: '149',
				Name: "港鐵荃灣西站",
				SubDistrict: 'N01',
				Address: "港鐵荃灣西站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[148] = 
			{ 
				Code: '150',
				Name: "綠楊坊優越及優進理財中心",
				SubDistrict: 'N01',
				Address: "綠楊坊1樓F21A號舖",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[149] = 
			{ 
				Code: '151',
				Name: "荃錦中心商場",
				SubDistrict: 'N01',
				Address: "荃灣荃錦中心商場2樓5號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[150] = 
			{ 
				Code: '152',
				Name: "大河道分行",
				SubDistrict: 'N01',
				Address: "大河道30號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[151] = 
			{ 
				Code: '153',
				Name: "眾安街分行",
				SubDistrict: 'N01',
				Address: "眾安街38號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "24小時"
			};

		allSites[152] = 
			{ 
				Code: '154',
				Name: "荃灣分行",
				SubDistrict: 'N01',
				Address: "沙咀道289號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[153] = 
			{ 
				Code: '155',
				Name: "荃灣廣場一田百貨",
				SubDistrict: 'N01',
				Address: "荃灣廣場2樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[154] = 
			{ 
				Code: '156',
				Name: "悅來坊",
				SubDistrict: 'N01',
				Address: "荃灣荃華街3號悅來坊地庫1樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[155] = 
			{ 
				Code: '157',
				Name: "有線電視大樓",
				SubDistrict: 'N01',
				Address: "荃灣海盛路9號有線電視大樓地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[156] = 
			{ 
				Code: '158',
				Name: "麗城花園",
				SubDistrict: 'N01',
				Address: "荃灣青山公路620號麗城花園第二期商場G7A號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[157] = 
			{ 
				Code: '159',
				Name: "港鐵兆康站",
				SubDistrict: 'N02',
				Address: "港鐵兆康站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[158] = 
			{ 
				Code: '160',
				Name: "港鐵屯門站",
				SubDistrict: 'N02',
				Address: "港鐵屯門站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[159] = 
			{ 
				Code: '161',
				Name: "大興邨",
				SubDistrict: 'N02',
				Address: "屯門大興邨大興商場1樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[160] = 
			{ 
				Code: '162',
				Name: "屯門市廣場分行 (暫停營運)",
				SubDistrict: 'N02',
				Address: "屯門市廣場第2期高層地下28號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[161] = 
			{ 
				Code: '163',
				Name: "屯門鄉事會路分行",
				SubDistrict: 'N02',
				Address: "屯門鄉事會路4-26號明偉大樓6-7號舖",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[162] = 
			{ 
				Code: '164',
				Name: "港鐵天水圍站",
				SubDistrict: 'N03',
				Address: "港鐵天水圍站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[163] = 
			{ 
				Code: '165',
				Name: "嘉湖銀座分行",
				SubDistrict: 'N03',
				Address: "嘉湖銀座2期1樓122號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[164] = 
			{ 
				Code: '166',
				Name: "天瑞商場",
				SubDistrict: 'N03',
				Address: "天水圍天瑞商場地下ATM 2號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[165] = 
			{ 
				Code: '167',
				Name: "頌富廣場",
				SubDistrict: 'N03',
				Address: "天水圍頌富廣場一期2樓L221號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[166] = 
			{ 
				Code: '168',
				Name: "天澤商場",
				SubDistrict: 'N03',
				Address: "天水圍天澤商場地下ATM 4號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[167] = 
			{ 
				Code: '169',
				Name: "港鐵朗屏站",
				SubDistrict: 'N03',
				Address: "港鐵朗屏站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[168] = 
			{ 
				Code: '170',
				Name: "港鐵元朗站",
				SubDistrict: 'N03',
				Address: "港鐵元朗站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[169] = 
			{ 
				Code: '171',
				Name: "谷亭街",
				SubDistrict: 'N03',
				Address: "谷亭街2-4號地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[170] = 
			{ 
				Code: '172',
				Name: "元朗優越及優進理財中心",
				SubDistrict: 'N03',
				Address: "青山道93號",
				Outlet: 'PNP',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[171] = 
			{ 
				Code: '173',
				Name: "元朗(教育路)分行",
				SubDistrict: 'N03',
				Address: "教育路5號富好大樓1樓",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "24小時"
			};

		allSites[172] = 
			{ 
				Code: '174',
				Name: "博愛醫院",
				SubDistrict: 'N03',
				Address: "元朗坳頭",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[173] = 
			{ 
				Code: '175',
				Name: "港鐵錦上路站",
				SubDistrict: 'N03',
				Address: "港鐵錦上路站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[174] = 
			{ 
				Code: '176',
				Name: "華景山莊",
				SubDistrict: 'N04',
				Address: "華景山道9號華景山莊",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[175] = 
			{ 
				Code: '177',
				Name: "港鐵葵興站",
				SubDistrict: 'N04',
				Address: "港鐵葵興站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[176] = 
			{ 
				Code: '178',
				Name: "新葵興廣場分行",
				SubDistrict: 'N04',
				Address: "新葵興廣場2樓B舖",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[177] = 
			{ 
				Code: '179',
				Name: "葵涌商場",
				SubDistrict: 'N04',
				Address: "葵涌邨葵涌商場地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[178] = 
			{ 
				Code: '180',
				Name: "上葵涌分行",
				SubDistrict: 'N04',
				Address: "石蔭路50號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務/ 保管箱服務",
				HourAMB: "24小時"
			};

		allSites[179] = 
			{ 
				Code: '181',
				Name: "港鐵葵芳站 (港鐵站辦事處)",
				SubDistrict: 'N04',
				Address: "荃灣線葵芳站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[180] = 
			{ 
				Code: '182',
				Name: "新都會廣場分行",
				SubDistrict: 'N04',
				Address: "新都會廣場219號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "根據商場服務時間"
			};

		allSites[181] = 
			{ 
				Code: '183',
				Name: "港鐵荔景站 (港鐵站辦事處)",
				SubDistrict: 'N04',
				Address: "荃灣線荔景站",
				Outlet: 'MTR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[182] = 
			{ 
				Code: '184',
				Name: "港鐵青衣站",
				SubDistrict: 'N04',
				Address: "港鐵青衣站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[183] = 
			{ 
				Code: '185',
				Name: "青衣城分行",
				SubDistrict: 'N04',
				Address: "青衣城1樓108B號舖",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "根據商場服務時間"
			};

		allSites[184] = 
			{ 
				Code: '186',
				Name: "青衣城優越及優進理財中心",
				SubDistrict: 'N04',
				Address: "青衣城3樓309A號舖",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[185] = 
			{ 
				Code: '187',
				Name: "青衣邨",
				SubDistrict: 'N04',
				Address: "青衣邨商場地下7號",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[186] = 
			{ 
				Code: '188',
				Name: "長亨邨",
				SubDistrict: 'N04',
				Address: "青衣長亨邨商場K2號",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[187] = 
			{ 
				Code: '189',
				Name: "長康一期商場",
				SubDistrict: 'N04',
				Address: "長康一期商場地下3號櫃員機",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[188] = 
			{ 
				Code: '190',
				Name: "翠怡花園",
				SubDistrict: 'N04',
				Address: "翠怡商場地下OS-2",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[189] = 
			{ 
				Code: '191',
				Name: "港鐵博覽館站",
				SubDistrict: 'N05',
				Address: "港鐵博覽館站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[190] = 
			{ 
				Code: '192',
				Name: "港鐵東涌站 (港鐵站辦事處)",
				SubDistrict: 'N05',
				Address: "東涌線東涌站",
				Outlet: 'MTR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: true,
				WM: false,
				HourWeekdays: "10:00 - 18:00",
				HourSat: "10:00 - 14:00",
				HourSun: "",
				HourRemark: "櫃位服務",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[191] = 
			{ 
				Code: '193',
				Name: "北大嶼山醫院",
				SubDistrict: 'N05',
				Address: "北大嶼山醫院1樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[192] = 
			{ 
				Code: '194',
				Name: "映灣薈",
				SubDistrict: 'N05',
				Address: "東涌健東路1號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[193] = 
			{ 
				Code: '195',
				Name: "港鐵欣澳站",
				SubDistrict: 'N05',
				Address: "港鐵欣澳站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[194] = 
			{ 
				Code: '196',
				Name: "港鐵迪士尼站",
				SubDistrict: 'N05',
				Address: "港鐵迪士尼站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[195] = 
			{ 
				Code: '197',
				Name: "港鐵羅湖站",
				SubDistrict: 'N06',
				Address: "港鐵羅湖站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[196] = 
			{ 
				Code: '198',
				Name: "港鐵落馬洲站",
				SubDistrict: 'N06',
				Address: "港鐵落馬洲站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[197] = 
			{ 
				Code: '199',
				Name: "港鐵上水站",
				SubDistrict: 'N06',
				Address: "港鐵上水站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[198] = 
			{ 
				Code: '200',
				Name: "上水個人理財中心",
				SubDistrict: 'N06',
				Address: "上水中心一樓1040-1042號舖",
				Outlet: 'iPoint',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: false,
				WM: false,
				HourWeekdays: "11:30 - 19:30",
				HourSat: "11:30 - 19:30",
				HourSun: "11:30 - 19:30",
				HourRemark: "戶口開立或查詢(個人) <br/> 了解更多關於iPoint <a target='_blank' href='http://www.hangseng.com/iPoint'>www.hangseng.com/iPoint</a>",
				HourAMB: "星期一至日 : 11:30 - 19:30"
			};

		allSites[199] = 
			{ 
				Code: '201',
				Name: "新豐路分行",
				SubDistrict: 'N06',
				Address: "新豐路53號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: ""
			};

		allSites[200] = 
			{ 
				Code: '202',
				Name: "新豐路優越理財中心",
				SubDistrict: 'N06',
				Address: "新豐路94號",
				Outlet: 'PNP',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[201] = 
			{ 
				Code: '203',
				Name: "新康街",
				SubDistrict: 'N06',
				Address: "新康街5號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[202] = 
			{ 
				Code: '204',
				Name: "花都廣場",
				SubDistrict: 'N06',
				Address: "粉嶺花都廣場51號舖",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[203] = 
			{ 
				Code: '205',
				Name: "粉嶺分行",
				SubDistrict: 'N06',
				Address: "聯和墟聯興街9號",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: true,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 保管箱服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[204] = 
			{ 
				Code: '206',
				Name: "港鐵太和站",
				SubDistrict: 'N07',
				Address: "港鐵太和站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[205] = 
			{ 
				Code: '207',
				Name: "港鐵大埔墟站",
				SubDistrict: 'N07',
				Address: "港鐵大埔墟站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[206] = 
			{ 
				Code: '208',
				Name: "大埔(安慈路)分行",
				SubDistrict: 'N07',
				Address: "安慈路昌運中心48號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[207] = 
			{ 
				Code: '209',
				Name: "大埔分行",
				SubDistrict: 'N07',
				Address: "廣福道35號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 17:00 (星期一至五) , 09:00 - 13:00 (星期六)"
			};

		allSites[208] = 
			{ 
				Code: '210',
				Name: "大埔超級城",
				SubDistrict: 'N07',
				Address: "大埔超級城D區1樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[209] = 
			{ 
				Code: '211',
				Name: "富亨商場",
				SubDistrict: 'N07',
				Address: "大埔富亨邨商場地下",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[210] = 
			{ 
				Code: '212',
				Name: "香港教育學院",
				SubDistrict: 'N07',
				Address: "香港教育學院中央大樓C-P-11C室",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[211] = 
			{ 
				Code: '213',
				Name: "中文大學分行",
				SubDistrict: 'N08',
				Address: "香港中文大學富爾敦樓101室",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[212] = 
			{ 
				Code: '214',
				Name: "香港中文大學",
				SubDistrict: 'N08',
				Address: "香港中文大學和聲書院",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[213] = 
			{ 
				Code: '215',
				Name: "港鐵火炭站",
				SubDistrict: 'N08',
				Address: "港鐵火炭站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[214] = 
			{ 
				Code: '216',
				Name: "火炭",
				SubDistrict: 'N08',
				Address: "山尾街18號沙田商業中心1樓19號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "24小時"
			};

		allSites[215] = 
			{ 
				Code: '217',
				Name: "沙田馬場",
				SubDistrict: 'N08',
				Address: "會員席2樓<br/>會員席入口<br/>第一座大看台一樓",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[216] = 
			{ 
				Code: '220',
				Name: "港鐵沙田站",
				SubDistrict: 'N08',
				Address: "港鐵沙田站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[217] = 
			{ 
				Code: '221',
				Name: "沙田分行",
				SubDistrict: 'N08',
				Address: "橫壆街好運中心18號",
				Outlet: 'BR',
				Disable: false,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[218] = 
			{ 
				Code: '222',
				Name: "沙田優越及優進理財中心",
				SubDistrict: 'N08',
				Address: "橫壆街好運中心1A-C號舖",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[219] = 
			{ 
				Code: '223',
				Name: "沙田第一城分行",
				SubDistrict: 'N08',
				Address: "置富第一城商場141-143號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[220] = 
			{ 
				Code: '224',
				Name: "一田百貨",
				SubDistrict: 'N08',
				Address: "新城市廣場第三期2樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[221] = 
			{ 
				Code: '225',
				Name: "愉翠商場",
				SubDistrict: 'N08',
				Address: "沙田愉翠商場1樓大堂",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[222] = 
			{ 
				Code: '226',
				Name: "乙明邨OK便利店",
				SubDistrict: 'N08',
				Address: "沙田乙明邨明耀樓地下7及9號舖",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[223] = 
			{ 
				Code: '227',
				Name: "恒生管理學院",
				SubDistrict: 'N08',
				Address: "恒生管理學院教學大樓3樓升降機大堂",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[224] = 
			{ 
				Code: '228',
				Name: "港鐵大圍站",
				SubDistrict: 'N08',
				Address: "港鐵大圍站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[225] = 
			{ 
				Code: '229',
				Name: "大圍分行",
				SubDistrict: 'N08',
				Address: "大圍道33號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "星期一至五 : 09:00 - 17:00  <br/> 星期六 :  09:00 - 13:00"
			};

		allSites[226] = 
			{ 
				Code: '230',
				Name: "仁安醫院",
				SubDistrict: 'N08',
				Address: "大圍富健街18號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[227] = 
			{ 
				Code: '231',
				Name: "港鐵馬鞍山站",
				SubDistrict: 'N08',
				Address: "港鐵馬鞍山站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[228] = 
			{ 
				Code: '232',
				Name: "馬鞍山分行",
				SubDistrict: 'N08',
				Address: "馬鞍山廣場2樓256-257號舖",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[229] = 
			{ 
				Code: '233',
				Name: "新港城中心優越及優進理財中心",
				SubDistrict: 'N08',
				Address: "新港城中心商場2265B號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "根據商場服務時間"
			};

		allSites[230] = 
			{ 
				Code: '234',
				Name: "富安花園",
				SubDistrict: 'N08',
				Address: "恒信街2號富安花園",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[231] = 
			{ 
				Code: '235',
				Name: "沙田醫院",
				SubDistrict: 'N08',
				Address: "亞公角街33號",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[232] = 
			{ 
				Code: '236',
				Name: "港鐵調景嶺站",
				SubDistrict: 'N09',
				Address: "港鐵調景嶺站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[233] = 
			{ 
				Code: '237',
				Name: "港鐵將軍澳站",
				SubDistrict: 'N09',
				Address: "港鐵將軍澳站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[234] = 
			{ 
				Code: '238',
				Name: "Popcorn",
				SubDistrict: 'N09',
				Address: "唐俊街8號",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[235] = 
			{ 
				Code: '239',
				Name: "PopCorn優越及優進理財中心",
				SubDistrict: 'N09',
				Address: "PopCorn 商場G63號",
				Outlet: 'PNP',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: false,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: ""
			};

		allSites[236] = 
			{ 
				Code: '240',
				Name: "將軍澳中心分行",
				SubDistrict: 'N09',
				Address: "將軍澳中心1樓119及120a號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "根據商場服務時間"
			};

		allSites[237] = 
			{ 
				Code: '241',
				Name: "港鐵康城站",
				SubDistrict: 'N09',
				Address: "港鐵康城站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[238] = 
			{ 
				Code: '242',
				Name: "港鐵坑口站",
				SubDistrict: 'N09',
				Address: "港鐵坑口站",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[239] = 
			{ 
				Code: '243',
				Name: "東港城分行",
				SubDistrict: 'N09',
				Address: "東港城商場2樓217C號",
				Outlet: 'BR',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "根據商場服務時間"
			};

		allSites[240] = 
			{ 
				Code: '244',
				Name: "將軍澳醫院",
				SubDistrict: 'N09',
				Address: "將軍澳寶寧里2號",
				Outlet: '',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};

		allSites[241] = 
			{ 
				Code: '245',
				Name: "港鐵寶琳站",
				SubDistrict: 'N09',
				Address: "港鐵寶琳站",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "6:00pm",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "約06:00 - 凌晨01:00 (根據該站首/尾班車服務時間)"
			};

		allSites[242] = 
			{ 
				Code: '246',
				Name: "新都城分行",
				SubDistrict: 'N09',
				Address: "新都城第1期2樓211號",
				Outlet: 'BR',
				Disable: true,
				SEC: true,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:30pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "09:00 - 13:00",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理/ 證券服務",
				HourAMB: "根據商場服務時間"
			};

		allSites[243] = 
			{ 
				Code: '247',
				Name: "新都城",
				SubDistrict: 'N09',
				Address: "新都城第二期1樓ATM09-10",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "根據商場服務時間"
			};

		allSites[244] = 
			{ 
				Code: '248',
				Name: "科技大學分行",
				SubDistrict: 'N09',
				Address: "香港科技大學G201-203",
				Outlet: 'BR',
				Disable: false,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: true,
				CHQCUT: "5:00pm",
				ACOP: true,
				CS: true,
				WM: true,
				HourWeekdays: "09:00 - 17:00",
				HourSat: "",
				HourSun: "",
				HourRemark: "戶口開立或查詢(個人)/ 櫃位服務/ 財富管理",
				HourAMB: "自動櫃員機 : 24小時 <br/> 存款快入數機及存票快入票機 : 09:00 - 19:00 (星期一至五)"
			};

		allSites[245] = 
			{ 
				Code: '249',
				Name: "香港科技大學",
				SubDistrict: 'N09',
				Address: "清水灣香港科技大學教學大樓地下大堂",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: false,
				CDM: true,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機:24小時"
			};

		allSites[246] = 
			{ 
				Code: '250',
				Name: "香港科技大學",
				SubDistrict: 'N09',
				Address: "香港科技大學李兆基商學大樓",
				Outlet: '',
				Disable: true,
				SEC: false,
				SDB: false,
				ATM: true,
				ATMRMB: true,
				CDM: false,
				CHQ: false,
				CHQCUT: "N",
				ACOP: false,
				CS: false,
				WM: false,
				HourWeekdays: "",
				HourSat: "",
				HourSun: "",
				HourRemark: "",
				HourAMB: "自動櫃員機 : 24小時"
			};




	
exports.allSites = allSites;
exports.districts = districts;