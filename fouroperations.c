#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
    int a,num1, num2, num3, count=1, result,resultTrue,flag;//result:�û������� resultTrue:��ȷ���
    int i=0;
    char op1, op2;
    printf("\t\t|-----------------------------------|\n");
    printf("\t\t|          ��ҵ����������           |\n");
    printf("\t\t|        ѧ�ţ�201606120069         |\n");
    printf("\t\t|        �༶���������2��          |\n");
    printf("\t\t|          �������ѹ���             |\n");
    printf("\t\t|                                   |\n");
    printf("\t\t|-----------------------------------|\n");
    printf("����������������");
    scanf("%d",&a);
    srand(time(NULL)); //���������
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
        /*�����㷨*/
        if(flag==0)//�ȼ������
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
        else//�����ұ�
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
            printf("�����ȷ!\n");
            i=i+1;
        }
        else
        printf("�������!\n");
        } while(count<=a);
        printf("һ��%d����,���%d��",a,i);
        return 0;
}
