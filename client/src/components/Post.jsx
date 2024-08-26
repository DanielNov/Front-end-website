// eslint-disable-next-line react/prop-types
function PostItem({ imageUrl, title, text }) {
    return (
        <div className="mt-20 text-white font-custom flex gap-10 justify-center">
            <div className="w-1/3">
                <img
                    className="rounded-xl w-full"
                    src={imageUrl}
                    alt={title}
                />
            </div>
            <div className="w-1/3 flex flex-col gap-5 items-start">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="self-start"> {text}</p>
            </div>
        </div>
    );
}



export default function Post() {
    return (
        <div className="space-y-20">
            <PostItem
                imageUrl="https://images.pexels.com/photos/301614/pexels-photo-301614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                title="Do we really exist?"
                text="When you look for yourself, is there anything to see? Anything of shape or color?"
            />
            <PostItem
                imageUrl="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                title="The nature of reality"
                text="Zen teaches that the true nature of reality is non-dual, meaning it transcends the ordinary distinctions we make, such as subject and object, self and other, good and bad. These dualities are seen as mental constructs rather than ultimate truths."
            />
            <PostItem
                imageUrl="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg"
                title="Mindfulness in daily life"
                text="Mindfulness in everyday life involves being fully present and engaged in each moment, paying attention to your thoughts, feelings, and surroundings without judgment. It's about slowing down and experiencing life as it happens rather than rushing through tasks on autopilot. Here are some practical ways to incorporate mindfulness into your daily routine:"
            />
        </div>
    );
}
