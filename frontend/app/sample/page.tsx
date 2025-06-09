'use client'
import React, { useState, useEffect } from 'react';
import { createClerkSupabaseClient } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Database } from '@/utils/supabase/database.types';

function MyComponent() {
    const [data, setData] = useState<never[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useUser();
    const supabase = createClerkSupabaseClient<Database>()

    useEffect(() => {

        if (!user) return;
        async function loadTasks() {
            setLoading(true);
            const { data, error } = await supabase.from("Job Description").select();
            if (!error) setData(data);
            setLoading(false);
        }

        loadTasks();
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>Tasks</h1>
            {loading && <p>Loading...</p>}
            {JSON.stringify(data)}
            {!loading &&
                data.length > 0 &&
                data.map((task: any) => <p key={task.id}>{task.name}</p>)}

            {!loading && data.length === 0 && <p>No tasks found</p>}

        </div>
    );
}

export default MyComponent;