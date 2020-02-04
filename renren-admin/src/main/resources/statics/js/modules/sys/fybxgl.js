$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/fybxgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'fybxglId', index: 'fybxgl_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '报销部门', name: 'bxbm', index: 'bxbm', width: 80 }, 			
			{ label: '经办人', name: 'jbr', index: 'jbr', width: 80 }, 			
			{ label: '报销时间', name: 'bxsj', index: 'bxsj', width: 80 }, 			
			{ label: '收款方', name: 'skf', index: 'skf', width: 80 }, 			
			{ label: '付款方式', name: 'fkfs', index: 'fkfs', width: 80 }, 			
			{ label: '报销事由', name: 'bxsy', index: 'bxsy', width: 80 } 			
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
			bxbm:null
		},
		showList: true,
		title: null,
		fybxgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.fybxgl = {};
		},
		update: function (event) {
			var fybxglId = getSelectedRow();
			if(fybxglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(fybxglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.fybxgl.fybxglId == null ? "sys/fybxgl/save" : "sys/fybxgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.fybxgl),
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
			var fybxglIds = getSelectedRows();
			if(fybxglIds == null){
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
                        url: baseURL + "sys/fybxgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(fybxglIds),
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
		getInfo: function(fybxglId){
			$.get(baseURL + "sys/fybxgl/info/"+fybxglId, function(r){
                vm.fybxgl = r.fybxgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'bxbm': vm.q.bxbm},

                page:page
            }).trigger("reloadGrid");
		}
	}
});