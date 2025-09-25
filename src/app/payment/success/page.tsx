import SuccessPage from "@/components/SuccessPage";

export default async function Page(props: { searchParams: Promise<{ session_id?: string }> }) {
    const searchParams = await props.searchParams;
    const sessionId = searchParams.session_id;

    return (
        <div>
            <SuccessPage sessionId={sessionId} />
        </div>
    );
}
