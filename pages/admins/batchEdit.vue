<template>
  <div class="container py-3">
    <h5 class="mb-3">Search & Replace List</h5>

    <form class="border rounded p-3 mb-4" @submit.prevent="addItem">
      <div class="form-row align-items-end">
        <div class="col-sm-4 mb-2">
          <label class="small mb-1" for="search_text">Search</label>
          <BaseInput
            :form="form"
            size="form-control-sm"
            field="search"
            inputType="text"
            v-model="form.search"
            id="search_text"
            placeholder="Enter text to find"
          />
        </div>
        <div class="col-sm-4 mb-2">
          <label class="small mb-1" for="replace_text">Replace</label>
          <BaseInput
            :form="form"
            size="form-control-sm"
            field="replace"
            inputType="text"
            v-model="form.replace"
            id="replace_text"
            placeholder="Enter replacement text"
          />
        </div>
        <div class="col-sm-2 mb-2">
          <BaseButton :loading="form.busy" size="sm" type="dark">Add</BaseButton>
        </div>
      </div>
    </form>

    <div class="table-responsive">
      <table class="table table-sm table-striped mb-0">
        <thead class="thead-light">
          <tr>
            <th style="width: 40%">Search</th>
            <th style="width: 40%">Replace</th>
            <th class="text-right" style="width: 20%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="3">Loading…</td>
          </tr>
          <tr v-else-if="!items.length">
            <td colspan="3" class="text-muted">No entries yet</td>
          </tr>
          <tr v-else v-for="item in items" :key="item.id">
            <td>
              <span class="text-muted">…</span>
              <span>{{ item.search }}</span>
              <span class="text-muted">…</span>
            </td>
            <td>{{ item.replace }}</td>
            <td class="text-right">
              <button class="btn btn-sm btn-outline-danger" @click="deleteItem(item)" :disabled="deletingId === item.id">
                {{ deletingId === item.id ? 'Deleting…' : 'Delete' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'

export default {
  components: { BaseInput, BaseButton },
  data() {
    return {
      items: [],
      loading: false,
      deletingId: null,
      form: this.$vform({
        search: '',
        replace: '',
      }),
    }
  },
  head() {
    return { title: 'Batch Edit – Search & Replace' }
  },
  async mounted() {
    await this.fetchList()
  },
  methods: {
    async fetchList() {
      this.loading = true
      try {
        const res = await this.$axios.$get('admin/batch-tool/replace-list')
        this.items = Array.isArray(res) ? res : (res?.data || [])
      } catch (e) {
        this.$toast.open({ type: 'error', position: 'top-right', message: 'Failed to load list' })
      } finally {
        this.loading = false
      }
    },
    async addItem() {
      try {
        await this.form.post('admin/batch-tool/replace-list', this.form)
        this.form.search = ''
        this.form.replace = ''
        this.$toast.open({ type: 'success', position: 'top-right', message: 'Added successfully' })
        await this.fetchList()
      } catch (e) {
        // errors handled by vform; surface a generic toast for safety
        this.$toast.open({ type: 'error', position: 'top-right', message: 'Could not add item' })
      }
    },
    async deleteItem(item) {
      if (!item || !item.id) return
      if (!confirm('Delete this entry?')) return
      this.deletingId = item.id
      try {
        await this.$axios.$delete(`admin/batch-tool/replace-list/${item.id}`)
        this.items = this.items.filter(i => i.id !== item.id)
        this.$toast.open({ type: 'success', position: 'top-right', message: 'Deleted successfully' })
      } catch (e) {
        this.$toast.open({ type: 'error', position: 'top-right', message: 'Delete failed' })
      } finally {
        this.deletingId = null
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
</style>
