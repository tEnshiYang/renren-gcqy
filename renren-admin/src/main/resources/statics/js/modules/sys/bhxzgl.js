$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/bhxzgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'bhxzglId', index: 'bhxzgl_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '编号', name: 'bh', index: 'bh', width: 80 }, 			
			{ label: '需求部门', name: 'xqbm', index: 'xqbm', width: 80 }, 			
			{ label: '申请人', name: 'sqr', index: 'sqr', width: 80 }, 			
			{ label: '申请日期', name: 'sqrq', index: 'sqrq', width: 80 }, 			
			{ label: '合同号', name: 'hth', index: 'hth', width: 80 }, 			
			{ label: '工程名称', name: 'gcmc', index: 'gcmc', width: 80 }, 			
			{ label: '工程总价', name: 'gczj', index: 'gczj', width: 80 }, 			
			{ label: '保函金额', name: 'bhje', index: 'bhje', width: 80 }, 			
			{ label: '保函期限', name: 'bhqx', index: 'bhqx', width: 80 } 			
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
			hth:null,
			gcmc:null

		},
		showList: true,
		title: null,
		bhxzgl: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bhxzgl = {};
		},
		update: function (event) {
			var bhxzglId = getSelectedRow();
			if(bhxzglId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(bhxzglId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.bhxzgl.bhxzglId == null ? "sys/bhxzgl/save" : "sys/bhxzgl/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bhxzgl),
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
			var bhxzglIds = getSelectedRows();
			if(bhxzglIds == null){
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
                        url: baseURL + "sys/bhxzgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(bhxzglIds),
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
		getInfo: function(bhxzglId){
			$.get(baseURL + "sys/bhxzgl/info/"+bhxzglId, function(r){
                vm.bhxzgl = r.bhxzgl;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'bh': vm.q.bh,'xqbm':vm.q.xqbm,'hth':vm.q.hth,'gcmc':vm.q.gcmc},

                page:page
            }).trigger("reloadGrid");
		}
	}
});