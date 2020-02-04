$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/zlaqhy/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'zlaqhyId', index: 'zlaqhy_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '编号', name: 'bh', index: 'bh', width: 80 }, 			
			{ label: '文档名称', name: 'wdmc', index: 'wdmc', width: 80 }, 			
			{ label: '责任人', name: 'zrr', index: 'zrr', width: 80 }, 			
			{ label: '备注', name: 'bz', index: 'bz', width: 80 }, 			
			{ label: '操作人', name: 'czr', index: 'czr', width: 80 }, 			
			{ label: '操作时间', name: 'czsj', index: 'czsj', width: 80 }, 			
			{ label: '创建人', name: 'cjr', index: 'cjr', width: 80 }, 			
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
			bh:null,
			wdmc:null,
			zrr:null,
			spzt:null
		},
		showList: true,
		title: null,
		zlaqhy: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.zlaqhy = {};
		},
		update: function (event) {
			var zlaqhyId = getSelectedRow();
			if(zlaqhyId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(zlaqhyId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.zlaqhy.zlaqhyId == null ? "sys/zlaqhy/save" : "sys/zlaqhy/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.zlaqhy),
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
			var zlaqhyIds = getSelectedRows();
			if(zlaqhyIds == null){
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
                        url: baseURL + "sys/zlaqhy/delete",
                        contentType: "application/json",
                        data: JSON.stringify(zlaqhyIds),
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
		getInfo: function(zlaqhyId){
			$.get(baseURL + "sys/zlaqhy/info/"+zlaqhyId, function(r){
                vm.zlaqhy = r.zlaqhy;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'bh': vm.q.bh,'wdmc':vm.q.wdmc,'zrr':vm.q.zrr,'spzt':vm.q.spzt},

                page:page
            }).trigger("reloadGrid");
		}
	}
});