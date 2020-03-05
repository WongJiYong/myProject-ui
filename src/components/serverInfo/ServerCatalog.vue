<template>
    <div id="serverCatalog">
        <el-tree
                :data="catalogTree"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
            Append
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
        </el-tree>
    </div>
</template>

<script>
    import catalog from "@/api/server/catalog";

    export default {
        name: "ServerCatalog",
        data() {
            return {
                catalogTree: []
            }
        },
        methods: {
            append(data) {
                const newChild = {id: id++, label: 'testtest', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            }
        },
        mounted() {
            let vData = this.$data;
            catalog.query({type: 'server'}, function (resp) {
                vData.catalogTree = resp;
            });
        }
    }
</script>

<style scoped>

</style>