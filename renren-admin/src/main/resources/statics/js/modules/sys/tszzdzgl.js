$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/tszzdzgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'tszzdzglId', index: 'tszzdzgl_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 			
			{ label: '财务编号', name: 'cwbh', index: 'cwbh', width: 80 }, 			
			{ label: '项目联系人', name: 'xmlxr', index: 'xmlxr', width: 80 }, 			
			{ label: '联系方式', name: 'lxfs', index: 'lxfs', width: 80 }, 			
			{ label: '合作方', name: 'hzf', index: 'hzf', width: 80 }, 			
			{ label: '中标金额', name: 'zbje', index: 'zbje', width: 80 }, 			
			{ label: '结算金额', name: 'jsje', index: 'jsje', width: 80 }, 			
			{ label: '企业所得税', name: 'qysds', index: 'qysds', width: 80 }			
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
			xmbh:null,
			cwbh:null
		},
		showList: true,
		title: null,
		tszzdzgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tszzdzgl = {};
		},
		update: function (event) {
			var tszzdzglId = getSelectedRow();
			if(tszzdzglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(tszzdzglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.tszzdzgl.tszzdzglId == null ? "sys/tszzdzgl/save" : "sys/tszzdzgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.tszzdzgl),
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
			var tszzdzglIds = getSelectedRows();
			if(tszzdzglIds == null){
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
                        url: baseURL + "sys/tszzdzgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(tszzdzglIds),
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
		getInfo: function(tszzdzglId){
			$.get(baseURL + "sys/tszzdzgl/info/"+tszzdzglId, function(r){
                vm.tszzdzgl = r.tszzdzgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'xmbh': vm.q.xmbh,'cwbh':vm.q.cwbh},

                page:page
            }).trigger("reloadGrid");
		}
	}
});