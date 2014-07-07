#operator*=
```cpp
valarray<T>& operator*=(const valarray<T>& x);
```

##概要
`*this`に`x`を乗算する。


##効果
以下のコードと同等のことを行う：

```cpp
for (size_t i = 0; i < size(); ++i) {
  (*this)[i] *= x[i];
}
```


##戻り値
`*this`


##備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> a = {4, 5, 6};
  std::valarray<int> b = {1, 2, 3};

  a *= b;
  for (int x : a) {
    std::cout << x << std::endl;
  }
}
```
* a *= b[color ff0000]

###出力
```
4
10
18
```


