$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/zjwlbmjjs/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'zjwlbmjjsId', index: 'zjwlbmjjs_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '付款部门', name: 'fkbm', index: 'fkbm', width: 80 }, 			
			{ label: '付款项目', name: 'fkxm', index: 'fkxm', width: 80 }, 			
			{ label: '收款部门', name: 'skbm', index: 'skbm', width: 80 }, 			
			{ label: '收款项目', name: 'skxm', index: 'skxm', width: 80 }, 			
			{ label: '创建时间', name: 'cjsj', index: 'cjsj', width: 80 } 			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
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
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			fkbm:null,
			fkxm:null,
			skbm:null,
			skxm:null
		},
		showList: true,
		title: null,
		zjwlbmjjs: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.zjwlbmjjs = {};
		},
		update: function (event) {
			var zjwlbmjjsId = getSelectedRow();
			if(zjwlbmjjsId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(zjwlbmjjsId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.zjwlbmjjs.zjwlbmjjsId == null ? "sys/zjwlbmjjs/save" : "sys/zjwlbmjjs/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.zjwlbmjjs),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.reload();
                             $('#btnSaveOrUpdate').button('reset');
                             $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
			});
		},
		del: function (event) {
			var zjwlbmjjsIds = getSelectedRows();
			if(zjwlbmjjsIds == null){
				return ;
			}
			var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
               if(!lock) {
                    lock = true;
		            $.ajax({
                        type: "POST",
                        url: baseURL + "sys/zjwlbmjjs/delete",
                        contentType: "application/json",
                        data: JSON.stringify(zjwlbmjjsIds),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
				    });
			    }
             }, function(){
             });
		},
		getInfo: function(zjwlbmjjsId){
			$.get(baseURL + "sys/zjwlbmjjs/info/"+zjwlbmjjsId, function(r){
                vm.zjwlbmjjs = r.zjwlbmjjs;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'fkbm': vm.q.fkbm,'fkxm':vm.q.fkxm,'skbm':vm.q.skbm,'skxm':vm.q.skxm},

                page:page
            }).trigger("reloadGrid");
		}
	}
});