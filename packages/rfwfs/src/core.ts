import rfwfs_search from "./index"
import rfwfs_entry_trait, {EntryType, type Entry, type EntryTree} from "./entry"



function Entry<T = File>(name: string, inner: T, permissions: Permissions): Entry<T> {
	return {
		type: typeof inner == "object" ? EntryType.Directory : EntryType.File,
		inner: inner,
		name: name,
		permissions: permissions,
		timestamp: Math.floor(Date.now()/1000)
	}
}

export {
	EntryType,
	Permissions,
	Entry
}