function getNowDate(){
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
     return time;
}
$(function () {
	vm.getXm();
	vm.getUser();
	$("#xmGrid").jqGrid({
        url: baseURL + 'sys/xm/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmId', index: 'xm_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmname', index: 'xmname', width: 80 }, 			
			{ label: '工程编号', name: 'gcbh', index: 'gcbh', width: 80 }, 			
			{ label: '区域市场', name: 'dd', index: 'dd', width: 80 },		
				

			{ label: '核算单元', name: 'hsdy', index: 'hsdy', width: 80 }, 			
			{ label: '核算单元负责人', name: 'hsdyfzr', index: 'hsdyfzr', width: 80 }, 			
				
		 			
				
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#xmGridPager",
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
        	$("#xmGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
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
		xm:{
			xmname: null,
			gcbh:null
        },
		defaultxm:null,
		 user:{},
		showList: true,
		title: null,
		zjwljkdj: {}
	},
	methods: {
		getUser: function(){
			$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
				vm.user = r.user;
				console.log(vm.user);
				if(vm.user.quanxian=="领导"){
					$('#shenpi').show();

				}else{
					$('#shenpi').hide();

				}
			});
		},
		query: function () {
			vm.reload();
		},
		query1: function () {
			
			vm.xmload();
		},
		query2: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.zjwljkdj = {};
			vm.zjwljkdj.xmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#xmmc').val(xmm);
			$('#xmmc').text(xmm);		
			
			var date=getNowDate();
          	$('#jksj').val(date);
			$('#jksj').text(date);	
			vm.zjwljkdj.jksj=date;
			 var na=$("#syssqr").text();
 	        console.log("na:"+na);
 	    
 	        vm.zjwljkdj.sqr=na;
 	        $('#sqr').val(na);
		},
		getXm:function(){
				 $.ajax({
	          type: "POST",
	          url: baseURL + "sys/xm/getdefaultxm",
	          contentType: "application/json",
	          data: null,
	          success: function(r){
	         	 vm.defaultxm=r;
	
	
	          }
	      });
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
		},
		xmload: function (event) {
			vm.showList = true;
			var page = $("#xmGrid").jqGrid('getGridParam','page');
			$("#xmGrid").jqGrid('setGridParam',{ 
				 postData:{'xmname': vm.xm.xmname,'gcbh':vm.xm.gcbh},
                page:page
            }).trigger("reloadGrid");
			window.location.reload();
		},
		savexm: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(2)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.zjwljkdj.bjxm=d.cell6;
            	  $("#bjxm").val(d.cell6);
//            	  vm.yzfpdj.htbh=d.cell7;
//            	  $("#htbh").val(d.cell7);
              	  $('#myModal2').modal('hide');

            	
            })
   
		}
	}
});