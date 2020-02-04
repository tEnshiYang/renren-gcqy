$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/gysdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'gysId', index: 'gys_id', width: 50, key: true },
			{ label: '单位名称', name: 'dwmc', index: 'dwmc', width: 80 }, 			
			{ label: '状态', name: 'zt', index: 'zt', width: 80 }, 			
			{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
				
			{ label: '电话', name: 'dh', index: 'dh', width: 80 }, 			
				
			{ label: '企业性质', name: 'qyxz', index: 'qyxz', width: 80 }, 			
			{ label: '供应商联系人', name: 'gyslxr', index: 'gyslxr', width: 80 }, 			
			{ label: '联系方式', name: 'lxfs', index: 'lxfs', width: 80 }, 			
			{ label: '品牌', name: 'pp', index: 'pp', width: 80 }, 			
			{ label: '地址', name: 'dz', index: 'dz', width: 80 }, 			
			{ label: '营业执照', name: 'yyzz', index: 'yyzz', width: 80 }, 			
			{ label: '产品代理证', name: 'cpdlz', index: 'cpdlz', width: 80 }, 			
			{ label: '确认人', name: 'qrr', index: 'qrr', width: 80 }	,	
			{ label: '确认时间', name: 'qrsj', index: 'qrsj', width: 80 }			

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
			dwmc:null,
			qrr:null,
			cjr:null
		},
		showList: true,
		title: null,
		gysdj: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.gysdj = {};
		},
		update: function (event) {
			var gysId = getSelectedRow();
			if(gysId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(gysId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.gysdj.gysId == null ? "sys/gysdj/save" : "sys/gysdj/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.gysdj),
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
			var gysIds = getSelectedRows();
			if(gysIds == null){
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
                        url: baseURL + "sys/gysdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(gysIds),
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
		getInfo: function(gysId){
			$.get(baseURL + "sys/gysdj/info/"+gysId, function(r){
                vm.gysdj = r.gysdj;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'dwmc': vm.q.dwmc,'qrr': vm.q.qrr,'cjr': vm.q.cjr},

                page:page
            }).trigger("reloadGrid");
		}
	}
});