<template id="tasks">
  <div class="container-tasks">
    <h1 style="text-decoration: underline">ToDo List</h1>

    <div class="new-task">
      <span class="error-new">{{ msgErrorNewTitle }}</span>
      <!--Add new Task o day nha
      Cai v-model o day chinh la value ma input se nhan vao 
      @keyup.enter se vao thang method addNewTodo:function()-->
      <input
        v-model="newTodoText"
        @keyup="checkTitle"
        @keyup.enter="addNewTodo"
        type="text"
        placeholder="Enter a new ToDo"
        class="task-input-new"
        required
      />
      <br />
      <span class="error-new">{{ msgErrorNewDescription }}</span>
      <textarea
        v-model="newTodoDescription"
        @keyup="checkTitle"
        @keyup.enter="addNewTodo"
        type="text"
        placeholder="Enter a new description"
        class="task-input-new"
        required
      />
      <br />
      <span class="task-info-new">Press (Enter) for add a new task</span>
    </div>
    <ul v-if="todos.length" class="tasks-list">
      <!-- v-if se xet het do dai cua list todos -->
      <li v-for="(todo, index) in todos" class="todo" :key="todo.id">
        <!--v-for se xet tung cai todo 1 , them 1 bien index nua -->
        <task-item :task="todo" :indextask="index" :tasks="todos"></task-item>
      </li>
    </ul>
    <!-- <pre class="result-json">{{ $data }}</pre> -->
  </div>
</template>

<script>
/* eslint-disable */
import TaskItem from "../components/TaskItem"; //TaskItem se duoc import sang day de sudung

export default {
  name: "tasks",
  data: function () {
    return {
      msgErrorNewTitle: null,
      msgErrorNewDescription: null,
      newTodoText: "", //day la 1 var co datatype string
      newTodoDescription: "",
      todos: [
        //todos la 1 list
        {
          id: 1,
          title: "Do the dishes",
          description: "asdasdasd",
          status: false,
        },
        {
          id: 2,
          title: "Take out the trash",
          description: "asdasdasd",
          status: true,
        },
        {
          id: 3,
          title: "Mow the lawn",
          description: "asdasdasd",
          status: false,
        },
        {
          id: 4,
          title: "Buy a new cellphone",
          description: "asdasdasd",
          status: false,
        },
        {
          id: 5,
          title: "Do my homework",
          description: "asdasdasd",
          status: true,
        },
        {
          id: 6,
          title: "Read my Vue's Book",
          description: "asdasdasd",
          status: false,
        },
      ],
      nextTodoId: 7, //ta se kkhoi tao gia tri cua bien nextTodoId la 7 vi da co 6 thang id mac dinh tu 1 den 6 roi .
    };
  },
  components: {
    TaskItem,
  },
  methods: {
    addNewTodo: function () {
      if (
        (!this.newTodoText || this.newTodoText.trim().length === 0) &&
        (!this.newTodoDescription ||
          this.newTodoDescription.trim().length === 0)
      ) {
        this.msgErrorNewTitle =
          "You must not left those 2 fields of AddTodoTask"; //cai this field is required se nam ngay tren thanh input
      } else {
        let myNewTask = {
          id: this.nextTodoId++,
          title: this.newTodoText,
          description: this.newTodoDescription,
          status: false,
        };

        this.todos.push(myNewTask);
      }

      this.newTodoText = "";
    },
    checkTitle: function () {
      if (!this.newTodoText) {
        this.msgErrorNewTitle =
          "You must not left those 2 fields of AddTodoTask";
      } else {
        this.msgErrorNewTitle = null; //sau khi enter xong thi tra ve null
      }
    },

    inspect() {
      this.$inspect();
    },
  },
};
</script>

<style scoped>
.container-tasks {
  margin: 0 auto;
  width: 85%;
}

.error-new {
  color: rgb(241, 85, 85);
  text-align: center;
}

.new-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  padding: 10px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
}

.task-input-new {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}
</style>
