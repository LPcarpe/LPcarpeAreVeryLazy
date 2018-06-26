import java.util.*;//导入要用的包


public class StuM {
public static void main(String[] args)
{
//引入包中的输入函数
Scanner in = new Scanner(System.in);
//输入学生人数
System.out.println("请输入学生人数");
int renshu = in.nextInt();
//输入课程数目
System.out.println("请输入科目数");
int courseNum = in.nextInt();
//定义人名数组
String[] name = new String[renshu];
//定义课程数组
String[] course = new String[courseNum];
//二维数组用来存放特定学生的所有成绩
int[][] number = new int[renshu][courseNum];
//存储每一位学生的总分
int[] sum = new int[renshu];
//存储每一位学生的平均分
int[] avq = new int[renshu];
//把每一位学生姓名以及所有成绩看作一个整体。
String[] str  = new String[renshu];


/*
* 用来循环录入课程
*/
for(int i=0;i<course.length;i++)
{
System.out.println("请定义第"+(i+1)+"课程名");
course[i]=in.next();
}
/*
* 用来录入学生各科成绩
*/
for(int i = 0;i<renshu;i++)
{
int S=0;
System.out.println("请输入第"+(i+1)+"个学生姓名");
   name[i] = in.next();//存储学生成绩
   String strll  ="";
for(int j=0;j<courseNum;j++)
{
System.out.println("请输入"+name[i]+course[j]+"成绩");
number[i][j]=in.nextInt();//输入特定学生的特定成绩,存入一个二维数组
S+= number[i][j];
strll+=number[i][j]+"\t";//将各科成绩包括空格符整合存在变量
}
sum[i]=S;//把得到的和给sum
avq[i]=S/courseNum;
str[i]=name[i]+"\t"+strll+sum[i]+"\t"+avq[i];//将每个学生姓名 总分 平均分整合
}
//排行榜处理-冒泡排序（根据总分排名 交换每个学生）
for(int i=0;i<str.length;i++)
{
for(int j=0;j<sum.length-1;j++)
{
if(sum[j]<sum[j+1])
{
int t1 =sum[j];String t2=str[j];
sum[j]=sum[j+1];str[j]=str[j+1];
sum[j+1]=t1;str[j+1]=t2;
}
}
}
System.out.print("学生");//不需要换行
for(int i=0;i<course.length;i++)
{
System.out.print("\t"+course[i]);
}
System.out.print("\t总分\t平均分\t排行榜");
System.out.println();//换行

//打印效果
for(int i=0;i<renshu;i++)
{
//如果没有排行榜一栏应用以下程序
/*System.out.print(name[i]);
for(int j=0;j<courseNum;j++)
{
System.out.print("\t"+number[i][j]);
}
System.out.print("\t"+sum[i]);
System.out.print("\t"+avq[i]);
*/


System.out.print(str[i]+"\t"+"第"+(i+1)+"名");
System.out.println();//换行
}
}
}