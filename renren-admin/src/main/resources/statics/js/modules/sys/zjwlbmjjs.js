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
    	if($('#fkxm').val()==null||$('#fkxm').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	xmmc: $('#fkxm').val(),
            	 lb: '',
                 je: '',
                 bz: ''
            }
        });
        console.log($('#fkxm').val());
       
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
         var url =  "sys/fyqd/save";

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
        url: baseURL + 'sys/zjwlbmjjs/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'zjwlbmjjsId', index: 'zjwlbmjjs_id', width: 50, key: true },
			{ label: '审批状态', name: 'spzt', index: 'spzt', width: 80 }, 			
			{ label: '付款部门', name: 'fkbm', index: 'fkbm', width: 80 }, 			
			{ label: '付款项目', name: 'fkxm', index: 'fkxm', width: 80 }, 			
			{ label: '收款部门', name: 'skbm', index: 'skbm', width: 80 }, 			
			{ label: '收款项目', name: 'skxm', index: 'skxm', width: 80 }, 			
			{ label: '创建时间', name: 'cjsj', index: 'cjsj', width: 80 } 			
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
		fyqd:{},
		showList: true,
		title: null,
		zjwlbmjjs: {}
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
			vm.zjwlbmjjs = {};
			
			vm.zjwlbmjjs.fkxm=vm.defaultxm.xmname;		
			var xmm=vm.defaultxm.xmname;			
	    	
          	$('#fkxm').val(xmm);
			$('#fkxm').text(xmm);		
			
			var date=getNowDate();
          	$('#cjsj').val(date);
			$('#cjsj').text(date);	
			vm.zjwlbmjjs.cjsj=date;
			 var na=$("#syssqr").text();
 	        console.log("na:"+na);
 	    
 	        vm.zjwlbmjjs.sqr=na;
 	        $('#sqr').val(na);
		},
		update: function (event) {
			var zjwlbmjjsId = getSelectedRow();
			if(zjwlbmjjsId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(zjwlbmjjsId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.zjwlbmjjs.zjwlbmjjsId == null ? "sys/zjwlbmjjs/save" : "sys/zjwlbmjjs/update";
                var url2 = vm.zjwlbmjjs.zjwlbmjjsId == null ? "sys/fyqd/save":"sys/fyqd/update";

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
                    data: JSON.stringify(vm.zjwlbmjjs),
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
			var zjwlbmjjsIds = getSelectedRows();
			if(zjwlbmjjsIds == null){
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
                        url: baseURL + "sys/zjwlbmjjs/delete",
                        contentType: "application/json",
                        data: JSON.stringify(zjwlbmjjsIds),
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
		getInfo: function(zjwlbmjjsId){
			$.get(baseURL + "sys/zjwlbmjjs/info/"+zjwlbmjjsId, function(r){
                vm.zjwlbmjjs = r.zjwlbmjjs;
                
                var xmmc=vm.zjwlbmjjs.fkxm;
          
                //动态增加可编辑入围单位列表
    			$.get(baseURL + "sys/fyqd/list/"+xmmc, function(r){
                   
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	 fyqdId: r.list[i].fyqdId,
                            	 xmmc: r.list[i].fkxm,
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