$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/yzfpdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzfpdjId', index: 'yzfpdj_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
					
			{ label: '单位全称', name: 'dwqc', index: 'dwqc', width: 80 }, 			
				
			{ label: '单位纳税识别号', name: 'dwnssbh', index: 'dwnssbh', width: 80 }, 			
			{ label: '金额', name: 'je', index: 'je', width: 80 }			
			
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
		
			fplx:null,
			kpsl:null
		},
		showList: true,
		title: null,
		yzfpdj: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.yzfpdj = {};
		},
		update: function (event) {
			var yzfpdjId = getSelectedRow();
			if(yzfpdjId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(yzfpdjId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.yzfpdj.yzfpdjId == null ? "sys/yzfpdj/save" : "sys/yzfpdj/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.yzfpdj),
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
			var yzfpdjIds = getSelectedRows();
			if(yzfpdjIds == null){
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
                        url: baseURL + "sys/yzfpdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(yzfpdjIds),
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
		getInfo: function(yzfpdjId){
			$.get(baseURL + "sys/yzfpdj/info/"+yzfpdjId, function(r){
                vm.yzfpdj = r.yzfpdj;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'fplx': vm.q.fplx,'kpsl':vm.q.kpsl},

                page:page
            }).trigger("reloadGrid");
		}
	}
});