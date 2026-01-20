<template>
	<div class="container py-3">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<h5 class="mb-0">Threads Batch</h5>
			<div class="form-inline">
				<input v-model="filterText" type="text" class="form-control form-control-sm mr-2" placeholder="Filter by title" />
				<div class="btn-group">
					<button class="btn btn-sm btn-outline-secondary" :disabled="page <= 1 || loading" @click="goToPage(page - 1)">Prev</button>
					<button class="btn btn-sm btn-outline-secondary" :disabled="!hasNext || loading" @click="goToPage(page + 1)">Next</button>
				</div>
			</div>
		</div>

		<div class="table-responsive">
			<table class="table table-hover table-sm mb-2">
				<thead class="thead-light">
					<tr>
						<th style="width: 6rem">ID</th>
						<th>Title</th>
						<th style="width: 12rem" class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="loading">
						<td colspan="3">Loading…</td>
					</tr>
					<tr v-else-if="!threads.length">
						<td colspan="3" class="text-muted">No threads found</td>
					</tr>
					<tr v-else v-for="t in threads" :key="t.id" @click="openEditModal(t)" class="table-row clickable">
						<td>{{ t.id }}</td>
						<td>
							<div class="font-weight-bold mb-0">{{ t.title }}</div>
							<div class="small text-muted">{{ t.slug }}</div>
						</td>
						<td class="text-right">
							<button class="btn btn-sm btn-outline-primary" @click.stop="openEditModal(t)">Edit</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="d-flex justify-content-between align-items-center">
			<div class="small text-muted">Total: {{ totalCount }}</div>
			<div class="small text-muted">Page {{ page }}</div>
		</div>

		<!-- Modal -->
		<div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }" v-if="showModal" style="display: block;">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h6 class="modal-title">Edit Thread #{{ selectedThread && selectedThread.id }}</h6>
						<button type="button" class="close" aria-label="Close" @click="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="mb-2">
							<div class="small text-muted">{{ selectedThread && selectedThread.slug }}</div>
							<div class="font-weight-bold">{{ selectedThread && selectedThread.title }}</div>
						</div>

						<form @submit.prevent="applyReplace">
							<div class="form-row">
								<div class="form-group col-md-4">
									<label class="small mb-1">Field</label>
									<select v-model="field" class="form-control form-control-sm">
										<option value="title">Title</option>
										<option value="body">Body</option>
									</select>
								</div>
								<div class="form-group col-md-4">
									<label class="small mb-1">Find</label>
									<input v-model="findText" type="text" class="form-control form-control-sm" placeholder="Text to search" />
								</div>
								<div class="form-group col-md-4">
									<label class="small mb-1">Replace</label>
									<input v-model="replaceText" type="text" class="form-control form-control-sm" placeholder="Replacement text" />
								</div>
							</div>

							<div class="form-group">
								<div class="small mb-1">Preview</div>
								<div class="border rounded p-2 bg-light preview-box text-monospace" style="white-space: pre-wrap; word-break: break-all;">
									<span v-for="(part, idx) in previewParts" :key="idx">
										<template v-if="part.marked">
											<mark>{{ part.text }}</mark>
										</template>
										<template v-else>
											{{ part.text }}
										</template>
									</span>
								</div>
								<div class="small mt-1" :class="containsMatch ? 'text-success' : 'text-muted'">
									<template v-if="containsMatch">
										Match found {{ matchCount }} time<span v-if="matchCount !== 1">s</span> in selected field
									</template>
									<template v-else>
										No match found
									</template>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-sm btn-outline-secondary" @click="closeModal">Cancel</button>
						<BaseButton :loading="saving" size="sm" type="primary" nativeType="button" @click.native="applyReplace">Apply Replace</BaseButton>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop show" v-if="showModal"></div>
	</div>
</template>

<script>
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'

export default {
	components: { BaseInput, BaseButton },
	data() {
		return {
			threads: [],
			loading: false,
			page: 1,
			hasNext: false,
			totalCount: 0,
			selectedThread: null,
			showModal: false,
			filterText: '',
			field: 'body',
			findText: '',
			replaceText: '',
			saving: false,
		}
	},
	head() {
		return { title: 'Threads Batch – Search & Replace' }
	},
	async mounted() {
		await this.fetchList()
	},
	computed: {
		currentFieldValue() {
			if (!this.selectedThread) return ''
			return this.selectedThread[this.field] || ''
		},
		containsMatch() {
			if (!this.findText) return false
			return (this.currentFieldValue || '').includes(this.findText)
		},
		previewParts() {
			const value = this.currentFieldValue || ''
			if (!this.findText) return [{ text: value, marked: false }]
			const escapedFind = this.escapeRegExp(this.findText)
			const re = new RegExp(escapedFind, 'gi')
			let result = []
			let lastIndex = 0
			let match
			while ((match = re.exec(value)) !== null) {
				if (match.index > lastIndex) {
					result.push({ text: value.slice(lastIndex, match.index), marked: false })
				}
				result.push({ text: match[0], marked: true })
				lastIndex = re.lastIndex
			}
			if (lastIndex < value.length) {
				result.push({ text: value.slice(lastIndex), marked: false })
			}
			return result
		},
		matchCount() {
			if (!this.findText) return 0
			const value = this.currentFieldValue || ''
			const escapedFind = this.escapeRegExp(this.findText)
			const re = new RegExp(escapedFind, 'gi')
			const matches = value.match(re)
			return matches ? matches.length : 0
		},
	},
  watch: {
	filterText() {
		this.page = 1
		this.fetchList()
	}
},
	methods: {
		async fetchList() {
			this.loading = true
			try {
        const res = await this.$axios.$get(`/admin/threads/batch`, {
          params: {
            page: this.page,
            search: this.filterText
          }
        })
				const data = res?.data || []
				this.threads = data
				this.totalCount = res?.total_threads_count || (res?.meta?.total ?? data.length)
				const meta = res?.meta || {}
				this.hasNext = !!(res?.links?.next) || (meta.current_page < meta.last_page)
			} catch (e) {
				this.$toast.open({ type: 'error', position: 'top-right', message: 'Failed to load threads' })
			} finally {
				this.loading = false
			}
		},
		goToPage(p) {
			if (p < 1) return
			this.page = p
			this.fetchList()
		},
		openEditModal(t) {
			this.selectedThread = { ...t }
			this.field = 'body'
			this.findText = ''
			this.replaceText = ''
			this.showModal = true
		},
		closeModal() {
			this.showModal = false
			this.selectedThread = null
			this.findText = ''
			this.replaceText = ''
		},
		escapeRegExp(string) {
			return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		},
		buildReplacedValue() {
			const value = this.currentFieldValue || ''
			if (!this.findText) return value
			// Replace all occurrences, case-sensitive
			return value.split(this.findText).join(this.replaceText)
		},
		async applyReplace() {
			if (!this.selectedThread) return
			if (!['title','body'].includes(this.field)) {
				this.$toast.open({ type: 'error', position: 'top-right', message: 'Field not supported. Choose title or body.' })
				return
			}
			const updatedValue = this.buildReplacedValue()
			if (updatedValue === this.currentFieldValue) {
				this.$toast.open({ type: 'info', position: 'top-right', message: 'No changes to apply' })
				return
			}
			this.saving = true
			try {
				const payload = { [this.field]: updatedValue }
				const res = await this.$axios.$post(`admin/threads/${this.selectedThread.slug}/apply-replace`, payload)
				const updatedThread = res?.thread ? res.thread : { ...this.selectedThread, ...payload }
				// Reflect change locally
				const idx = this.threads.findIndex(x => x.id === this.selectedThread.id)
				if (idx !== -1) this.$set(this.threads, idx, { ...this.threads[idx], ...updatedThread })
				this.selectedThread = { ...updatedThread }
				this.$toast.open({ type: 'success', position: 'top-right', message: 'Thread updated' })
			} catch (e) {
				this.$toast.open({ type: 'error', position: 'top-right', message: 'Update failed' })
			} finally {
				this.saving = false
				this.closeModal()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.table td,
.table th {
	vertical-align: middle;
}
.table-row.clickable:hover {
	cursor: pointer;
	background: rgba(0, 123, 255, 0.08);
}
.preview-box {
	max-height: 240px;
	overflow: auto;
}
</style>

