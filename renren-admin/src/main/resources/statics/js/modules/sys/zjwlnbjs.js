$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/zjwlnbjs/list',
        datatype: "json",
        colModel: [			
			{ label: 'bzjfkId', name: 'bzjfkId', index: 'bzjfk_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '部门', name: 'bm', index: 'bm', width: 80 }, 			
			{ label: '创建人', name: 'cjr', index: 'cjr', width: 80 }, 			
			{ label: '记录时间', name: 'jlsj', index: 'jlsj', width: 80 }, 			
			{ label: '费用清单', name: 'fyqd', index: 'fyqd', width: 80 }, 			
			{ label: '备注', name: 'bz', index: 'bz', width: 80 }			
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
		zjwlnbjs: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.zjwlnbjs = {};
		},
		update: function (event) {
			var bzjfkId = getSelectedRow();
			if(bzjfkId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(bzjfkId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.zjwlnbjs.bzjfkId == null ? "sys/zjwlnbjs/save" : "sys/zjwlnbjs/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.zjwlnbjs),
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
			var bzjfkIds = getSelectedRows();
			if(bzjfkIds == null){
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
                        url: baseURL + "sys/zjwlnbjs/delete",
                        contentType: "application/json",
                        data: JSON.stringify(bzjfkIds),
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
		getInfo: function(bzjfkId){
			$.get(baseURL + "sys/zjwlnbjs/info/"+bzjfkId, function(r){
                vm.zjwlnbjs = r.zjwlnbjs;
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