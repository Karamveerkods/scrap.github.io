module.exports ={
	enlistVideosForFirstTimeUrl:{
		uri: "https://api.hypstar.com/hotsoon/feed/?type=video&min_time=0&offset=0&count=20&req_from=feed_refresh&live_sdk_version=310&iid=6514305661168256770&device_id=6514305661038233089&ac=3g&channel=google_play&aid=1145&app_name=live_i18n&version_code=310&version_name=3.1.0&device_platform=android&ssmix=a&device_type=Aqua+Twist&device_brand=Intex&language=en&os_api=22&os_version=5.1&uuid=911499851221764&openudid=9be6ce10f673bbab&manifest_version_code=3102&resolution=480*854&dpi=240&update_version_code=3102&_rticket=1516870918294&carrier_region=40445&sys_lang=en_US&tz_name=Asia%2FCalcutta&tz_offset=19800&locale=en_US&ts=1516870918&as=a215c936e680aa8dd9&cp=960ea55d6d9464dde2&mas=00aeb86af32410375234caf6a0013ab572e340fa0a",
		headers: {
        	"Cookie": "install_id=6514305661168256770; ttreq=1$192a2f3fcc654b52101a9ef987030d00da7cf670; odin_tt=e4f40ca02f8bbb0794de2bebc86c9ac73c868fc46a5e0b39eec22235d38bc071c2f3ff83b6de4cd90f94e2ad3691086245e3be097be4006e8dc3a5593512c855", 
			"User-Agent": "okhttp/3.7.0.6" 
    	}
	},
	enlistVideosForOnPageChangeUrl:{
		uri:"https://api.hypstar.com/hotsoon/feed/?type=video&max_time=maximumTime&offset=10&count=20&req_from=feed_loadmore&live_sdk_version=310&iid=6514305661168256770&device_id=6514305661038233089&ac=3g&channel=google_play&aid=1145&app_name=live_i18n&version_code=310&version_name=3.1.0&device_platform=android&ssmix=a&device_type=Aqua+Twist&device_brand=Intex&language=en&os_api=22&os_version=5.1&uuid=911499851221764&openudid=9be6ce10f673bbab&manifest_version_code=3102&resolution=480*854&dpi=240&update_version_code=3102&_rticket=1516870932733&carrier_region=40445&sys_lang=en_US&tz_name=Asia%2FCalcutta&tz_offset=19800&locale=en_US&ts=1516870928&as=a2c57976c0015abd99&cp=9815ae54069e6dd4e2&mas=00fba85850cd679aed0de48a974502ded146fa51af",
		headers: {
        	"Cookie": "install_id=6514305661168256770; ttreq=1$192a2f3fcc654b52101a9ef987030d00da7cf670; odin_tt=e4f40ca02f8bbb0794de2bebc86c9ac73c868fc46a5e0b39eec22235d38bc071c2f3ff83b6de4cd90f94e2ad3691086245e3be097be4006e8dc3a5593512c855", 
			"User-Agent": "okhttp/3.7.0.6" 
    	}
	},
	enlistVideosByUser: {
		uri:"https://api.hypstar.com/hotsoon/user/ID/items/?min_time=0&count=20&req_from=enter_auto&live_sdk_version=280&iid=6504860578195212033&device_id=42620033221&ac=wifi&channel=google_play&aid=1145&app_name=live_i18n&version_code=280&version_name=2.8.0&device_platform=android&ssmix=a&device_type=ONEPLUS+A5010&device_brand=OnePlus&os_api=25&os_version=7.1.1&uuid=867287034122155&openudid=931b2bc5ed3d9b17&manifest_version_code=2802&resolution=1080*2034&dpi=420&update_version_code=2802&sys_lang=en_US&carrier_region=40445&tz_offset=19800&locale=en_US&tz_name=Asia%2FCalcutta&ts=1516098219&as=a2e50d654b1acaf29d&cp=d5a2a35ebeda5922e2",
		headers:{
			"Cookie": "install_id=6514305661168256770; ttreq=1$192a2f3fcc654b52101a9ef987030d00da7cf670; odin_tt=e4f40ca02f8bbb0794de2bebc86c9ac73c868fc46a5e0b39eec22235d38bc071c2f3ff83b6de4cd90f94e2ad3691086245e3be097be4006e8dc3a5593512c855", 
			"User-Agent": "okhttp/3.7.0.6"	
		}
	},
	enlistVideosByUserForMoreLoad:{
		uri:"https://api.hypstar.com/hotsoon/user/ID/items/?max_time=maximumTime&offset=offSet&count=30&req_from=feed_loadmore&live_sdk_version=310&iid=6514305661168256770&device_id=6514305661038233089&ac=wifi&channel=google_play&aid=1145&app_name=live_i18n&version_code=310&version_name=3.1.0&device_platform=android&ssmix=a&device_type=Aqua+Twist&device_brand=Intex&language=en&os_api=22&os_version=5.1&uuid=911499851221764&openudid=9be6ce10f673bbab&manifest_version_code=3102&resolution=480*854&dpi=240&update_version_code=3102&_rticket=1517189391060&carrier_region=40445&sys_lang=en_US&tz_name=Asia%2FCalcutta&tz_offset=19800&locale=en_US&ts=1517189391&as=a2558736ff800a69fe&cp=710fa557fde96b9de2&mas=00062573778271c87aa4989660823d88895eabc414",
		headers:{
			"Cookie": "install_id=6514305661168256770; ttreq=1$192a2f3fcc654b52101a9ef987030d00da7cf670; odin_tt=e4f40ca02f8bbb0794de2bebc86c9ac73c868fc46a5e0b39eec22235d38bc071c2f3ff83b6de4cd90f94e2ad3691086245e3be097be4006e8dc3a5593512c855", 
			"User-Agent": "okhttp/3.7.0.6"	
		}
	}
}