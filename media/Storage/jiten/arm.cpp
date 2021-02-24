#include<bits/stdc++.h>
#include<armadillo>

using namespace std;

int main(){

    arma::Mat<double> data(8,4);

    data.fill(0);

    data.row(0).col(0) = -1;

    data.print();

    arma::Mat<double> value(1,2);

    value.print();

    value.reshape(2,1);

    value.print();

    return 0;
}