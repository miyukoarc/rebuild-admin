
<template>
  <div class="card-container">
    <el-tree :data="buildTree" :props="{children:'children',label:'label'}" default-expand-all></el-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty } from '@/utils/normal'
export default {
  data() {
    return {
      tree: []
    }
  },
  computed: {
    ...mapState({
      currentParent: state => state.department.currentParent,
      currentChildren: state => state.department.currentChildren,
      currentDetail: state => state.department.currentDetail
    }),
    buildTree() {
      let tempParent = null

      let tempChildren = null

      let tempCurrent = null

      let tempTree = null

      if (this.currentParent?.name) {
        tempParent = []
        tempParent.push({
          label: this.currentParent?.name,
          children: []
        })
      }

      if (this.currentDetail?.children?.length) {
        tempCurrent = []
        tempCurrent.push({
          label: this.currentDetail?.name,
          children: []
        })
      } else {
        tempCurrent = []
        tempCurrent.push({
          label: this.currentDetail?.name
        })
      }

      if (this.currentChildren?.length) {
        tempChildren = []
        this.currentChildren.forEach(item => {
          tempChildren.push({
            label: item.name
          })
        })
      }
      console.log(tempParent, tempChildren, tempCurrent)

      if (tempCurrent && !tempParent && !tempChildren) {
        // this.tree = tempCurrent
        return tempCurrent
      }

      if (tempCurrent && tempChildren && !tempParent) {
        tempCurrent[0].children = tempChildren
        // this.tree = tempCurrent
        return tempCurrent
      }

      if (tempParent && tempCurrent && !tempChildren) {
        tempParent[0].children = tempCurrent
        // this.tree = tempParent
        return tempParent
      }

      if (tempParent && tempCurrent && tempChildren) {
        tempCurrent[0].children = tempChildren
        tempParent[0].children = tempCurrent
        // this.tree = tempParent
        return tempParent
      }
    }
  },
  created() {},
  updated() {
    // this.genTree()
  },
  methods: {
    isEmpty(obj) {
      return isEmpty(obj)
    },
    genTree() {
      let tempParent = null

      let tempChildren = null

      let tempCurrent = null

      let tempTree = null

      if (this.currentParent?.name) {
        tempParent = []
        tempParent.push({
          label: this.currentParent?.name,
          children: []
        })
      }

      if (this.currentDetail?.children?.length) {
        tempCurrent = []
        tempCurrent.push({
          label: this.currentDetail?.name,
          children: []
        })
      } else {
        tempCurrent = []
        tempCurrent.push({
          label: this.currentDetail?.name
        })
      }

      if (this.currentChildren?.length) {
        tempChildren = []
        this.currentChildren.forEach(item => {
          tempChildren.push({
            label: item.name
          })
        })
      }
      console.log(tempParent, tempChildren, tempCurrent)

      if (tempCurrent && !tempParent && !tempChildren) {
        this.tree = tempCurrent
        // return tempCurrent
      }

      if (tempCurrent && tempChildren && !tempParent) {
        tempCurrent[0].children = tempChildren
        this.tree = tempCurrent
        // return tempCurrent
      }

      if (tempParent && tempCurrent && !tempChildren) {
        tempParent[0].children = tempCurrent
        this.tree = tempParent

        // return tempParent
      }

      if (tempParent && tempCurrent && tempChildren) {
        tempCurrent[0].children = tempChildren
        tempParent[0].children = tempCurrent

        this.tree = tempParent

        // return tempParent
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 15px 0;
}
.child-container {
  display: flex;
}
</style>