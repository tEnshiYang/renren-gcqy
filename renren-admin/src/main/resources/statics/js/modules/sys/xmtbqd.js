$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/xmtbqd/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmtbqdId', index: 'xmtbqd_id', width: 50, key: true },
			{ label: '系统名称', name: 'xtmc', index: 'xtmc', width: 80 }, 			
			{ label: '设备编码', name: 'sbbm', index: 'sbbm', width: 80 }, 			
			{ label: '投标品牌', name: 'tbpp', index: 'tbpp', width: 80 }, 			
			{ label: '物品名称', name: 'wpmc', index: 'wpmc', width: 80 }, 			
			{ label: '单位', name: 'dw', index: 'dw', width: 80 }, 			
			{ label: '成本单价', name: 'cbdj', index: 'cbdj', width: 80 }, 			
			{ label: '型号规格', name: 'xhgg', index: 'xhgg', width: 80 }, 			
			{ label: '技术参数要求', name: 'jscsyq', index: 'jscsyq', width: 80 }			
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
			wpmc:null
		},
		showList: true,
		title: null,
		xmtbqd: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.xmtbqd = {};
		},
		update: function (event) {
			var xmtbqdId = getSelectedRow();
			if(xmtbqdId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(xmtbqdId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.xmtbqd.xmtbqdId == null ? "sys/xmtbqd/save" : "sys/xmtbqd/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.xmtbqd),
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
			var xmtbqdIds = getSelectedRows();
			if(xmtbqdIds == null){
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
                        url: baseURL + "sys/xmtbqd/delete",
                        contentType: "application/json",
                        data: JSON.stringify(xmtbqdIds),
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
		getInfo: function(xmtbqdId){
			$.get(baseURL + "sys/xmtbqd/info/"+xmtbqdId, function(r){
                vm.xmtbqd = r.xmtbqd;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'wpmc': vm.q.wpmc},

                page:page
            }).trigger("reloadGrid");
		}
	}
});