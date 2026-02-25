import { NextResponse } from 'next/server';

export async function GET() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

    const debug: Record<string, unknown> = {
        projectId: projectId || '(not set)',
        dataset: dataset || '(not set)',
        projectIdLength: projectId?.length || 0,
        isSanityConfigured:
            !!projectId &&
            projectId !== 'your_project_id' &&
            projectId !== 'placeholder',
    };

    // Try direct Sanity API fetch
    if (projectId && projectId !== 'placeholder' && projectId !== 'your_project_id') {
        try {
            const query = encodeURIComponent('*[_type == "teamMember"]{ _id, nameEN, nameCN }');
            const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset || 'production'}?query=${query}`;
            const res = await fetch(url, { cache: 'no-store' });
            const data = await res.json();
            debug.sanityResponse = data;
            debug.fetchStatus = res.status;
        } catch (error: unknown) {
            debug.fetchError = error instanceof Error ? error.message : String(error);
        }
    }

    return NextResponse.json(debug);
}
