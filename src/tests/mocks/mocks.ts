import { Post } from "../../store/postsSlice";

export const mockedPosts: Post[] = [
	{
		id: "j4hn",
		from_name: "Ethelene Maggi",
		from_id: "user_18",
		message: "Lorem ipsum post message",
		created_time: "2021-09-18T07:38:01+00:00",
		type: "status",
	},
	{
		id: "ajnk",
		from_name: "Ethelene Maggi",
		from_id: "user_18",
		message: "Another message",
		created_time: "2019-08-11T01:01:01+00:00",
		type: "status",
	},
	{
		id: "xn3h",
		from_name: "Ethelene Maggi",
		from_id: "user_18",
		message: "This is the third post",
		created_time: "2022-01-02T00:00:00+00:00",
		type: "status",
	},
	{
		id: "j4ha",
		from_name: "Gigi Richter",
		from_id: "user_1",
		message: "What a lovely day",
		created_time: "2022-01-02T00:00:00+00:00",
		type: "status",
	},
	{
		id: "g9au",
		from_name: "Gigi Richter",
		from_id: "user_1",
		message: "Some message",
		created_time: "2018-08-12T10:00:00+00:00",
		type: "status",
	},
];
