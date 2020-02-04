$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/wjzgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'wjzglId', index: 'wjzgl_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '编号', name: 'bh', index: 'bh', width: 80 }, 			
			{ label: '需求部门', name: 'xqbm', index: 'xqbm', width: 80 }, 			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
			{ label: '申请日期', name: 'sqrq', index: 'sqrq', width: 80 }, 			
			{ label: '项目档案编号', name: 'xmdabh', index: 'xmdabh', width: 80 }, 			
			{ label: '工程名称', name: 'gcmc', index: 'gcmc', width: 80 }, 			
			{ label: '工程合同价', name: 'gchtj', index: 'gchtj', width: 80 } 			
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
			bh:null,
			xqbm:null,
			gcmc:null,
			xmdabh:null
		},
		showList: true,
		title: null,
		wjzgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.wjzgl = {};
		},
		update: function (event) {
			var wjzglId = getSelectedRow();
			if(wjzglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(wjzglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.wjzgl.wjzglId == null ? "sys/wjzgl/save" : "sys/wjzgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.wjzgl),
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
			var wjzglIds = getSelectedRows();
			if(wjzglIds == null){
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
                        url: baseURL + "sys/wjzgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(wjzglIds),
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
		getInfo: function(wjzglId){
			$.get(baseURL + "sys/wjzgl/info/"+wjzglId, function(r){
                vm.wjzgl = r.wjzgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'bh': vm.q.bh,'xqbm':vm.q.xqbm,'gcmc':vm.q.gcmc,'xmdabh':vm.q.xmdabh},

                page:page
            }).trigger("reloadGrid");
		}
	}
});