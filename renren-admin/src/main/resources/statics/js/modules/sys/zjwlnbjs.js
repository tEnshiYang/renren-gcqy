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
$(function() {
	vm.getXm();
	vm.getUser();
    let $table = $('#table');
    let $button = $('#button');
    let $getTableData = $('#getTableData');
    $('#button').show();
    $button.click(function() {
    	if($('#xmmc').val()==null||$('#xmmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: $('#xmmc').val(),
            	 lb: '',
                 je: '',
                 bz: ''
            }
        });
        console.log($('#xmmc').val());
       
//        $('td').parent().find('td').eq(1).val($('#xmmc').val());
//        $('td').parent().find('td').eq(1).text($('#xmmc').val());
//        $('td').parent().find('td').eq(1).hide();
//        console.log( $('td').parent().find('td').eq(1).val());
    });

    $table.bootstrapTable({
        url: 'data2.json',
        toolbar: '#toolbar',
        clickEdit: true,
        showToggle: true,
        pagination: true,       //显示分页条
        showColumns: false,
        showPaginationSwitch: false,     //显示切换分页按钮
        showRefresh: false,      //显示刷新按钮
        //clickToSelect: true,  //点击row选中radio或CheckBox visible: false
        columns: [{
            checkbox: true
        }, {
            field: 'fyqdId',
            visible: false
        }, {
            field: 'lb',
            title: '类别'
        }, {
            field: 'je',
            title: '金额'
        },
         {
            field: 'bz',
            title: '备注'
        } ],
        /**
         * @param {点击列的 field 名称} field
         * @param {点击列的 value 值} value
         * @param {点击列的整行数据} row
         * @param {td 元素} $element
         */
        onClickCell: function(field, value, row, $element) {
            $element.attr('contenteditable', true);
            $element.blur(function() {
                let index = $element.parent().data('index');
                let tdValue = $element.html();

                saveData(index, field, tdValue);
            })
        }
    });

    $getTableData.click(function() {
    	var json=JSON.stringify($table.bootstrapTable('getData'));
       // alert(json);
         var url =  "sys/fyqd2/save";

        $.ajax({
            type: "POST",
            url: baseURL + url,
            contentType: "application/json",
            data: json,
            success: function(r){
                if(r.code === 0){
                     layer.msg("操作成功", {icon: 1});
                }
            }
        });
    });

    function saveData(index, field, value) {
        $table.bootstrapTable('updateCell', {
            index: index,       //行索引
            field: field,       //列名
            value: value        //cell值
        })
    }

});
$(function () {
	
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/zjwlnbjs/list',
        datatype: "json",
        colModel: [			
			{ label: 'bzjfkId', name: 'bzjfkId', index: 'bzjfk_id', width: 50, key: true },
			{ label: '项目名称', name: 'xmmc', index: 'xmmc', width: 80 }, 			
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '部门', name: 'bm', index: 'bm', width: 80 }, 			
			{ label: '创建人', name: 'cjr', index: 'cjr', width: 80 }, 			
			{ label: '记录时间', name: 'jlsj', index: 'jlsj', width: 80 }, 			
			{ label: '费用清单', name: 'fyqd', index: 'fyqd', width: 80 }, 			
			{ label: '备注', name: 'bz', index: 'bz', width: 80 }			
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
			fkbm:null,
			fkxm:null,
			skbm:null,
			skxm:null
		},
		defaultxm:null,
		user:{},
		showList: true,
		title: null,
		zjwlnbjs: {}
	},
	methods: {
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
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.zjwlnbjs = {};
			
			vm.zjwlnbjs.xmmc=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#xmmc').val(xmm);
			$('#xmmc').text(xmm);		
			
			var date=getNowDate();
          	$('#jlsj').val(date);
			$('#jlsj').text(date);	
			vm.zjwlnbjs.jlsj=date;
			 var na=$("#syssqr").text();
 	        console.log("na:"+na);
 	    
 	        vm.zjwlnbjs.cjr=na;
 	        $('#cjr').val(na);
		},
		update: function (event) {
			var bzjfkId = getSelectedRow();
			if(bzjfkId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(bzjfkId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.zjwlnbjs.bzjfkId == null ? "sys/zjwlnbjs/save" : "sys/zjwlnbjs/update";
                var url2 = vm.zjwlnbjs.bzjfkId == null ? "sys/fyqd2/save":"sys/fyqd2/update";
                
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
                    data: JSON.stringify(vm.zjwlnbjs),
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
			var bzjfkIds = getSelectedRows();
			if(bzjfkIds == null){
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
                        url: baseURL + "sys/zjwlnbjs/delete",
                        contentType: "application/json",
                        data: JSON.stringify(bzjfkIds),
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
		getInfo: function(bzjfkId){
			$.get(baseURL + "sys/zjwlnbjs/info/"+bzjfkId, function(r){
                vm.zjwlnbjs = r.zjwlnbjs;
                
                var xmmc=vm.zjwlnbjs.fkxm;
                
                //动态增加可编辑入围单位列表
    			$.get(baseURL + "sys/fyqd2/list/"+xmmc, function(r){
                   
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	 fyqdId: r.list[i].fyqdId,
                            	 xmmc: r.list[i].xmmc,
                            	 lb: r.list[i].lb,
                                 je: r.list[i].je,
                                 bz: r.list[i].bz
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
				postData:{'fkbm': vm.q.fkbm,'fkxm':vm.q.fkxm,'skbm':vm.q.skbm,'skxm':vm.q.skxm},

                page:page
            }).trigger("reloadGrid");
		}
	}
});