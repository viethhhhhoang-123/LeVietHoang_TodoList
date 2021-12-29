<template id="task-item">
  <div class="task">
    <div class="task-info">
      <input
        v-model="task.status"
        @click="updateChangesStatusTask(task.id)"
        type="checkbox"
        name="task-check-status"
        class="task-check-status"
      />
      <span
        :class="{
          colorFinished: task.status,
          colorNotFinished: !task.status,
          'todo-status': true,
        }"
        >{{ task.status }}</span
      >
      <span class="todo-title">Title: {{ task.title }} ;</span> <br />

      <p class="todo-title">Description: {{ task.description }}</p>
      <br />
    </div>
    <form
      @submit.prevent="updateChangesTitleTask(task.id)"
      class="form-task-edit"
    >
      <!--v-model nhan viec day gia tri cho input   @keyup la cai dua gia tri cua input vao cho method o duoi xu li-->
      <input
        v-show="isEditTask(task.id)"
        v-model="updatedTitleTask"
        @keyup="updatingTitleTask"
        type="text"
        name="new-title"
        placeholder="Update your title here"
        class="task-input-update"
        required
      />
      <p>&nbsp;</p>
      <textarea
        v-show="isEditTask(task.id)"
        v-model="updatedDescriptionTask"
        @keyup="updatingDescriptionTask"
        type="text"
        name="new-title"
        placeholder="Update your Description here"
        class="task-input-update"
        required
      />
      <input
        v-show="isEditTask(task.id)"
        type="submit"
        value="Save"
        class="task-button-update"
      />
      <input
        v-show="isEditTask(task.id)"
        @click="cancelChangesTask(task.id)"
        type="button"
        value="Cancel"
        class="task-button-cancel"
      />
      <span class="task-error-update">{{ errorUpdateTitle }}</span>
    </form>
    <div class="task-options">
      <input
        @click="showFormEditTask(task.id)"
        type="button"
        value="Detail"
        class="task-button-edit"
      />
      <input
        @click="deleteTask(task.id)"
        type="button"
        value="Delete"
        class="task-button-delete"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "task-item",
  props: ["indextask", "task", "tasks"],
  data: function () {
    return {
      errorUpdateTitle: null,
      indexTaskToEdit: null,
      oldTitleTask: null,
      updatedTitleTask: null,
      oldDescriptionTask: null,
      updatedDescriptionTask: null,
    };
  },
  methods: {
    cancelChangesTask: function (idTask) {
      console.log("Canceling the changes...");
      this.indexTaskToEdit = null;
      this.updatedTitleTask = null;
      this.updatedDescriptionTask = null;
      this.errorUpdateTitle = null;
      this.task.title = this.oldTitleTask;
    },

    deleteTask: function (idTask) {
      console.log("Deleting task...", idTask);

      if (this.indextask > -1) {
        this.tasks.splice(this.indextask, 1);
      }
    },

    isEditTask: function (idTask) {
      return this.indexTaskToEdit === this.indextask;
    },

    isTaskFinished: function () {
      return this.task.status;
    },

    updateChangesTitleTask: function (idTask) {
      if (
        (!this.updatedTitleTask || this.updatedTitleTask.trim().length === 0) &&
        (!this.updatedDescriptionTask ||
          this.updatedDescriptionTask.trim().length === 0)
      ) {
        this.errorUpdateTitle = "This field is required";
        this.task.title = this.oldTitleTask;
        this.task.description = this.oldDescriptionTask;
      } else {
        this.task.title = this.updatedTitleTask;
        this.task.description = this.updatedDescriptionTask;
        this.updateChanges();
      }
    },

    updateChangesStatusTask: function (idTask) {
      this.task.status = !this.task.status;
      this.updateChanges();
    },

    updateChanges: function (idTask) {
      if (
        (!this.updatedTitleTask || this.updatedTitleTask.trim().length > 0) &&
        (!this.updatedDescriptionTask ||
          this.updatedDescriptionTask.trim().length > 0)
      ) {
        //console.log("Updating Task to a Database...", JSON.stringify(this.task));
      } else {
        this.errorUpdateTitle = null;
        this.updatedTitleTask = null;
        this.updatedDescriptionTask = null;
        this.indexTaskToEdit = null;
      }
    },

    showFormEditTask: function (idTask) {
      console.log("Editing task...", idTask);

      // Save the original information in auxiliar variable
      this.oldTitleTask = this.task.title;
      this.oldDescriptionTask = this.task.description;
      // Change the Task's index
      this.indexTaskToEdit = this.indextask;
    },

    updatingTitleTask: function () {
      this.task.title = this.updatedTitleTask;
    },
    updatingDescriptionTask: function () {
      this.task.description = this.updatedDescriptionTask;
    },

    inspect() {
      this.$inspect();
    },
  },
};
</script>

<style scoped>
.colorFinished {
  background-color: #42b983;
}

.colorNotFinished {
  background-color: rgb(241, 85, 85);
}

.task {
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  padding: 10px;
}

.task,
.task-info,
.task-options,
.form-task-edit {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.task-button-delete:hover {
  background-color: rgb(241, 85, 85);
}

.task-button-edit:hover {
  background-color: #42b983;
}

.task-check-status {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 10px;
  height: 28px;
  width: 28px;
}

.task-error-update {
  color: rgb(241, 85, 85);
  text-align: center;
}

.task-input-update {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}

.task-button-update:hover {
  background-color: #42b983;
}
.task-button-cancel:hover {
  background-color: rgb(241, 85, 85);
}

.task-button-delete,
.task-button-edit,
.task-button-update,
.task-button-cancel {
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  color: black;
  cursor: pointer;
}

.task-button-delete,
.task-button-edit,
.task-button-cancel,
.task-button-update,
.task-input-update,
.todo-id,
.todo-title,
.todo-status {
  font-size: 1em;
  padding: 10px;
}

.todo-id,
.todo-title,
.todo-status {
  border-radius: 10px;
  color: black;
}
</style>
