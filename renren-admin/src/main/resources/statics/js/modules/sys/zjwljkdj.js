$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/zjwljkdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'zjwljkdjId', index: 'zjwljkdj_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '标题', name: 'bt', index: 'bt', width: 80 }, 			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
			{ label: '申请部门', name: 'sqbm', index: 'sqbm', width: 80 }, 			
			{ label: '借款金额', name: 'jkje', index: 'jkje', width: 80 }, 			
			{ label: '被借项目', name: 'bjxm', index: 'bjxm', width: 80 }, 			
			{ label: '借款时间', name: 'jksj', index: 'jksj', width: 80 } 			
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
			bt:null,
			sqr:null,
			jklx:null
		},
		showList: true,
		title: null,
		zjwljkdj: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.zjwljkdj = {};
		},
		update: function (event) {
			var zjwljkdjId = getSelectedRow();
			if(zjwljkdjId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(zjwljkdjId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.zjwljkdj.zjwljkdjId == null ? "sys/zjwljkdj/save" : "sys/zjwljkdj/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.zjwljkdj),
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
			var zjwljkdjIds = getSelectedRows();
			if(zjwljkdjIds == null){
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
                        url: baseURL + "sys/zjwljkdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(zjwljkdjIds),
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
		getInfo: function(zjwljkdjId){
			$.get(baseURL + "sys/zjwljkdj/info/"+zjwljkdjId, function(r){
                vm.zjwljkdj = r.zjwljkdj;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'bt': vm.q.bt,'sqr':vm.q.sqr,'jklx':vm.q.jklx},

                page:page
            }).trigger("reloadGrid");
		}
	}
});