export function createQueryString(
    searchParams: URLSearchParams | { [key: string]: string | string[] | undefined },
    name: string,
    value: string
): string {
    // If searchParams is an object (common when passed from Next.js server components)
    if (searchParams instanceof URLSearchParams) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
    } else {
        // If searchParams is the object received from `page.tsx` props
        const params = new URLSearchParams();
        for (const key in searchParams) {
            const val = searchParams[key];
            if (val !== undefined) {
                if (Array.isArray(val)) {
                    val.forEach(v => params.append(key, v));
                } else {
                    params.set(key, val);
                }
            }
        }
        params.set(name, value);
        return params.toString();
    }
}