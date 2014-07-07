#operator*
```cpp
namespace std {
  template <class T>
  valarray<T> operator*(const valarray<T>& a, const valarray<T>& b);
}
```

##概要
`valarray`において、左辺と右辺を乗算する。


##戻り値
以下のコードと同等のことを行う：

```cpp
valarray<T> c = a;
c *= b;
return c;
```
* *=[link ./op_multiply_assign.md]


##備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> a = {4, 5, 6};
  const std::valarray<int> b = {1, 2, 3};

  std::valarray<int> result = a * b;
  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* a * b[color ff0000]

###出力
```
4
10
18
```


