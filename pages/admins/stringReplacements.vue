<template>
  <div class="container py-3">
    <h5 class="mb-3">String Replacements</h5>
    <form class="border rounded p-3 mb-4" @submit.prevent="addItem">
      <div class="form-row align-items-end">
        <div class="col-sm-4 mb-2">
          <label class="small mb-1">Type</label>
          <select v-model="form.type" class="form-control form-control-sm">
            <option :value="form.type">{{ form.type }}</option>
            <option value="overall_replacement">Overall Replacement</option>
            <option value="body_youtube_replacement">Body Youtube Replacement</option>
            <option value="body_amazon_replacement">Body Amazon Replacement</option>
          </select>
        </div>
        <div class="col-sm-3 mb-2">
          <label class="small mb-1">Search</label>
          <input v-model="form.search" type="text" class="form-control form-control-sm" placeholder="Search string" />
        </div>
        <div class="col-sm-3 mb-2">
          <label class="small mb-1">Replace</label>
          <input v-model="form.replace" type="text" class="form-control form-control-sm"
            placeholder="Replacement string" />
        </div>
        <div class="col-sm-2 mb-2">
          <label class="small mb-1">Sort Order</label>
          <input v-model.number="form.sort_order" type="number" class="form-control form-control-sm"
            placeholder="Sort order" min="0" />
        </div>
        <div class="col-sm-2 mb-2">
          <button class="btn btn-sm btn-primary w-100" :disabled="saving">Add</button>
        </div>
      </div>
    </form>
    <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap">
      <div class="mb-2 mb-md-0">
        <label class="small mb-0 mr-2">Per page:</label>
        <select v-model.number="perPage" class="form-control form-control-sm d-inline-block" style="width: 5rem;">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
      <div class="mb-2 mb-md-0 flex-grow-1 mx-md-3" style="max-width: 420px;">
        <div class="input-group input-group-sm">
          <select v-model="typeFilter" class="form-control" style="max-width: 120px;">
            <option value="">All Types</option>
            <option value="overall_replacement">Overall Replacement</option>
            <option value="body_youtube_replacement">Body Youtube Replacement</option>
            <option value="body_amazon_replacement">Body Amazon Replacement</option>
          </select>
          <input v-model="search" type="text" class="form-control" placeholder="Search filter...">
          <div class="input-group-append">
            <button class="btn btn-outline-danger" @click="clearSearch"
              v-if="(search || typeFilter) && !loading">&times;</button>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary" :disabled="meta.current_page <= 1 || loading"
          @click="goToPage(meta.current_page - 1)">Prev</button>
        <button class="btn btn-sm btn-outline-secondary" :disabled="meta.current_page >= meta.last_page || loading"
          @click="goToPage(meta.current_page + 1)">Next</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-sm table-striped mb-0">
        <thead class="thead-light">
          <tr>
            <th>Type</th>
            <th>Search</th>
            <th>Replace</th>
            <th>Sort Order</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="5">Loading…</td>
          </tr>
          <tr v-else-if="!items.length">
            <td colspan="5" class="text-muted">No entries yet</td>
          </tr>
          <tr v-else v-for="item in items" :key="item.id">
            <td>{{ item.type }}</td>
            <td><code>{{ item.search }}</code></td>
            <td><code>{{ item.replace }}</code></td>
            <td>{{ item.sort_order }}</td>
            <td class="text-right">
              <button class="btn btn-sm btn-outline-info mr-1" @click="editItem(item)">Edit</button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteItem(item)"
                :disabled="deletingId === item.id">
                {{ deletingId === item.id ? 'Deleting…' : 'Delete' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="small text-muted">Total: {{ totalCount }}</div>
      <div class="small text-muted">Page {{ meta.current_page || 1 }} of {{ meta.last_page || 1 }}</div>
    </div>
    <!-- Edit Modal -->
    <div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }" v-if="showModal"
      style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Edit String Replacement</h6>
            <button type="button" class="close" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateItem">
              <div class="form-group">
                <label class="small mb-1">Type</label>
                <select v-model="editForm.type" class="form-control form-control-sm">
                  <option value="pattern">Pattern</option>
                  <option value="replacement">Replacement</option>
                </select>
              </div>
              <div class="form-group">
                <label class="small mb-1">Search</label>
                <input v-model="editForm.search" type="text" class="form-control form-control-sm" />
              </div>
              <div class="form-group">
                <label class="small mb-1">Replace</label>
                <input v-model="editForm.replace" type="text" class="form-control form-control-sm" />
              </div>
              <div class="form-group">
                <label class="small mb-1">Sort Order</label>
                <input v-model.number="editForm.sort_order" type="number" class="form-control form-control-sm"
                  min="0" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-sm btn-primary" @click="updateItem" :disabled="saving">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" v-if="showModal"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      saving: false,
      deletingId: null,
      form: { type: 'overall_replacement', search: '', replace: '', sort_order: null },
      showModal: false,
      editForm: { id: null, type: 'pattern', search: '', replace: '', sort_order: null },
      perPage: 10,
      totalCount: 0,
      meta: { current_page: 1, last_page: 1 },
      search: '',
      lastSearch: '',
      typeFilter: '',
      lastTypeFilter: '',
      searchDebounce: null,
    }
  },
  async mounted() {
    await this.fetchList()
  },
  watch: {
    perPage() {
      this.meta.current_page = 1
      this.fetchList()
    },
    search(val) {
      if (this.searchDebounce) clearTimeout(this.searchDebounce)
      this.searchDebounce = setTimeout(() => {
        this.applySearch()
      }, 400)
    },
    typeFilter(val) {
      if (this.searchDebounce) clearTimeout(this.searchDebounce)
      this.searchDebounce = setTimeout(() => {
        this.applySearch()
      }, 400)
    }
  },
  methods: {
    async fetchList() {
      this.loading = true
      try {
        const res = await this.$axios.$get('/admin/string-replacements', {
          params: {
            page: this.meta.current_page,
            per_page: this.perPage,
            search: this.lastSearch || undefined,
            type: this.lastTypeFilter || undefined
          }
        })
        this.items = res.data || []
        this.totalCount = res.total || this.items.length
        this.meta.current_page = res.current_page || 1
        this.meta.last_page = res.last_page || 1
      } catch (e) {
        this.$toast?.open?.({ type: 'error', position: 'top-right', message: 'Failed to load list' })
      } finally {
        this.loading = false
      }
    },
    applySearch() {
      this.lastSearch = this.search.trim()
      this.lastTypeFilter = this.typeFilter
      this.meta.current_page = 1
      this.fetchList()
    },
    clearSearch() {
      this.search = ''
      this.lastSearch = ''
      this.typeFilter = ''
      this.lastTypeFilter = ''
      this.meta.current_page = 1
      this.fetchList()
    },
    goToPage(p) {
      if (p < 1 || p > (this.meta.last_page || 1)) return
      this.meta.current_page = p
      this.fetchList()
    },
    async addItem() {
      this.saving = true
      try {
        await this.$axios.$post('/admin/string-replacements', this.form)
        this.form = { type: 'pattern', search: '', replace: '', sort_order: null }
        this.$toast?.open?.({ type: 'success', position: 'top-right', message: 'Added successfully' })
        await this.fetchList()
      } catch (e) {
        this.$toast?.open?.({ type: 'error', position: 'top-right', message: 'Could not add item' })
      } finally {
        this.saving = false
      }
    },
    editItem(item) {
      this.editForm = { ...item }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.editForm = { id: null, type: 'pattern', search: '', replace: '', sort_order: null }
    },
    async updateItem() {
      if (!this.editForm.id) return
      this.saving = true
      try {
        await this.$axios.$put(`/admin/string-replacements/${this.editForm.id}`, this.editForm)
        this.$toast?.open?.({ type: 'success', position: 'top-right', message: 'Updated successfully' })
        await this.fetchList()
        this.closeModal()
      } catch (e) {
        this.$toast?.open?.({ type: 'error', position: 'top-right', message: 'Could not update item' })
      } finally {
        this.saving = false
      }
    },
    async deleteItem(item) {
      if (!item || !item.id) return
      if (!confirm('Delete this entry?')) return
      this.deletingId = item.id
      try {
        await this.$axios.$delete(`/admin/string-replacements/${item.id}`)
        this.items = this.items.filter(i => i.id !== item.id)
        this.$toast?.open?.({ type: 'success', position: 'top-right', message: 'Deleted successfully' })
      } catch (e) {
        this.$toast?.open?.({ type: 'error', position: 'top-right', message: 'Delete failed' })
      } finally {
        this.deletingId = null
      }
    },
  },
}
</script>
<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
</style>
