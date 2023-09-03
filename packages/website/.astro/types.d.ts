declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog-posts": {
"Add_Little_Snitch_Blocklists.md": {
	id: "Add_Little_Snitch_Blocklists.md";
  slug: "add_little_snitch_blocklists";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Agile_At_Microsoft.md": {
	id: "Agile_At_Microsoft.md";
  slug: "agile_at_microsoft";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Arrays.md": {
	id: "Arrays.md";
  slug: "arrays";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Big_O_Notation.md": {
	id: "Big_O_Notation.md";
  slug: "big_o_notation";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Borrowed_Creativity.md": {
	id: "Borrowed_Creativity.md";
  slug: "borrowed_creativity";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Change_Google_Chrome_Active_Account_Using_Apple_Script.md": {
	id: "Change_Google_Chrome_Active_Account_Using_Apple_Script.md";
  slug: "change_google_chrome_active_account_using_apple_script";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Complexity_Analysis.md": {
	id: "Complexity_Analysis.md";
  slug: "complexity_analysis";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Design_Thinking.md": {
	id: "Design_Thinking.md";
  slug: "design_thinking";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Evidence_Based_Study_Tips.md": {
	id: "Evidence_Based_Study_Tips.md";
  slug: "evidence_based_study_tips";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Fantastical_Tips_and_Tricks.md": {
	id: "Fantastical_Tips_and_Tricks.md";
  slug: "fantastical_tips_and_tricks";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Four_Semesters_of_Computer_Science_In_few_Hours_😂👌.md": {
	id: "Four_Semesters_of_Computer_Science_In_few_Hours_😂👌.md";
  slug: "four_semesters_of_computer_science_in_few_hours_";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"GOTO_2019_•_An_Engineer's_Guide_To_Burnout_And_How_To_Hack_It_•_Tim_Duckett_-_YouTube.md": {
	id: "GOTO_2019_•_An_Engineer's_Guide_To_Burnout_And_How_To_Hack_It_•_Tim_Duckett_-_YouTube.md";
  slug: "goto_2019__an_engineers_guide_to_burnout_and_how_to_hack_it__tim_duckett_-_youtube";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Great_Home_Webcam_Video_Setup.md": {
	id: "Great_Home_Webcam_Video_Setup.md";
  slug: "great_home_webcam_video_setup";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Hash_Maps_vs_Objects_in_JavaScript.md": {
	id: "Hash_Maps_vs_Objects_in_JavaScript.md";
  slug: "hash_maps_vs_objects_in_javascript";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"How_To_Speak_by_Patrick_Winston.md": {
	id: "How_To_Speak_by_Patrick_Winston.md";
  slug: "how_to_speak_by_patrick_winston";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"How_to_prevent_inheritance_on_TypeScriptJavaScript.md": {
	id: "How_to_prevent_inheritance_on_TypeScriptJavaScript.md";
  slug: "how_to_prevent_inheritance_on_typescriptjavascript";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"How_to_tell_stories.md": {
	id: "How_to_tell_stories.md";
  slug: "how_to_tell_stories";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Idea_Recycling.md": {
	id: "Idea_Recycling.md";
  slug: "idea_recycling";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Image_Optimization.md": {
	id: "Image_Optimization.md";
  slug: "image_optimization";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Installing_Custom_Fonts_on_iOS.md": {
	id: "Installing_Custom_Fonts_on_iOS.md";
  slug: "installing_custom_fonts_on_ios";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Intermediate_Packets.md": {
	id: "Intermediate_Packets.md";
  slug: "intermediate_packets";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Introduction.md": {
	id: "Introduction.md";
  slug: "introduction";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Jack_Black.md": {
	id: "Jack_Black.md";
  slug: "jack_black";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Keep_Your_Ideas_Moving.md": {
	id: "Keep_Your_Ideas_Moving.md";
  slug: "keep_your_ideas_moving";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Learning_is_like_a_tree.md": {
	id: "Learning_is_like_a_tree.md";
  slug: "learning_is_like_a_tree";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Logarithm.md": {
	id: "Logarithm.md";
  slug: "logarithm";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Memory.md": {
	id: "Memory.md";
  slug: "memory";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"My_favorite_Apps_for_Traveling_Abroad.md": {
	id: "My_favorite_Apps_for_Traveling_Abroad.md";
  slug: "my_favorite_apps_for_traveling_abroad";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"My_journey_with_productivity_tools.md": {
	id: "My_journey_with_productivity_tools.md";
  slug: "my_journey_with_productivity_tools";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"PARA_System.md": {
	id: "PARA_System.md";
  slug: "para_system";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Parallelism.md": {
	id: "Parallelism.md";
  slug: "parallelism";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Projects_Over_Categories.md": {
	id: "Projects_Over_Categories.md";
  slug: "projects_over_categories";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Setup_Monorepo_Architecture.md": {
	id: "Setup_Monorepo_Architecture.md";
  slug: "setup_monorepo_architecture";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Seven_Reasons_why_Carrot_and_Sticks_OFTEN_don't_work.md": {
	id: "Seven_Reasons_why_Carrot_and_Sticks_OFTEN_don't_work.md";
  slug: "seven_reasons_why_carrot_and_sticks_often_dont_work";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Simple_Made_Easy_-.md": {
	id: "Simple_Made_Easy_-.md";
  slug: "simple_made_easy_-";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Slow_Burns.md": {
	id: "Slow_Burns.md";
  slug: "slow_burns";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Spaced_Studying.md": {
	id: "Spaced_Studying.md";
  slug: "spaced_studying";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Start_With_Abundance.md": {
	id: "Start_With_Abundance.md";
  slug: "start_with_abundance";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Studing.md": {
	id: "Studing.md";
  slug: "studing";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Talking_To_Strangers_-_Book_Summary.md": {
	id: "Talking_To_Strangers_-_Book_Summary.md";
  slug: "talking_to_strangers_-_book_summary";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"The_10_Principles_of_Building_a_Second_Brain.md": {
	id: "The_10_Principles_of_Building_a_Second_Brain.md";
  slug: "the_10_principles_of_building_a_second_brain";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"The_Capture_Habit.md": {
	id: "The_Capture_Habit.md";
  slug: "the_capture_habit";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"The_Rise_and_Fall_of_Motivation_2.0.md": {
	id: "The_Rise_and_Fall_of_Motivation_2.0.md";
  slug: "the_rise_and_fall_of_motivation_20";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"The_future_of_computing_a_conversation_with_John_Hennessy_(Google_IO_'18)_-_YouTube.md": {
	id: "The_future_of_computing_a_conversation_with_John_Hennessy_(Google_IO_'18)_-_YouTube.md";
  slug: "the_future_of_computing_a_conversation_with_john_hennessy_google_io_18_-_youtube";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Uncle_Bob_Martin_-_The_Future_Of_Programming.md": {
	id: "Uncle_Bob_Martin_-_The_Future_Of_Programming.md";
  slug: "uncle_bob_martin_-_the_future_of_programming";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"What_Are_Data_Structures.md": {
	id: "What_Are_Data_Structures.md";
  slug: "what_are_data_structures";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"What_is_story_telling.md": {
	id: "What_is_story_telling.md";
  slug: "what_is_story_telling";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Why_I_became_vegetarian.md": {
	id: "Why_I_became_vegetarian.md";
  slug: "why_i_became_vegetarian";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Why_feedback_matters.md": {
	id: "Why_feedback_matters.md";
  slug: "why_feedback_matters";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"Window_managers_in_macOS.md": {
	id: "Window_managers_in_macOS.md";
  slug: "window_managers_in_macos";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
"You_Only_Know_What_You_Make.md": {
	id: "You_Only_Know_What_You_Make.md";
  slug: "you_only_know_what_you_make";
  body: string;
  collection: "blog-posts";
  data: InferEntrySchema<"blog-posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
