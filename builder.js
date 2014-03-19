//"класс" узел (поддерево) состоит из имени и массива потомков
function Node (name){
    this.name = name ? name : "noname";
    this.childrens = [];
}

//фн-ция ищет потомка по имени sName и возвращает его индекс, иначе -1
Node.prototype.indexOfNode = function(sName){
    for(var i = 0, len = this.childrens.length; i < len; i++) {
        if (this.childrens[i].name === sName) return i;
    }
    return -1;
}

//добавить сына если его нет
//возвращает себя чтобы можно было вызывать цепочкой:
//node.setChildren("ch1").setChildren("ch2");
Node.prototype.setChildren = function(name){
    if(this.indexOfNode(name) == -1){
        this.childrens.push(new Node(name))
    }
    return this;
}

//возвращает сына или undefined
Node.prototype.getChildren = function(name){
    return this.childrens[this.indexOfNode(name)];
}

//Объект дерево
function Tree (){
    //обязательно имеет корень (даже можно синглтоном сделать)
    this.root = new Node();
}

//ввести имя дерева (корня)
Tree.prototype.setName = function(nameOfTree){
    this.root.name = nameOfTree;
}


//ввод потомков подобно пути к диску
//пример:
//var family = new Tree();
//family.setName("Ген. дерево");
//family.setNodes("Дед/Сын/Внук/Правнук");
//family.setNodes("Дед/Дочь/Внук");
//
//    "Ген. дерево"
//         |
//       "Дед"
//     /       \
//  "Сын"     "Дочь"
//    |          |
//  "Внук"    "Внук"
//    |
// "Правнук"

Tree.prototype.setNodes = function(pathToNode){
    var path = pathToNode.split('/');
    var current = this.root;
    for(var i=0, len=path.length; i<len; ++i){
        current = current.setChildren(path[i]);
        current = current.getChildren(path[i]);
    }
};

//Abstract Builder
function TreeBuilder(){
    var tree = new Tree();
    this.show = function(){};
    this.setName = function(val){};
    this.setNodes = function(val){};
    this.getTree = function(){
        return tree;
    };
}

//Concrete TreeVisualization
function HtmlTreeView($list){
    TreeBuilder.call(this);
    var tree = this.getTree();
    this.setNodes = function(path){
        tree.setNodes(path);
    };
    this.setName = function(nameOfTree){tree.setName(nameOfTree)};
    this.show = function(){
        console.log(tree);   
        drawTree(tree.root, $list);   
    };
}

//рекурсивно рисуем списки
function drawTree(node, parentEl){
    var pel = parentEl;
    var ul = document.createElement('UL');
    ul.innerHTML = node.name;
    pel.appendChild(ul);
    for(var i=0; i<node.childrens.length; ++i){
        drawTree(node.childrens[i], ul);
    }
}

//Director
function Drawer(){
    var treeBuilder;
    
    this.setTreeBuilder = function(builder){
        treeBuilder = builder;
    };
    this.getTree = function(){
        return treeBuilder.getTree();
    };
    this.constructTree = function(nameOfTree, path){
        treeBuilder.setName(nameOfTree);
        treeBuilder.setNodes(path);
    };
    this.display = function(){
        treeBuilder.show();
    };
}

    
