#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
    int a,num1, num2, num3, count=1, result,resultTrue,flag;//result:用户输入结果 resultTrue:正确结果
    int i=0;
    char op1, op2;
    printf("\t\t|-----------------------------------|\n");
    printf("\t\t|          作业：四则运算           |\n");
    printf("\t\t|        学号：201606120069         |\n");
    printf("\t\t|        班级：软件工程2班          |\n");
    printf("\t\t|          姓名：缪国锋             |\n");
    printf("\t\t|                                   |\n");
    printf("\t\t|-----------------------------------|\n");
    printf("请输入运算题数：");
    scanf("%d",&a);
    srand(time(NULL)); //随机数生成
    do {
        count++;
        num1 = rand() % 100+1;
        num2 = rand() % 100+1;
        num3 = rand() % 100+1;
        switch (num1 % 4)
        {
            case 0:op1 = '+';
            break;
            case 1:op1 = '-';
            break;
            case 2:op1 = '*';
            break;
            case 3:op1 = '/';
            break;
            default:
            break;
        }
        switch (num2 % 4)
        {
            case 0:op2 = '+';
            flag = 0;
            break;
            case 1:op2 = '-';
            flag = 0;
            break;
            case 2:op2 = '*';
            if((op1=='*')||(op1=='/')) flag = 0;
            else flag = 1;
            break;
            case 3:op2 = '/';
            if((op1=='*')||(op1=='/')) flag = 0;
            else flag = 1;
            break;
            default:
            break;
        }
        printf("%d %c %d %c %d = ",num1,op1,num2,op2,num3);
        /*优先算法*/
        if(flag==0)//先计算左边
        {
            resultTrue = 0;
            switch (op1)
            {
                case '+':resultTrue = num1+num2;
                break;
                case '-':resultTrue = num1-num2;
                break;
                case '*':resultTrue = num1*num2;
                break;
                case '/':resultTrue = num1/num2;
                break;
                default:
                break;
            }
            switch (op2)
            {
                case '+':resultTrue += num3;
                break;
                case '-':resultTrue -= num3;
                break;
                case '*':resultTrue *= num3;
                break;
                case '/':resultTrue /= num3;
                break;
                default:
                break;
            }
        }
        else//计算右边
        {
            resultTrue = 0;
            switch (op2)
            {
                case '+':resultTrue = num2+num3;
                break;
                case '-':resultTrue = num2-num3;
                break;
                case '*':resultTrue = num2*num3;
                break;
                case '/':resultTrue = num2/num3;

                break;
                default:
                break;
            }
            switch (op1)
            {
                case '+':resultTrue = num1 + resultTrue;
                break;
                case '-':resultTrue = num1 - resultTrue;
                break;
                case '*':resultTrue = num1 * resultTrue;
                break;
                case '/':resultTrue = num1 / resultTrue;
                break;
                default:
                break;
                }
        }
        scanf("%d",&result);
        if (result == resultTrue)
        {
            printf("结果正确!\n");
            i=i+1;
        }
        else
        printf("结果错误!\n");
        } while(count<=a);
        printf("一共%d道题,答对%d题",a,i);
        return 0;
}
