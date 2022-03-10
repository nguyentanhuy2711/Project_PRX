import './Schedule.css';
import React from 'react';
import { ScheduleComponent, Inject, Day, Week, Month, WorkWeek, Agenda
      ,ViewDirective, ViewsDirective, TimelineViews, TimelineMonth,TimelineYear 
      , Resize, DragAndDrop, DragEventArgs, ResizeEventArgs, CellClickEventArgs, Schedule} from '@syncfusion/ej2-react-schedule';
import {ScrollOptions, NavigateOptions} from '@syncfusion/ej2-react-schedule';
import {DragAndDropEventArgs, TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
class ScheduleFake extends React.Component <{},{}>{
    public scheduleObj:ScheduleComponent;
    private localData= {
    dataSource: [
      {
        Id:1,
        Start: new Date(2022, 2, 8, 4, 0),
        End: new Date(2022, 2, 8, 6, 30),
        Summary: "John",
        Location:"Yoga center"
     
      },
      {
        Id:2,
        Start: new Date(2022, 2, 17, 6, 30),
        End: new Date(2022, 2, 17, 6, 30),
        Summary:"Peter",
        Location:"Tower center",
        IsReadonly: true,
      }
    ],
    fields:{
      subject : {name :"Summary", default:"No title"},
      startTime:{name: "Start"},
      endTime :{name :"End"},
      

    }
  };
  private onDragStart (args: DragEventArgs):void{
    // (args.scroll as ScrollOptions).enable = false;
    // (args.scroll as ScrollOptions).scrollBy = 500;
    // args.interval = 1;
    // (args.navigation as NavigateOptions).enable = true;
    args.excludeSelectors = "e-all-day-cells, e-work-cells"
  }
  private onResizeStart (args: DragEventArgs): void{
    // (args.scroll as ScrollOptions).enable = false;
    // (args.scroll as ScrollOptions).scrollBy = 500;
    args.interval = 1;
  }
  // private remoteData = new DataManager({
  //   url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true,
  // })
  private treeViewData:{[key:string]:Object}[] = [
    {Id:1, Name:"Huy"},
    {Id:2,Name :"Nguyen"},
    {Id:3,Name:"Tuan"},
    {Id:4,Name: "John"},
    {Id:5,Name:"Peter"}
  ];
  public field:Object = {dataSource:this.treeViewData,id:'Id',text:'Name'}
  public onTreeDragStop(args:DragAndDropEventArgs):void{
    let cellData:CellClickEventArgs = this.scheduleObj.getCellDetails(args.target);
    let eventData:{[key:string]:Object}={
      Summary:args.draggedNodeData.text,
      Start: cellData.startTime,
      End: cellData.endTime,
      IsAllDay:cellData.isAllDay,
    }
    this.scheduleObj.openEditor(eventData,"Add", true);
    this.scheduleObj.addEvent(eventData);
  }

  public getToday(){
    const today = new Date();
    console.log("==========>",today)
    return today;
    }
  public render() {
    return (
      <div className='container'>
        <div className='scheduler-title-container'> Schedule Personal </div>
        <div className='scheduler-component'>
          <ScheduleComponent  
          ref={Schedule=>this.scheduleObj = Schedule as ScheduleComponent}
          width="1300px" height="620px" currentView='Week' selectedDate={this.getToday()}
          // eventSettings={{dataSource:this.remoteData}}
          eventSettings={this.localData} allowDragAndDrop={true} allowResizing = {true}
          dragStart= {this.onDragStart} resizeStart= {this.onResizeStart}
          >
            <ViewsDirective>
                <ViewDirective option='Day' interval={1}  displayName="Today"></ViewDirective>
                <ViewDirective option='Week' interval={1} isSelected={true} ></ViewDirective>
                <ViewDirective option='Month'  showWeekNumber={true} ></ViewDirective>   
            </ViewsDirective>
            <Inject services={[Day, Week, Month, WorkWeek, Agenda, TimelineViews, TimelineMonth, TimelineYear, DragAndDrop, Resize]} />
         </ScheduleComponent>
          </div>

      </div>
    );
  }
}

export default ScheduleFake;