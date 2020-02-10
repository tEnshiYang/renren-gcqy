/*$(function () {
	$("#ryGrid").jqGrid({
        url: baseURL + 'sys/xm/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmId', index: 'xm_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 }, 			
			{ label: '工程编号', name: 'gcbh', index: 'gcbh', width: 80 }, 			
	
			{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
			{ label: '核算单元负责人', name: 'hsdyfzr', index: 'hsdyfzr', width: 80 }, 			
				
		 			
				
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#ryGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#ryGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
	
});*/

//生成菜单
var menuItem = Vue.extend({
    name: 'menu-item',
    props:{item:{}},
    template:[
        '<li>',
        '	<a v-if="item.type === 0" href="javascript:;">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '		<i class="fa fa-angle-left pull-right"></i>',
        '	</a>',
        '	<ul v-if="item.type === 0" class="treeview-menu">',
        '		<menu-item :item="item" v-for="item in item.list"></menu-item>',
        '	</ul>',

        '	<a v-if="item.type === 1 && item.parentId === 0" :href="\'#\'+item.url">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '	</a>',

        '	<a v-if="item.type === 1 && item.parentId != 0" :href="\'#\'+item.url"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</a>',
        '</li>'
    ].join('')
});

//iframe自适应
$(window).on('resize', function() {
	var $content = $('.content');
	$content.height($(this).height() - 154);
	$content.find('iframe').each(function() {
		$(this).height($content.height());
	});
}).resize();

//注册菜单组件
Vue.component('menuItem',menuItem);

var vm = new Vue({
	el:'#rrapp',
	data:{
		user:{},
		menuList:{},
		main:"main.html",
		ry:{xmmc:null},
		password:'',
		newPassword:'',
        navTitle:"控制台"
	},
	methods: {
		query1: function () {
			vm.ryload();
		},
		ryload: function (event) {
			/*
			vm.showList = true;*/
			
			var page1 = $("#ryGrid").jqGrid('getGridParam','page');
			$("#ryGrid").jqGrid('setGridParam',{ 
				 postData:{'xmname': vm.ry.xmmc},
                page:page1
            }).trigger("reloadGrid");
		},
		savery: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            

            	
            })
   
		},
		getMenuList: function (event) {
			$.getJSON("sys/menu/nav?_"+$.now(), function(r){
				vm.menuList = r.menuList;
			});
		},
		getUser: function(){
			$.getJSON("sys/user/info?_"+$.now(), function(r){
				vm.user = r.user;
			});
		},
		updatePassword: function(){
			layer.open({
				type: 1,
				skin: 'layui-layer-molv',
				title: "修改密码",
				area: ['550px', '270px'],
				shadeClose: false,
				content: jQuery("#passwordLayer"),
				btn: ['修改','取消'],
				btn1: function (index) {
					var data = "password="+vm.password+"&newPassword="+vm.newPassword;
					$.ajax({
						type: "POST",
					    url: "sys/user/password",
					    data: data,
					    dataType: "json",
					    success: function(result){
							if(result.code == 0){
								layer.close(index);
								layer.alert('修改成功', function(index){
									location.reload();
								});
							}else{
								layer.alert(result.msg);
							}
						}
					});
	            }
			});
		},
        donate: function () {
            layer.open({
                type: 2,
                title: false,
                area: ['806px', '467px'],
                closeBtn: 1,
                shadeClose: false,
                content: ['http://cdn.renren.io/donate.jpg', 'no']
            });
        }
	},
	created: function(){
		this.getMenuList();
		this.getUser();
	},
	updated: function(){
		//路由
		var router = new Router();
		routerList(router, vm.menuList);
		router.start();
	}
});



function routerList(router, menuList){
	for(var key in menuList){
		var menu = menuList[key];
		if(menu.type == 0){
			routerList(router, menu.list);
		}else if(menu.type == 1){
			router.add('#'+menu.url, function() {
				var url = window.location.hash;
				
				//替换iframe的url
			    vm.main = url.replace('#', '');
			    
			    //导航菜单展开
			    $(".treeview-menu li").removeClass("active");
			    $("a[href='"+url+"']").parents("li").addClass("active");
			    
			    vm.navTitle = $("a[href='"+url+"']").text();
			});
		}
	}
}
