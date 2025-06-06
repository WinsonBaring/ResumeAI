"use client";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { Textarea } from "../ui/textarea";

export default function WorkExperience() {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();

    const handleInsert = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {

            const token = await getToken({ template: "resumeai" });
            const supabase = await createClient(token!);
            const { error } = await supabase
                .from("Job Description")
                .insert([{ description }]);
            if (error) {
                setResult("Error: " + error.message);
            } else {
                setResult("Inserted successfully!");
                setDescription("");
            }
        } catch (error) {

            let message
            if (error instanceof Error) {

                setResult("Error: " + error.message);
                message = error.message
            }
            else message = String(error)
            // we'll proceed, but let's report it
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Insert Job Description</CardTitle>
                <CardDescription>
                    Add a new job description to the database.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleInsert} className="flex flex-col gap-4">

                    <Textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="Type your message here." />
                    <Button type="submit" disabled={loading || !description}>
                        {loading ? "Inserting..." : "Insert"}
                    </Button>
                </form>
                {result && (
                    <p className={`mt-2 text-sm ${result.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
                        {result}
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <p>Use the form above to insert a new job description.</p>
            </CardFooter>
        </Card>
    );
}