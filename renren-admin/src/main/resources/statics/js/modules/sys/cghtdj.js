
$(function () {
	
	vm.getXm();
	vm.getUser();
	 let $table = $('#table');
	    let $button = $('#button');
	    let $getTableData = $('#getTableData');
	    $('#button').show();
	    $button.click(function() {
	    	
	    	
	        $table.bootstrapTable('insertRow', {
	            index: 0,
	            row: {
	            	
	            	 xtmc: '',
	            	 wpmc: '',
	                 sbbm: '',
	                 tbpp: '',
	                 tbpp: '',
	                 dw: '',
	                 sl: '',
	                 dj: '',
	                 xhgg: ''
	            }
	        });
	        console.log($('#xmmc').val());
	       
//	        $('td').parent().find('td').eq(1).val($('#xmmc').val());
//	        $('td').parent().find('td').eq(1).text($('#xmmc').val());
//	        $('td').parent().find('td').eq(1).hide();
//	        console.log( $('td').parent().find('td').eq(1).val());
	    });

	    $table.bootstrapTable({
	        url: 'data2.json',
	        toolbar: '#toolbar',
	        clickEdit: false,
	        showToggle: true,
	        pagination: true,       //显示分页条
	        showColumns: false,
	        showPaginationSwitch: false,     //显示切换分页按钮
	        showRefresh: false,      //显示刷新按钮
	        //clickToSelect: true,  //点击row选中radio或CheckBox visible: false
	        columns: [{
	            checkbox: true
	        },
	        {
	            field: 'htId',
	            visible:false
	        },
	        {
	            field: 'xmtbqdId',
	            title: 'id'
	        }, {
	            field: 'xtmc',
	            title: '系统名称'
	        }, {
	            field: 'wpmc',
	            title: '物品名称'
	        },
	         {
	            field: 'sbbm',
	            title: '设备编码'
	        },
	         {
	            field: 'tbpp',
	            title: '投标品牌'
	        },
	         {
	            field: 'dw',
	            title: '单位'
	        },
	         {
	            field: 'sl',
	            title: '数量'
	        },
	         {
	            field: 'dj',
	            title: '单价'
	        },
	        {
	            field: 'xhgg',
	            title: '型号规格'
	        }, ],
	        /**
	         * @param {点击列的 field 名称} field
	         * @param {点击列的 value 值} value
	         * @param {点击列的整行数据} row
	         * @param {td 元素} $element
	         */
	        onClickCell: function(field, value, row, $element) {
	            $element.attr('contenteditable', false);
	            $element.blur(function() {
	                let index = $element.parent().data('index');
	                let tdValue = $element.html();

	                saveData(index, field, tdValue);
	            })
	        }
	    });
	$("#cgGrid").jqGrid({
        url: baseURL + 'sys/xmtbqd/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'xmtbqdId', index: 'xmtbqd_id', width: 50, key: true },
			{ label: '系统名称', name: 'xtmc', index: 'xtmc', width: 80 }, 			
			{ label: '设备编码', name: 'sbbm', index: 'sbbm', width: 80 }, 			
			{ label: '投标品牌', name: 'tbpp', index: 'tbpp', width: 80 }, 			
			{ label: '物品名称', name: 'wpmc', index: 'wpmc', width: 80 }, 			
			{ label: '单位', name: 'dw', index: 'dw', width: 80 }, 		
			{ label: '单价', name: 'dj', index: 'dj', width: 80 }, 			

			{ label: '成本单价', name: 'cbdj', index: 'cbdj', width: 80 }, 			
			{ label: '型号规格', name: 'xhgg', index: 'xhgg', width: 80 }, 			
			{ label: '数量', name: 'sl', index: 'sl', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
       
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        
        multiselect: true,
        pager: "#cgGridPager",
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
        	$("#cgGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
	 $("#jfGrid").jqGrid({
	        url: baseURL + 'sys/yzdwgl/list',
	        datatype: "json",
	        colModel: [			
				{ label: '序号', name: 'yzdwId', index: 'yzdw_id', width: 50, key: true },
				{ label: '公司名称', name: 'gsmc', index: 'gsmc', width: 80 }, 	

				{ label: '公司代码', name: 'gsdm', index: 'gsdm', width: 80 }, 			
				{ label: '公名缩写', name: 'gmsx', index: 'gmsx', width: 80 }, 					
				{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
						
				{ label: '地址', name: 'dz', index: 'dz', width: 80 }			
					
	        ],
			viewrecords: true,
	        height: 385,
	        rowNum: 10,
			rowList : [10,30,50],
	        rownumbers: true, 
	        rownumWidth: 25, 
	        autowidth:true,
	        multiselect: true,
	        pager: "#jfGridPager",
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
	        	$("#jfGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
	    $("#yfGrid").jqGrid({
	        url: baseURL + 'sys/gysdj/list',
	        datatype: "json",
	        colModel: [			
	               	{ label: '序号', name: 'gysId', index: 'gys_id', width: 50, key: true },
	    			{ label: '单位名称', name: 'dwmc', index: 'dwmc', width: 80 }, 			
	    			{ label: '注册资金', name: 'zczj', index: 'zczj', width: 80 }, 			
	    				
	    	
	    			{ label: '企业性质', name: 'qyxz', index: 'qyxz', width: 80 }, 			
	    			{ label: '品牌', name: 'pp', index: 'pp', width: 80 }, 			
	    			{ label: '地址', name: 'dz', index: 'dz', width: 80 }		
	    				
					
	        ],
			viewrecords: true,
	        height: 385,
	        rowNum: 10,
			rowList : [10,30,50],
	        rownumbers: true, 
	        rownumWidth: 25, 
	        autowidth:true,
	        multiselect: true,
	        pager: "#yfGridPager",
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
	        	$("#yfGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/cghtdj/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'cghtdjId', index: 'cghtdj_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '合同状态', name: 'htzt', index: 'htzt', width: 80 }, 			
			{ label: '合同名称', name: 'htmc', index: 'htmc', width: 80 }, 			
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
		jf:{
        	gsmc: null,
        },
        yf:{
        	dwmc: null,
        },
		cg: {wpmc:null},
		nexthtid:null,
		defaultxm:null,
		user:{},
		showList: true,
		title: null,
		cghtdj: {}
	},
	methods: {
		showtext:function (){

			var sbbxfs='#'+$('input[name=sbbxfs]:checked').prop('id');

			if(sbbxfs=="#sbbxfsinput1"){
				$(sbbxfs).val($('#sbbxfs1').text());
				console.log($(sbbxfs).val());

			}




		}
		,
		query: function () {
			vm.reload();
		},
		query2: function () {
			
			vm.jfload();
		},
		query3: function () {
			
			vm.yfload();
		},
		query4: function () {
			vm.cgload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.cghtdj = {};
			vm.getXh();
			vm.gethtid();

			vm.cghtdj.ssxmmc=vm.defaultxm.xmname;
			var xmm=vm.defaultxm.xmname;		
	        var na=$("#syssqr").text();
	        vm.cghtdj.jbr=na;
	        $('#jbr').val(na);
			 $('#jbr').text(na);

			$('#ssxmmc').text(xmm);
			$('#ssxmmc').val(xmm);
			  
		       
//			console.log($('#jbr').text());
		},
		update: function (event) {
			var cghtdjId = getSelectedRow();
			if(cghtdjId == null){
				return ;
			}
			vm.nexthtid=cghtdjId;
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(cghtdjId)
		},
		getUser: function(){
			$.getJSON(baseURL +"sys/user/info?_"+$.now(), function(r){
				vm.user = r.user;
				
			});
		},
		//zi
		gethtid:function(){
			 $.ajax({
	                type: "POST",
	                url: baseURL + "sys/cghtdj/gethtid",
	                contentType: "application/json",
	                data: null,
	                success: function(r){
		            console.log("gethtid"+ r.cghtdjId);

	               	 vm.nexthtid=r.cghtdjId;
	               	
	                }
	            });
		},
		
		getXm:function(){
			 $.ajax({
                type: "POST",
                url: baseURL + "sys/xm/getdefaultxm",
                contentType: "application/json",
                data: null,
                success: function(r){
//               	 console.log('getxm');
               	 vm.defaultxm=r;
 
                }
            });
		},
		getXh: function(){
//			console.log("getxh");
			 $.ajax({
	                type: "POST",
	                url: baseURL + "sys/cghtdj/getxh",
	                contentType: "application/json",
	                data: null,
	                success: function(r){
//	                	console.log(vm.defaultxm);
	                	var bh=(vm.defaultxm.gcbh)+""+r.htbh;
	    				vm.cghtdj.htbh = bh;
	    				$('#htbh').val(bh);
	    				$('#htbh').text(bh);

	 
	                }
	            });

		},
		saveOrUpdate: function (event) {
			var sbbxfs='#'+$('input[name=sbbxfs]:checked').prop('id');
			var jsfs='#'+$('input[name=jsfs]:checked').prop('id');

			var zbq='#'+$('input[name=zbq]:checked').prop('id');
			var qt='#'+$('input[name=qt]:checked').prop('id');

			if(sbbxfs=="#sbbxfsinput1"){

				vm.cghtdj.sbbxfs=$('#sbbxfs1').text();
			}

			if(qt=="#qtinput"){

				vm.cghtdj.qt=$('#qt').text();
			}
			if(zbq=="#zbqinput1"){
				vm.cghtdj.zbq=$('#zbq1').text();
			}else if(zbq=="#zbqinput2"){
				vm.cghtdj.zbq=$('#zbq2').text();
			}else if(zbq=="#zbqinput3"){
				vm.cghtdj.zbq=$('#zbq3').text();
			}else if(zbq=="#zbqinput4"){
				vm.cghtdj.zbq=$('#zbq4').text();
			}else if(zbq=="#zbqinput5"){
				vm.cghtdj.zbq=$('#zbq5').text();
			}
			if(jsfs=="#jsfsinput1"){
				vm.cghtdj.jsfs=$('#jsfs1').text();
			}else if(jsfs=="#jsfsinput2"){
				vm.cghtdj.jsfs=$('#jsfs2').text();
			}else if(jsfs=="#jsfsinput3"){
				vm.cghtdj.jsfs=$('#jsfs3').text();
			}else if(jsfs=="#jsfsinput4"){
				vm.cghtdj.jsfs=$('#jsfs4').text();
			}
			
		
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.cghtdj.cghtdjId == null ? "sys/cghtdj/save" : "sys/cghtdj/update";
                var url2="sys/cghtdj/saveqd";
                var json=JSON.stringify($('#table').bootstrapTable('getData'));
                // alert(json);
                  

                 $.ajax({
                     type: "POST",
                     url: baseURL + url2,
                     contentType: "application/json",
                     data: json,
                     success: function(r){
                        
                     }
                 });
                 
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.cghtdj),
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
			var cghtdjIds = getSelectedRows();
			if(cghtdjIds == null){
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
                        url: baseURL + "sys/cghtdj/delete",
                        contentType: "application/json",
                        data: JSON.stringify(cghtdjIds),
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
		getInfo: function(cghtdjId){
			$.get(baseURL + "sys/cghtdj/info/"+cghtdjId, function(r){
                vm.cghtdj = r.cghtdj;
                var cghtdjId=vm.cghtdj.cghtdjId;
                $.get(baseURL + "sys/cgqd/getlist/"+cghtdjId, function(r){
                    
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                                index: 0,
                          
                            	row: {
                  	             	 htId:r.list[i].cghtdjId,
                  	            	 xmtbqdId:r.list[i].xmhtqdId,
                  	            	 xtmc: r.list[i].xtmc,
                  	            	 wpmc: r.list[i].wpmc,
                  	                 sbbm: r.list[i].sbbm,                  	                
                  	                 tbpp: r.list[i].tbpp,
                  	                 dw: r.list[i].dw,
                  	                 sl: r.list[i].sl,
                  	                 dj: r.list[i].dj,
                  	                 xhgg: r.list[i].xhgg
                  	            }
                        });
                    }
                   // console.log(vm.rwddw);
                    $('#button').hide();
                    
                });
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'htmc': vm.q.htmc,'htbh': vm.q.htbh,'htlx': vm.q.htlx},
                page:page
            }).trigger("reloadGrid");
			window.location.reload();
		},
		jfload: function (event) {
			/*
			vm.showList = true;*/
			
			var page2 = $("#jfGrid").jqGrid('getGridParam','page');
			$("#jfGrid").jqGrid('setGridParam',{ 
				 postData:{'gsmc': vm.jf.gsmc},
                page:page2
            }).trigger("reloadGrid");
		},
		yfload: function (event) {
			/*
			vm.showList = true;*/
			
			var page3 = $("#yfGrid").jqGrid('getGridParam','page');
			$("#yfGrid").jqGrid('setGridParam',{ 
				 postData:{'dwmc': vm.yf.dwmc},
                page:page3
            }).trigger("reloadGrid");
		},
		cgload: function (event) {
			vm.showList = true;
			var page = $("#cgGrid").jqGrid('getGridParam','page');
			$("#cgGrid").jqGrid('setGridParam',{ 
				postData:{'wpmc': vm.q.wpmc},

                page:page
            }).trigger("reloadGrid");
		},
		savejf: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
            	  console.log("c"+d.cell6);
            	  vm.cghtdj.jfdw=d.cell6;
            	  $("#jfdw").val(d.cell6);
              	  $('#myModal2').modal('hide');
//                alert(d.cell2 + "|" + d.cell3);
            /*	if(qselect==1){
            		vm.xm.hsdyfzr=d.cell3;
                	$("#hsdyfzr").val(d.cell3);
                	$('#myModal').modal('hide');
            	}else if(qselect==2){
            		vm.xm.xmjl=d.cell3;
                	$("#xmjl").val(d.cell3);
                	$('#myModal').modal('hide');
            	}*/
            	
            })
   
		},
		saveyf: function (event) {
			console.log("savvvvvvvvv");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("table input[type=checkbox]:checked").map(function () {
                return { "cell6": $.trim($(this).closest("tr").find("td:eq(3)").text())};
            }).get();
            $.each(array, function (i, d) {
          	  vm.cghtdj.yfdw=d.cell6;

            	  $("#yfdw").val(d.cell6);
              	  $('#myModal3').modal('hide');
//                alert(d.cell2 + "|" + d.cell3);
            /*	if(qselect==1){
            		vm.xm.hsdyfzr=d.cell3;
                	$("#hsdyfzr").val(d.cell3);
                	$('#myModal').modal('hide');
            	}else if(qselect==2){
            		vm.xm.xmjl=d.cell3;
                	$("#xmjl").val(d.cell3);
                	$('#myModal').modal('hide');
            	}*/
            	
            })
   
		},
		savecg: function (event) {
			console.log("savvvvvvvvvcccg");
			//var h=$('#ryGrid').bootstrapTable('getSelections');
			 //获取选中的数据组
            var array = $("#cgGrid input[type=checkbox]:checked").map(function () {
                return { "id": $.trim($(this).closest("tr").find("td:eq(2)").text()),
                	"xtmc": $.trim($(this).closest("tr").find("td:eq(3)").text()),
                	"sbbm": $.trim($(this).closest("tr").find("td:eq(4)").text()),
                	"tbpp": $.trim($(this).closest("tr").find("td:eq(5)").text()),
                	"wpmc": $.trim($(this).closest("tr").find("td:eq(6)").text()),
                	"dw": $.trim($(this).closest("tr").find("td:eq(7)").text()),
                	"dj": $.trim($(this).closest("tr").find("td:eq(8)").text()),
                	"xhgg": $.trim($(this).closest("tr").find("td:eq(10)").text()),
                	"sl": $.trim($(this).closest("tr").find("td:eq(11)").text())};
            }).get();
            $.each(array, function (i, d) {
//            	  console.log("c"+d.id);
//            	  console.log("xtmc"+d.xtmc);
//            	  
            	console.log("insert"+vm.nexthtid);
            	  $('#table').bootstrapTable('insertRow', {
      	            index: 0,
      	            row: {
      	            	htId:vm.nexthtid,
      	            	xmtbqdId:d.id,
      	            	 xtmc: d.xtmc,
      	            	 wpmc: d.wpmc,
      	                 sbbm: d.sbbm,
      	                
      	                 tbpp: d.tbpp,
      	                 dw: d.dw,
      	                 sl: d.sl,
      	                 dj: d.dj,
      	                 xhgg: d.xhgg
      	            }
      	        });
//            	  vm.cghtdj.jfdw=d.cell6;
//            	  $("#jfdw").val(d.cell6);
              	  $('#myModal4').modal('hide');

            	
            })
   
		}
	}
});