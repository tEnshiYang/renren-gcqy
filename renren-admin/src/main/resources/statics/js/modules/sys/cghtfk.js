$(function () {
	vm.getXm();
	$("#htGrid").jqGrid({
	     url: baseURL + 'sys/cghtdj/list',
	     datatype: "json",
	     colModel: [			
				{ label: '序号', name: 'cghtdjId', index: 'cghtdj_id', width: 50, key: true },							 			
				{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 
				{ label: '采购合同总额', name: 'cghtze', index: 'cghtze', width: 80 },
				{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
				{ label: '合同类型', name: 'htlx', index: 'htlx', width: 80 }, 			
				{ label: '签订日期', name: 'qdrq', index: 'qdrq', width: 80 }, 			
				{ label: '累计到票金额', name: 'ljdpje', index: 'ljdpje', width: 80 }, 			
				
				{ label: '最终价', name: 'zzj', index: 'zzj', width: 80 }			
	     ],
			viewrecords: true,
	     height: 385,
	     rowNum: 10,
			rowList : [10,30,50],
	     rownumbers: true, 
	     rownumWidth: 25, 
	     autowidth:true,
	     multiselect: true,
	     pager: "#htGridPager",
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
	     	$("#htGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	     }
	 });
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/cghtfk/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'tbCghtfk', index: 'tb_cghtfk', width: 50, key: true },
			{ label: '合同编号', name: 'htzt', index: 'htzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
			{ label: '合同编号', name: 'htbh', index: 'htbh', width: 80 }, 			
			{ label: '支付类别', name: 'zflb', index: 'zflb', width: 80 }, 			
			{ label: '付款方式', name: 'fkfs', index: 'fkfs', width: 80 }, 			
			{ label: '总金额', name: 'zje', index: 'zje', width: 80 }, 			
			{ label: '本次付款金额', name: 'bcfkje', index: 'bcfkje', width: 80 }, 			
			{ label: '已付款金额', name: 'yfkje', index: 'yfkje', width: 80 }, 			
			{ label: '剩余付款金额', name: 'syfkje', index: 'syfkje', width: 80 }, 			
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
			htmc:null,
			htbh:null,
			htlx:null

		},
		  ht:{
				htmc:null,
				htbh:null,
				htlx:null

			},
			nextfkbh:null,
		defaultxm:null,
		showList: true,
		title: null,
		cghtfk: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		query4: function () {
			vm.htload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.cghtfk = {};
			vm.getBh();
			vm.cghtfk.ssxmmc=vm.defaultxm.xmname;
			var xmm=vm.defaultxm.xmname;		        
			 console.log(xmm);
			 $('#ssxmmc').text(123);
			 $('#ssxmmc').val(123);
			
			 $('#htmc').val(123);
			 $('#htmc').text(123);
			 $('#htbh').val(123);
			 $('#htbh').text(123);
			 console.log($('#htmc').val());
			 console.log($('#ssxmmc').val());
			 console.log($('#htbh').val());
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
		getBh:function(){
			 $.ajax({
	               type: "POST",
	               url: baseURL + "sys/cghtfk/getnextbh",
	               contentType: "application/json",
	               data: null,
	               success: function(r){
	            	  var bh="CGFK"+r.zfbh;
	            	  vm.nextfkbh=bh;
	            	  vm.cghtfk.bgbh=vm.nextfkbh;
	     			 $('#fkbh').val(vm.nextfkbh);
	     			 $('#fkbh').text(vm.nextfkbh);
	            	  console.log(bh);


	               }
	           });
		},
		update: function (event) {
			var tbCghtfk = getSelectedRow();
			if(tbCghtfk == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(tbCghtfk)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.cghtfk.tbCghtfk == null ? "sys/cghtfk/save" : "sys/cghtfk/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.cghtfk),
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
			var tbCghtfks = getSelectedRows();
			if(tbCghtfks == null){
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
                        url: baseURL + "sys/cghtfk/delete",
                        contentType: "application/json",
                        data: JSON.stringify(tbCghtfks),
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
		getInfo: function(tbCghtfk){
			$.get(baseURL + "sys/cghtfk/info/"+tbCghtfk, function(r){
                vm.cghtfk = r.cghtfk;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.q.htmc,'htbh': vm.q.htbh,'htlx': vm.q.htlx},

                page:page
            }).trigger("reloadGrid");
		},
		htload: function (event) {
			vm.showList = true;
			var page = $("#htGrid").jqGrid('getGridParam','page');
			$("#htGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.ht.htmc,'htbh': vm.ht.htbh,'htlx': vm.ht.htlx},

                page:page
            }).trigger("reloadGrid");
		},
		saveht: function (event) {
			console.log("savvvvvvvvvcccg");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("#htGrid input[type=checkbox]:checked").map(function () {
                return { 
                	"htmc": $.trim($(this).closest("tr").find("td:eq(3)").text()),
                	"htbh": $.trim($(this).closest("tr").find("td:eq(5)").text()),
                	"cghtze": $.trim($(this).closest("tr").find("td:eq(4)").text()),
                	};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
          	  
                  console.log(d.htmc);
            	  vm.cghtfk.htbh=d.htbh;
            	  vm.cghtfk.htmc=d.htmc;
            	  vm.cghtfk.zje=d.cghtze;
            	  $("#htmc").val(d.htmc);
            	  $("#htbh").val(d.htbh);
            	  $("#zje").val(d.cghtze);
              	  $('#myModal4').modal('hide');

            	
            })
   
		}
	}
});