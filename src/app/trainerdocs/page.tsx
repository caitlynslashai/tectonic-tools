import Head from "next/head";
import PageHeader, { PageType } from "../../components/PageHeader";
import TrainerCard from "./components/TrainerCard";

export default function TrainerDocsPage() {
    return (
        <div className="min-h-screen bg-gray-900 pb-5">
            <Head>
                <title>Pokémon Tectonic Trainer Docs</title>
                <meta
                    name="description"
                    content="A damage calculator using the modified mechanics of Pokémon Tectonic"
                />
            </Head>
            <PageHeader currentPage={PageType.Docs} />
            <div className="flex justify-center mt-8">
                <TrainerCard />
            </div>
        </div>
    );
}