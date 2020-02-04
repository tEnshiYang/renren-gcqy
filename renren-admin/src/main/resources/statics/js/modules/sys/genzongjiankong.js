	
$(function () {

    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/genzong/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'genzongId', index: 'genzong_id', width: 50, key: true },
			 			
			{ label: '项目编号', name: 'xmbh', index: 'xmbh', width: 80 }, 	
			{ label: '进展状况', name: 'jzzk', index: 'mqzk', width: 80 }, 

			{ label: '申请部门', name: 'sqbm', index: 'sqbm', width: 80 }, 	
			{ label: '申请时间', name: 'sqsj', index: 'sqsj', width: 80 }, 
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 },
			{ label: '项目地址', name: 'xmdz', index: 'xmdz', width: 80 }, 		
			{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
			{ label: '核算单元负责人', name: 'hsdyfzr', index: 'hsdyfzr', width: 80 } 			
					
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
			xmname: null,
			xmbh:null,
			jzzk:null
        },
		showList: true,
		title: null,
		genzong: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
		
			vm.showList = false;
			vm.title = "新增";
			vm.genzong = {};
			
		},
		update: function (event) {
			var genzongId = getSelectedRow();
			if(genzongId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(genzongId)
		},
		saveOrUpdate: function (event) {
		
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
		    	alert("genzongjiankong");
                var url = vm.genzong.genzongId == null ? "sys/genzong/save" : "sys/genzong/update";
             	var date=new Date();

            	var year=date.getFullYear();
            	var month=date.getMonth();
            	var day=date.getDate();

                var hour=date.getHours();
                var minute=date.getMinutes();
                var second=date.getSeconds();

                //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
                if (hour<10) {
                	hour='0'+hour;
                }
                if (minute<10) {
                	minute='0'+minute;
                }
                if (second<10) {
                	second='0'+second;
                }


                var x=date.getDay();//获取星期


                var time=year+'/'+(1+month)+'/'+day+' '+hour+':'+minute+':'+second
 
               
               
                console.log(time);
              vm.genzong.sqsj=time;
                var bootstrapValidator = $("#gzform").data('bootstrapValidator');
                
                //手动触发验证
                bootstrapValidator.validate();
                if(bootstrapValidator.isValid()){
                
//              	  alert("通过");
                		//提交表单
//                		 document.getElementById("gainAddForm").submit();
                		  $.ajax({
                              type: "POST",
                              url: baseURL + url,
                              contentType: "application/json",
                              data: JSON.stringify(vm.genzong),
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
                }else{
                	alert("不通过");
                }
              
			});
		},
		del: function (event) {
			var genzongIds = getSelectedRows();
			if(genzongIds == null){
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
                        url: baseURL + "sys/genzong/delete",
                        contentType: "application/json",
                        data: JSON.stringify(genzongIds),
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
		getInfo: function(genzongId){
			$.get(baseURL + "sys/genzong/info/"+genzongId, function(r){
                vm.genzong = r.genzong;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'xmname': vm.q.xmname,'xmbh':vm.q.xmbh,'jzzk':vm.q.jzzk},
                page:page
            }).trigger("reloadGrid");
		}
	}
});