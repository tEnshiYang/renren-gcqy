$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/rwddw/list',
        datatype: "json",
        colModel: [			
			{ label: 'rwddwId', name: 'rwddwId', index: 'rwddw_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '单位名称', name: 'dwmc', index: 'dwmc', width: 80 }, 			
			{ label: '报价', name: 'bj', index: 'bj', width: 80 }, 			
			{ label: '技术得分', name: 'jsdf', index: 'jsdf', width: 80 }, 			
			{ label: '商务得分', name: 'swdf', index: 'swdf', width: 80 }, 			
			{ label: '项目经理', name: 'xmjl', index: 'xmjl', width: 80 }, 			
			{ label: '排名', name: 'pm', index: 'pm', width: 80 }, 			
			{ label: '是否中标', name: 'sfzb', index: 'sfzb', width: 80 }			
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
		rwddw: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.rwddw = {};
		},
		update: function (event) {
			var rwddwId = getSelectedRow();
			if(rwddwId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(rwddwId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.rwddw.rwddwId == null ? "sys/rwddw/save" : "sys/rwddw/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.rwddw),
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
			var rwddwIds = getSelectedRows();
			if(rwddwIds == null){
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
                        url: baseURL + "sys/rwddw/delete",
                        contentType: "application/json",
                        data: JSON.stringify(rwddwIds),
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
		getInfo: function(rwddwId){
			$.get(baseURL + "sys/rwddw/info/"+rwddwId, function(r){
                vm.rwddw = r.rwddw;
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