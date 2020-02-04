$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/xmfpgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmfpglId', index: 'xmfpgl_id', width: 50, key: true },
			{ label: '项目名称', name: 'ssxm', index: 'ssxm', width: 80 }, 			
			{ label: '状态', name: 'zt', index: 'zt', width: 80 }, 			
			{ label: '供应商名称', name: 'gysmc', index: 'gysmc', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '发票类型', name: 'fplx', index: 'fplx', width: 80 }, 			
			{ label: '发票内容', name: 'fpnr', index: 'fpnr', width: 80 }, 			
			{ label: '开票时间', name: 'kpsj', index: 'kpsj', width: 80 }, 			
			{ label: '金额', name: 'je', index: 'je', width: 80 }, 			
			{ label: '登记人', name: 'djr', index: 'djr', width: 80 }, 			
			{ label: '备注', name: 'bz', index: 'bz', width: 80 }, 			
			{ label: '操作人', name: 'czr', index: 'czr', width: 80 }, 			
			{ label: '操作时间', name: 'czsj', index: 'czsj', width: 80 }			
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
			ssxmmc:null
		},
		showList: true,
		title: null,
		xmfpgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.xmfpgl = {};
		},
		update: function (event) {
			var xmfpglId = getSelectedRow();
			if(xmfpglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(xmfpglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.xmfpgl.xmfpglId == null ? "sys/xmfpgl/save" : "sys/xmfpgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.xmfpgl),
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
			var xmfpglIds = getSelectedRows();
			if(xmfpglIds == null){
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
                        url: baseURL + "sys/xmfpgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(xmfpglIds),
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
		getInfo: function(xmfpglId){
			$.get(baseURL + "sys/xmfpgl/info/"+xmfpglId, function(r){
                vm.xmfpgl = r.xmfpgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'xmmc': vm.q.xmmc},

                page:page
            }).trigger("reloadGrid");
		}
	}
});