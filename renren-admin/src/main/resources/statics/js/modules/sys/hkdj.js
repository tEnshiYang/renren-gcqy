$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/hkdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'hkdjId', index: 'hkdj_id', width: 50, key: true },
			{ label: '标题', name: 'bt', index: 'bt', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同状态', name: 'htzt', index: 'htzt', width: 80 }, 			
			{ label: '还款时间', name: 'hksj', index: 'hksj', width: 80 }, 			
			{ label: '还款本金', name: 'hkbj', index: 'hkbj', width: 80 }, 			
			{ label: '还款利息', name: 'hklx', index: 'hklx', width: 80 }, 			
			{ label: '本次还款', name: 'bchk', index: 'bchk', width: 80 }, 			
			{ label: '还款人', name: 'hkr', index: 'hkr', width: 80 }			
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
		showList: true,
		title: null,
		hkdj: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.hkdj = {};
		},
		update: function (event) {
			var hkdjId = getSelectedRow();
			if(hkdjId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(hkdjId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.hkdj.hkdjId == null ? "sys/hkdj/save" : "sys/hkdj/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.hkdj),
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
			var hkdjIds = getSelectedRows();
			if(hkdjIds == null){
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
                        url: baseURL + "sys/hkdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(hkdjIds),
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
		getInfo: function(hkdjId){
			$.get(baseURL + "sys/hkdj/info/"+hkdjId, function(r){
                vm.hkdj = r.hkdj;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});