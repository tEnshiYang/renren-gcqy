function refresh(){
	window.location.reload();

}
function beforeSelectRow()
	{
    	$("#ryGrid").jqGrid('resetSelection');
	    return(true);
	}
var filecount=1;
var attachname = "file";

function addInput(){
	console.log("i="+filecount);
	if(filecount>0&&filecount<=5){
		console.log("add");
	var attach = attachname + filecount ;
	$("#file"+filecount+"").show();

	filecount=filecount+1;
	
	}
}
function deleteInput(){
	if(filecount>1){
		console.log("remove");
		filecount=filecount-1;
	//	var obj=document.getElementById("#file"+filecount+"");
		$("#file"+filecount+"").val('');
		$("#file"+filecount+"").hide();


		
	}
}
function Modify(id){
	console.log(id);
	for(var i=1;i<=5;i++){
		$("#file"+i+"").hide();
	}
	$('#scxmId').val(id);
	$('#myModal2').modal('show');

}
function Download(rows){
//	console.log(rows);
	//获取路径
	var pathName=window.document.location.pathname;
	//截取，得到项目名称
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var strs= new Array(); //定义一数组 
	strs=rows.split("&"); //字符分割 
	
	strs.splice(strs.length-1,1);
	$('#downModal').modal('show');
	var names=new Array();
	
	for (i=0;i<strs.length ;i++ ) 
	{ 
		var a=strs[i].split("/");
		
		strs[i]=projectName+strs[i].substr(2,strs[i].length-1);
		//	console.log(i+":"+strs[i]);
		
//		if(strs.length!=1){
			names[i]=a[a.length-1];
			
//		}
		
		console.log(names[i]);
		$('#downlist').append("<a href="+strs[i]+" download="+names[i]+">"+names[i]+"</a><br>");
	} 

}
function doUpload(){
	
	console.log("upload");
	var scxmId=$('#scxmId').val();
	console.log("scxmId:"+scxmId);
	var formData = new FormData();
    formData.append("yzdwglId", scxmId);
    formData.append("file1", $('#file1')[0].files[0]);
    formData.append("file2", $('#file2')[0].files[0]);
    formData.append("file3", $('#file3')[0].files[0]);
    formData.append("file4", $('#file4')[0].files[0]);
    formData.append("file5", $('#file5')[0].files[0]);
    $.ajax({  
         url: baseURL + 'sys/yzdwgl/fileUp' ,  
         type: 'post',  
         data: formData,  
         cache: false,
         processData: false,
         contentType: false,
         async: false
    }).done(function(res) {
    	 alert("操作成功");
    	$('#myModal2').modal('hide');

    }).fail(function(res) {
        alert("未知异常，请联系管理员");
    });
}

$(function() {
    let $table = $('#table');
    let $button = $('#button');
    let $getTableData = $('#getTableData');
    $('#button').show();
    $button.click(function() {
    	if($('#gsmc').val()==null||$('#gsmc').val()==''){
    		alert('请先选择项目!');return;
    		}
    	
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
            	 gsmc:$('#gsmc').val() ,
            	 xm: '',
                 xb: '',
                 bgdh: '',
                 yddh: '',
                 yx: ''
            }
        });
        console.log($('#gsmc').val());
       
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
            field: 'jfryxxId',
            visible: false
        }, {
            field: 'gsmc',
            title: '公司名称'
        }, {
            field: 'xm',
            title: '姓名'
        },
         {
            field: 'xb',
            title: '性别'
        },
         {
            field: 'bgdh',
            title: '办公电话'
        },
         {
            field: 'yddh',
            title: '移动电话'
        },
         {
            field: 'yx',
            title: '邮箱'
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
         var url =  "sys/jfryxx/save";

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
        url: baseURL + 'sys/yzdwgl/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'yzdwId', index: 'yzdw_id', width: 50, key: true },
			{ label: '公司名称', name: 'gsmc', index: 'gsmc', width: 80 }, 	
			{ label: '操作',name: 'cz', index: 'cz', formatter: function (value, grid, rows, state) { return "<a class='btn btn-primary ' href=\"#\" onclick=\"Modify(" + rows.yzdwId + ")\">上传附件</a> <a class='btn btn-primary ' href=\"#\" onclick=\"Download('" + rows.fj + "')\">下载附件</a>" } },

			{ label: '公司代码', name: 'gsdm', index: 'gsdm', width: 80 }, 			
			{ label: '公名缩写', name: 'gmsx', index: 'gmsx', width: 80 }, 			
			{ label: '公司税号', name: 'gssh', index: 'gssh', width: 80 }, 			
			{ label: '开户银行', name: 'khyh', index: 'khyh', width: 80 }, 			
			{ label: '账户', name: 'zh1', index: 'zh1', width: 80 }, 			
						
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
			gsmc: null
			
        },
		showList: true,
		title: null,
		yzdwgl: {},
		jrryxx:{}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.yzdwgl = {};
		},
		update: function (event) {
			var yzdwId = getSelectedRow();
			if(yzdwId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(yzdwId)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.yzdwgl.yzdwId == null ? "sys/yzdwgl/save" : "sys/yzdwgl/update";
                var url2 = vm.yzdwgl.yzdwId == null ? "sys/jfryxx/save":"sys/jfryxx/update";

                var json=JSON.stringify($('#table').bootstrapTable('getData'));
                // alert(json);
                  console.log(json+" "+url2);

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
                    data: JSON.stringify(vm.yzdwgl),
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
			var yzdwIds = getSelectedRows();
			if(yzdwIds == null){
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
                        url: baseURL + "sys/yzdwgl/delete",
                        contentType: "application/json",
                        data: JSON.stringify(yzdwIds),
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
		getInfo: function(yzdwId){
			$.get(baseURL + "sys/yzdwgl/info/"+yzdwId, function(r){
                vm.yzdwgl = r.yzdwgl;
                var gsmc=vm.yzdwgl.gsmc;
            	$.get(baseURL + "sys/jfryxx/list/"+gsmc, function(r){
                    for(var i=0;i<r.list.length;i++){
                    //	vm.rwddw[i]=r.list[i];
                        $('#table').bootstrapTable('insertRow', {
                            index: 0,
                            row: {
                            	jfryxxId: r.list[i].jfryxxId,
                            	gsmc: r.list[i].gsmc,
                            	 xm: r.list[i].xm,
                                 xb: r.list[i].xb,
                                 bgdh: r.list[i].bgdh,
                                 yddh: r.list[i].yddh,
                                 yx: r.list[i].yx
                            }
                        });
                    }
                   // console.log(vm.rwddw);
                  //  $('#button').hide();
                    
                });
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				 postData:{'gsmc': vm.q.gsmc},
                 page:page
            }).trigger("reloadGrid");
			window.location.reload();
		}
	}
});